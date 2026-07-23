import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
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
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function Hero() {
  const socialLinks = [
    { icon: FaGithub, href: profile.github, label: "GitHub" },
    { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
    >
      <FloatingOrb className="w-96 h-96 bg-blue-500/10 top-20 -left-48" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-purple-500/10 bottom-20 -right-32" delay={2} />
      <FloatingOrb className="w-64 h-64 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2" delay={4} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          >
            <motion.p
              variants={fadeInUp}
              className="text-blue-400 font-semibold text-lg tracking-wide"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mt-3 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              {profile.name}
            </motion.h1>

            <motion.div variants={fadeInUp} className="mt-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-300">
                {profile.title}
              </h2>

              <TypeAnimation
                sequence={[
                  "Frontend Developer",
                  2000,
                  "React Developer",
                  2000,
                  "Python Developer",
                  2000,
                  "Full Stack Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block mt-4 text-xl md:text-2xl font-bold text-blue-400"
              />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-gray-400 leading-8 max-w-lg"
            >
              {profile.description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-8">
              <Button
                as="a"
                href="#contact"
                className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Hire Me
              </Button>

              <Button
                as="a"
                href={CV}
                download
                className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5"
              >
                Download Resume
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-6 mt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noreferrer" : undefined}
                  aria-label={label}
                  className="text-3xl text-gray-400 hover:text-blue-400"
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-blue-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.img
                src={profileImage}
                alt={profile.name}
                className="relative w-72 h-72 md:w-80 md:h-80 object-cover rounded-full border-4 border-blue-500 shadow-2xl shadow-blue-500/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-gray-500 text-sm">Scroll Down</span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
