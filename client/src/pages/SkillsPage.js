import { useEffect, useState } from "react";
import { FaCode, FaDatabase, FaJava, FaLayerGroup, FaPython } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { getSkills } from "../services/api";

const iconMap = {
  java: <FaJava />,
  python: <FaPython />,
  database: <FaDatabase />,
  stack: <FaLayerGroup />,
  code: <FaCode />
};

const categoryClassMap = {
  Development: "skill-accent-dev",
  Programming: "skill-accent-prog",
  Database: "skill-accent-db"
};

function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await getSkills();
        setSkills(response.data);
      } catch (requestError) {
        setError("Could not load skills right now.");
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading skills..." />;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  const categories = ["All", ...new Set(skills.map((skill) => skill.category))];
  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section className="page-wrap card-surface">
      <div className="skills-header">
        <p className="eyebrow">What I Do</p>
        <h2>Skills & Expertise</h2>
        <p className="skills-subtitle">
          A strong foundation across technologies and tools I use to build
          scalable, efficient and modern solutions.
        </p>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredSkills.map((skill) => {
          const accentClass = categoryClassMap[skill.category] || "skill-accent-dev";

          return (
            <article className={`skill-card expertise-card ${accentClass}`} key={skill.name}>
              <div className="skill-card-glow" />
              <div className="skill-card-body">
                <div className="skill-icon-circle">
                  {iconMap[skill.icon] || <FaCode />}
                </div>

                <h3 className="skill-title">{skill.name}</h3>
                <p className="skill-category">{skill.category}</p>

                <div className="skill-divider" />

                {skill.points && skill.points.length > 0 ? (
                  <ul className="skill-points">
                    {skill.points.map((point) => (
                      <li key={point}>
                        <span className="skill-bullet" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="skill-meter-wrap">
                    <div
                      className="skill-meter"
                      style={{ "--skill-value": `${skill.proficiency}%` }}
                      aria-hidden="true"
                    />
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${skill.proficiency}%` }}
                        aria-valuenow={skill.proficiency}
                        role="progressbar"
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SkillsPage;