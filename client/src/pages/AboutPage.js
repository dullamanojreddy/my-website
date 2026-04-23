import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { API_BASE_URL, getProfile, getProjects, getSkills } from "../services/api";

function AboutPage() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileResponse, projectResponse, skillResponse] = await Promise.all([
          getProfile(),
          getProjects(),
          getSkills()
        ]);

        setProfile(profileResponse.data);
        setProjects(projectResponse.data);
        setSkills(skillResponse.data);
      } catch (requestError) {
        setError("Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading profile..." />;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  const highlights = [
    { label: "Projects", value: `${projects.length}+` },
    { label: "Core Skills", value: `${skills.length}+` },
    { label: "Focus", value: "MERN + UX" }
  ];

  return (
    <section className="page-wrap">
      <div className="about-grid card-surface">
        <div className="profile-card">
          <img
            src={`${API_BASE_URL}/assets/myimage2.jpeg`}
            alt={profile?.name}
            className="round-profile"
          />
          <h2>{profile?.name}</h2>
          <p>{profile?.role}</p>
          <a href={`mailto:${profile?.email}`} className="profile-link">
            {profile?.email}
          </a>
          <p>{profile?.mobile}</p>
          <div className="stats-grid">
            {highlights.map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="story-content">
          <h2>About Me</h2>
          <p className="muted-text">
            I build reliable experiences with clean architecture and thoughtful user
            interactions.
          </p>
          <div className="story-timeline">
            {profile?.about?.map((line, index) => (
              <article key={line} className="timeline-item">
                <span className="timeline-dot">{index + 1}</span>
                <p>{line}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;