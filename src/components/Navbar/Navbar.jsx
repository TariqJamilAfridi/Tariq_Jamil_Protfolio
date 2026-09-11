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
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
      
      // Find the current section based on scroll position
      // Iterate in reverse so the topmost visible section wins
      let currentSection = "home"; // Default to home
      
      for (let i = navigation.length - 1; i >= 0; i--) {
        const item = navigation[i];
        const el = document.getElementById(item.href.substring(1));
        if (el) {
          const rect = el.getBoundingClientRect();
          // Section is considered active if its top is above the middle of viewport
          if (rect.top <= window.innerHeight / 2) {
            currentSection = item.href.substring(1);
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    }
    
    // Call immediately on mount to set initial state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleNavClick(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md " +
            "shadow-sm shadow-slate-200/60 dark:shadow-black/30 " +
            "border-b border-slate-200/80 dark:border-slate-800/60"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">

        {/* Logo */}
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <motion.a key={item.id} href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-4 py-2 rounded-full text-sm font-medium
                             transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}>
                {isActive && (
                  <motion.span layoutId="activeNav"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse shrink-0" />
                  )}
                  {item.name}
                </span>
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          <Button as="a" href={CV} download variant="ghost" size="sm">
            <HiArrowDownTray size={14} /> Resume
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-lg
                     text-slate-600 dark:text-white
                     hover:bg-slate-100 dark:hover:bg-slate-800
                     transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu">
          {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-menu"
            className="md:hidden bg-white/97 dark:bg-slate-900/97
                       backdrop-blur-md border-t border-slate-200 dark:border-slate-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}>
            <nav className="flex flex-col gap-1 p-5" aria-label="Mobile navigation">
              {navigation.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a key={item.id} href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}>
                    {item.name}
                  </motion.a>
                );
              })}
              <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.length * 0.04 }} className="pt-2">
                <Button as="a" href={CV} download variant="ghost" className="w-full"
                  onClick={() => setMenuOpen(false)}>
                  <HiArrowDownTray size={14} /> Download Resume
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
