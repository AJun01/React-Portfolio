import React from "react";
import { Link } from "react-router-dom";
import "./BackToPortals.css";

export default function BackToPortals() {
  return (
    <Link className="mv-back-portals" to="/">
      ← Universes
    </Link>
  );
}
