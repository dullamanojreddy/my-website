import { Component, lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

// Route-level code splitting — each page loads only when first visited
const HomePage           = lazy(() => import("./pages/HomePage"));
const AboutPage          = lazy(() => import("./pages/AboutPage"));
const SkillsPage         = lazy(() => import("./pages/SkillsPage"));
const ProjectsPage       = lazy(() => import("./pages/ProjectsPage"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const ContactPage        = lazy(() => import("./pages/ContactPage"));

// Catches lazy-load failures (chunk 404, network drop) so the app never goes blank
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", color: "#eef3ff" }}>
          <p style={{ opacity: 0.7 }}>Something went wrong loading this page.</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            style={{ padding: "0.6rem 1.4rem", borderRadius: "999px", border: "1px solid rgba(46,242,255,0.4)", background: "rgba(46,242,255,0.08)", color: "#eef3ff", cursor: "pointer" }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Stable star data — computed once, never recreated on scroll re-renders
const STAR_COUNT = 30;


function App() {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Memoize star positions so they are stable across re-renders triggered by
  // scrollProgress state updates (was recreating 30 objects ~60× per second)
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, index) => ({
        x: `${(index * 13) % 100}%`,
        y: `${(index * 29) % 100}%`,
        delay: `${(index % 7) * 0.7}s`,
      })),
    [] // empty deps — positions are deterministic, never need to change
  );

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
        {stars.map((star, index) => (
          <span
            key={index}
            className="star"
            style={{
              "--x": star.x,
              "--y": star.y,
              "--delay": star.delay,
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
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner label="Loading..." />}>
              <Routes>
                <Route path="/"               element={<HomePage />} />
                <Route path="/about"          element={<AboutPage />} />
                <Route path="/skills"         element={<SkillsPage />} />
                <Route path="/projects"       element={<ProjectsPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/contact"        element={<ContactPage />} />
                <Route path="*"              element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}

export default App;
