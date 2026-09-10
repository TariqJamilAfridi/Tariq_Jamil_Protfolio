import { motion } from "framer-motion";
import { fadeInUp } from "../../../utils/animations";

/**
 * SectionTitle — consistent heading block used across all sections.
 * • Animated underline bar grows from 0 → 80px on scroll-entry
 * • Subtle eyebrow chip added when `eyebrow` prop is supplied
 * • Tighter letter-spacing on the subtitle for a refined typographic rhythm
 */
function SectionTitle({ title, subtitle, eyebrow }) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      {/* Optional eyebrow label — e.g. "01. About" */}
      {eyebrow && (
        <span className="inline-block mb-3 text-xs font-semibold tracking-widest
                         uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20
                         px-3 py-1 rounded-full">
          {eyebrow}
        </span>
      )}

      {/* Main heading — uses the global text-gradient helper */}
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-400 mt-4 text-base md:text-lg max-w-2xl mx-auto
                      leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Animated underline — grows from centre */}
      <div className="flex justify-center mt-6">
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default SectionTitle;
