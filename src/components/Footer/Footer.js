import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import profile from "../../data/profile";
import navigation from "../../data/navigation";
import { fadeInUp } from "../../utils/animations";

function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub,   href: profile.github,            label: "GitHub",   external: true },
    { icon: FaLinkedin, href: profile.linkedin,          label: "LinkedIn", external: true },
    { icon: FaEnvelope, href: `mailto:${profile.email}`, label: "Email",    external: false },
  ];

  // Smooth scroll helper matching the Navbar pattern
  function handleNavClick(e, href) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      {/* Top divider glow line */}
      <div className="section-divider" />

      <motion.div
        className="max-w-7xl mx-auto px-6 py-14"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {/* ── Three-column layout ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-slate-800">

          {/* Brand block */}
          <div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="inline-flex items-center gap-1 text-2xl font-extrabold tracking-wide"
              aria-label="Back to top"
            >
              <span className="text-blue-500">T</span>
              <span className="text-white">J</span>
            </a>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed max-w-xs">
              Building clean, performant web experiences with React, Python, and a
              focus on excellent user experience.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest
                           text-slate-500 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-slate-400 hover:text-blue-400
                               transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest
                           text-slate-500 mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                             border border-slate-700 text-slate-400
                             hover:border-blue-500 hover:text-blue-400
                             hover:bg-blue-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-slate-400 mt-4">
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-blue-400 transition-colors duration-200"
              >
                {profile.email}
              </a>
            </p>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between
                        gap-3 text-xs text-slate-500">
          <span>&copy; {year} {profile.name}. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Made with{" "}
            <FaHeart className="text-red-500 animate-pulse" size={11} />{" "}
            using React &amp; Tailwind CSS
          </span>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
