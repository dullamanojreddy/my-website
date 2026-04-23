import { FiArrowLeft, FiArrowRight, FiGithub, FiPlay } from "react-icons/fi";
import { useMemo, useState } from "react";

function ProjectCarousel({ projects = [] }) {
  const featured = useMemo(
    () => projects.filter((project) => project.featured),
    [projects]
  );
  const [index, setIndex] = useState(0);

  if (featured.length === 0) {
    return (
      <section id="featured-projects" className="project-carousel card-surface">
        <div className="carousel-header">
          <h3>Featured Projects</h3>
        </div>
        <p className="muted-text">Featured projects will appear here soon.</p>
      </section>
    );
  }

  const current = featured[index];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % featured.length);
  };

  const previousSlide = () => {
    setIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  return (
    <section id="featured-projects" className="project-carousel card-surface">
      <div className="carousel-header">
        <h3>Featured Projects</h3>
        <span className="slide-index">
          {index + 1}/{featured.length}
        </span>
        <div className="carousel-controls">
          <button onClick={previousSlide} aria-label="Previous project" type="button">
            <FiArrowLeft />
          </button>
          <button onClick={nextSlide} aria-label="Next project" type="button">
            <FiArrowRight />
          </button>
        </div>
      </div>
      <article className="carousel-card project-surface">
        <p className="eyebrow">Featured Build</p>
        <h4>{current.title}</h4>
        <p>{current.description}</p>
        <div className="tech-row">
          {current.techStack?.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-actions">
          <a
            href={current.demoUrl || "#"}
            className={`btn secondary ${!current.demoUrl ? "disabled" : ""}`}
            onClick={(event) => !current.demoUrl && event.preventDefault()}
          >
            Live Demo <FiPlay />
          </a>
          <a
            href={current.githubUrl || "#"}
            className={`btn secondary ${!current.githubUrl ? "disabled" : ""}`}
            onClick={(event) => !current.githubUrl && event.preventDefault()}
          >
            GitHub <FiGithub />
          </a>
        </div>
      </article>
    </section>
  );
}

export default ProjectCarousel;