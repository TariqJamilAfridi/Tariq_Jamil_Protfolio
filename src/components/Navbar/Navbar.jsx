import { useState, useEffect } from "react";
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

      const sections = ["home", "about", "skills", "projects", "contact"];

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (element) {
          const top = element.offsetTop - 100;
          const height = element.offsetHeight;

          if (window.scrollY >= top && window.scrollY < top + height) {
            setActiveSection(section);
          }
        }
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`transition-colors duration-300 ${
                activeSection === item.href.substring(1)
                  ? "text-blue-400 font-semibold"
                  : "text-white hover:text-blue-400"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Resume */}

        <div className="hidden md:block">
          <a href={CV} download>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Resume
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiOutlineX size={30} /> : <HiOutlineMenu size={30} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          <nav className="flex flex-col gap-6 p-6">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-blue-400"
              >
                {item.name}
              </a>
            ))}

            <a href={CV} download>
              <Button className="w-full bg-blue-600 text-white">Resume</Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
