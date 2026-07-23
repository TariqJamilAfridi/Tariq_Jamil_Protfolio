import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import profile from "../../data/profile";
import Button from "../common/Button/Button";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  defaultViewport,
} from "../../utils/animations";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`;
    const subject = encodeURIComponent(formData.subject || "Portfolio Contact");
    const mailtoLink = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  }

  const contactInfo = [
    { icon: FaEnvelope, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: FaMapMarkerAlt, label: "Location", value: profile.location },
    { icon: FaPhone, label: "Available", value: "Open to Opportunities" },
  ];

  const inputClasses =
    "w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-500";

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Contact Me"
          subtitle="Have a project in mind or want to connect? Let's talk!"
        />

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            className="md:col-span-2 space-y-8"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            transition={{ duration: 0.7 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Let&apos;s Connect</h3>
              <p className="text-gray-400 leading-relaxed">
                I&apos;m currently open to new opportunities and collaborations.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeInUp}
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 8 }}
                >
                  <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-300">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-6"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`${inputClasses} resize-none`}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </motion.div>

              {status === "success" && (
                <motion.p
                  className="text-green-400 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Opening your email client... Thank you for reaching out!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  className="text-red-400 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Please fill in all required fields.
                </motion.p>
              )}
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
