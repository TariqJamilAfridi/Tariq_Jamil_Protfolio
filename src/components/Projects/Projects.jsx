import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import projects from "../../data/projects";
import Button from "../common/Button/Button";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import { fadeInUp, staggerContainer, defaultViewport } from "../../utils/animations";

// ── Browser chrome mockup ──────────────────────────────────────────────────────
function BrowserMockup({ gradient, image, title, tall = false }) {
  return (
    <div className="relative w-full overflow-hidden rounded-t-xl
                    bg-slate-100 dark:bg-slate-800
                    border-b border-slate-200 dark:border-slate-700">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-3 py-2
                      bg-slate-100 dark:bg-slate-800
                      border-b border-slate-200/60 dark:border-slate-700/60">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        <div className="flex-1 mx-2 bg-slate-200 dark:bg-slate-700/60 rounded px-2 py-0.5
                        text-[10px] text-slate-400 font-mono truncate select-none">
          https://{title.toLowerCase().replace(/\s+/g, "-")}.vercel.app
        </div>
      </div>
      {/* Viewport — shows screenshot when available, gradient when not */}
      <div className={`${tall ? "h-52 md:h-full md:min-h-[240px]" : "h-40"} relative overflow-hidden
                       group-hover:brightness-105 transition-all duration-500`}
           style={!image ? { background: `linear-gradient(135deg, var(--tw-gradient-stops))` } : {}}>
        {image ? (
          /* Real screenshot — fills the viewport edge-to-edge, top-anchored */
          <img
            src={image}
            alt={`${title} preview`}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          /* Fallback gradient + shimmer when no screenshot exists */
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-5xl opacity-60">🖥️</span>
          </div>
        )}

        {/* Hover overlay — subtle darkening so card depth reads on images */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />

        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.07) 50%,transparent 60%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5 }}
        />
      </div>
    </div>
  );
}

// ── Featured card — full-width ─────────────────────────────────────────────────
function FeaturedCard({ project }) {
  return (
    <motion.article variants={fadeInUp}
      className="group col-span-full
                 bg-white dark:bg-slate-900
                 rounded-2xl overflow-hidden
                 border border-blue-200 dark:border-blue-500/30
                 hover:border-blue-400 dark:hover:border-blue-500/60
                 shadow-lg shadow-blue-500/5 transition-all duration-300
                 md:grid md:grid-cols-2"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}>
      <div className="md:rounded-l-2xl overflow-hidden">
        <BrowserMockup gradient={project.gradient} image={project.image} title={project.title} tall />
      </div>
      <div className="flex flex-col justify-center p-6 lg:p-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                         text-amber-600 dark:text-amber-400
                         bg-amber-50 dark:bg-amber-400/10
                         border border-amber-200 dark:border-amber-400/20
                         px-3 py-1 rounded-full mb-3 w-fit">
          <FaStar size={9} /> Featured Project
        </span>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white
                       group-hover:text-blue-600 dark:group-hover:text-blue-400
                       transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-xs font-medium px-2.5 py-0.5 rounded-full
                                        bg-blue-50 dark:bg-blue-600/10
                                        text-blue-600 dark:text-blue-300
                                        border border-blue-200 dark:border-blue-500/20">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2.5 mt-5">
          <Button as="a" href={project.github} target="_blank" rel="noreferrer"
            variant="primary" size="sm"><FaGithub size={13} /> GitHub</Button>
          <Button as="a" href={project.demo} target="_blank" rel="noreferrer"
            variant="ghost" size="sm"><FaExternalLinkAlt size={11} /> Live Demo</Button>
        </div>
      </div>
    </motion.article>
  );
}

// ── Regular card ───────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  return (
    <motion.article variants={fadeInUp}
      className="group flex flex-col
                 bg-white dark:bg-slate-900
                 rounded-xl overflow-hidden
                 border border-slate-200 dark:border-slate-800
                 hover:border-blue-400 dark:hover:border-blue-500/40
                 shadow-md hover:shadow-xl hover:shadow-blue-500/5
                 transition-all duration-300"
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}>
      <BrowserMockup gradient={project.gradient} image={project.image} title={project.title} />
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white
                       group-hover:text-blue-600 dark:group-hover:text-blue-400
                       transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-xs leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full
                                        bg-blue-50 dark:bg-blue-600/10
                                        text-blue-600 dark:text-blue-300
                                        border border-blue-200 dark:border-blue-500/20">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button as="a" href={project.github} target="_blank" rel="noreferrer"
            variant="primary" size="sm"><FaGithub size={12} /> GitHub</Button>
          <Button as="a" href={project.demo} target="_blank" rel="noreferrer"
            variant="ghost" size="sm"><FaExternalLinkAlt size={10} /> Live Demo</Button>
        </div>
      </div>
    </motion.article>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
function Projects() {
  const featured = projects.filter((p) => p.featured);
  const regular  = projects.filter((p) => !p.featured);
  return (
    <section id="projects"
      className="py-14 bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.04),transparent_55%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle eyebrow="04. Projects" title="Featured Projects"
          subtitle="A selection of my recent work and personal builds" />
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={defaultViewport}>
          {featured.map((p) => <FeaturedCard key={p.id} project={p} />)}
          {regular.map((p)  => <ProjectCard  key={p.id} project={p} />)}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
