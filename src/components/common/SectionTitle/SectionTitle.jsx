import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/animations";

function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <motion.div
        className="w-20 h-1 bg-blue-500 mx-auto mt-6 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}

export default SectionTitle;
