import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import profile from "../../data/profile";
import { fadeInUp } from "../../utils/animations";

function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: profile.github, label: "GitHub" },
    { icon: FaLinkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: FaEnvelope, href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <motion.div
        className="max-w-7xl mx-auto px-6 py-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-extrabold tracking-wide">
              <span className="text-blue-500">T</span>
              <span className="text-white">J</span>
            </a>
            <p className="text-gray-400 mt-2 text-sm">
              Building modern web experiences with passion.
            </p>
          </div>

          <div className="flex gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noreferrer" : undefined}
                aria-label={label}
                className="text-2xl text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-500 text-sm flex flex-col sm:flex-row items-center justify-center gap-1">
          <span>&copy; {year} {profile.name}. All rights reserved.</span>
          <span className="hidden sm:inline mx-2">|</span>
          <span className="flex items-center gap-1">
            Made with <FaHeart className="text-red-500 animate-pulse" /> using React & Tailwind
          </span>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
