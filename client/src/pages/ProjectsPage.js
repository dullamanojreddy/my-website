import { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
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
        if (response.data?.data && response.data.data.length >= INITIAL_PROJECTS.length) {
          setProjects(response.data.data);
        }
      } catch {
        // Fallback to INITIAL_PROJECTS
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
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  GitHub <FiGithub />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsPage;