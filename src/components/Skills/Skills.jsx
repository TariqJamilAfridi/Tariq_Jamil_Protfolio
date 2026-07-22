import skills from "../../data/skills";

function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Technical Skills
        </h2>

        {/* Frontend */}

        <div className="mb-12">

          <h3 className="text-2xl font-semibold mb-6 text-blue-400">
            Frontend Development
          </h3>

          <div className="flex flex-wrap gap-4">

            {skills.frontend.map((skill) => (
              <div
                key={skill}
                className="bg-slate-800 px-6 py-3 rounded-xl hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                {skill}
              </div>
            ))}

          </div>

        </div>

        {/* Backend */}

        <div className="mb-12">

          <h3 className="text-2xl font-semibold mb-6 text-blue-400">
            Backend Development
          </h3>

          <div className="flex flex-wrap gap-4">

            {skills.backend.map((skill) => (
              <div
                key={skill}
                className="bg-slate-800 px-6 py-3 rounded-xl hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                {skill}
              </div>
            ))}

          </div>

        </div>

        {/* Database */}

        <div className="mb-12">

          <h3 className="text-2xl font-semibold mb-6 text-blue-400">
            Database
          </h3>

          <div className="flex flex-wrap gap-4">

            {skills.database.map((skill) => (
              <div
                key={skill}
                className="bg-slate-800 px-6 py-3 rounded-xl hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                {skill}
              </div>
            ))}

          </div>

        </div>

        {/* Tools */}

        <div>

          <h3 className="text-2xl font-semibold mb-6 text-blue-400">
            Tools
          </h3>

          <div className="flex flex-wrap gap-4">

            {skills.tools.map((skill) => (
              <div
                key={skill}
                className="bg-slate-800 px-6 py-3 rounded-xl hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                {skill}
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Skills;