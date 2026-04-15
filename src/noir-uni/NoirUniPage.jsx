import React from "react";
import NoirHub from "./NoirHub";

/**
 * Noir Uni entry point — shows the chapter-select hub.
 * Sub-pages (/backlot, /films, /novels) are mounted directly
 * as top-level routes in App.js.
 */
export default function NoirUniPage() {
  return <NoirHub />;
}
