import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";
import CursorSpotlight from "./components/common/CursorSpotlight/CursorSpotlight";
import Preloader from "./components/common/Preloader/Preloader";

// Section fade-up transition variant
const sectionVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function AnimatedSection({ children }) {
  return (
    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  // Dismiss preloader after 2 s — matches the CSS loader-bar animation duration
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Preloader (unmounts after 2 s via AnimatePresence exit) ──────── */}
      <AnimatePresence>
        {loading && <Preloader visible={loading} key="preloader" />}
      </AnimatePresence>

      {/* ── Cursor spotlight (desktop only) ─────────────────────────────── */}
      <CursorSpotlight />

      <div className="font-[Inter,system-ui,sans-serif] antialiased overflow-x-hidden">
        <Navbar />

        <main id="main-content">
          {/* Hero gets no wrapper — it fills the full viewport height itself */}
          <Hero />

          {/* Every section below fades + slides up as it enters the viewport */}
          <AnimatedSection><About /></AnimatedSection>
          <AnimatedSection><Skills /></AnimatedSection>
          <AnimatedSection><Experience /></AnimatedSection>
          <AnimatedSection><Projects /></AnimatedSection>
          <AnimatedSection><Contact /></AnimatedSection>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
