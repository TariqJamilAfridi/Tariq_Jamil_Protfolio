import { motion } from "framer-motion";
import { HiArrowDownTray } from "react-icons/hi2";

import profileImage from "../../assets/images/Profile.jpeg";
import CV from "../../assets/resume/CV.pdf";
import profile from "../../data/profile";
import Button from "../common/Button/Button";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import {
  fadeInLeft,
  fadeInUp,
  staggerContainer,
  defaultViewport,
} from "../../utils/animations";

// ── Personal detail rows shown in the info grid ───────────────────────────────
const details = [
  { label: "Name",       value: profile.name },
  { label: "Email",      value: profile.email },
  { label: "Degree",     value: profile.degree },
  { label: "Location",   value: profile.location },
  { label: "Experience", value: profile.experience },
  { label: "Role",       value: profile.role },
];

// ── Stat cards — all values are concrete & measurable ────────────────────────
const stats = [
  {
    value: profile.stats.projects,
    label: "Projects Built",
    icon: "🚀",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    value: profile.stats.technologies,
    label: "Tech Stack Mastered",
    icon: "⚡",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    value: profile.stats.satisfaction,
    label: profile.stats.satisfactionLabel,
    icon: "🎯",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

function About() {
  return (
    <section id="about" className="py-24 bg-[#0b0f17] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="01. About"
          title="About Me"
          subtitle="Get to know more about my background and journey"
        />

        {/* ── Two-column layout: image left, text right ────────────────────── */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* ── Profile image card ─────────────────────────────────────────── */}
          <motion.div
            className="flex justify-center"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            transition={{ duration: 0.7 }}
          >
            {/*
              Sleek card wrapper:
              • Fixed aspect-ratio square so no awkward whitespace
              • Crisp rounded-2xl border matching the dark theme
              • Subtle blue glow on hover via the blurred pseudo-element
            */}
            <div className="relative group w-full max-w-sm">
              {/* Hover glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20
                              rounded-3xl blur-xl opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none" />

              {/* Card shell */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800
                              bg-slate-900 shadow-2xl">
                {/* 1:1 aspect ratio wrapper — eliminates the "awkward white space" bug */}
                <div className="aspect-square w-full">
                  <motion.img
                    src={profileImage}
                    alt={`${profile.name} — ${profile.role}`}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </div>

                {/* Bottom name strip */}
                <div className="px-5 py-4 bg-slate-900/90 backdrop-blur-sm
                                border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{profile.name}</p>
                    <p className="text-blue-400 text-xs mt-0.5">{profile.role}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400
                                   bg-emerald-400/10 border border-emerald-400/20
                                   px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Text + detail grid ─────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-6">
              Who am I?
            </motion.h3>

            <motion.p variants={fadeInUp} className="text-slate-400 leading-8">
              {profile.about}
            </motion.p>

            {/* Detail grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4 mt-10"
            >
              {details.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  className="bg-slate-900/60 p-4 rounded-xl border border-slate-800
                             hover:border-blue-500/40 transition-colors duration-300"
                  whileHover={{ y: -3 }}
                >
                  <p className="font-semibold text-blue-400 text-xs uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-slate-300 mt-1 text-sm leading-snug">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/*
              Single "Download CV" CTA — ghost variant so it doesn't compete
              visually with the primary "Hire Me" in the Hero section above.
            */}
            <motion.div variants={fadeInUp} className="mt-10">
              <Button
                as="a"
                href={CV}
                download
                variant="ghost"
                size="lg"
                aria-label="Download CV as PDF"
              >
                <HiArrowDownTray size={17} />
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stat cards row ────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className={`text-center p-8 rounded-2xl border ${stat.border} ${stat.bg}
                          hover:border-blue-500/50 transition-all duration-300`}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <motion.p
                className={`text-5xl font-extrabold ${stat.color}`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-slate-400 mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
