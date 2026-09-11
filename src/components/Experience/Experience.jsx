import { useRef, useState } from "react";
import {
  motion, useScroll, useTransform,
  useReducedMotion, useMotionValue, useSpring,
} from "framer-motion";
import { HiAcademicCap, HiBriefcase, HiArrowRight } from "react-icons/hi2";

import experience from "../../data/experience";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import { defaultViewport } from "../../utils/animations";

// ── Design tokens — colour per type, both light and dark ─────────────────────
const TOKEN = {
  education: {
    accent: "#3b82f6", accentMuted: "rgba(59,130,246,",
    coverFrom: "#1e3a8a", coverMid: "#1d4ed8", coverTo: "#3b82f6",
    coverHighlight: "rgba(147,197,253,0.15)",
    iconBg: "rgba(59,130,246,0.12)", iconColor: "#93c5fd",
    tagBg: "rgba(59,130,246,0.10)", tagBorder: "rgba(59,130,246,0.28)", tagText: "#93c5fd",
    dotColor: "#3b82f6", dotGlow: "rgba(59,130,246,0.5)",
    borderBase: "rgba(59,130,246,0.20)", borderHover: "rgba(59,130,246,0.55)",
    shadowAccent: "rgba(59,130,246,0.15)",
    backBg: "rgba(15,23,42,0.96)", btnBg: "#2563eb", btnHover: "#3b82f6",
  },
  work: {
    accent: "#a855f7", accentMuted: "rgba(168,85,247,",
    coverFrom: "#3b0764", coverMid: "#7e22ce", coverTo: "#a855f7",
    coverHighlight: "rgba(216,180,254,0.12)",
    iconBg: "rgba(168,85,247,0.12)", iconColor: "#d8b4fe",
    tagBg: "rgba(168,85,247,0.10)", tagBorder: "rgba(168,85,247,0.28)", tagText: "#d8b4fe",
    dotColor: "#a855f7", dotGlow: "rgba(168,85,247,0.5)",
    borderBase: "rgba(168,85,247,0.20)", borderHover: "rgba(168,85,247,0.55)",
    shadowAccent: "rgba(168,85,247,0.15)",
    backBg: "rgba(15,10,25,0.96)", btnBg: "#7c3aed", btnHover: "#a855f7",
  },
};

// ── Mouse-tracking tilt (±4°) ─────────────────────────────────────────────────
const SPRING_CFG = { stiffness: 150, damping: 20, mass: 0.5 };

function useTilt(disabled) {
  const rotX = useSpring(0, SPRING_CFG);
  const rotY = useSpring(0, SPRING_CFG);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  function onMouseMove(e) {
    if (disabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    rotX.set(-dy * 4); rotY.set(dx * 4);
    glareX.set(((e.clientX - r.left) / r.width)  * 100);
    glareY.set(((e.clientY - r.top)  / r.height) * 100);
  }
  function onMouseLeave() { rotX.set(0); rotY.set(0); glareX.set(50); glareY.set(50); }

  return { rotX, rotY, glareX, glareY, onMouseMove, onMouseLeave };
}

// ── Card front face ────────────────────────────────────────────────────────────
function CardFront({ item, t }) {
  const Icon = item.type === "education" ? HiAcademicCap : HiBriefcase;
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
      {/* Cover gradient — 55% height */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-2 px-5"
        style={{ background: `linear-gradient(135deg,${t.coverFrom} 0%,${t.coverMid} 50%,${t.coverTo} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 20%,${t.coverHighlight},transparent 60%)` }} />
        <motion.div className="relative z-10 p-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
          <Icon size={28} color="#ffffff" />
        </motion.div>
        <span className="relative z-10 text-[10px] font-semibold uppercase tracking-widest
                         px-2.5 py-0.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", color: "#ffffffcc" }}>
          {item.type === "education" ? "Education" : "Work"}
        </span>
        {item.isCurrent && (
          <span className="relative z-10 flex items-center gap-1 text-[10px] font-bold
                           px-2.5 py-0.5 rounded-full"
            style={{ background: "rgba(52,211,153,0.20)", color: "#34d399" }}>
            <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
              animate={{ scale: [1,1.3,1], opacity: [0.6,1,0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            Current
          </span>
        )}
        <span className="relative z-10 text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
          Hover to flip
        </span>
      </div>
      {/* Title strip */}
      <div className="px-4 py-3 shrink-0"
        style={{ background: "rgba(10,16,30,0.94)", borderTop: `1px solid ${t.borderBase}` }}>
        <p className="font-extrabold text-xs leading-snug text-white truncate">{item.title}</p>
        <p className="text-[11px] mt-0.5 truncate" style={{ color: t.iconColor }}>{item.subtitle}</p>
        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.date}</p>
      </div>
    </div>
  );
}

// ── Card back face ─────────────────────────────────────────────────────────────
function CardBack({ item, t }) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
      style={{
        backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)", background: t.backBg,
        border: `1px solid ${t.borderHover}`,
      }}>
      <div className="h-0.5 w-full shrink-0"
        style={{ background: `linear-gradient(to right,${t.coverFrom},${t.coverTo},transparent)` }} />
      <div className="flex flex-col flex-1 p-4 overflow-hidden">
        <p className="font-extrabold text-white text-xs leading-snug">{item.title}</p>
        <p className="text-[11px] mt-0.5 mb-2" style={{ color: t.iconColor }}>
          {item.subtitle} · {item.date}
        </p>
        <div className="flex-1 rounded-lg p-2.5 overflow-hidden"
          style={{ background: "rgba(2,6,23,0.40)" }}>
          <p className="text-slate-300 text-[11px] leading-relaxed">{item.description}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
              style={{ background: t.tagBg, borderColor: t.tagBorder, color: t.tagText }}>
              {tag}
            </span>
          ))}
        </div>
        <motion.button
          className="mt-2.5 w-full flex items-center justify-center gap-1.5
                     py-2 rounded-lg text-[11px] font-bold text-white shrink-0"
          style={{ background: t.btnBg }}
          whileHover={{ background: t.btnHover, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}>
          View Details <HiArrowRight size={11} />
        </motion.button>
      </div>
    </div>
  );
}

