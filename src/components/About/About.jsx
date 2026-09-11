import { motion } from "framer-motion";
import { HiArrowDownTray, HiEye } from "react-icons/hi2";

import profileImage from "../../assets/images/Profile.jpeg";
import CV from "../../assets/resume/CV.pdf";
import profile from "../../data/profile";
import Button from "../common/Button/Button";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import { fadeInLeft, fadeInUp, staggerContainer, defaultViewport } from "../../utils/animations";

const details = [
  { label: "Name",       value: profile.name },
  { label: "Email",      value: profile.email },
  { label: "Degree",     value: profile.degree },
  { label: "Location",   value: profile.location },
  { label: "Experience", value: profile.experience },
  { label: "Role",       value: profile.role },
];

const stats = [
  { value: profile.stats.projects,     label: "Projects Built",       icon: "🚀",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-500/20" },
  { value: profile.stats.technologies, label: "Tech Stack Mastered",  icon: "⚡",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-500/10",
    border: "border-purple-200 dark:border-purple-500/20" },
  { value: profile.stats.satisfaction, label: profile.stats.satisfactionLabel, icon: "🎯",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20" },
];

function About() {
  return (
    <section id="about"
      className="py-14 bg-white dark:bg-[#0b0f17] text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="01. About" title="About Me"
          subtitle="Get to know more about my background and journey" />

        {/* Two-column — tighter gap-10 */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Image card — max-w-xs to keep it compact */}
          <motion.div className="flex justify-center"
            variants={fadeInLeft} initial="hidden" whileInView="visible"
            viewport={defaultViewport} transition={{ duration: 0.6 }}>
            <div className="relative group w-full max-w-xs">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/15 to-purple-500/15
                              rounded-2xl blur-lg opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden
                             border border-slate-200 dark:border-slate-800
                             bg-white dark:bg-slate-900 shadow-xl">
                {/* Constrained aspect ratio */}
                <div className="aspect-[4/3] w-full">
                  <motion.img src={profileImage} alt={profile.name}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }} />
                </div>
                <div className="px-4 py-3 bg-white dark:bg-slate-900/90
                               border-t border-slate-100 dark:border-slate-800
                               flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{profile.name}</p>
                    <p className="text-blue-600 dark:text-blue-400 text-xs mt-0.5">{profile.role}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400
                                   bg-emerald-50 dark:bg-emerald-400/10
                                   border border-emerald-200 dark:border-emerald-400/20
                                   px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text + detail grid */}
          <motion.div variants={staggerContainer} initial="hidden"
            whileInView="visible" viewport={defaultViewport}>
            <motion.h3 variants={fadeInUp}
              className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
              Who am I?
            </motion.h3>
            <motion.p variants={fadeInUp}
              className="text-slate-500 dark:text-slate-400 leading-7 text-sm">
              {profile.about}
            </motion.p>

            {/* Detail grid — compact p-3, gap-3 */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3 mt-6">
              {details.map((item) => (
                <motion.div key={item.label} variants={fadeInUp}
                  className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl
                             border border-slate-200 dark:border-slate-800
                             hover:border-blue-400 dark:hover:border-blue-500/40
                             transition-colors duration-300"
                  whileHover={{ y: -2 }}>
                  <p className="font-semibold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5 text-xs leading-snug">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6">
              <Button as="a" href={CV} target="_blank" rel="noopener noreferrer" variant="ghost" size="md">
                <HiEye size={15} /> View Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stat cards — compact p-5, mt-10 */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10"
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={defaultViewport}>
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}
              className={`text-center p-5 rounded-2xl border ${stat.border} ${stat.bg}
                          hover:border-blue-400 dark:hover:border-blue-500/50
                          transition-all duration-300`}
              whileHover={{ y: -4, scale: 1.02 }}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <motion.p className={`text-4xl font-extrabold ${stat.color}`}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
                {stat.value}
              </motion.p>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
