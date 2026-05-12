import React from "react";
import { createRoot } from "react-dom/client";
import LiquidGlassMusicPlayer from "./components/LiquidGlassMusicPlayer.jsx";

createRoot(document.getElementById("liquid-glass-react-root")).render(
  <React.StrictMode>
    <LiquidGlassMusicPlayer />
  </React.StrictMode>
);

