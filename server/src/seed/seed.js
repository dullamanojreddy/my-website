require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const { connectDB, getMongoUri } = require("../config/db");
const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Qualification = require("../models/Qualification");
const Certificate = require("../models/Certificate");

const destroy = process.argv.includes("--destroy");

const seedData = {
  profile: {
    name: "Dulla Manoj Reddy",
    role: "Full Stack Developer",
    tagline: "I build responsive, user-first web applications with modern stacks.",
    email: "dullamanojreddy@gmail.com",
    mobile: "9966007804",
    about: [
      "I am a passionate Full Stack Developer currently pursuing my B.E. in Information Technology in Vasavi College of Engineering.",
      "I enjoy solving real-world problems through code and continuously improving my technical skills.",
      "I am highly interested in web development, data structures, and building efficient applications.",
      "I am a quick learner and always eager to explore new technologies and frameworks."
    ],
    photoPath: "/assets/myphoto.jpg"
  },
  skills: [
    { name: "Full Stack Development", proficiency: 90, icon: "stack", category: "Development", points: ["React.js", "Node.js", "Express.js", "REST APIs"] },
    { name: "Java", proficiency: 85, icon: "java", category: "Programming", points: ["Core Java", "OOP Concepts", "Collections", "Exception Handling"] },
    { name: "Python", proficiency: 80, icon: "python", category: "Programming", points: ["Core Python", "AI & ML Development", "Automation", "API Development"] },
    { name: "C", proficiency: 78, icon: "code", category: "Programming", points: ["Problem Solving", "Algorithms", "Memory Management", "System Programming"] },
    { name: "DBMS", proficiency: 82, icon: "database", category: "Database", points: ["MySQL", "Query Optimization", "Normalization", "Database Design"] }
  ],
  projects: [
    {
      title: "Sutra - Smart Campus Multi-Agent AI",
      description: "Smart Campus Multi-Agent AI System — winning project of Agent X Hackathon by HackerEarth in our college.",
      techStack: ["Python", "FastAPI", "Multi-Agent AI", "React", "LLMs"],
      featured: true,
      githubUrl: "https://github.com/dullamanojreddy/sutra",
      emoji: "🏆"
    },
    {
      title: "NyayAI - AI Courtroom Simulator",
      description: "AI-powered legal simulation platform modeling courtroom argument flows, witness examination, and verdict reasoning using LLMs.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "OpenAI API"],
      featured: true,
      githubUrl: "https://github.com/dullamanojreddy/NyayAI-AI-Courtroom-Simulator",
      emoji: "⚖️"
    },
    {
      title: "Personal Portfolio Website",
      description: "Cinematic aurora-themed full-stack portfolio with dynamic animations, interactive skill badges, and route-level performance optimization.",
      techStack: ["React 18", "Node.js", "Express", "MongoDB", "Framer Motion"],
      featured: true,
      githubUrl: "https://github.com/dullamanojreddy/my-website",
      emoji: "💼"
    },
    {
      title: "MediReminder",
      description: "Smart medication management and caregiver monitoring platform with automated WhatsApp reminders and adherence tracking.",
      techStack: ["TypeScript", "React 19", "Node.js", "MongoDB", "Twilio WhatsApp"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/medireminder",
      emoji: "💊"
    },
    {
      title: "Distributed URL Shortener",
      description: "Distributed microservices-based URL shortening platform with Redis caching, Kafka event streaming, Nginx gateway, and Grafana monitoring.",
      techStack: ["TypeScript", "Node.js", "Redis", "Kafka", "Docker", "MySQL"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/url_shortner",
      emoji: "🚀"
    },
    {
      title: "AI Code Optimizer",
      description: "LLM-powered tool that analyzes code for performance bottlenecks, suggests optimizations, and auto-refactors for clean output.",
      techStack: ["Python", "FastAPI", "OpenAI API", "React"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/ai_code_optimizer",
      emoji: "🤖"
    },
    {
      title: "KisanSetu",
      description: "Farmer-centric digital agricultural platform delivering market insights, crop advisories, and smart farming tools.",
      techStack: ["Python", "JavaScript", "REST APIs", "Machine Learning"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/kisaansethu",
      emoji: "🌾"
    },
    {
      title: "Banking Management System",
      description: "Java Swing desktop application for full bank account lifecycle management, customer records, and transaction security.",
      techStack: ["Java", "Swing", "Collections", "File I/O"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/BankingManagementSystem",
      emoji: "🏦"
    },
    {
      title: "Smart Supply Chain Engine",
      description: "Full-stack supply chain consistency system built with JavaFX, Node.js REST API, and MySQL for order and inventory tracking.",
      techStack: ["JavaFX", "Node.js", "Express", "MySQL"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/Smart-Supply-Chain-Consistency-Engine",
      emoji: "📦"
    },
    {
      title: "Bastion - LLM Security Layer",
      description: "Model-agnostic security middleware for LLMs featuring prompt injection defense, rule-based filtering, and a Streamlit monitoring dashboard.",
      techStack: ["Python", "FastAPI", "Streamlit", "Machine Learning"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/bastion",
      emoji: "🛡️"
    },
    {
      title: "Binary Bounty",
      description: "Interactive binary-themed web gaming suite built with React and Vite featuring Binary Bingo, Maze, and Binary Lock.",
      techStack: ["React", "Vite", "JavaScript", "CSS"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/binary-bounty",
      emoji: "🎮"
    },
    {
      title: "Dynamic Character Graph",
      description: "Interactive NLP graph visualization tool mapping character relationships, alliances, and narrative arcs using D3.js.",
      techStack: ["Python", "NLP", "D3.js", "JavaScript"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/dynamic_character_graph",
      emoji: "🕸️"
    },
    {
      title: "Mana Polam - AI",
      description: "AI-powered agricultural assistant delivering bilingual Telugu crop guidance, weather insights, and plant disease detection.",
      techStack: ["Python", "Machine Learning", "React", "FastAPI"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/Mana-Polam---AI",
      emoji: "🌿"
    },
    {
      title: "Result Extractor",
      description: "Automated academic result extraction pipeline scraping university portals into MongoDB and structured reports.",
      techStack: ["Python", "MongoDB", "BeautifulSoup", "Selenium"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/result_extractor",
      emoji: "🎓"
    }
  ],

  qualifications: [
    { education: "10th", institution: "Narayana School", score: "9.8", status: "Distinction" },
    { education: "Intermediate", institution: "Narayana College", score: "94.5%", status: "Distinction" },
    { education: "B.Tech", institution: "Vasavi College", score: "8.58", status: "Pass" }
  ],
  certifications: [
    { title: "Programming in Modern C++", issuer: "NPTEL", score: "67%", status: "Completed", certificatePath: "/assets/certificate-Programming in Modern C++.pdf" },
    { title: "CCNA Introduction to Networks", issuer: "Cisco Networking Academy", score: "", status: "Completed", certificatePath: "/assets/CCNA Introduction to Networks.pdf" },
    { title: "Cybersecurity Essentials", issuer: "Cisco Networking Academy", score: "", status: "Completed", certificatePath: "/assets/cybersecurity essentials.pdf" }
  ]
};

const runSeed = async () => {
  try {
    await connectDB();

    if (destroy) {
      await Promise.all([
        Profile.deleteMany({}),
        Skill.deleteMany({}),
        Project.deleteMany({}),
        Qualification.deleteMany({}),
        Certificate.deleteMany({})
      ]);
      console.log("🗑️  All collections cleared.");
      await mongoose.disconnect();
      console.log("✅ Disconnected.");
      return;
    }

    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create(seedData.profile);
      console.log("✅ Profile seeded.");
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(seedData.skills);
      console.log("✅ Skills seeded.");
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(seedData.projects);
      console.log("✅ Projects seeded.");
    }

    const qualificationCount = await Qualification.countDocuments();
    if (qualificationCount === 0) {
      await Qualification.insertMany(seedData.qualifications);
      console.log("✅ Qualifications seeded.");
    }

    const certificationCount = await Certificate.countDocuments();
    if (certificationCount === 0) {
      await Certificate.insertMany(seedData.certifications);
      console.log("✅ Certifications seeded.");
    }

    console.log("🎉 Seeding complete.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

runSeed();