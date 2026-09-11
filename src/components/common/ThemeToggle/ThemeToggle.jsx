import { motion } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi2";
import { useTheme } from "../../../context/ThemeContext";

/**
 * ThemeToggle — animated sun/moon icon button.
 * Placed in the Navbar beside the Resume button.
 */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center rounded-lg
                 border border-slate-700 text-slate-400
                 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10
                 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <HiSun size={17} /> : <HiMoon size={17} />}
      </motion.span>
    </motion.button>
  );
}

export default ThemeToggle;
