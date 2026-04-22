import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Alerts() {

  const navigate = useNavigate();

  const alerts = [
    { type: "CRITICAL", cowId: "105", issue: "Inactive for 6 hours", animalType: "Cow", rumination: 350, pregnant: true },
    { type: "WARNING", cowId: "103", issue: "High temperature", animalType: "Heifer", rumination: 420, pregnant: false },
    { type: "WARNING", cowId: "108", issue: "Low rumination", animalType: "Calf", rumination: 220 },
    { type: "CRITICAL", cowId: "107", issue: "Heart rate too high", animalType: "Bull", rumination: 280 },
  ];

  const getColor = (type) => {
    return type === "CRITICAL" ? "#e74c3c" : "#f39c12";
  };

  return (
    <Layout>
      <div style={{ padding: "20px", background: "#f5f6fa", minHeight: "100vh" }}>

        <h1>🚨 Alerts Center</h1>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>
          Real-time livestock health monitoring & emergency detection
        </p>

        {alerts.map((alert, index) => (
          <div key={index} style={{
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            marginBottom: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            borderLeft: `6px solid ${getColor(alert.type)}`
          }}>

            {/* 🔹 Top Row */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              
              <span style={{
                background: alert.type === "CRITICAL" ? "#fdecea" : "#fff4e5",
                color: getColor(alert.type),
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600"
              }}>
                {alert.type}
              </span>

              <span style={{ fontSize: "12px", color: "#64748b" }}>
                {new Date().toLocaleTimeString()}
              </span>

            </div>

            {/* Alert Info */}
            <p style={{ margin: "10px 0", fontWeight: "500" }}>
              🐄 Cow #{alert.cowId} — {alert.issue}
            </p>

            {/* Extra Info Row */}
            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "10px"
            }}>

              {/* Animal Type */}
              <span style={{
                background: "#eef2ff",
                color: "#6366f1",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                {alert.animalType}
              </span>

              {/* Rumination */}
              <span style={{
                background: alert.rumination < 300 ? "#fdecea" : "#e8f8f5",
                color: alert.rumination < 300 ? "#e74c3c" : "#2ecc71",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                🌿 {alert.rumination} min
              </span>

              {(alert.animalType === "Cow" || alert.animalType === "Heifer") && (
                <span style={{
                  background: alert.pregnant ? "#e8f8f5" : "#fdecea",
                  color: alert.pregnant ? "#2ecc71" : "#e74c3c",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px"
                }}>
                  {alert.pregnant ? "🤰 Pregnant" : "Not Pregnant"}
                </span>
              )}

            </div>

            {/* Action */}
            <div>
              <button
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#3498db",
                  color: "white",
                  cursor: "pointer"
                }}
                onClick={() => navigate(`/registry?cowId=${alert.cowId}`)}
              >
                View
              </button>
            </div>

          </div>
        ))}

      </div>
    </Layout>
  );
}