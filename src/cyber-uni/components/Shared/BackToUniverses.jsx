import React from "react";
import { Link } from "react-router-dom";
import "./BackToUniverses.css";

export default function BackToUniverses() {
  return (
    <Link className="back-universes" to="/">
      ← Universes
    </Link>
  );
}
