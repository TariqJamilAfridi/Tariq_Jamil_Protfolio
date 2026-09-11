import { motion } from "framer-motion";

function Logo() {
  return (
    <motion.a
      href="#home"
      className="text-3xl font-extrabold tracking-wide"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-blue-500">T</span>
      <span className="text-white">J</span>
    </motion.a>
  );
}

export default Logo;
