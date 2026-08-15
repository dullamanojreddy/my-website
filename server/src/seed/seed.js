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
      title: "Personal Portfolio Website",
      description: "Cinematic aurora-themed full-stack portfolio with animated skills, certifications, projects, and contact form. Built with React 18, Node.js, Express, and MongoDB.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Framer Motion"],
      featured: true,
      githubUrl: "https://github.com/dullamanojreddy/my-website",
      demoUrl: "https://my-website-mu-red.vercel.app",
      emoji: "💼"
    },
    {
      title: "NyayAI - AI Courtroom Simulator",
      description: "AI-powered legal simulation platform that models courtroom argument flows, witness examination, and verdict reasoning using LLMs.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "OpenAI API"],
      featured: true,
      githubUrl: "https://github.com/dullamanojreddy/NyayAI-AI-Courtroom-Simulator",
      emoji: "⚖️"
    },
    {
      title: "Result Extractor - MongoDB",
      description: "Automated academic result extraction pipeline that scrapes, parses, and stores student results in MongoDB for analysis and reporting.",
      techStack: ["Python", "MongoDB", "BeautifulSoup", "Selenium"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/result_extractor_mongodb",
      emoji: "📊"
    },
    {
      title: "MediReminder",
      description: "Smart medication reminder app with scheduled notifications, dosage tracking, and patient management for consistent medicine adherence.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/medireminder",
      emoji: "💊"
    },
    {
      title: "URL Shortener",
      description: "High-performance URL shortening service with custom aliases, click analytics, and expiry management built on a REST API backend.",
      techStack: ["Node.js", "Express", "MongoDB", "React"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/url_shortner",
      emoji: "🔗"
    },
    {
      title: "AI Code Optimizer",
      description: "LLM-powered tool that analyzes code for performance bottlenecks, suggests optimizations, and auto-refactors for cleaner, faster output.",
      techStack: ["Python", "FastAPI", "OpenAI API", "React"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/ai_code_optimizer",
      emoji: "🤖"
    },
    {
      title: "KisanSetu",
      description: "Farmer-centric platform connecting farmers with digital tools, market prices, and advisory services for informed agricultural decision-making.",
      techStack: ["Python", "JavaScript", "REST APIs", "Machine Learning"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/kisaansethu",
      emoji: "🌾"
    },
    {
      title: "Banking Management System",
      description: "Java Swing desktop application for full bank account lifecycle management including transactions, customer records, and balance operations.",
      techStack: ["Java", "Swing", "Collections", "File I/O"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/BankingManagementSystem",
      emoji: "🏦"
    },
    {
      title: "Smart Supply Chain Engine",
      description: "Full-stack supply chain management system with JavaFX UI, Node.js REST API, and MySQL database for inventory, orders, and consistency tracking.",
      techStack: ["JavaFX", "Node.js", "Express", "MySQL"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/Smart-Supply-Chain-Consistency-Engine",
      emoji: "📦"
    },
    {
      title: "Bastion - LLM Security Layer",
      description: "Model-agnostic security middleware for LLMs with FastAPI backend, prompt injection detection, rule-based filtering, and a Streamlit monitoring dashboard.",
      techStack: ["Python", "FastAPI", "Streamlit", "Machine Learning"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/bastion",
      emoji: "🛡️"
    },
    {
      title: "Binary Bounty",
      description: "Collection of binary-themed mini-games built with React and Vite — includes Binary Bingo, Maze solver, and Binary Lock puzzle.",
      techStack: ["React", "Vite", "JavaScript", "CSS"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/binary-bounty",
      emoji: "🎮"
    },
    {
      title: "Dynamic Character Graph",
      description: "Interactive graph visualization tool that maps character relationships, alliances, and story arcs from narrative text using NLP and D3.js.",
      techStack: ["Python", "NLP", "D3.js", "JavaScript"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/dynamic_character_graph",
      emoji: "🕸️"
    },
    {
      title: "Mana Polam - AI",
      description: "AI-powered agricultural assistant for Telugu-speaking farmers providing crop recommendations, weather insights, and pest detection in regional language.",
      techStack: ["Python", "Machine Learning", "React", "FastAPI"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/Mana-Polam---AI",
      emoji: "🌿"
    },
    {
      title: "Sutra",
      description: "Intelligent document summarization and Q&A platform that processes PDFs and extracts structured insights using transformer-based NLP models.",
      techStack: ["Python", "Transformers", "FastAPI", "React"],
      featured: false,
      githubUrl: "https://github.com/dullamanojreddy/sutra",
      emoji: "📄"
    },
    {
      title: "Result Extractor",
      description: "Web scraping tool that automatically fetches and parses academic exam results from university portals and exports them to structured formats.",
      techStack: ["Python", "BeautifulSoup", "Selenium", "Pandas"],
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