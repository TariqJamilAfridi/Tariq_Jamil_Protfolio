import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projects from "../../data/projects";
import Button from "../common/Button/Button";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import {
  fadeInUp,
  staggerContainer,
  defaultViewport,
} from "../../utils/animations";

function Projects() {
  return (
    <section id="projects" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Featured Projects"
          subtitle="A selection of my recent work and personal builds"
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={fadeInUp}
              className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-colors duration-300"
              whileHover={{ y: -12 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className={`h-56 bg-linear-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <motion.span
                  className="text-6xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {project.icon}
                </motion.span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FaGithub /> GitHub
                  </Button>

                  <Button
                    as="a"
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white flex items-center gap-2"
                  >
                    <FaExternalLinkAlt size={14} /> Live Demo
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
