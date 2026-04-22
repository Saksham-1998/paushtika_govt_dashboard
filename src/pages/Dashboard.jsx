import Layout from "../components/Layout";
import Card from "../components/Card";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import cowImg from "../assets/cow_dash.png";

export default function Dashboard() {

  const [selectedCow, setSelectedCow] = useState("101");
  const [range, setRange] = useState("7");

  const cowDataRaw = {
    "101": { temp: 38.7, pregnant: true, milking: true, type: "cow" },
    "102": { temp: 39.3, pregnant: false, milking: true, type: "cow" },
    "103": { temp: 40.2, pregnant: false, milking: false, type: "bull" },
    "104": { temp: 38.6, pregnant: true, milking: true, type: "cow" },
  };

  const animals = Object.values(cowDataRaw);
  const pregnantCount = animals.filter(a => a.pregnant).length;

  const cowData = {
    "101": {
      temp: [38.5, 38.7, 38.6, 38.8, 39.0, 39.2, 39.4],
      activity: [80, 85, 78, 82, 84, 86, 88],
      heart: [70, 72, 71, 73, 75, 74, 76],
    },
    "102": {
      temp: [39.0, 39.2, 39.4, 39.5, 39.6, 39.8, 40.0],
      activity: [60, 55, 50, 55, 52, 50, 48],
      heart: [80, 85, 88, 82, 84, 86, 89],
    },
    "103": {
      temp: [38.8, 38.4, 38.6, 38.7, 39.0, 39.4, 39.6],
      activity: [60, 55, 50, 55, 52, 50, 48],
      heart: [90, 88, 85, 90, 92, 94, 96],
    },
  };

  const cowList = Object.keys(cowData);


  const filterData = (data) => {
    if (range === "3") return data.slice(-3);
    if (range === "7") return data.slice(-7);
    return data;
  };

  const formatData = (arr) =>
    arr.map((val, i) => ({ day: i + 1, value: val }));

  const getMinMax = (data) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return [min - 1, max + 1];
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>

        <h1>🐄 Government Dashboard</h1>

        <div style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          margin: "30px 0"
        }}>

          <div style={{
            flex: 1
          }}>
            <img
              src={cowImg}
              alt="cow"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            />
          </div>

          <div style={{
            flex: 1.2,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "15px",
            paddingRight: "6rem",
          }}>

            <Card title="Total Ear Tags" value="130" color="#6366f1" icon="📡" big />
            <Card title="Total Livestock" value="130" color="#3498db" icon="🐄" big />

            <Card title="Safe Livestock" value="102" color="#2ecc71" icon="✅" big />
            <Card title="Unsafe Livestock" value="18" color="#e74c3c" icon="🚨" big />

          </div>

        </div>

        {/* herd */}
        <h2 style={{ marginTop: "20px" }}>Herd Overview</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <Card title="Total Cows" value="120" color="#3498db" icon="🐄" />
          <Card title="Bulls" value="2" color="#9b59b6" icon="🐂" />
          <Card title="Heifer" value="3" color="#1abc9c" icon="🐄" />
          <Card title="Calves" value="5" color="#f39c12" icon="🐮" />
        </div>

        {/* Alert */}
        <h2 style={{ marginTop: "20px" }}>Alerts</h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <Card title="Healthy" value="102" color="#2ecc71" icon="✅" />
          <Card title="Sick" value="8" color="#e74c3c" icon="🚨" />
          <Card title="Warning" value="10" color="#f1c40f" icon="⚠️" />
          <Card title="Pregnant" value={pregnantCount} color="#e84393" icon="🤰" />
        </div>

        <h2 style={{ marginTop: "30px" }}>Cow Analytics</h2>

        {/* Select cow */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "6px",
            fontSize: "14px",
            color: "#64748b",
            fontWeight: "500"
          }}>
            Select Cow 🐄
          </label>

          <select
            value={selectedCow}
            onChange={(e) => setSelectedCow(e.target.value)}
            style={{
              width: "220px",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontSize: "14px",
              fontWeight: "500",
              color: "#0f172a",
              outline: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              transition: "0.2s"
            }}
            onFocus={(e) => e.target.style.border = "1px solid #2563eb"}
            onBlur={(e) => e.target.style.border = "1px solid #e2e8f0"}
          >
            {cowList.map(id => (
              <option key={id} value={id}>
                Cow {id}
              </option>
            ))}
          </select>
        </div>

        {/* Range */}
        <div style={{ marginBottom: "20px" }}>
          {["3", "7", "all"].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                marginRight: "5px",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                background: range === r ? "#3498db" : "#ddd",
                color: range === r ? "white" : "black",
                cursor: "pointer"
              }}
            >
              {r === "3" ? "3 Days" : r === "7" ? "7 Days" : "All"}
            </button>
          ))}
        </div>

        {/* Temperature */}
        <h3>🌡 Temperature</h3>
        <LineChart width={600} height={250} data={formatData(filterData(cowData[selectedCow].temp))}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis domain={getMinMax(filterData(cowData[selectedCow].temp))} />
          <Tooltip formatter={(value) => `${value} °C`} />
          <Line type="monotone" dataKey="value" stroke="#e74c3c" strokeWidth={2} />
        </LineChart>

        {/* ACTIVITY */}
        <h3>🚶 Activity</h3>
        <LineChart width={600} height={250} data={formatData(filterData(cowData[selectedCow].activity))}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis domain={getMinMax(filterData(cowData[selectedCow].activity))} />
          <Tooltip formatter={(value) => `${value}`} />
          <Line type="monotone" dataKey="value" stroke="#2ecc71" strokeWidth={2} />
        </LineChart>

        {/* HEART RATE */}
        <h3>❤️ Heart Rate</h3>
        <LineChart width={600} height={250} data={formatData(filterData(cowData[selectedCow].heart))}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis domain={getMinMax(filterData(cowData[selectedCow].heart))} />
          <Tooltip formatter={(value) => `${value} BPM`} />
          <Line type="monotone" dataKey="value" stroke="#9b59b6" strokeWidth={2} />
        </LineChart>

      </div>
    </Layout>
  );
} 