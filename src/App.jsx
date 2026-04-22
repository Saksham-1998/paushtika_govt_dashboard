import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Registry from "./pages/Registry";
import MapPage from "./pages/Map";
import Supervision from "./pages/Supervision";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/supervision" element={<Supervision />} />
        <Route path="/alerts" element={<Alerts />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;