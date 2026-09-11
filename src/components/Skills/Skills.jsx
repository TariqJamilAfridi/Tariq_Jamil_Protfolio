import { motion } from "framer-motion";
import skills from "../../data/skills";
import skillIcons from "../../data/skillIcons";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import { fadeInUp, staggerContainer, staggerContainerFast, defaultViewport } from "../../utils/animations";

const skillCategories = [
  { key: "frontend", title: "Frontend",    accent: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500", cardBorder: "border-blue-200 dark:border-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500/50",
    cardBg: "bg-blue-50/50 dark:bg-blue-500/5", barFrom: "from-blue-500", barTo: "to-blue-400" },
  { key: "backend",  title: "Backend",     accent: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500", cardBorder: "border-emerald-200 dark:border-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500/50",
    cardBg: "bg-emerald-50/50 dark:bg-emerald-500/5", barFrom: "from-emerald-500", barTo: "to-emerald-400" },
  { key: "database", title: "Database",    accent: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500", cardBorder: "border-amber-200 dark:border-amber-500/20 hover:border-amber-400 dark:hover:border-amber-500/50",
    cardBg: "bg-amber-50/50 dark:bg-amber-500/5", barFrom: "from-amber-500", barTo: "to-amber-400" },
  { key: "aiml",     title: "AI & ML",     accent: "text-purple-600 dark:text-purple-400",
    dot: "bg-purple-500", cardBorder: "border-purple-200 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-500/50",
    cardBg: "bg-purple-50/50 dark:bg-purple-500/5", barFrom: "from-purple-500", barTo: "to-fuchsia-400" },
];

function SkillIcon({ iconKey }) {
  const entry = skillIcons[iconKey];
  if (!entry?.icon) {
    return <span className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />;
  }
  const Icon = entry.icon;
  return (
    <Icon
      size={18}
      aria-hidden="true"
      className="shrink-0 drop-shadow-sm"
      style={{ color: entry.color }}
    />
  );
}

function SkillBadge({ skill, barColor }) {
  return (
    <motion.div variants={fadeInUp}
      className="group flex flex-col gap-1.5
                 bg-white dark:bg-slate-900/60 backdrop-blur-sm
                 px-3 py-2.5 rounded-xl
                 border border-slate-200 dark:border-slate-800
                 hover:border-blue-400 dark:hover:border-blue-500/40
                 hover:bg-slate-50 dark:hover:bg-slate-800/80
                 transition-colors duration-250 cursor-default"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      <div className="flex items-center gap-2">
        <SkillIcon iconKey={skill.icon} />
        <span className="text-slate-700 dark:text-slate-300 text-xs font-medium
                         group-hover:text-slate-900 dark:group-hover:text-white
                         transition-colors duration-250 whitespace-nowrap flex-1">
          {skill.name}
        </span>
        {skill.level && (
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono ml-auto">
            {skill.level}/10
          </span>
        )}
      </div>
      {skill.level && (
        <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level * 10}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }} />
        </div>
      )}
    </motion.div>
  );
}

function CategoryCard({ category }) {
  const skillList = skills[category.key] ?? [];
  return (
    <motion.div variants={fadeInUp}
      className={`rounded-2xl border ${category.cardBorder} ${category.cardBg}
                  backdrop-blur-sm p-4 transition-all duration-300`}>
      {/* Header — compact */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-2 h-2 rounded-full ${category.dot}`} />
        <h3 className={`text-sm font-bold ${category.accent}`}>{category.title}</h3>
        <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          {skillList.length} skills
        </span>
      </div>
      <motion.div className="grid grid-cols-2 gap-2"
        variants={staggerContainerFast} initial="hidden"
        whileInView="visible" viewport={defaultViewport}>
        {skillList.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} barColor={`${category.barFrom} ${category.barTo}`} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills"
      className="py-14 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.04),transparent_55%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle eyebrow="02. Skills" title="Technical Skills"
          subtitle="Technologies and tools I work with to build great products" />
        <motion.div className="grid md:grid-cols-2 gap-4"
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={defaultViewport}>
          {skillCategories.map((cat) => <CategoryCard key={cat.key} category={cat} />)}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
