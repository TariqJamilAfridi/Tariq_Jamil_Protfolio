import { motion } from "framer-motion";
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

const details = [
  { label: "Name", value: profile.name },
  { label: "Email", value: profile.email },
  { label: "Degree", value: profile.degree },
  { label: "Location", value: profile.location },
  { label: "Experience", value: profile.experience },
  { label: "Role", value: profile.role },
];

const stats = [
  { value: profile.stats.projects, label: "Projects Completed" },
  { value: profile.stats.technologies, label: "Technologies" },
  { value: profile.stats.dedication, label: "Dedication" },
];

function About() {
  return (
    <section id="about" className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="About Me"
          subtitle="Get to know more about my background and journey"
        />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="flex justify-center"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            transition={{ duration: 0.7 }}
          >
            <div className="relative group">
              <motion.div
                className="absolute -inset-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500"
              />
              <motion.img
                src={profileImage}
                alt={profile.name}
                className="relative w-full max-w-md rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.h3
              variants={fadeInUp}
              className="text-3xl font-bold mb-6"
            >
              Who am I?
            </motion.h3>

            <motion.p
              variants={fadeInUp}
              className="text-gray-400 leading-8"
            >
              {profile.about}
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-6 mt-10"
            >
              {details.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-colors duration-300"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <p className="font-bold text-blue-400 text-sm">{item.label}</p>
                  <p className="text-gray-300 mt-1">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10">
              <Button
                as="a"
                href={CV}
                download
                className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <motion.p
                className="text-4xl md:text-5xl font-bold text-blue-400"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
