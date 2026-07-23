import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

import navigation from "../../data/navigation";
import Logo from "../common/Logo/Logo";
import Button from "../common/Button/Button";
import CV from "../../assets/resume/CV.pdf";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);

      navigation.forEach((item) => {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);

        if (element) {
          const top = element.offsetTop - 100;
          const height = element.offsetHeight;

          if (window.scrollY >= top && window.scrollY < top + height) {
            setActiveSection(sectionId);
          }
        }
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        <nav className="hidden md:flex items-center gap-2">
          {navigation.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              className={`relative px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === item.href.substring(1) && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-500/40"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </motion.a>
          ))}
        </nav>

        <div className="hidden md:block">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              as="a"
              href={CV}
              download
              className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Resume
            </Button>
          </motion.div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-white p-1"
          >
            {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-2 p-6">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-300 hover:text-white hover:bg-slate-800"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.length * 0.05 }}
              >
                <Button
                  as="a"
                  href={CV}
                  download
                  onClick={handleNavClick}
                  className="w-full bg-blue-600 text-white mt-2"
                >
                  Resume
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
