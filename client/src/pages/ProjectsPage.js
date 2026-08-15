import { useEffect, useState } from "react";
import { FiGithub, FiPlay } from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";
import { getProjects } from "../services/api";
import { INITIAL_PROJECTS } from "../data/projectsData";

function ProjectsPage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects();
        if (response.data?.data && response.data.data.length > 0) {
          setProjects(response.data.data);
        }
      } catch {
        // Keep rendering gracefully with fallback projects if API is offline.
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);


  if (loading) {
    return <LoadingSpinner label="Loading projects..." />;
  }

  return (
    <section className="page-wrap">
      <div className="page-top">
        <h2>Projects</h2>
        <p className="muted-text">Product-focused work built with performance and polish.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="card-surface project-tile" key={project.title}>
            <div className="project-image-shell" aria-hidden="true">
              <div className="project-image-glow" />
              <span>{project.emoji || "🚀"}</span>
            </div>
            <h3>{project.title}</h3>
            <p className="muted-text">{project.description}</p>
            <div className="tech-row">
              {project.techStack?.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              <a
                href={project.demoUrl || "#"}
                className={`btn secondary ${!project.demoUrl ? "disabled" : ""}`}
                onClick={(event) => !project.demoUrl && event.preventDefault()}
              >
                Live Demo <FiPlay />
              </a>
              <a
                href={project.githubUrl || "#"}
                className={`btn secondary ${!project.githubUrl ? "disabled" : ""}`}
                onClick={(event) => !project.githubUrl && event.preventDefault()}
              >
                GitHub <FiGithub />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;