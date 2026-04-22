import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{
        marginLeft: "240px", 
        paddingLeft: "30px",
        width: "calc(100% - 240px)",
        minHeight: "100vh",
        background: "#f5f6fa"
      }}>
        {children}
      </div>

    </div>
  );
}