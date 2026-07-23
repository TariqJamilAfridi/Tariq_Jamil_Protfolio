// Each skill: { name, icon, level }
// icon  → Simple Icons slug (matched in skillIcons.js)
// level → proficiency 0–100 (drives the animated progress bar in Skills.jsx)
const skills = {
  frontend: [
    { name: "HTML5",        icon: "html5",          level: 95 },
    { name: "CSS3",         icon: "css3",           level: 90 },
    { name: "JavaScript",   icon: "javascript",     level: 85 },
    { name: "React",        icon: "react",          level: 80 },
    { name: "Tailwind CSS", icon: "tailwindcss",    level: 88 },
    { name: "Bootstrap",    icon: "bootstrap",      level: 75 },
  ],
  backend: [
    { name: "Python",       icon: "python",         level: 82 },
    { name: "Django",       icon: "django",         level: 70 },
    { name: "Flask",        icon: "flask",          level: 65 },
  ],
  database: [
    { name: "MySQL",        icon: "mysql",          level: 78 },
    { name: "SQL Server",   icon: "microsoftsqlserver", level: 65 },
  ],
  tools: [
    { name: "Git",          icon: "git",            level: 85 },
    { name: "GitHub",       icon: "github",         level: 88 },
    { name: "VS Code",      icon: "visualstudiocode", level: 95 },
    { name: "Postman",      icon: "postman",        level: 72 },
  ],
};

export default skills;
