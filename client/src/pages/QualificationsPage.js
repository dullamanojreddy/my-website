import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { getQualifications } from "../services/api";

function QualificationsPage() {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    const loadQualifications = async () => {
      try {
        const response = await getQualifications();
        setQualifications(response.data);
      } catch (requestError) {
        setError("Failed to fetch qualification details.");
      } finally {
        setLoading(false);
      }
    };

    loadQualifications();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Fetching qualifications..." />;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  const normalizeScore = (score) => {
    const value = Number.parseFloat(String(score).replace("%", ""));
    if (Number.isNaN(value)) {
      return 0;
    }
    return value > 10 ? value : value * 10;
  };

  return (
    <section className="page-wrap">
      <div className="card-surface">
        <div className="page-top">
          <h2>Qualifications</h2>
          <div className="view-toggle" role="tablist" aria-label="Qualification layout">
            <button
              type="button"
              className={viewMode === "table" ? "active" : ""}
              onClick={() => setViewMode("table")}
            >
              Table
            </button>
            <button
              type="button"
              className={viewMode === "timeline" ? "active" : ""}
              onClick={() => setViewMode("timeline")}
            >
              Timeline
            </button>
          </div>
        </div>

        {viewMode === "table" ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Education</th>
                  <th>Institution</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {qualifications.map((item) => (
                  <tr key={`${item.education}-${item.institution}`}>
                    <td>{item.education}</td>
                    <td>{item.institution}</td>
                    <td>{item.score}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === "Distinction" ? "distinction" : "pass"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="timeline-stack">
            {qualifications.map((item) => (
              <article
                key={`${item.education}-${item.institution}`}
                className="timeline-qual-card"
              >
                <div className="timeline-bar">
                  <div
                    className="timeline-bar-fill"
                    style={{ width: `${normalizeScore(item.score)}%` }}
                  />
                </div>
                <div>
                  <h3>{item.education}</h3>
                  <p>{item.institution}</p>
                </div>
                <p className="score-line">Score: {item.score}</p>
                <span
                  className={`badge ${item.status === "Distinction" ? "distinction" : "pass"}`}
                >
                  {item.status}
                </span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default QualificationsPage;