// ── TimelineCard — 3D flip + tilt ─────────────────────────────────────────────
function TimelineCard({ item, index }) {
  const shouldReduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const t = TOKEN[item.type] ?? TOKEN.work;
  const { rotX, rotY, glareX, glareY, onMouseMove, onMouseLeave } = useTilt(shouldReduceMotion);

  const restShadow  = `0 6px 24px rgba(0,0,0,0.35), 0 2px 6px ${t.shadowAccent}`;
  const hoverShadow = `0 16px 40px rgba(0,0,0,0.50), 0 4px 16px ${t.accentMuted}0.28)`;
  const slideX = item.side === "left" ? -40 : 40;

  return (
    <motion.div
      className={`relative flex items-start ${item.side === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: slideX, y: 12 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.5, delay: index * 0.14, ease: [0.25, 0.8, 0.25, 1] }}>

      {/* Card column */}
      <div className={`w-full md:w-[calc(50%-2.5rem)] ${item.side === "left" ? "md:pr-10" : "md:pl-10"}`}
        style={{ opacity: item.isCurrent ? 1 : 0.91 }}>
        <motion.div className="relative" style={{ perspective: "1000px" }}
          onMouseMove={onMouseMove}
          onMouseLeave={() => { onMouseLeave(); setFlipped(false); }}
          onMouseEnter={() => setFlipped(true)}
          role="group" aria-label={`${item.title} — hover for details`}>
          <motion.div style={{
            rotateX: shouldReduceMotion ? 0 : rotX,
            rotateY: shouldReduceMotion ? 0 : rotY,
            transformStyle: "preserve-3d",
          }}>
            <motion.div className="relative rounded-2xl"
              style={{
                height: "270px",          /* reduced from 320px */
                transformStyle: "preserve-3d",
                boxShadow: restShadow,
                cursor: "default",
              }}
              animate={{
                rotateY: flipped && !shouldReduceMotion ? 180 : 0,
                boxShadow: flipped ? hoverShadow : restShadow,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}>
              <CardFront item={item} t={t} />
              <CardBack  item={item} t={t} />
              {!shouldReduceMotion && (
                <motion.div className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                  style={{
                    background: useTransform([glareX, glareY],
                      ([x, y]) => `radial-gradient(circle at ${x}% ${y}%,rgba(255,255,255,0.06) 0%,transparent 55%)`),
                  }} />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Centre dot */}
      <div className="hidden md:flex flex-col items-center w-20 shrink-0 pt-6">
        <div className="relative flex items-center justify-center">
          {item.isCurrent && (
            <motion.div className="absolute rounded-full"
              style={{ background: t.dotGlow, width: 24, height: 24 }}
              animate={shouldReduceMotion ? {} : { scale:[1,1.7,1], opacity:[0.4,0.12,0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
          )}
          <div className="relative w-3.5 h-3.5 rounded-full ring-4 ring-white dark:ring-slate-950 z-10"
            style={{ background: t.dotColor, boxShadow: `0 0 8px ${t.dotGlow}` }} />
        </div>
      </div>
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />

      {/* Mobile dot rail */}
      <div className="md:hidden flex flex-col items-center shrink-0 pt-6 mr-3">
        <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-950"
          style={{ background: t.dotColor }} />
        <div className="w-px flex-1 mt-1.5" style={{ background: `${t.accentMuted}0.22)` }} />
      </div>
    </motion.div>
  );
}

// ── Animated spine ─────────────────────────────────────────────────────────────
function TimelineSpine() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref}
      className="hidden md:block absolute left-1/2 -translate-x-px top-4 bottom-4 w-px"
      style={{ background: "rgba(203,213,225,0.4)" }}>
      <motion.div className="absolute inset-0 origin-top"
        style={{
          scaleY: shouldReduceMotion ? 1 : scaleY,
          background: "linear-gradient(to bottom,#3b82f6,#a855f7,#3b82f6)",
          opacity: 0.55,
        }} />
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience"
      className="py-14 bg-white dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,rgba(59,130,246,0.04),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_70%,rgba(168,85,247,0.04),transparent_55%)]" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionTitle eyebrow="03. Experience" title="My Journey"
          subtitle="Education and work experience — in the order they happened." />
        <div className="relative mt-2">
          <TimelineSpine />
          {/* gap-10 reduced from gap-14 */}
          <div className="flex flex-col gap-10">
            {experience.map((item, i) => <TimelineCard key={item.id} item={item} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
