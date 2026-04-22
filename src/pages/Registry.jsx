import Layout from "../components/Layout";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Registry() {

  const [searchParams] = useSearchParams();
  const selectedCowId = searchParams.get("cowId");

  const gaushalas = [
    {
      name: "Shree Krishna Gau Shala",
      location: "Ahmedabad",
      cows: [
        { id: "101", breed: "Gir", type: "Cow", temp: 38.7, rumination: 480, status: "Healthy", pregnant: true },
        { id: "102", breed: "Kankrej", type: "Bull", temp: 40.2, rumination: 300, status: "Critical" },
        { id: "103", breed: "Gir", type: "Heifer", temp: 38.9, rumination: 420, status: "Warning", pregnant: false },
        { id: "104", breed: "Kankrej", type: "Calf", temp: 39.1, rumination: 200, status: "Warning" },
      ]
    },
    {
      name: "Cow Protection Center",
      location: "Junagadh",
      cows: [
        { id: "105", breed: "Gir", type: "Cow", temp: 39.5, rumination: 350, status: "Warning", pregnant: true },
        { id: "106", breed: "Gir", type: "Cow", temp: 38.4, rumination: 500, status: "Healthy", pregnant: false },
        { id: "107", breed: "Kankrej", type: "Bull", temp: 40.2, rumination: 280, status: "Critical" },
        { id: "108", breed: "Gir", type: "Calf", temp: 38.7, rumination: 420, status: "Healthy" },
      ]
    }
  ];

  const findOpenIndex = () => {
    if (!selectedCowId) return 0;

    const index = gaushalas.findIndex(g =>
      g.cows.some(c => c.id === selectedCowId)
    );

    return index !== -1 ? index : 0;
  };

  const [openIndex, setOpenIndex] = useState(findOpenIndex());

  const getStatusColor = (status) => {
    if (status === "Healthy") return "#2ecc71";
    if (status === "Critical") return "#e74c3c";
    return "#f1c40f";
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>

        <h1>🐄 Herd Registry</h1>
        <p style={{ color: "#64748b" }}>
          Livestock Monitoring System
        </p>

        {gaushalas.map((g, index) => {

          const total = g.cows.length;
          const critical = g.cows.filter(c => c.status === "Critical").length;
          const warning = g.cows.filter(c => c.status === "Warning").length;
          const healthy = g.cows.filter(c => c.status === "Healthy").length;

          return (
            <div key={index} style={{
              marginTop: "20px",
              background: "white",
              borderRadius: "12px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>

              {/* HEADER */}
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <h2 style={{ margin: 0 }}>{g.name}</h2>
                  <p style={{ color: "#64748b", margin: 0 }}>
                    📍 {g.location}
                  </p>
                </div>

                <span style={{ fontSize: "20px" }}>
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </div>

              {/* STATS */}
              <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px"
              }}>
                <span style={{ background: "#e3fcec", color: "#2ecc71", padding: "5px 10px", borderRadius: "20px", fontSize: "12px" }}>
                  Total: {total}
                </span>

                <span style={{ background: "#fdecea", color: "#e74c3c", padding: "5px 10px", borderRadius: "20px", fontSize: "12px" }}>
                  Critical: {critical}
                </span>

                <span style={{ background: "#f7f3e4", color: "#ada101", padding: "5px 10px", borderRadius: "20px", fontSize: "12px" }}>
                  Warning: {warning}
                </span>

                <span style={{ background: "#e3fcec", color: "#2ecc71", padding: "5px 10px", borderRadius: "20px", fontSize: "12px" }}>
                  Healthy: {healthy}
                </span>
              </div>

              {/* TABLE */}
              {openIndex === index && (
                <table width="100%" style={{
                  marginTop: "15px",
                  borderCollapse: "collapse"
                }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: "#64748b" }}>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Breed</th>
                      <th>Temp</th>
                      <th>Rumination</th>
                      <th>Pregnancy</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {g.cows.map((cow) => (
                      <tr
                        key={cow.id}
                        style={{
                          borderTop: "1px solid #eee",
                          background: selectedCowId === cow.id ? "#eaf6ff" : "transparent"
                        }}
                      >
                        <td style={{ padding: "12px 0" }}>#{cow.id}</td>
                        <td>{cow.type}</td>
                        <td>{cow.breed}</td>
                        <td>{cow.temp} °C</td>

                        <td>{cow.rumination} min</td>

                        <td>
                          {cow.type === "Cow" || cow.type === "Heifer" ? (
                            <span style={{
                              color: cow.pregnant ? "#2ecc71" : "#e74c3c",
                              fontWeight: "600"
                            }}>
                              {cow.pregnant ? "🤰 Yes" : "No"}
                            </span>
                          ) : (
                            <span style={{ color: "#999" }}>N/A</span>
                          )}
                        </td>

                        <td>
                          <span style={{
                            padding: "5px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            color: "white",
                            background: getStatusColor(cow.status)
                          }}>
                            {cow.status}
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          );
        })}

      </div>
    </Layout>
  );
}