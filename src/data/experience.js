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
    title: "Bachelor of Engineering — CIS",
    subtitle: "NED University of Engineering & Technology",
    location: "Pakistan",
    date: "2022 — 2026",
    description:
      "Computer & Information System Engineering graduate. Coursework spans data structures, algorithms, software engineering, relational databases, and computer networks — the foundation behind every project I ship.",
    tags: ["Software Engineering","Web-development","Database","C++", "Python", "Data Structures", "Algorithms", "Networking"],
    isCurrent: false,
  },
  {
    id: 2,
    type: "work",
    side: "right",
    title: "Frontend Developer Intern",
    subtitle: "Decode Lab",
    location: "Pakistan",
    date: "2026",
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
    subtitle: "Local Market / Freelance · Self-Employed",
    location: "Remote",
    date: "2025 — Present",
    description:
      "Designing and delivering end-to-end web applications for clients — from e-commerce stores to Hospital appointment and to management dashboards. Sole owner of architecture, UI, and deployment across every project.",
    tags: ["React", "Javascript", "Bootstrap CSS", "Node.js", "MySQL","MongoDB","npm","HTML & CSS"],
    isCurrent: true,
  },
];

export default experience;
