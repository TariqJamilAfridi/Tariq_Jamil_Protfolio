import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import profile from "../../data/profile";
import profileImage from "../../assets/images/Profile.jpeg";
import CV from "../../assets/resume/CV.pdf";

import Button from "../common/Button/Button";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto w-full px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-blue-400 font-semibold text-lg">Hello, I'm</p>

            <h1 className="text-6xl font-bold mt-3">{profile.name}</h1>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-300">
                {profile.title}
              </h2>

              <TypeAnimation
                sequence={[
                  "Frontend Developer",
                  2000,
                  "React Developer",
                  2000,
                  "Python Developer",
                  2000,
                  "Full Stack Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="block mt-4 text-2xl font-bold text-blue-400"
              />
            </div>

            <p className="mt-6 text-gray-400 leading-8">
              {profile.description}
            </p>

            {/* Buttons */}

            <div className="flex gap-4 mt-8">
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Hire Me
              </Button>

              <a href={CV} download>
                <Button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Download Resume
                </Button>
              </a>
            </div>

            {/* Social Icons */}

            <div className="flex gap-6 mt-8 text-3xl">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <FaGithub className="hover:text-blue-500 transition" />
              </a>

              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin className="hover:text-blue-500 transition" />
              </a>

              <a href={`mailto:${profile.email}`}>
                <FaEnvelope className="hover:text-blue-500 transition" />
              </a>
            </div>
          </motion.div>

          {/* Right Side */}

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={profileImage}
              alt="Tariq Jamil"
              className="w-80 h-80 object-cover rounded-full border-4 border-blue-500 shadow-2xl hover:scale-105 transition duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
