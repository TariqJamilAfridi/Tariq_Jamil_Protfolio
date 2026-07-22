import projects from "../../data/projects";
import Button from "../common/Button/Button";

function Projects() {
  return (
    <section
      id="projects"
      className="py-24 bg-slate-950 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => (

            <div
              key={project.id}
              className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="h-56 bg-slate-700 flex items-center justify-center">

                Project Image

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="text-gray-400 mt-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">

                  {project.technologies.map((tech) => (

                    <span
                      key={tech}
                      className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

                <div className="flex gap-4 mt-8">

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      GitHub
                    </Button>
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                      Live Demo
                    </Button>
                  </a>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Projects;