import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { HiAcademicCap, HiBriefcase, HiArrowRight } from "react-icons/hi2";

import experience from "../../data/experience";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import { defaultViewport } from "../../utils/animations";

// ─────────────────────────────────────────────────────────────────────────────
// Design token map
// Drives colours for both card faces so the system stays consistent.
// ─────────────────────────────────────────────────────────────────────────────
const TOKEN = {
  education: {
    accent:       "#3b82f6",
    accentMuted:  "rgba(59,130,246,",
    coverFrom:    "#1e3a8a",          // blue-900
    coverMid:     "#1d4ed8",          // blue-700
    coverTo:      "#3b82f6",          // blue-500
    coverHighlight:"rgba(147,197,253,0.15)", // blue-300/15 — subtle shine layer
    iconBg:       "rgba(59,130,246,0.18)",
    iconColor:    "#93c5fd",
    tagBg:        "rgba(59,130,246,0.12)",
    tagBorder:    "rgba(59,130,246,0.30)",
    tagText:      "#93c5fd",
    dotColor:     "#3b82f6",
    dotGlow:      "rgba(59,130,246,0.55)",
    borderBase:   "rgba(59,130,246,0.22)",
    borderHover:  "rgba(59,130,246,0.60)",
    shadowAccent: "rgba(59,130,246,0.18)",
    backBg:       "rgba(15,23,42,0.95)",
    btnBg:        "#2563eb",
    btnHover:     "#3b82f6",
  },
  work: {
    accent:       "#a855f7",
    accentMuted:  "rgba(168,85,247,",
    coverFrom:    "#3b0764",          // purple-950
    coverMid:     "#7e22ce",          // purple-800
    coverTo:      "#a855f7",          // purple-500
    coverHighlight:"rgba(216,180,254,0.12)", // purple-300/12
    iconBg:       "rgba(168,85,247,0.18)",
    iconColor:    "#d8b4fe",
    tagBg:        "rgba(168,85,247,0.12)",
    tagBorder:    "rgba(168,85,247,0.30)",
    tagText:      "#d8b4fe",
    dotColor:     "#a855f7",
    dotGlow:      "rgba(168,85,247,0.55)",
    borderBase:   "rgba(168,85,247,0.22)",
    borderHover:  "rgba(168,85,247,0.60)",
    shadowAccent: "rgba(168,85,247,0.18)",
    backBg:       "rgba(15,10,25,0.95)",
    btnBg:        "#7c3aed",
    btnHover:     "#a855f7",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Mouse-tracking tilt hook (rotationRange: 4 — from the widget config)
// Returns spring-smoothed rotateX / rotateY values relative to card centre.
// ─────────────────────────────────────────────────────────────────────────────
const ROTATION_RANGE = 4; // degrees — matches widget's rotationRange:4
const SPRING = { stiffness: 150, damping: 20, mass: 0.5 };

function useTilt(disabled) {
  const rotX = useSpring(0, SPRING);
  const rotY = useSpring(0, SPRING);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  function onMouseMove(e) {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2); // -1 → 1
    const dy = (e.clientY - cy) / (rect.height / 2);

    rotX.set(-dy * ROTATION_RANGE);   // tilt up/down
    rotY.set( dx * ROTATION_RANGE);   // tilt left/right
    glareX.set(((e.clientX - rect.left) / rect.width)  * 100);
    glareY.set(((e.clientY - rect.top)  / rect.height) * 100);
  }

  function onMouseLeave() {
    rotX.set(0);
    rotY.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  return { rotX, rotY, glareX, glareY, onMouseMove, onMouseLeave };
}

// ─────────────────────────────────────────────────────────────────────────────
// FRONT FACE — gradient cover + icon + title/subtitle/date
// Maps to: coverImage gradient + showTitle + showCover in widget config
// ─────────────────────────────────────────────────────────────────────────────
function CardFront({ item, t }) {
  const Icon = item.type === "education" ? HiAcademicCap : HiBriefcase;

  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
    >
      {/* ── Cover gradient area (showCover: true) ──────────────────────── */}
      {/* Maps to cardCoverGradient: ["#3b73ed","#7ca1f3"] adapted per type */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center gap-3 px-6"
        style={{
          background: `linear-gradient(135deg, ${t.coverFrom} 0%, ${t.coverMid} 50%, ${t.coverTo} 100%)`,
        }}
      >
        {/* Glare / shine layer — mimics widget's rotationShadowRange highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${t.coverHighlight}, transparent 60%)`,
          }}
        />

        {/* Animated floating icon (showMedia equivalent) */}
        <motion.div
          className="relative z-10 p-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={32} color="#ffffff" />
        </motion.div>

        {/* Type label chip */}
        <span
          className="relative z-10 text-xs font-semibold uppercase tracking-widest
                     px-3 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", color: "#ffffffcc" }}
        >
          {item.type === "education" ? "Education" : "Work"}
        </span>

        {/* Current badge on cover */}
        {item.isCurrent && (
          <span
            className="relative z-10 flex items-center gap-1.5 text-xs font-bold
                       px-3 py-1 rounded-full"
            style={{ background: "rgba(52,211,153,0.20)", color: "#34d399" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Current
          </span>
        )}

        {/* Subtle "hover to flip" hint */}
        <span
          className="relative z-10 text-xs mt-1 flex items-center gap-1"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Hover to see details
        </span>
      </div>

      {/* ── Title strip (showTitle: true) ────────────────────────────────── */}
      {/* Maps to card.backgroundColor + cardTitle styles */}
      <div
        className="px-5 py-4 shrink-0"
        style={{ background: "rgba(10,16,30,0.92)", borderTop: `1px solid ${t.borderBase}` }}
      >
        <p
          className="font-extrabold text-sm leading-snug text-white truncate"
        >
          {item.title}
        </p>
        <p className="text-xs mt-0.5 truncate" style={{ color: t.iconColor }}>
          {item.subtitle}
        </p>
        <p className="text-xs text-slate-500 font-mono mt-0.5">{item.date}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACK FACE — description + tags + CTA button
// Maps to: cardBackface, showDescription: true, showButton: true, additionalInfo
// ─────────────────────────────────────────────────────────────────────────────
function CardBack({ item, t }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
      style={{
        backfaceVisibility:       "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform:                "rotateY(180deg)",  // pre-flipped; parent un-flips on hover
        background:               t.backBg,
        border:                   `1px solid ${t.borderHover}`,
      }}
    >
      {/* Top accent strip — same quiet category signal as front */}
      <div
        className="h-0.5 w-full shrink-0"
        style={{ background: `linear-gradient(to right, ${t.coverFrom}, ${t.coverTo}, transparent)` }}
      />

      <div className="flex flex-col flex-1 p-5 overflow-hidden">
        {/* Role header */}
        <p className="font-extrabold text-white text-sm leading-snug">{item.title}</p>
        <p className="text-xs mt-0.5 mb-3" style={{ color: t.iconColor }}>{item.subtitle} · {item.date}</p>

        {/* Description (showDescription: true → cardDescription) */}
        {/* Slightly darker backdrop ensures legibility over any blurred bg */}
        <div
          className="flex-1 rounded-xl p-3 overflow-auto"
          style={{ background: "rgba(2,6,23,0.40)" }}
        >
          <p className="text-slate-300 text-xs leading-relaxed">{item.description}</p>
        </div>

        {/* Tech pills (additionalInfo equivalent) */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full border font-medium"
              style={{
                background:  t.tagBg,
                borderColor: t.tagBorder,
                color:       t.tagText,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA button (showButton: true → cardButton: bg #3b73ed adapted per type) */}
        <motion.button
          className="mt-4 w-full flex items-center justify-center gap-2
                     py-2.5 rounded-xl text-xs font-bold text-white
                     transition-colors duration-200 shrink-0"
          style={{ background: t.btnBg }}
          whileHover={{ background: t.btnHover, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          View Details
          <HiArrowRight size={13} />
        </motion.button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TimelineCard — full 3D flip card with mouse-tracking tilt.
// flip on hover (clickToFlip: false from widget config).
// ─────────────────────────────────────────────────────────────────────────────
function TimelineCard({ item, index }) {
  const shouldReduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const t = TOKEN[item.type] ?? TOKEN.work;

  const { rotX, rotY, glareX, glareY, onMouseMove, onMouseLeave } = useTilt(shouldReduceMotion);

  // Visual weight: past cards are slightly receded
  const baseOpacity = item.isCurrent ? 1 : 0.90;

  // Slide-in from the correct side
  const slideX = item.side === "left" ? -44 : 44;
  const entryDelay = index * 0.16;

  // Box-shadow — mimics widget's shadowColor + rotationShadowRange:4
  const restShadow  = `0 8px 32px rgba(0,0,0,0.45), 0 2px 8px ${t.shadowAccent}`;
  const hoverShadow = `0 22px 56px rgba(0,0,0,0.60), 0 4px 20px ${t.accentMuted}0.30)`;

  return (
    <motion.div
      className={`relative flex items-start gap-0
                  ${item.side === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: slideX, y: 16 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.55, delay: entryDelay, ease: [0.25, 0.8, 0.25, 1] }}
    >
      {/* ── Card column ─────────────────────────────────────────────────── */}
      <div
        className={`w-full md:w-[calc(50%-2.5rem)]
                    ${item.side === "left" ? "md:pr-10" : "md:pl-10"}`}
        style={{ opacity: baseOpacity }}
      >
        {/*
          Outer tilt wrapper — perspective container for mouse-tracking.
          We apply rotateX/Y here, but the flip (rotateY 0/180) is on the
          inner scene so the two transforms don't conflict.
        */}
        <motion.div
          className="relative"
          style={{
            perspective:      "1000px",
            perspectiveOrigin: "center center",
          }}
          onMouseMove={onMouseMove}
          onMouseLeave={() => { onMouseLeave(); setFlipped(false); }}
          onMouseEnter={() => setFlipped(true)}
          onFocus={() => setFlipped(true)}
          onBlur={() => setFlipped(false)}
          role="group"
          aria-label={`${item.title} — hover for details`}
        >
          {/* Tilt motion layer */}
          <motion.div
            style={{
              rotateX: shouldReduceMotion ? 0 : rotX,
              rotateY: shouldReduceMotion ? 0 : rotY,
              transformStyle: "preserve-3d",
            }}
          >
            {/*
              Flip scene — this is the element that rotates 180° on hover.
              transformStyle preserve-3d is required for both faces to be visible.
            */}
            <motion.div
              className="relative rounded-2xl"
              style={{
                height:         "320px",   // fixed height so front + back are same size
                transformStyle: "preserve-3d",
                boxShadow:      restShadow,
                cursor:         "default",
              }}
              animate={{
                rotateY: flipped && !shouldReduceMotion ? 180 : 0,
                boxShadow: flipped ? hoverShadow : restShadow,
              }}
              transition={{ duration: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
            >
              {/* FRONT */}
              <CardFront item={item} t={t} />

              {/* BACK */}
              <CardBack item={item} t={t} />

              {/* Glare overlay — moves with mouse, reinforces 3D lit feel */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                  style={{
                    background: useTransform(
                      [glareX, glareY],
                      ([x, y]) =>
                        `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.07) 0%, transparent 55%)`,
                    ),
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Centre spine dot ─────────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col items-center w-20 shrink-0 pt-8">
        <div className="relative flex items-center justify-center">
          {item.isCurrent && (
            <motion.div
              className="absolute rounded-full"
              style={{ background: t.dotGlow, width: 28, height: 28 }}
              animate={shouldReduceMotion ? {} : {
                scale:   [1, 1.7, 1],
                opacity: [0.4, 0.12, 0.4],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div
            className="relative w-4 h-4 rounded-full ring-4 ring-slate-950 z-10"
            style={{ background: t.dotColor, boxShadow: `0 0 10px ${t.dotGlow}` }}
          />
        </div>
      </div>

      {/* Empty spacer */}
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />

      {/* Mobile rail dot */}
      <div className="md:hidden flex flex-col items-center shrink-0 pt-7 mr-4">
        <div
          className="w-3 h-3 rounded-full ring-2 ring-slate-950"
          style={{ background: t.dotColor }}
        />
        <div className="w-px flex-1 mt-2" style={{ background: `${t.accentMuted}0.25)` }} />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated spine — scroll-driven scaleY, top → bottom
// ─────────────────────────────────────────────────────────────────────────────
function TimelineSpine() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="hidden md:block absolute left-1/2 -translate-x-px top-4 bottom-4 w-px"
      style={{ background: "rgba(51,65,85,0.35)" }}
    >
      <motion.div
        className="absolute inset-0 origin-top"
        style={{
          scaleY:     shouldReduceMotion ? 1 : scaleY,
          background: "linear-gradient(to bottom, #3b82f6, #a855f7, #3b82f6)",
          opacity:    0.55,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section
      id="experience"
      className="py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,rgba(59,130,246,0.05),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_70%,rgba(168,85,247,0.05),transparent_55%)]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionTitle
          eyebrow="03. Experience"
          title="My Journey"
          subtitle="Education and work experience — in the order they happened."
        />

        <div className="relative mt-4">
          <TimelineSpine />
          <div className="flex flex-col gap-14">
            {experience.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
