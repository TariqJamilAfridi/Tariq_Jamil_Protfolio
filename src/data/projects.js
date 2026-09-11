import inotebookImage from "../assets/images/iNotebook.png";
import newsbeats from "../assets/images/newsbeats.png";
import textUtils from "../assets/images/text_utils.png";

const projects = [
  {
    id: 1,
    title: "iNotebook Cloud",
    description:
      "A cloud notebook where users create a free account and privately add, edit, search, and delete notes — including voice input — with data stored securely in MongoDB.",
    gradient: "from-emerald-600 to-teal-800",
    image: inotebookImage,
    technologies: ["React", "Node.js", "MongoDB", "Bootstrap", "Express"],
    github: "https://github.com/TariqJamilAfridi/iNotebook",
    demo: "https://takeyournoteininotebook.vercel.app/login",
    featured: true,
  },
  {
    id: 2,
    title: "News Beats",
    description:
      "A live news reader that pulls daily headlines by category — Business, Sports, Entertainment, Health, Science, and Technology — with a search bar for quick lookup.",
    gradient: "from-violet-600 to-purple-800",
    image: newsbeats,
    technologies: ["React", "JavaScript", "Bootstrap", "Vite"],
    github: "https://github.com/TariqJamilAfridi/News_Website",
    demo: "https://news-beats-website.vercel.app/",
    featured: false,
  },
  {
    id: 3,
    title: "Text Utils",
    description:
      "A text toolbox for case conversion, copy, download, reverse, extra-space cleanup, find-and-replace, plus word, character, and reading-time counts.",
    gradient: "from-blue-600 to-indigo-800",
    image: textUtils,
    technologies: ["React", "JavaScript", "Bootstrap"],
    github: "https://github.com/TariqJamilAfridi/Text_Utility_Tool",
    demo: "https://textutilitytoolforenglishstandard.vercel.app/",
    featured: false,
  },
];

export default projects;
