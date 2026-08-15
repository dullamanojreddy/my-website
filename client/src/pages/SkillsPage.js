import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code2,
  Database,
  Cpu,
  Globe,
  Layers,
  Box,
  Cloud,
  Terminal,
  Braces,
  FileCode2,
  Server,
  GitBranch,
  FileText,
  BarChart3,
  Cpu as CpuIcon,
  Search as SearchIcon
} from "lucide-react";

// Technology icon mapping using Lucide React icons
const techIconMap = {
  // Programming Languages
  "Java": { icon: Code2, color: "#f89820" },
  "Python": { icon: FileCode2, color: "#3776ab" },
  "C++": { icon: Cpu, color: "#00599c" },
  "JavaScript": { icon: Braces, color: "#f7df1e" },
  "SQL": { icon: Database, color: "#336791" },
  "HTML": { icon: Globe, color: "#e34f26" },
  "CSS": { icon: FileText, color: "#1572b6" },
  
  // Core CS
  "Data Structures & Algorithms": { icon: BarChart3, color: "#2dbdff" },
  "Object-Oriented Programming": { icon: Layers, color: "#a855f7" },
  "DBMS": { icon: Database, color: "#336791" },
  "Operating Systems": { icon: CpuIcon, color: "#00d4ff" },
  "Computer Networks": { icon: Cloud, color: "#25c9b0" },
  
  // Frameworks & Technologies
  "React.js": { icon: Box, color: "#61dafb" },
  "Node.js": { icon: Server, color: "#339933" },
  "Express.js": { icon: Server, color: "#000000" },
  "FastAPI": { icon: Terminal, color: "#009688" },
  "Tailwind CSS": { icon: FileText, color: "#06b6d4" },
  "Socket.IO": { icon: Cloud, color: "#010101" },
  
  // Databases
  "MongoDB": { icon: Database, color: "#47a248" },
  "MySQL": { icon: Database, color: "#4479a1" },
  
  // Tools & Libraries
  "Git": { icon: GitBranch, color: "#f05032" },
  "GitHub": { icon: Box, color: "#ffffff" },
  "VS Code": { icon: Terminal, color: "#007acc" },
  "Jupyter Notebook": { icon: FileText, color: "#f37626" },
  "Google Colab": { icon: Cloud, color: "#f9ab00" },
  "NumPy": { icon: BarChart3, color: "#013243" },
  "Pandas": { icon: BarChart3, color: "#150458" },
  "TensorFlow": { icon: CpuIcon, color: "#ff6f00" }
};

// Skills data structure organized by categories
const skillsData = {
  "Programming Languages": {
    icon: Code2,
    color: "#2dbdff",
    skills: [
      "Java", "Python", "C++", "JavaScript", "SQL", "HTML", "CSS"
    ]
  },
  "Core Computer Science": {
    icon: Cpu,
    color: "#a855f7",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "DBMS",
      "Operating Systems",
      "Computer Networks"
    ]
  },
  "Frameworks & Technologies": {
    icon: Layers,
    color: "#25c9b0",
    skills: [
      "React.js", "Node.js", "Express.js", "FastAPI", "Tailwind CSS", "Socket.IO"
    ]
  },
  "Databases": {
    icon: Database,
    color: "#4865ff",
    skills: [
      "MongoDB", "MySQL"
    ]
  },
  "Tools & Libraries": {
    icon: Box,
    color: "#f57ba6",
    skills: [
      "Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab",
      "NumPy", "Pandas", "TensorFlow"
    ]
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const categoryVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const badgeVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 10
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter skills based on search query and active category
  const filteredCategories = useMemo(() => {
    const categories = Object.entries(skillsData);
    
    if (activeCategory !== "All") {
      return categories.filter(([name]) => name === activeCategory);
    }
    
    if (searchQuery.trim()) {
      return categories.map(([name, data]) => {
        const filteredSkills = data.skills.filter(skill =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return filteredSkills.length > 0 ? [name, { ...data, skills: filteredSkills }] : null;
      }).filter(Boolean);
    }
    
    return categories;
  }, [searchQuery, activeCategory]);

  const categories = ["All", ...Object.keys(skillsData)];

  return (
    <section className="page-wrap card-surface">
      {/* Floating background particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">What I Do</p>
        <h2>Skills & Expertise</h2>
        <p className="skills-subtitle">
          A strong foundation across technologies and tools I use to build
          scalable, efficient and modern solutions.
        </p>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        className="skills-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Search Input */}
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category) => (
            <motion.button
              key={category}
              type="button"
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="skills-categories-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={`${activeCategory}-${searchQuery}`}
      >
        <AnimatePresence mode="wait">
          {filteredCategories.map(([categoryName, categoryData]) => {
            const CategoryIcon = categoryData.icon;
            const categoryColor = categoryData.color;
            
            return (
              <motion.div
                key={categoryName}
                className="skill-category-card"
                variants={categoryVariants}
                layout
              >
                {/* Category Header */}
                <div className="category-header">
                  <div 
                    className="category-icon-wrapper"
                    style={{ 
                      background: `linear-gradient(135deg, ${categoryColor}22, ${categoryColor}44)`,
                      borderColor: `${categoryColor}66`
                    }}
                  >
                    <CategoryIcon size={24} color={categoryColor} />
                  </div>
                  <div className="category-info">
                    <h3 className="category-title">{categoryName}</h3>
                    <span className="category-count">
                      {categoryData.skills.length} {categoryData.skills.length === 1 ? 'technology' : 'technologies'}
                    </span>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="skills-badges-grid">
                  {categoryData.skills.map((skill, index) => {
                    const techInfo = techIconMap[skill] || { icon: Code2, color: "#2dbdff" };
                    const TechIcon = techInfo.icon;
                    
                    return (
                      <motion.div
                        key={skill}
                        className="skill-badge"
                        variants={badgeVariants}
                        whileHover={{ 
                          scale: 1.08,
                          y: -4,
                          transition: { duration: 0.2 }
                        }}
                        style={{
                          "--badge-color": techInfo.color,
                          animationDelay: `${index * 0.05}s`
                        }}
                      >
                        <div 
                          className="badge-icon-wrapper"
                          style={{
                            background: `linear-gradient(135deg, ${techInfo.color}22, ${techInfo.color}44)`,
                            boxShadow: `0 0 20px ${techInfo.color}33`
                          }}
                        >
                          <TechIcon size={18} color={techInfo.color} />
                        </div>
                        <span className="badge-text">{skill}</span>
                        <div 
                          className="badge-glow"
                          style={{
                            background: `radial-gradient(circle, ${techInfo.color}44, transparent)`
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* No results message */}
      {filteredCategories.length === 0 && (
        <motion.div
          className="no-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SearchIcon size={48} color="var(--muted-ice)" />
          <p>No technologies found matching "{searchQuery}"</p>
        </motion.div>
      )}
    </section>
  );
}

export default SkillsPage;