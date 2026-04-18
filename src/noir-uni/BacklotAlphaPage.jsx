import React from "react";
import { Link } from "react-router-dom";
import { BACKLOT_ALPHA } from "./content/backlotAlpha";
import styles from "./BacklotAlphaPage.module.css";

export default function BacklotAlphaPage() {
  const {
    pageKicker,
    title,
    pageTagline,
    storyboard,
    footerNote,
    hintAction,
    subtitle,
  } = BACKLOT_ALPHA;

  return (
    <div className={styles.page}>
      <Link className="noir-back-portals" to="/noir-uni?skip=intro">← Noir Universe</Link>
      <div className={styles.inner}>
        <header className={styles.masthead}>
          <p className={styles.kicker}>{pageKicker}</p>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.tagline}>{pageTagline}</p>
          <p className={styles.portalEcho}>
            <span className={styles.echoLabel}>{subtitle}</span>
            <span className={styles.echoCue}>{hintAction}</span>
          </p>
        </header>

        <section className={styles.timeline} aria-label="Storyboard timeline">
          {storyboard.map((block) => (
            <article
              key={block.scene}
              className={styles.panel}
              data-scene={block.scene}
            >
              <p className={styles.phase}>{block.phase}</p>
              <h2 className={styles.phaseTitle}>{block.title}</h2>
              <p className={styles.body}>{block.body}</p>
              <p className={styles.meta}>{block.meta}</p>
            </article>
          ))}
        </section>

        <p className={styles.footerNote}>{footerNote}</p>
      </div>
    </div>
  );
}
