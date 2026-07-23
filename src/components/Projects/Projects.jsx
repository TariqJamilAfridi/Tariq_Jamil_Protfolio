import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import projects from "../../data/projects";
import Button from "../common/Button/Button";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import {
  fadeInUp,
  staggerContainer,
  defaultViewport,
} from "../../utils/animations";

// ── Browser chrome mockup ─────────────────────────────────────────────────────
function BrowserMockup({ gradient, icon, title, tall = false }) {
  return (
    <div className="relative w-full overflow-hidden rounded-t-xl bg-slate-800 border-b border-slate-700">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700/60">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="flex-1 mx-3 bg-slate-700/60 rounded-md px-3 py-1 text-xs
                        text-slate-500 font-mono truncate select-none">
          https://{title.toLowerCase().replace(/\s+/g, "-")}.vercel.app
        </div>
      </div>

      <div className={`${tall ? "h-72" : "h-48"} bg-gradient-to-br ${gradient}
                       flex items-center justify-center relative overflow-hidden
                       group-hover:brightness-110 transition-all duration-500`}>
        <motion.span
          className="text-6xl select-none relative z-10 drop-shadow-xl"
          whileHover={{ scale: 1.2, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.span>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.08) 50%,transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5 }}
        />
      </div>
    </div>
  );
}

// ── Featured (full-width) card ────────────────────────────────────────────────
function FeaturedCard({ project }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group col-span-full bg-slate-900 rounded-2xl overflow-hidden
                 border border-blue-500/30 hover:border-blue-500/60
                 shadow-2xl shadow-blue-500/5 transition-all duration-300
                 md:grid md:grid-cols-2"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {/* Mockup fills the left half on desktop */}
      <div className="md:rounded-l-2xl overflow-hidden">
        <BrowserMockup
          gradient={project.gradient}
          icon={project.icon}
          title={project.title}
          tall
        />
      </div>

      {/* Content — right half */}
      <div className="flex flex-col justify-center p-8 lg:p-10">
        {/* Featured ribbon */}
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                         text-amber-400 bg-amber-400/10 border border-amber-400/20
                         px-3 py-1 rounded-full mb-4 w-fit">
          <FaStar size={10} />
          Featured Project
        </span>

        <h3 className="text-2xl font-extrabold text-white group-hover:text-blue-400
                       transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-slate-400 mt-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.technologies.map((tech) => (
            <span key={tech}
              className="text-xs font-medium px-2.5 py-1 rounded-full
                         bg-blue-600/10 text-blue-300 border border-blue-500/20">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <Button as="a" href={project.github} target="_blank" rel="noreferrer"
            variant="primary" size="sm" aria-label={`View ${project.title} on GitHub`}>
            <FaGithub size={14} /> GitHub
          </Button>
          <Button as="a" href={project.demo} target="_blank" rel="noreferrer"
            variant="ghost" size="sm" aria-label={`Open ${project.title} live demo`}>
            <FaExternalLinkAlt size={12} /> Live Demo
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

// ── Regular card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group flex flex-col bg-slate-900 rounded-xl overflow-hidden
                 border border-slate-800 hover:border-blue-500/40
                 shadow-lg hover:shadow-blue-500/10 hover:shadow-2xl
                 transition-all duration-300"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <BrowserMockup gradient={project.gradient} icon={project.icon} title={project.title} />

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-400 mt-3 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.technologies.map((tech) => (
            <span key={tech}
              className="text-xs font-medium px-2.5 py-1 rounded-full
                         bg-blue-600/10 text-blue-300 border border-blue-500/20">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-6 pt-5 border-t border-slate-800">
          <Button as="a" href={project.github} target="_blank" rel="noreferrer"
            variant="primary" size="sm" aria-label={`View ${project.title} on GitHub`}>
            <FaGithub size={14} /> GitHub
          </Button>
          <Button as="a" href={project.demo} target="_blank" rel="noreferrer"
            variant="ghost" size="sm" aria-label={`Open ${project.title} live demo`}>
            <FaExternalLinkAlt size={12} /> Live Demo
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function Projects() {
  const featured  = projects.filter((p) => p.featured);
  const regular   = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-[#0b0f17] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.06),transparent_55%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          eyebrow="04. Projects"
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
          {/* Featured cards span the full grid width */}
          {featured.map((p) => <FeaturedCard key={p.id} project={p} />)}
          {/* Regular cards fill the remaining columns */}
          {regular.map((p)  => <ProjectCard  key={p.id} project={p} />)}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
