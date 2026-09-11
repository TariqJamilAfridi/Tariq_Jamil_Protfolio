import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/animations";

function SectionTitle({ title, subtitle, eyebrow }) {
  return (
    <motion.div className="text-center mb-10"
      variants={fadeInUp} initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>

      {eyebrow && (
        <span className="inline-block mb-2.5 text-xs font-semibold tracking-widest uppercase
                         text-blue-600 dark:text-blue-400
                         bg-blue-50 dark:bg-blue-500/10
                         border border-blue-200 dark:border-blue-500/20
                         px-3 py-1 rounded-full">
          {eyebrow}
        </span>
      )}

      {/* text-gradient works for both themes via global.css overrides */}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm md:text-base
                      max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      <div className="flex justify-center mt-4">
        <motion.div
          className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }} />
      </div>
    </motion.div>
  );
}

export default SectionTitle;
