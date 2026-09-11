import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../utils/animations";
import Button from "../components/common/Button/Button";

const lines = [
  { ln: "01", code: "const page = findRoute(window.location.pathname);", highlight: false },
  { ln: "02", code: "// 🔍 Searching...", highlight: false },
  { ln: "03", code: "if (!page) {", highlight: false },
  { ln: "04", code: '  throw new Error("404 — Page not found");', highlight: true },
  { ln: "05", code: "}", highlight: false },
];

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-white flex items-center justify-center px-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.06),transparent_60%)]" />

      <motion.div
        className="relative z-10 max-w-2xl w-full text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Big 404 */}
        <motion.div variants={fadeInUp} className="relative mb-8">
          <p className="text-[10rem] font-extrabold leading-none select-none
                        text-transparent bg-clip-text
                        bg-gradient-to-b from-slate-700 to-slate-900">
            404
          </p>
          <p className="absolute inset-0 flex items-center justify-center
                        text-[10rem] font-extrabold leading-none select-none
                        text-transparent bg-clip-text
                        bg-gradient-to-b from-blue-400/30 to-transparent
                        blur-sm">
            404
          </p>
        </motion.div>

        {/* Terminal code block */}
        <motion.div
          variants={fadeInUp}
          className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden
                     text-left mb-10 shadow-2xl"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-slate-500 font-mono">router.js</span>
          </div>
          <div className="p-5 font-mono text-sm space-y-1">
            {lines.map(({ ln, code, highlight }) => (
              <div
                key={ln}
                className={`flex gap-4 ${
                  highlight ? "bg-red-500/10 -mx-5 px-5 py-0.5 rounded" : ""
                }`}
              >
                <span className="text-slate-600 select-none w-5 shrink-0">{ln}</span>
                <span className={highlight ? "text-red-400" : "text-slate-300"}>
                  {code}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-2xl font-bold mb-3">
          Oops — this route doesn&apos;t exist
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-slate-400 mb-8">
          Looks like you navigated to an undefined page. Head back home.
        </motion.p>

        <motion.div variants={fadeInUp}>
          <Button
            as="a"
            href="/"
            variant="primary"
            size="lg"
          >
            ← Back to Portfolio
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;
