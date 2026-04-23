require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");

const Project = require("../models/Project");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const OLD_TITLE = "Contact Management API";
const NEW_PROJECT = {
  title: "NyayAI - AI Court Simulator",
  description:
    "AI-powered court simulation platform that models legal argument flows and verdict reasoning.",
  techStack: ["React", "Node.js", "Express", "MongoDB"],
  featured: true
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const updateResult = await Project.updateOne(
      { title: OLD_TITLE },
      { $set: NEW_PROJECT }
    );

    if (updateResult.matchedCount === 0) {
      console.log("[projects] No project with old title found. Trying fallback update by order.");

      const projects = await Project.find().sort({ createdAt: 1 });
      if (projects.length >= 2) {
        projects[1].title = NEW_PROJECT.title;
        projects[1].description = NEW_PROJECT.description;
        projects[1].techStack = NEW_PROJECT.techStack;
        projects[1].featured = NEW_PROJECT.featured;
        await projects[1].save();
        console.log("[projects] Updated second project by order to NyayAI.");
      } else {
        console.log("[projects] Less than two projects found. No update applied.");
      }
    } else {
      console.log("[projects] Updated project title to NyayAI successfully.");
    }
  } catch (error) {
    console.error("[projects] Update failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();