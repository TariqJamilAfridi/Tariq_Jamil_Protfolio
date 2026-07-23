import { motion } from "framer-motion";
import skills from "../../data/skills";
import skillIcons from "../../data/skillIcons";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import {
  fadeInUp,
  staggerContainer,
  staggerContainerFast,
  defaultViewport,
} from "../../utils/animations";

// Category config — title, accent colour, border/background tints
const skillCategories = [
  {
    key: "frontend",
    title: "Frontend Development",
    accent: "text-blue-400",
    dot: "bg-blue-400",
    cardBorder: "border-blue-500/20 hover:border-blue-500/50",
    cardBg: "bg-blue-500/5",
  },
  {
    key: "backend",
    title: "Backend Development",
    accent: "text-emerald-400",
    dot: "bg-emerald-400",
    cardBorder: "border-emerald-500/20 hover:border-emerald-500/50",
    cardBg: "bg-emerald-500/5",
  },
  {
    key: "database",
    title: "Database",
    accent: "text-amber-400",
    dot: "bg-amber-400",
    cardBorder: "border-amber-500/20 hover:border-amber-500/50",
    cardBg: "bg-amber-500/5",
  },
  {
    key: "tools",
    title: "Tools & DevOps",
    accent: "text-purple-400",
    dot: "bg-purple-400",
    cardBorder: "border-purple-500/20 hover:border-purple-500/50",
    cardBg: "bg-purple-500/5",
  },
];

// ── Inline SVG icon component ─────────────────────────────────────────────────
// Renders a 20×20 SVG from the skillIcons map; falls back to a dot if missing.
function SkillIcon({ iconKey, hovered }) {
  const icon = skillIcons[iconKey];
  if (!icon) {
    return <span className="w-5 h-5 rounded-full bg-slate-600 inline-block" />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      aria-hidden="true"
      fill={hovered ? icon.color : "currentColor"}
      className="transition-all duration-300 shrink-0"
      style={{ color: hovered ? icon.color : "#94a3b8" }}
    >
      <path d={icon.path} />
    </svg>
  );
}

// ── Individual skill badge ────────────────────────────────────────────────────
function SkillBadge({ skill }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group flex flex-col gap-2 bg-slate-900/60 backdrop-blur-sm
                 px-4 py-3 rounded-xl border border-slate-800 cursor-default
                 hover:bg-slate-800/80 hover:border-blue-500/40
                 transition-colors duration-300 w-full sm:w-auto min-w-[130px]"
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Icon + name row */}
      <div className="flex items-center gap-2.5">
        <motion.span
          className="text-slate-400 group-hover:text-current transition-colors duration-300 shrink-0"
        >
          <SkillIcon iconKey={skill.icon} hovered={false} />
        </motion.span>
        <span className="text-slate-300 text-sm font-medium group-hover:text-white
                         transition-colors duration-300 whitespace-nowrap">
          {skill.name}
        </span>
        {skill.level && (
          <span className="ml-auto text-xs text-slate-500 font-mono">{skill.level}%</span>
        )}
      </div>

      {/* Animated proficiency bar — only rendered when level is provided */}
      {skill.level && (
        <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          />
        </div>
      )}
    </motion.div>
  );
}

// ── Section category card ─────────────────────────────────────────────────────
function CategoryCard({ category }) {
  const skillList = skills[category.key] ?? [];

  return (
    <motion.div
      variants={fadeInUp}
      // Glassmorphism card with per-category accent border
      className={`rounded-2xl border ${category.cardBorder} ${category.cardBg}
                  backdrop-blur-sm p-6 transition-all duration-300`}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        <span className={`w-2.5 h-2.5 rounded-full ${category.dot}`} />
        <h3 className={`text-lg font-semibold ${category.accent}`}>
          {category.title}
        </h3>
        <span className="ml-auto text-xs text-slate-500 font-mono">
          {skillList.length} skills
        </span>
      </div>

      {/* Badge grid — 2 cols on sm+, full-width badges with bars */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {skillList.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.06),transparent_55%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          eyebrow="02. Skills"
          title="Technical Skills"
          subtitle="Technologies and tools I work with to build great products"
        />

        {/* 2-column grid on md+, single column on mobile */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {skillCategories.map((category) => (
            <CategoryCard key={category.key} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
