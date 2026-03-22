import React from "react";
import BackToPortals from "./components/BackToPortals";
import { PIXEL_REALM } from "./content/pixelRealm";
import portalHero from "../assets/pixel/portal.png";
import styles from "./PixelRealmPage.module.css";

export default function PixelRealmPage() {
  const {
    pageKicker,
    title,
    pageTagline,
    storyboard,
    footerNote,
    hintAction,
    subtitle,
  } = PIXEL_REALM;

  return (
    <div className={styles.page}>
      <BackToPortals />
      <div className={styles.inner}>
        <header className={styles.hero}>
          <img
            className={styles.heroImage}
            src={portalHero}
            alt=""
          />
          <p className={styles.kicker}>{pageKicker}</p>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.tagline}>{pageTagline}</p>
          <p className={styles.portalEcho}>
            <span className={styles.echoLabel}>{subtitle}</span>
            <span className={styles.echoCue}>{hintAction}</span>
          </p>
        </header>

        <section className={styles.timeline} aria-label="Pixel dev log">
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
