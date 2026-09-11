// level → proficiency 8–10 (random, shown as n/10 in the badge bar)
const skills = {
  frontend: [
    { name: "HTML",        icon: "html5",      level: 10 },
    { name: "CSS",         icon: "css3",       level: 9  },
    { name: "Bootstrap",   icon: "bootstrap",  level: 9  },
    { name: "JavaScript",  icon: "javascript", level: 9  },
    { name: "React",       icon: "react",      level: 9  },
  ],
  backend: [
    { name: "Node.js",     icon: "nodedotjs",  level: 8  },
    { name: "NPM",         icon: "npm",        level: 9  },
    { name: "Python",      icon: "python",     level: 9  },
  ],
  database: [
    { name: "MongoDB",     icon: "mongodb",    level: 8  },
    { name: "SQL",         icon: "mysql",      level: 8  },
    { name: "PostgreSQL",  icon: "postgresql", level: 8  },
  ],
  aiml: [
    { name: "Computer Vision",  icon: "opencv",      level: 8  },
    { name: "Machine Learning", icon: "scikitlearn", level: 8  },
    { name: "AI / Deep Learning", icon: "ai",        level: 8  },
  ],
};

export default skills;
