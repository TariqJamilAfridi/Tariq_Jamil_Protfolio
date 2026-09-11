import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiArrowDownTray } from "react-icons/hi2";
import { TypeAnimation } from "react-type-animation";

import profile from "../../data/profile";
import profileImage from "../../assets/images/Profile.jpeg";
import CV from "../../assets/resume/CV.pdf";
import Button from "../common/Button/Button";
import { fadeInRight, staggerContainer, fadeInUp } from "../../utils/animations";

function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function Hero() {
  const socialLinks = [
    { icon: FaGithub,   href: profile.github,            label: "GitHub" },
    { icon: FaLinkedin, href: profile.linkedin,          label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${profile.email}`, label: "Email" },
  ];

  function scrollToContact(e) {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    // min-h-screen + overflow-hidden keeps the entire hero in one viewport.
    // No child element leaks outside — scroll indicator is inside this wrapper.
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 pb-10
                 bg-gradient-to-br from-slate-50 via-white to-blue-50
                 dark:from-[#0b0f17] dark:via-slate-900 dark:to-[#0b0f17]
                 text-slate-900 dark:text-white overflow-hidden"
    >
      {/* ── Ambient background blobs ──────────────────────────────────────── */}
      <div className="absolute top-[-8%] left-[-4%] w-[380px] h-[380px] rounded-full
                      bg-blue-400/10 dark:bg-blue-600/10 blur-[100px]
                      pointer-events-none animate-blob-1" />
      <div className="absolute bottom-[-8%] right-[-4%] w-[320px] h-[320px] rounded-full
                      bg-purple-400/10 dark:bg-purple-600/10 blur-[100px]
                      pointer-events-none animate-blob-2" />
      <FloatingOrb className="w-56 h-56 bg-blue-400/5 dark:bg-blue-500/5 top-16 -left-28" delay={0} />
      <FloatingOrb className="w-48 h-48 bg-purple-400/5 dark:bg-purple-500/5 bottom-16 -right-20" delay={2} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left — text block */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
          >
            <motion.p
              variants={fadeInUp}
              className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-widest uppercase"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-2 text-gradient leading-tight"
            >
              {profile.name}
            </motion.h1>

            <motion.div variants={fadeInUp} className="mt-3 space-y-0.5">
              <p className="text-base md:text-lg font-medium text-slate-500 dark:text-slate-400">
                {profile.title}
              </p>
              <TypeAnimation
                sequence={[
                  "Frontend Developer",   2000,
                  "React Developer",      2000,
                  "Python Developer",     2000,
                  "Full Stack Developer", 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
                className="block text-lg md:text-xl font-bold text-gradient-blue"
              />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-4 text-slate-500 dark:text-slate-400 leading-7 max-w-lg text-sm md:text-base"
            >
              {profile.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mt-5">
              <Button as="a" href="#contact" variant="primary" size="md" onClick={scrollToContact}>
                Hire Me
              </Button>
              <Button as="a" href={CV} download variant="ghost" size="md">
                <HiArrowDownTray size={15} /> Download Resume
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeInUp} className="flex gap-4 mt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full
                             border border-slate-300 dark:border-slate-700
                             text-slate-500 dark:text-slate-400
                             hover:border-blue-500 hover:text-blue-500
                             dark:hover:border-blue-500 dark:hover:text-blue-400
                             hover:bg-blue-50 dark:hover:bg-blue-500/10
                             transition-all duration-300"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — avatar */}
          <motion.div
            className="flex justify-center"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/15 dark:bg-blue-500/20 blur-2xl"
                animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute -inset-4 rounded-full border-2 border-dashed
                             border-blue-400/20 dark:border-blue-500/25 animate-spin-slow" />
              <div className="absolute -inset-1.5 rounded-full border
                             border-blue-400/15 dark:border-blue-500/20" />

              <motion.img
                src={profileImage}
                alt={`${profile.name} — ${profile.role}`}
                className="relative w-56 h-56 md:w-64 md:h-64 object-cover rounded-full
                           border-4 border-blue-500 shadow-2xl shadow-blue-500/20"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              {/* Availability badge */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2
                           bg-white dark:bg-slate-800
                           border border-slate-200 dark:border-slate-700
                           rounded-full px-3 py-1 flex items-center gap-1.5
                           text-xs font-medium text-slate-600 dark:text-slate-300
                           shadow-lg whitespace-nowrap"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for hire
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll indicator — INSIDE the section + INSIDE max-w container ─
             Positioned absolute relative to the section (overflow:hidden parent)
             so it never creates a second scroll or bleeds outside.            */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2
                     hidden md:flex flex-col items-center gap-1.5 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <span className="text-slate-400 dark:text-slate-500 text-[10px] tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            className="w-4 h-7 border-2 border-slate-300 dark:border-slate-600
                       rounded-full flex justify-center pt-1"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <motion.div
              className="w-0.5 h-1 bg-blue-500 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
