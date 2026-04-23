import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import CertificationsPage from "./pages/CertificationsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;

      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      setScrollProgress((scrollTop / scrollHeight) * 100);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selectors = [
      ".route-stage .page-top",
      ".route-stage .card-surface",
      ".route-stage .timeline-item",
      ".route-stage .field",
      ".route-stage .contact-panel",
      ".route-stage .hero-profile-chip",
      ".route-stage .hero-copy h1",
      ".route-stage .hero-copy .subtitle",
      ".route-stage .hero-tagline",
      ".route-stage .cta-row"
    ];

    const queryTargets = () =>
      document.querySelectorAll(selectors.join(","));

    const applyRevealBindings = () => {
      queryTargets().forEach((element, index) => {
        if (element.dataset.revealBound === "true") {
          return;
        }

        element.dataset.revealBound = "true";
        element.classList.add("reveal-on-scroll");
        element.style.setProperty("--reveal-delay", `${Math.min(index * 65, 520)}ms`);
      });
    };

    applyRevealBindings();

    if (reducedMotion) {
      queryTargets().forEach((element) => {
        element.classList.add("in-view");
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.14,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    queryTargets().forEach((element) => observer.observe(element));

    const rebindingTimer = window.setTimeout(() => {
      applyRevealBindings();
      queryTargets().forEach((element) => {
        if (!element.classList.contains("in-view")) {
          observer.observe(element);
        }
      });
    }, 420);

    return () => {
      observer.disconnect();
      window.clearTimeout(rebindingTimer);
    };
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <div className="aurora-layer" aria-hidden="true" />
      <div className="starfield" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, index) => (
          <span
            key={index}
            className="star"
            style={{
              "--x": `${(index * 13) % 100}%`,
              "--y": `${(index * 29) % 100}%`,
              "--delay": `${(index % 7) * 0.7}s`
            }}
          />
        ))}
      </div>
      <div className="grid-depth" aria-hidden="true" />

      <div className="scroll-progress">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <Navbar />

      <main className="main-layout">
        <section key={location.pathname} className="route-stage">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
