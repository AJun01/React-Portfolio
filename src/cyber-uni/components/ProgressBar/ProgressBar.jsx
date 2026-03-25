import React, { useRef, useCallback, useEffect } from 'react';
import progressLogo from '../../../assets/cyber/progressLogo.svg';
import { CYBER_ROUTES } from '../../routes';
import styles from './ProgressBar.module.css';

// Milestone positions as fractions of total maxScroll (= 11 × vw).
// Snap points: Opening=0, About=4vw, Skills=9vw, Projects=10vw, Contact=11vw
const MILESTONES = [
  { label: 'OPENING', section: 'opening', frac:  0 / 11, icon: null, iconAlt: '' },
  ...CYBER_ROUTES.map((r) => {
    const frac = { about: 4 / 11, skills: 9 / 11, projects: 10 / 11, contact: 11 / 11 }[r.section];
    return { label: r.label, section: r.section, frac, icon: r.icon, iconAlt: r.iconAlt };
  }),
];

/**
 * Props:
 *   fraction      {number}   0‒1, current scroll position
 *   onSeek        {function} (frac: number, isDragging: boolean) => void
 *   activeSection {string}   currently visible section key
 */
export default function ProgressBar({ fraction, onSeek, activeSection }) {
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const getFraction = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return 0;
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, []);

  // ── Mouse drag ───────────────────────────────────────────────────
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
    onSeek(getFraction(e.clientX), true);
  }, [onSeek, getFraction]);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    onSeek(getFraction(e.clientX), true);
  }, [onSeek, getFraction]);

  const onMouseUp = useCallback((e) => {
    if (!dragging.current) return;
    dragging.current = false;
    onSeek(getFraction(e.clientX), false);
  }, [onSeek, getFraction]);

  // ── Touch drag ───────────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    dragging.current = true;
    onSeek(getFraction(e.touches[0].clientX), true);
  }, [onSeek, getFraction]);

  const onTouchMove = useCallback((e) => {
    if (!dragging.current) return;
    e.preventDefault();
    onSeek(getFraction(e.touches[0].clientX), true);
  }, [onSeek, getFraction]);

  const onTouchEnd = useCallback((e) => {
    if (!dragging.current) return;
    dragging.current = false;
    onSeek(getFraction(e.changedTouches[0].clientX), false);
  }, [onSeek, getFraction]);

  // Global mouse listeners so drag works outside the track
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const handleTrackClick = useCallback((e) => {
    if (dragging.current) return;
    onSeek(getFraction(e.clientX), false);
  }, [onSeek, getFraction]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={trackRef}
        className={styles.track}
        onClick={handleTrackClick}
      >
        {/* Filled portion */}
        <div
          className={styles.fill}
          style={{ width: `${fraction * 100}%` }}
        />

        {/* Section milestone markers — now clickable icon buttons */}
        {MILESTONES.map(({ label, section, frac, icon, iconAlt }) => {
          const isActive = section === activeSection;
          return (
            <button
              key={section}
              className={`${styles.milestone}${isActive ? ` ${styles.milestoneActive}` : ''}`}
              style={{ left: `${frac * 100}%` }}
              title={label}
              aria-label={`Jump to ${label}`}
              onClick={(e) => {
                e.stopPropagation();
                onSeek(frac, false);
              }}
            >
              {icon ? (
                <img src={icon} alt={iconAlt} className={styles.milestoneIcon} />
              ) : (
                <span className={styles.milestoneDot} aria-hidden="true" />
              )}
              <span className={styles.milestoneLabel}>{label}</span>
            </button>
          );
        })}

        {/* Draggable thumb — progressLogo.svg with glow */}
        <div
          className={styles.thumb}
          style={{ left: `${fraction * 100}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img src={progressLogo} alt="current position" className={styles.thumbIcon} />
        </div>
      </div>
    </div>
  );
}
