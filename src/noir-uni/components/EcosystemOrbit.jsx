import React from "react";
import styles from "./EcosystemOrbit.module.css";

/**
 * Abstract, brand-evoking glyphs — intentionally NOT the real logos so we
 * don't misuse trademarks in a portfolio piece. Each glyph picks a shape
 * that reads like the brand family (e.g. a 4-point star for Gemini, a
 * starburst for Claude, a play triangle for Veo).
 */
const ECOSYSTEM_GLYPHS = {
  // Claude — starburst / sunrays
  claude: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="3.2" fill="currentColor" fillOpacity="0.25" />
      <path d="M12 3.5v3.3M12 17.2v3.3M3.5 12h3.3M17.2 12h3.3M6.2 6.2l2.3 2.3M15.5 15.5l2.3 2.3M6.2 17.8l2.3-2.3M15.5 8.5l2.3-2.3" />
    </svg>
  ),
  // Gemini — four-point star
  gemini: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden>
      <path d="M12 2.5 13.5 10.5 21.5 12 13.5 13.5 12 21.5 10.5 13.5 2.5 12 10.5 10.5Z" />
    </svg>
  ),
  // Veo — play triangle in a frame
  veo: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="M10.5 9.5 15.5 12l-5 2.5V9.5Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Seedance — sine wave, evokes motion / dance
  seedance: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M3 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0" />
      <circle cx="12" cy="18" r="1.2" fill="currentColor" />
    </svg>
  ),
  // Kling — cinematic peaks with sun
  kling: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <path d="M3 19.5 8 11l4 6 3-4 6 6.5H3Z" />
      <circle cx="17.5" cy="6" r="1.8" fill="currentColor" />
    </svg>
  ),
  // Map AI — map pin
  mapai: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" fill="currentColor" fillOpacity="0.3" />
    </svg>
  ),
  // Timeline — horizontal timeline with beat nodes
  timeline: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M3 12h18" />
      <circle cx="6.5" cy="12" r="1.9" fill="currentColor" />
      <circle cx="12" cy="12" r="1.9" fill="currentColor" />
      <circle cx="17.5" cy="12" r="1.9" fill="currentColor" />
    </svg>
  ),
};

/**
 * A radial integrations map with Backlot at the center and model/tool tiles
 * orbiting on two rings:
 *   - inner ring: currently-integrated foundation models (Claude, Gemini, Veo)
 *   - outer ring: roadmap items rendered with a softer dashed treatment
 *
 * Tiles are positioned purely via CSS transforms driven by `--orbit-angle`
 * and `--orbit-radius` custom properties, so the whole thing scales fluidly
 * with the orbit container's size.
 */
export function EcosystemOrbit({ ecosystem }) {
  return (
    <div className={styles.orbitField}>
      {/* Dotted guide rings — pure decoration, hidden from a11y tree. */}
      <svg
        className={styles.orbitRings}
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <circle
          cx="300"
          cy="300"
          r="150"
          fill="none"
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        <circle
          cx="300"
          cy="300"
          r="260"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      </svg>

      {/* Center halo — three staggered ripples spread outward on a 6s cycle
          so there's always a wave mid-flight, reading like a radar ping. */}
      <div className={styles.orbitCenterGlow} aria-hidden>
        <span
          className={styles.orbitCenterPulse}
          style={{ animationDelay: "0s" }}
        />
        <span
          className={styles.orbitCenterPulse}
          style={{ animationDelay: "-2s" }}
        />
        <span
          className={styles.orbitCenterPulse}
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className={styles.orbitCenter}>
        <span className={styles.orbitCenterMark}>B</span>
        <span className={styles.orbitCenterLabel}>Backlot</span>
      </div>

      {ecosystem.items.map((item) => {
        const radius = item.ring === "inner" ? "150px" : "260px";
        const ringClass =
          item.ring === "inner" ? styles.orbitTileInner : styles.orbitTileOuter;
        const statusClass =
          item.status === "soon" ? styles.orbitTileSoon : styles.orbitTileLive;

        return (
          <div
            key={item.id}
            className={`${styles.orbitTile} ${ringClass} ${statusClass}`}
            style={{
              "--orbit-angle": `${item.angle}deg`,
              "--orbit-radius": radius,
            }}
          >
            <span className={styles.orbitTileGlyph}>
              {ECOSYSTEM_GLYPHS[item.iconKey]}
            </span>
            <span className={styles.orbitTileLabel}>{item.label}</span>
          </div>
        );
      })}

      {/* Tiny legend, aligned under the orbit */}
      <div className={styles.orbitLegend} aria-hidden>
        <span className={styles.legendDot} data-kind="live" />
        <span className={styles.legendText}>{ecosystem.legend.live}</span>
        <span className={styles.legendSep}>·</span>
        <span className={styles.legendDot} data-kind="soon" />
        <span className={styles.legendText}>{ecosystem.legend.soon}</span>
      </div>
    </div>
  );
}

export default EcosystemOrbit;
