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
      <div className="page-top">
        <h2>Skills</h2>
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
      </div>
      <div className="skills-grid">
        {filteredSkills.map((skill) => (
          <article className="skill-card" key={skill.name}>
            <div className="skill-head">
              <span className="icon-chip">{iconMap[skill.icon] || <FaCode />}</span>
              <div>
                <h3>{skill.name}</h3>
                <small>{skill.category}</small>
              </div>
              <strong>{skill.proficiency}%</strong>
            </div>
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
          </article>
        ))}
      </div>
    </section>
  );
}

export default SkillsPage;
