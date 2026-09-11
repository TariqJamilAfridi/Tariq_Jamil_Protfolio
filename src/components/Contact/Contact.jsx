import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiCheckBadge, HiPaperAirplane } from "react-icons/hi2";
import profile from "../../data/profile";
import Button from "../common/Button/Button";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import {
  fadeInUp, fadeInLeft, fadeInRight,
  staggerContainer, defaultViewport,
} from "../../utils/animations";

const socialProof = [
  { icon: FaGithub,     label: "GitHub",    sub: "Open Source",    href: profile.github,   highlight: false },
  { icon: FaLinkedin,   label: "LinkedIn",  sub: "Connect with me", href: profile.linkedin, highlight: false },
  { icon: HiCheckBadge, label: "Available", sub: "For hire now",    href: null,             highlight: true  },
];

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(""); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
    // Clear error when user starts typing
    if (status === "error") setStatus("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) { 
      setStatus("error"); 
      setErrorMessage("Please fill in all required fields.");
      return; 
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log("EmailJS Config Check:");
      console.log("Service ID:", serviceId ? "✓ Set" : "✗ Missing");
      console.log("Template ID:", templateId ? "✓ Set" : "✗ Missing");
      console.log("Public Key:", publicKey ? "✓ Set" : "✗ Missing");

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey || 
          serviceId === 'YOUR_SERVICE_ID' || 
          templateId === 'YOUR_TEMPLATE_ID' || 
          publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error("EmailJS is not configured. Please add your credentials to the .env file and restart the dev server.");
      }

      // Template parameters that will be sent to your email
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: profile.email, // Your email address from profile.js
        subject: formData.subject || "Portfolio Contact Form",
        message: formData.message,
        to_name: profile.name || "Portfolio Owner",
      };

      console.log("Sending email with params:", {
        from_name: templateParams.from_name,
        from_email: templateParams.from_email,
        subject: templateParams.subject,
      });

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("EmailJS Response:", response);

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus(""), 5000);

    } catch (error) {
      console.error("EmailJS Error Details:", error);
      console.error("Error message:", error.message);
      console.error("Error text:", error.text);
      console.error("Error status:", error.status);
      setStatus("error");
      
      if (error.message && error.message.includes("not configured")) {
        setErrorMessage(error.message);
      } else if (error.status === 400) {
        setErrorMessage("Invalid configuration. Please check your EmailJS credentials in the .env file.");
      } else if (error.status === 412) {
        setErrorMessage("EmailJS service is not configured properly. Please verify your Service ID and Template ID.");
      } else if (error.text) {
        setErrorMessage(`Error: ${error.text}`);
      } else if (error.message) {
        setErrorMessage(`Error: ${error.message}`);
      } else {
        setErrorMessage("Failed to send message. Please check browser console for details.");
      }
    }
  }

  const contactInfo = [
    { icon: FaEnvelope,     label: "Email",     value: profile.email, href: `mailto:${profile.email}` },
    { icon: FaMapMarkerAlt, label: "Location",  value: profile.location },
    { icon: FaPhone,        label: "Available", value: "Open to Opportunities" },
  ];

  // Input classes — full light + dark mode coverage
  const inputBase =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 " +
    "bg-slate-100 dark:bg-slate-800 " +
    "border border-slate-200 dark:border-slate-700 " +
    "text-slate-900 dark:text-white " +
    "placeholder-slate-400 dark:placeholder-slate-500 " +
    "focus:border-blue-500 dark:focus:border-blue-500 " +
    "focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/20";

  return (
    <section id="contact"
      className="py-14 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.04),transparent_55%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle eyebrow="05. Contact" title="Contact Me"
          subtitle="Have a project in mind or want to connect? Let's talk!" />

        {/* ── Social proof strip ─────────────────────────────────────────── */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-10"
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={defaultViewport}>
          {socialProof.map(({ icon: Icon, label, sub, href, highlight }) => {
            const Tag = href ? "a" : "div";
            return (
              <motion.div key={label} variants={fadeInUp}>
                <Tag href={href ?? undefined}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noreferrer" : undefined}
                  className={[
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300",
                    href ? "cursor-pointer" : "cursor-default",
                    highlight
                      ? "border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 hover:border-emerald-400 dark:hover:border-emerald-400/60"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 hover:border-blue-400 dark:hover:border-blue-500/40",
                  ].join(" ")}>
                  <Icon size={18} className={
                    highlight ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"
                  } />
                  <div>
                    <p className={`text-sm font-semibold ${
                      highlight ? "text-emerald-700 dark:text-emerald-400" : "text-slate-800 dark:text-white"
                    }`}>{label}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{sub}</p>
                  </div>
                </Tag>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Main grid ─────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-5 gap-8">

          {/* Left — contact info */}
          <motion.div className="md:col-span-2 space-y-6"
            variants={fadeInLeft} initial="hidden" whileInView="visible"
            viewport={defaultViewport} transition={{ duration: 0.6 }}>
            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                Let&apos;s Connect
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                I&apos;m currently open to new opportunities and collaborations.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <motion.div className="space-y-4"
              variants={staggerContainer} initial="hidden"
              whileInView="visible" viewport={defaultViewport}>
              {contactInfo.map((item) => (
                <motion.div key={item.label} variants={fadeInUp}
                  className="flex items-center gap-3 group" whileHover={{ x: 5 }}>
                  <div className="p-2.5 rounded-xl transition-all duration-300
                                  bg-blue-50 dark:bg-blue-600/20
                                  text-blue-600 dark:text-blue-400
                                  group-hover:bg-blue-600 group-hover:text-white">
                    <item.icon size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href}
                        className="text-sm text-slate-700 dark:text-slate-300
                                   hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-700 dark:text-slate-300">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.form onSubmit={handleSubmit}
            className="md:col-span-3 space-y-4"
            variants={fadeInRight} initial="hidden" whileInView="visible"
            viewport={defaultViewport} transition={{ duration: 0.6 }}>

            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Your Name"
                value={formData.name} onChange={handleChange} required
                className={inputBase} />
              <input type="email" name="email" placeholder="Your Email"
                value={formData.email} onChange={handleChange} required
                className={inputBase} />
            </div>

            <input type="text" name="subject" placeholder="Subject"
              value={formData.subject} onChange={handleChange}
              className={inputBase} />

            {/* rows="4" keeps textarea compact in one scroll-view */}
            <textarea name="message" rows="4" placeholder="Write your message..."
              value={formData.message} onChange={handleChange} required
              className={`${inputBase} resize-none`} />

            <Button type="submit" variant="primary" size="md"
              className="w-full sm:w-auto"
              disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <HiPaperAirplane size={16} />
                  Send Message
                </>
              )}
            </Button>

            {status === "success" && (
              <motion.div 
                className="flex items-start gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30"
                initial={{ opacity: 0, y: -10, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}>
                <HiCheckBadge className="text-emerald-600 dark:text-emerald-400 text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">
                    Message sent successfully!
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-500 text-xs mt-0.5">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible!
                  </p>
                </div>
              </motion.div>
            )}
            
            {status === "error" && (
              <motion.div 
                className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30"
                initial={{ opacity: 0, y: -10, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}>
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-red-700 dark:text-red-400 text-sm">
                    Unable to send message
                  </p>
                  <p className="text-red-600 dark:text-red-500 text-xs mt-0.5">
                    {errorMessage || "Please check your input and try again."}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
