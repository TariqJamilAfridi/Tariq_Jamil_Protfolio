import { motion } from "framer-motion";
import skills from "../../data/skills";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import {
  fadeInUp,
  staggerContainer,
  staggerContainerFast,
  defaultViewport,
} from "../../utils/animations";

const skillCategories = [
  { key: "frontend", title: "Frontend Development", color: "text-blue-400" },
  { key: "backend", title: "Backend Development", color: "text-emerald-400" },
  { key: "database", title: "Database", color: "text-amber-400" },
  { key: "tools", title: "Tools & DevOps", color: "text-purple-400" },
];

function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Technical Skills"
          subtitle="Technologies and tools I work with to build great products"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-12"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.key} variants={fadeInUp}>
              <h3 className={`text-2xl font-semibold mb-6 ${category.color}`}>
                {category.title}
              </h3>

              <motion.div
                className="flex flex-wrap gap-4"
                variants={staggerContainerFast}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
              >
                {skills[category.key].map((skill) => (
                  <motion.div
                    key={skill}
                    variants={fadeInUp}
                    className="bg-slate-800 px-6 py-3 rounded-xl border border-slate-700 cursor-default"
                    whileHover={{
                      scale: 1.08,
                      y: -4,
                      backgroundColor: "rgb(37 99 235)",
                      borderColor: "rgb(59 130 246)",
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
