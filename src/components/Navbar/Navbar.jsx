import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { HiArrowDownTray } from "react-icons/hi2";

import navigation from "../../data/navigation";
import Logo from "../common/Logo/Logo";
import Button from "../common/Button/Button";
import ThemeToggle from "../common/ThemeToggle/ThemeToggle";
import CV from "../../assets/resume/CV.pdf";

function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // ── Track scroll position + active section ────────────────────────────────
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);

      navigation.forEach((item) => {
        const sectionId = item.href.substring(1);
        const el = document.getElementById(sectionId);
        if (el) {
          const top    = el.offsetTop - 100;
          const height = el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) {
            setActiveSection(sectionId);
          }
        }
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Smooth-scroll to anchor + close mobile menu ────────────────────────────
  function handleNavClick(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg shadow-black/30 border-b border-slate-800/60"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* ── Logo ─────────────────────────────────────────────────────────── */}
        <Logo />

        {/* ── Desktop nav links ─────────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated active pill */}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {/* Pulsing dot shown only on the active item */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse shrink-0" />
                  )}
                  {item.name}
                </span>
              </motion.a>
            );
          })}
        </nav>

        {/* ── Desktop CTA — ThemeToggle + Resume button ────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button
            as="a"
            href={CV}
            download
            variant="ghost"
            size="sm"
            aria-label="Download Resume PDF"
          >
            <HiArrowDownTray size={15} />
            Resume
          </Button>
        </div>

        {/* ── Mobile hamburger ─────────────────────────────────────────────── */}
        <button
          className="md:hidden text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-slate-900/97 backdrop-blur-md border-t border-slate-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col gap-1 p-6" aria-label="Mobile navigation">
              {navigation.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "text-gray-400 hover:text-white hover:bg-slate-800"
                    }`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.name}
                  </motion.a>
                );
              })}

              {/* Resume download — bottom of mobile menu */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.length * 0.05 }}
                className="pt-2"
              >
                <Button
                  as="a"
                  href={CV}
                  download
                  variant="ghost"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <HiArrowDownTray size={15} />
                  Download Resume
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
