import Layout from "../components/Layout";
import Card from "../components/Card";
import { useState } from "react";

export default function Supervision() {

  const [alerts, setAlerts] = useState([
    { id: 1, gaushala: "Shree Krishna Gau Shala", issue: "High Temperature", level: "Critical" },
    { id: 2, gaushala: "Cow Protection Center", issue: "Low Activity", level: "Warning" },
    { id: 3, gaushala: "Shree Krishna Gau Shala", issue: "Low Heart Rate", level: "Critical" }
  ]);

  const totalGaushalas = 2;
  const totalLivestock = 130;
  const criticalCases = alerts.filter(a => a.level === "Critical").length;
  const warningCases = alerts.filter(a => a.level === "Warning").length;

  return (
    <Layout>
      <div style={{ padding: "20px" }}>

        <h1> Supervision Center</h1>
        <p style={{ color: "#64748b" }}>
          Government Action Panel
        </p>

        {/* 🔹 TOP CARDS */}
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", margin: "20px 0" }}>
          <Card title="Total Gaushalas" value={totalGaushalas} color="#3498db" icon="🏠" />
          <Card title="Total Livestock" value={totalLivestock} color="#6366f1" icon="🐄" />
          <Card title="Critical Cases" value={criticalCases} color="#e74c3c" icon="🚨" />
          <Card title="Warnings" value={warningCases} color="#f1c40f" icon="⚠️" />
        </div>

        {/* 🔥 ALERTS SECTION */}
        <h2>🚨 Active Alerts</h2>

        <div style={{ marginTop: "10px" }}>
          {alerts.length === 0 && (
            <p style={{ color: "gray" }}>No active alerts ✅</p>
          )}

          {alerts.map(a => (
            <div key={a.id} style={{
              background: "#fff",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
              borderLeft: `5px solid ${a.level === "Critical" ? "#e74c3c" : "#f1c40f"}`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>

              {/* 🔹 Top Row */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{a.gaushala}</strong> — {a.issue}
                </div>

                <span style={{
                  color: a.level === "Critical" ? "#e74c3c" : "#f1c40f",
                  fontWeight: "600"
                }}>
                  {a.level}
                </span>
              </div>

              {/* 🔥 ACTION BUTTONS */}
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                
                {/* Notify */}
                <button
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#3498db",
                    color: "white",
                    cursor: "pointer"
                  }}
                  onClick={() => alert(`Notification sent to ${a.gaushala}`)}
                >
                  📢 Notify
                </button>

                {/* Resolve */}
                <button
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#2ecc71",
                    color: "white",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setAlerts(alerts.filter(item => item.id !== a.id));
                  }}
                >
                  ✅ Resolve
                </button>

                {/* Inspect */}
                <button
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#e74c3c",
                    color: "white",
                    cursor: "pointer"
                  }}
                  onClick={() => alert(`Inspection flagged for ${a.gaushala}`)}
                >
                  🚩 Inspect
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}