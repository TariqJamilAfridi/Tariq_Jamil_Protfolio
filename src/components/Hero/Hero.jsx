import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiArrowDownTray } from "react-icons/hi2";
import { TypeAnimation } from "react-type-animation";

import profile from "../../data/profile";
import profileImage from "../../assets/images/Profile.jpeg";
import CV from "../../assets/resume/CV.pdf";
import Button from "../common/Button/Button";
import { fadeInRight, staggerContainer, fadeInUp } from "../../utils/animations";

// ── Ambient background orb ────────────────────────────────────────────────────
function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function Hero() {
  const socialLinks = [
    { icon: FaGithub,   href: profile.github,              label: "GitHub" },
    { icon: FaLinkedin, href: profile.linkedin,            label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${profile.email}`,   label: "Email" },
  ];

  // Smooth-scroll helper used by the primary CTA
  function scrollToContact(e) {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20
                 bg-gradient-to-br from-[#0b0f17] via-slate-900 to-[#0b0f17]
                 text-white overflow-hidden"
    >
      {/* ── Animated mesh gradient blobs (Task 1) ──────────────────────────── */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full
                      bg-blue-600/10 blur-[120px] pointer-events-none animate-blob-1" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full
                      bg-purple-600/10 blur-[120px] pointer-events-none animate-blob-2" />
      <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] rounded-full
                      bg-cyan-500/8 blur-[100px] pointer-events-none animate-blob-3" />

      {/* Legacy ambient orbs kept for layered depth */}
      <FloatingOrb className="w-72 h-72 bg-blue-500/5 top-20 -left-36"       delay={0} />
      <FloatingOrb className="w-60 h-60 bg-purple-500/5 bottom-20 -right-24" delay={2} />

      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.04),transparent_70%)]" />

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── Left: text block ───────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.13, delayChildren: 0.2 }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeInUp}
              className="text-blue-400 font-semibold text-base tracking-widest uppercase"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mt-3 text-gradient leading-tight"
            >
              {profile.name}
            </motion.h1>

            {/* Static title + animated role */}
            <motion.div variants={fadeInUp} className="mt-4 space-y-1">
              <p className="text-lg md:text-xl font-medium text-slate-400">
                {profile.title}
              </p>
              {/* cursor prop shows the blinking caret; styled via the wrapper class */}
              <TypeAnimation
                sequence={[
                  "Frontend Developer",  2000,
                  "React Developer",     2000,
                  "Python Developer",    2000,
                  "Full Stack Developer",2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
                className="block text-xl md:text-2xl font-bold text-gradient-blue
                           [&_.type-cursor]:text-blue-400"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-slate-400 leading-8 max-w-lg"
            >
              {profile.description}
            </motion.p>

            {/* ── CTA pair ─────────────────────────────────────────────────── */}
            {/*   Primary  → solid "Hire Me" (most important action)           */}
            {/*   Secondary → ghost "Download Resume" (supporting action)       */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-8">
              <Button
                as="a"
                href="#contact"
                variant="primary"
                size="lg"
                onClick={scrollToContact}
                aria-label="Hire Me — scroll to contact section"
              >
                Hire Me
              </Button>

              <Button
                as="a"
                href={CV}
                download
                variant="ghost"
                size="lg"
                aria-label="Download Resume as PDF"
              >
                <HiArrowDownTray size={17} />
                Download Resume
              </Button>
            </motion.div>

            {/* ── Social links ─────────────────────────────────────────────── */}
            <motion.div variants={fadeInUp} className="flex gap-5 mt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full
                             border border-slate-700 text-slate-400
                             hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10
                             transition-all duration-300"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: profile image ────────────────────────────────────────── */}
          <motion.div
            className="flex justify-center"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow pulse behind the avatar */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Slow-rotating border ring */}
              <div
                className="absolute -inset-5 rounded-full border-2 border-dashed
                           border-blue-500/25 animate-spin-slow"
              />

              {/* Solid inner ring */}
              <div className="absolute -inset-2 rounded-full border border-blue-500/20" />

              {/* Avatar */}
              <motion.img
                src={profileImage}
                alt={`${profile.name} — ${profile.role}`}
                className="relative w-72 h-72 md:w-80 md:h-80 object-cover rounded-full
                           border-4 border-blue-500 shadow-2xl shadow-blue-500/20"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              {/* Floating availability badge */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2
                           bg-slate-800 border border-slate-700 rounded-full
                           px-4 py-1.5 flex items-center gap-2 text-xs font-medium
                           text-slate-300 shadow-lg whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for hire
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ───────────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-5 h-9 border-2 border-slate-600 rounded-full flex justify-center pt-1.5"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-1.5 bg-blue-400 rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
