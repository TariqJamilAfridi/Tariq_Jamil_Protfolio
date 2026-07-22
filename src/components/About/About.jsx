import profileImage from "../../assets/images/Profile.jpeg";
import CV from "../../assets/resume/CV.pdf";
import Button from "../common/Button/Button";

function About() {
  return (
    <section
      id="about"
      className="py-24 bg-slate-950 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div className="flex justify-center">

            <img
              src={profileImage}
              alt="Profile"
              className="w-96 rounded-2xl shadow-2xl"
            />

          </div>

          {/* Right Side */}

          <div>

            <h3 className="text-3xl font-bold mb-6">
              Who am I?
            </h3>

            <p className="text-gray-400 leading-8">
              I am a Final Year Computer & Information System
              Engineering student with a passion for creating
              modern, responsive and user-friendly web
              applications using React, JavaScript, Tailwind CSS
              and Python.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div>
                <p className="font-bold">Name</p>
                <p className="text-gray-400">
                  Tariq Jamil
                </p>
              </div>

              <div>
                <p className="font-bold">Email</p>
                <p className="text-gray-400">
                  your-email@gmail.com
                </p>
              </div>

              <div>
                <p className="font-bold">Degree</p>
                <p className="text-gray-400">
                  CISE
                </p>
              </div>

              <div>
                <p className="font-bold">Experience</p>
                <p className="text-gray-400">
                  Frontend Projects
                </p>
              </div>

            </div>

            <div className="mt-10">

              <a href={CV} download>

                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Download CV
                </Button>

              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;