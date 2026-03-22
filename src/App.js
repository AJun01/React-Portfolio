import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CyberUniPage from "./cyber-uni/CyberUniPage";
import NoirUniPage from "./noir-uni/NoirUniPage";
import PixelUniPage from "./pixel-uni/PixelUniPage";
import MiamiViceUniPage from "./miami-vice-uni/MiamiViceUniPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cyber-uni/*" element={<CyberUniPage />} />
      <Route path="/noir-uni" element={<NoirUniPage />} />
      <Route
        path="/theme-2"
        element={<Navigate to="/noir-uni" replace />}
      />
      <Route path="/pixel-uni" element={<PixelUniPage />} />
      <Route
        path="/theme-3"
        element={<Navigate to="/pixel-uni" replace />}
      />
      <Route path="/miami-vice" element={<MiamiViceUniPage />} />
      <Route
        path="/theme-4"
        element={<Navigate to="/miami-vice" replace />}
      />
      <Route
        path="/skills"
        element={<Navigate to="/cyber-uni/skills" replace />}
      />
      <Route
        path="/projects"
        element={<Navigate to="/cyber-uni/projects" replace />}
      />
      <Route
        path="/contact"
        element={<Navigate to="/cyber-uni/contact" replace />}
      />
    </Routes>
  );
};

export default App;
