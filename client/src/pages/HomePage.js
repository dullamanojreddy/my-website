import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiMail } from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";
import ConnectWithMeSection from "../components/ConnectWithMeSection";
import { getProfile } from "../services/api";

function HomePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [typedText, setTypedText] = useState("");
  const displayName = profile?.name || "Dulla Manoj Reddy";
  const roles = ["Full Stack MERN Developer", "UI Engineer", "Problem Solver"];
  const profileImagePath = "/assets/myimage2.jpeg";

  const loadData = useCallback(async () => {
    try {
      setError("");
      setLoading(true);

      const profileResult = await getProfile();

      if (profileResult.status === "fulfilled") {
        setProfile(profileResult.value.data.data);
      } else {
        setError("Unable to load portfolio data. Please try again.");
      }
    } catch (requestError) {
      setError("Unable to load portfolio data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const type = () => {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex += 1;
        setTypedText(currentRole.slice(0, charIndex));

        if (charIndex === currentRole.length) {
          deleting = true;
          timeoutId = setTimeout(type, 1200);
          return;
        }
      } else {
        charIndex -= 1;
        setTypedText(currentRole.slice(0, charIndex));

        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      timeoutId = setTimeout(type, deleting ? 50 : 85);
    };

    timeoutId = setTimeout(type, 600);

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <LoadingSpinner label="Preparing your portfolio experience..." />;
  }

  return (
    <section className="page-wrap home-page">
      {error && (
        <div className="card-surface error-banner">
          <p className="error-text">{error}</p>
          <button type="button" className="btn secondary" onClick={loadData}>
            Retry
          </button>
        </div>
      )}
      <div className="hero card-surface">
        <div className="hero-showcase">
          <div className="hero-portrait">
            <img src={profileImagePath} alt={displayName} className="hero-image" />
          </div>
          <div className="hero-overlay">
            <div className="hero-copy">
              <p className="eyebrow">Available For Work</p>
              <h1>
                Building clean, modern web products
                <br />
                with MERN and strong UI <span className="headline-em">focus.</span>
              </h1>
              <p className="subtitle">
                {profile?.role || "Full Stack MERN Developer | UI Engineer | Problem Solver"}
              </p>
              <p className="typing-line">
                <span>{typedText}</span>
                <i aria-hidden="true">|</i>
              </p>
              <p className="hero-tagline">
                {profile?.tagline ||
                  "I design and develop clean, high-performance products that people remember."}
              </p>
              <div className="cta-row">
                <Link to="/projects" className="btn primary">
                  View Projects <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn secondary">
                  Contact Me <FiMail />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConnectWithMeSection />
    </section>
  );
}

export default HomePage;
