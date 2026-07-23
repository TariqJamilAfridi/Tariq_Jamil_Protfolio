import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader — full-screen intro animation shown once on mount.
 * Parent controls visibility via the `visible` prop.
 * After ~2 s the parent sets visible=false, triggering the exit animation.
 */
function Preloader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center
                     bg-[#0b0f17]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated logo mark */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            {/* Outer ring pulse */}
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-blue-500/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/40
                            flex items-center justify-center backdrop-blur-sm">
              <span className="text-4xl font-extrabold tracking-tight">
                <span className="text-blue-400">T</span>
                <span className="text-white">J</span>
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.p
            className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Loading Portfolio
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500
                            rounded-full animate-loader-bar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
