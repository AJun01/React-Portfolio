import React from "react";
import { Link } from "react-router-dom";
import "./BackToPortals.css";

/** Noir Uni 站内返回平行宇宙入口（不依赖 cyber-uni） */
export default function BackToPortals() {
  return (
    <Link className="noir-back-portals" to="/">
      ← Universes
    </Link>
  );
}
