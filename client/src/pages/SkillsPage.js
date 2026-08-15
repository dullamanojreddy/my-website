import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code2,
  Database,
  Cpu,
  Layers,
  Cloud,
  BarChart3,
  Search as SearchIcon
} from "lucide-react";

// Real Devicons SVG logos for each technology
const techLogoMap = {
  "Java":                         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Python":                       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "C++":                          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "JavaScript":                   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "SQL":                          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "HTML":                         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS":                          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "DBMS":                         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "Operating Systems":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "Computer Networks":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "React.js":                     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js":                      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js":                   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "FastAPI":                      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "Tailwind CSS":                 "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Socket.IO":                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  "MongoDB":                      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "MySQL":                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Git":                          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub":                       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "VS Code":                      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "Jupyter Notebook":             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  "Google Colab":                 "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  "NumPy":                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  "Pandas":                       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  "TensorFlow":                   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
};

// Fallback lucide icons for skills without a devicon logo
const techIconMap = {
  "Data Structures & Algorithms": { icon: BarChart3, color: "#2dbdff" },
  "Object-Oriented Programming":  { icon: Layers,    color: "#a855f7" },
  "DBMS":                         { icon: Database,  color: "#336791" },
  "Operating Systems":            { icon: Cpu,       color: "#00d4ff" },
  "Computer Networks":            { icon: Cloud,     color: "#25c9b0" },
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

  // Particle positions computed once — stable across search/filter re-renders
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top:  `${Math.random() * 100}%`,
        animationDelay:    `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`,
      })),
    [] // intentionally empty — positions are random-on-mount, never need recalculating
  );

  return (
    <section className="page-wrap card-surface">
      {/* Floating background particles — positions memoized, stable across re-renders */}
      <div className="particles-container">
        {particles.map((style, i) => (
          <div key={i} className="particle" style={style} />
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
                    const logoUrl = techLogoMap[skill];
                    const fallback = techIconMap[skill] || { icon: Code2, color: "#2dbdff" };
                    const badgeColor = fallback.color || "#2dbdff";
                    const FallbackIcon = fallback.icon;
                    const floatDur  = (3.5 + (index % 5) * 0.6).toFixed(1);
                    const floatDelay = ((index * 0.35) % 3).toFixed(1);

                    return (
                      <motion.div
                        key={skill}
                        className="skill-badge"
                        variants={badgeVariants}
                        whileHover={{
                          scale: 1.08,
                          y: -6,
                          transition: { duration: 0.2 }
                        }}
                        style={{
                          "--badge-color": badgeColor,
                          "--float-dur":   `${floatDur}s`,
                          "--float-delay": `${floatDelay}s`,
                        }}
                      >
                        <div
                          className="badge-icon-wrapper"
                          style={{
                            background: `linear-gradient(135deg, ${badgeColor}22, ${badgeColor}44)`,
                            boxShadow:  `0 0 16px ${badgeColor}33`,
                          }}
                        >
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={skill}
                              width={20}
                              height={20}
                              style={{ objectFit: "contain", display: "block" }}
                              loading="lazy"
                            />
                          ) : (
                            <FallbackIcon size={18} color={badgeColor} />
                          )}
                        </div>
                        <span className="badge-text">{skill}</span>
                        <div
                          className="badge-glow"
                          style={{
                            background: `radial-gradient(circle, ${badgeColor}44, transparent)`
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