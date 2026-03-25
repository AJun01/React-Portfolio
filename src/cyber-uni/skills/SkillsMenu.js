import React, { useState, useEffect, useRef } from 'react';
import styles from './SkillsMenu.module.css';
import skills from './skillsData';
import frontendIcon from '../../assets/cyber/front.png';
import backendIcon  from '../../assets/cyber/back.png';

const LEVEL_COUNT = 6;
// ← TUNE: how long after panel is visible before first segment starts charging
const CHARGE_DELAY_MS    = 1000;
// Stagger between each segment (ms)
const SEGMENT_STAGGER_MS = 120;
// Timer to flip to static filled: delay + all segments finish (5*stagger + 500ms anim)
const CHARGE_DURATION_MS = SEGMENT_STAGGER_MS * (6 - 1) + 600; // ~1200ms

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      className={styles.columnSvgIcon} aria-hidden="true">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      className={styles.columnSvgIcon} aria-hidden="true">
      <path d="M12 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v2h1a2 2 0 0 1 0 4h-1v2a2 2 0 0 1-2 2h-2v1a2 2 0 0 1-4 0v-1H8a2 2 0 0 1-2-2v-2H5a2 2 0 0 1 0-4h1V7a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const COLUMNS = [
  { id: 1, label: 'FRONT-END',      iconType: 'img', icon: frontendIcon, color: 'cyan'   },
  { id: 2, label: 'BACK-END',       iconType: 'img', icon: backendIcon,  color: 'pink'   },
  { id: 3, label: 'CLOUD & DEVOPS', iconType: 'svg', icon: CloudIcon,    color: 'amber'  },
  { id: 4, label: 'AI & AGENTS',    iconType: 'svg', icon: AiIcon,       color: 'violet' },
];

export default function SkillsMenu({ isVisible }) {
  const delayTimer  = useRef(null);
  const chargeTimer = useRef(null);

  // charged: false = play charge animation, true = static filled
  const [charged, setCharged] = useState(true);

  useEffect(() => {
    if (isVisible) {
      // Reset charge state so animation re-plays
      setCharged(false);
      clearTimeout(delayTimer.current);
      clearTimeout(chargeTimer.current);
      // Wait for panel entrance animation, THEN start charging
      delayTimer.current = setTimeout(() => {
        setCharged(false); // ensure still false (no-op if already false)
        chargeTimer.current = setTimeout(() => setCharged(true), CHARGE_DURATION_MS);
      }, CHARGE_DELAY_MS);
    } else {
      // Panel left — reset so it re-animates on next entry
      clearTimeout(delayTimer.current);
      clearTimeout(chargeTimer.current);
      setCharged(true);
    }
    return () => {
      clearTimeout(delayTimer.current);
      clearTimeout(chargeTimer.current);
    };
  }, [isVisible]);

  return (
    <div className={styles.root}>
      <p className={styles.header}>[ SKILL MATRIX · SYSTEM SCAN ]</p>

      <div className={styles.grid}>
        {COLUMNS.map(({ id, label, iconType, icon: Icon, color }, colIdx) => (
          <div
            key={id}
            className={`${styles.column} ${styles[`col_${color}`]}${
              isVisible ? ` ${styles.columnVisible}` : ''
            }`}
            style={{ transitionDelay: isVisible ? `${colIdx * 0.08}s` : '0s' }}
          >
            <div className={styles.columnHeader}>
              {iconType === 'img'
                ? <img src={Icon} alt={label} className={styles.columnIcon} />
                : <Icon />}
              <span className={styles.columnLabel}>{label}</span>
            </div>

            <div className={styles.skillList}>
              {skills[id].map((skill) => (
                <div key={skill.title} className={styles.skillRow}>
                  <span className={styles.skillName}>{skill.title}</span>
                  <div className={styles.levelBar}>
                    {[...Array(LEVEL_COUNT)].map((_, i) => {
                      const isFilled = i < skill.level;
                      return (
                        <div
                          key={i}
                          className={`${styles.segment} ${
                            isFilled
                              ? charged ? styles.segmentFilled : styles.segmentCharging
                              : styles.segmentEmpty
                          }`}
                          style={isFilled && !charged
                            // stagger: segment 0 starts at CHARGE_DELAY, each next +120ms
                            ? { animationDelay: `${CHARGE_DELAY_MS + i * SEGMENT_STAGGER_MS}ms` }
                            : undefined}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
