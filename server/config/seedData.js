const Profile = require("../models/Profile");
const Skill = require("../models/Skill");
const Project = require("../models/Project");
const Qualification = require("../models/Qualification");
const Certification = require("../models/Certification");

const seedData = async () => {
  const profileCount = await Profile.countDocuments();
  if (profileCount === 0) {
    await Profile.create({
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
    });
  }

  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany([
      { name: "Full Stack Development", proficiency: 90, icon: "stack", category: "Development" },
      { name: "Java", proficiency: 85, icon: "java", category: "Programming" },
      { name: "Python", proficiency: 80, icon: "python", category: "Programming" },
      { name: "C", proficiency: 78, icon: "code", category: "Programming" },
      { name: "DBMS", proficiency: 82, icon: "database", category: "Database" }
    ]);
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: "Personal Portfolio Website",
        description: "Responsive portfolio website to showcase profile, education, skills, and certifications.",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        featured: true,
        repoUrl: "https://github.com/dullamanojreddy/my-website"
      },
      {
        title: "NyayAI - AI Court Simulator",
        description: "AI-powered court simulation platform that models legal argument flows and verdict reasoning.",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        featured: true
      },
      {
        title: "KisanSetu 🌾",
        description: "Farmer-centric platform connecting farmers with digital tools, information, and services for informed agricultural decision-making.",
        techStack: ["Python", "JavaScript", "REST APIs"],
        featured: false,
        repoUrl: "https://github.com/dullamanojreddy/kisaansethu"
      },
      {
        title: "Banking Management System 🏦",
        description: "Java Swing desktop app for managing bank accounts, transactions, and customer data with a user-friendly GUI.",
        techStack: ["Java", "Swing", "Collections"],
        featured: false,
        repoUrl: "https://github.com/dullamanojreddy/BankingManagementSystem"
      },
      {
        title: "Bastion - LLM Security Layer 🛡️",
        description: "Model-agnostic security layer for LLMs with FastAPI backend, rule-based detection, and Streamlit dashboard.",
        techStack: ["Python", "FastAPI", "Streamlit", "Machine Learning"],
        featured: false,
        repoUrl: "https://github.com/dullamanojreddy/bastion"
      },
      {
        title: "Binary Bounty",
        description: "Collection of binary-themed games built with React and Vite including Bingo, Maze, and Binary Lock.",
        techStack: ["React", "Vite", "JavaScript", "CSS"],
        featured: false,
        repoUrl: "https://github.com/dullamanojreddy/Binary-Bounty"
      },
      {
        title: "Smart Supply Chain Engine",
        description: "Full-stack supply chain system with JavaFX UI, Node.js backend, MySQL database managing inventory and orders.",
        techStack: ["JavaFX", "Node.js", "Express", "MySQL"],
        featured: false,
        repoUrl: "https://github.com/dullamanojreddy/Smart-Supply-Chain-Consistency-Engine"
      }
    ]);
  }

  const qualificationCount = await Qualification.countDocuments();
  if (qualificationCount === 0) {
    await Qualification.insertMany([
      { education: "10th", institution: "Narayana School", score: "9.8", status: "Distinction" },
      { education: "Intermediate", institution: "Narayana College", score: "94.5%", status: "Distinction" },
      { education: "B.Tech", institution: "Vasavi College", score: "8.58", status: "Pass" }
    ]);
  }

  const certificationCount = await Certification.countDocuments();
  if (certificationCount === 0) {
    await Certification.insertMany([
      {
        title: "Programming in Modern C++",
        issuer: "NPTEL",
        score: "67%",
        status: "Completed",
        certificatePath: "/assets/certificate-Programming in Modern C++.pdf"
      },
      {
        title: "CCNA Introduction to Networks",
        issuer: "Cisco Networking Academy",
        score: "",
        status: "Completed",
        certificatePath: "/assets/CCNA Introduction to Networks.pdf"
      },
      {
        title: "Cybersecurity Essentials",
        issuer: "Cisco Networking Academy",
        score: "",
        status: "Completed",
        certificatePath: "/assets/cybersecurity essentials.pdf"
      }
    ]);
  }
};

module.exports = seedData;
