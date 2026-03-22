import React, { useEffect } from "react";
import PortalLayout from "../components/Landing/PortalLayout";

export default function LandingPage() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return <PortalLayout />;
}
