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
    { title: "Personal Portfolio Website", description: "Responsive portfolio website to showcase profile, education, skills, and certifications.", techStack: ["React", "Node.js", "Express", "MongoDB"], featured: true, githubUrl: "https://github.com/dullamanojreddy/my-website", emoji: "💼" },
    { title: "NyayAI - AI Court Simulator", description: "AI-powered court simulation platform that models legal argument flows and verdict reasoning.", techStack: ["React", "Node.js", "Express", "MongoDB"], featured: true, emoji: "⚖️" },
    { title: "KisanSetu", description: "Farmer-centric platform connecting farmers with digital tools, information, and services for informed agricultural decision-making.", techStack: ["Python", "JavaScript", "REST APIs"], featured: false, githubUrl: "https://github.com/dullamanojreddy/kisaansethu", emoji: "🌾" },
    { title: "Banking Management System", description: "Java Swing desktop app for managing bank accounts, transactions, and customer data with a user-friendly GUI.", techStack: ["Java", "Swing", "Collections"], featured: false, githubUrl: "https://github.com/dullamanojreddy/BankingManagementSystem", emoji: "🏦" },
    { title: "Bastion - LLM Security Layer", description: "Model-agnostic security layer for LLMs with FastAPI backend, rule-based detection, and Streamlit dashboard.", techStack: ["Python", "FastAPI", "Streamlit", "Machine Learning"], featured: false, githubUrl: "https://github.com/dullamanojreddy/bastion", emoji: "🛡️" },
    { title: "Binary Bounty", description: "Collection of binary-themed games built with React and Vite including Bingo, Maze, and Binary Lock.", techStack: ["React", "Vite", "JavaScript", "CSS"], featured: false, githubUrl: "https://github.com/dullamanojreddy/Binary-Bounty", emoji: "🎮" },
    { title: "Smart Supply Chain Engine", description: "Full-stack supply chain system with JavaFX UI, Node.js backend, MySQL database managing inventory and orders.", techStack: ["JavaFX", "Node.js", "Express", "MySQL"], featured: false, githubUrl: "https://github.com/dullamanojreddy/Smart-Supply-Chain-Consistency-Engine", emoji: "📦" }
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