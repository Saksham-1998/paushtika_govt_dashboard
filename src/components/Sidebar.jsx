import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Registry", path: "/registry" },
    { name: "Map", path: "/map" },
    { name: "Supervision", path: "/supervision" },
    { name: "Alerts", path: "/alerts" },
  ];

  return (
    <div style={{
      width: "240px",
      height: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "20px 15px",
      position: "fixed",
      top: 0,
      left: 0,
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #1e293b"
    }}>

      {/* LOGO */}
      <div style={{
        marginBottom: "30px",
        padding: "10px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.05)"
      }}>
        <h2 style={{ margin: 0 }}>Paushtika</h2>
        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "5px" }}>
          Govt Monitoring
        </p>
      </div>

      {/* MENU */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "500",
                color: isActive ? "#fff" : "#94a3b8",
                background: isActive ? "#2563eb" : "transparent",
                borderLeft: isActive ? "4px solid #60a5fa" : "4px solid transparent",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.target.style.background = "#1e293b";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.target.style.background = "transparent";
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{
        marginTop: "auto",
        padding: "10px",
        fontSize: "12px",
        color: "#64748b"
      }}>
        © 2026 Paushtika
      </div>

    </div>
  );
}