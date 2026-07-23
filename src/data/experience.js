/**
 * Timeline entries — strictly chronological, oldest → newest.
 * `side` drives the zigzag layout (left | right).
 * `isCurrent` elevates the card visually as the narrative climax.
 * `type` determines the colour family: "education" → blue, "work" → purple.
 */
const experience = [
  {
    id: 1,
    type: "education",
    side: "left",
    title: "Bachelor of Engineering — CISE",
    subtitle: "University of Engineering & Technology",
    location: "Pakistan",
    date: "2021 — Present",
    description:
      "Final-year Computer & Information System Engineering student. Coursework spans data structures, algorithms, software engineering, relational databases, and computer networks — building the theoretical foundation behind every project I ship.",
    tags: ["C++", "Python", "Data Structures", "Algorithms", "Networking"],
    isCurrent: false,
  },
  {
    id: 2,
    type: "work",
    side: "right",
    title: "Frontend Developer Intern",
    subtitle: "Tech Startup",
    location: "Pakistan",
    date: "2023",
    description:
      "Built responsive UI components, improved page load performance, and collaborated directly with the design team to turn Figma mockups into pixel-perfect, accessible layouts using React and CSS.",
    tags: ["React", "JavaScript", "CSS", "Figma"],
    isCurrent: false,
  },
  {
    id: 3,
    type: "work",
    side: "left",
    title: "Full Stack Developer",
    subtitle: "Freelance · Self-Employed",
    location: "Remote",
    date: "2023 — Present",
    description:
      "Designing and delivering end-to-end web applications for clients — from e-commerce stores to management dashboards. Sole owner of architecture, UI, and deployment across every project.",
    tags: ["React", "Python", "Tailwind CSS", "Django", "MySQL"],
    isCurrent: true,
  },
];

export default experience;
