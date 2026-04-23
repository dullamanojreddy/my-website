import { useEffect, useState } from "react";
import { FiExternalLink, FiX } from "react-icons/fi";
import { Code2, Network, ScrollText, ShieldCheck } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { API_BASE_URL, getCertifications } from "../services/api";

const getCertificateVisual = (title = "") => {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("cyber")) {
    return { Icon: ShieldCheck, label: "Cybersecurity", tone: "cyber" };
  }

  if (normalizedTitle.includes("ccna") || normalizedTitle.includes("network")) {
    return { Icon: Network, label: "Networking", tone: "network" };
  }

  if (normalizedTitle.includes("c++") || normalizedTitle.includes("program")) {
    return { Icon: Code2, label: "Programming", tone: "programming" };
  }

  return { Icon: ScrollText, label: "Certificate", tone: "default" };
};

function CertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const response = await getCertifications();
        setCertifications(response.data);
      } catch (requestError) {
        setError("Unable to load certifications at the moment.");
      } finally {
        setLoading(false);
      }
    };

    loadCertifications();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading certifications..." />;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <section className="page-wrap">
      <div className="page-top">
        <h2>Certifications</h2>
        <p className="muted-text">Verified learning milestones and technical depth.</p>
      </div>
      <div className="cert-grid">
        {certifications.map((certification) => {
          const visual = getCertificateVisual(certification.title);

          return (
            <article className="card-surface cert-card" key={certification.title}>
              <div className="cert-visual">
                <visual.Icon
                  className={`cert-icon cert-icon--${visual.tone}`}
                  aria-hidden="true"
                />
                <span className="cert-caption">{visual.label}</span>
              </div>
              <h3>{certification.title}</h3>
              <p className="muted-text">{certification.issuer}</p>
              <span className="badge distinction">{certification.status}</span>
              <p className="score">Score: {certification.score || "N/A"}</p>
              <button
                className="btn primary"
                onClick={() => setActiveCertificate(certification)}
              >
                View Certificate <FiExternalLink />
              </button>
            </article>
          );
        })}
      </div>

      {activeCertificate && (
        <div className="modal-backdrop" onClick={() => setActiveCertificate(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-top">
              <div>
                <h3>{activeCertificate.title}</h3>
                <p className="muted-text">{activeCertificate.issuer}</p>
              </div>
              <button
                className="close-btn"
                type="button"
                aria-label="Close modal"
                onClick={() => setActiveCertificate(null)}
              >
                <FiX />
              </button>
            </div>
            <iframe
              title={activeCertificate.title}
              src={`${API_BASE_URL}${activeCertificate.certificatePath}`}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default CertificationsPage;
