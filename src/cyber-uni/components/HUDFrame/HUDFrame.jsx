import React from 'react';
import styles from './HUDFrame.module.css';

/**
 * Pure-CSS cyberpunk HUD frame overlay.
 * Rendered inside uiLayer (pointer-events:none on everything).
 */
export default function HUDFrame() {
  return (
    <div className={styles.frame} aria-hidden="true">

      {/* ── Screen-edge corner brackets ─────────────────────────── */}
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />

      {/* ── PlayerStats surround (top-left panel) ───────────────── */}
      <div className={styles.statsFrame}>
        {/* diagonal cut decoration — bottom-right of stats panel */}
        <div className={styles.statsFrameCut} />
        {/* status badge */}
        <span className={styles.statusBadge}>SYS&nbsp;·&nbsp;ONLINE</span>
        {/* inner tick marks along the top arm */}
        <div className={styles.topTicks}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={styles.tick} />
          ))}
        </div>
      </div>

      {/* ── Top scanning line ───────────────────────────────────── */}
      <div className={styles.scanLine} />

      {/* ── Right-side vertical accent rail ─────────────────────── */}
      <div className={styles.rightRail}>
        <span className={styles.railLabel}>SECTOR&nbsp;01</span>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={styles.railTick} />
        ))}
        <span className={styles.railLabel}>SECTOR&nbsp;02</span>
      </div>

      {/* ── Bottom-left coordinate readout ──────────────────────── */}
      <div className={styles.coordReadout}>
        <span>X:&nbsp;000&nbsp;·&nbsp;Y:&nbsp;000</span>
        <span>FRAME&nbsp;LOCKED</span>
      </div>

    </div>
  );
}
