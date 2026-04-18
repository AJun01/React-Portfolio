import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CyberUniHorizontalPage from "./cyber-uni/CyberUniHorizontalPage";
import NoirUniPage from "./noir-uni/NoirUniPage";
import BacklotProductPage from "./noir-uni/BacklotProductPage";
import FilmsPage from "./noir-uni/FilmsPage";
import NovelsPage from "./noir-uni/NovelsPage";
import PixelUniPage from "./pixel-uni/PixelUniPage";
import MiamiViceUniPage from "./miami-vice-uni/MiamiViceUniPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cyber-uni" element={<CyberUniHorizontalPage />} />
      <Route path="/noir-uni" element={<NoirUniPage />} />
      <Route path="/noir-uni/backlot" element={<BacklotProductPage />} />
      <Route path="/noir-uni/films" element={<FilmsPage />} />
      <Route path="/noir-uni/novels" element={<NovelsPage />} />
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
    </Routes>
  );
};

export default App;
