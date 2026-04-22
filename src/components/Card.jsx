export default function Card({ title, value, color, icon, big }) {
  return (
    <div style={{
      background: "white",
      paddingLeft: "20px",
      borderRadius: "12px",
      width: "220px",
      borderLeft: `5px solid ${color}`,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    }}>
      <div style={{
        color: "gray",
        display: "flex",
        gap: "5px",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: "1.1rem",

        }}>{icon}</span>
        <p>{title}</p>
      </div>
      <h2 style={{
        color,
        fontSize: big ? "35px" : "25px",
        fontWeight: "700",
        marginTop: "5px",
      }}>
        {value}
      </h2>
    </div>
  );
}