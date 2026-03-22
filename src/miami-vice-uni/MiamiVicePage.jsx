import React from "react";
import BackToPortals from "./components/BackToPortals";
import { MIAMI_VICE } from "./content/miamiVice";
import portalHero from "../assets/MiamiVice/portal.png";
import styles from "./MiamiVicePage.module.css";

export default function MiamiVicePage() {
  const { pageKicker, title, pageTagline, subtitle, scenes, footerNote } =
    MIAMI_VICE;

  return (
    <div className={styles.page}>
      <BackToPortals />
      <div className={styles.inner}>
        <header className={styles.hero}>
          <div className={styles.heroImageWrap}>
            <img className={styles.heroImage} src={portalHero} alt="" />
          </div>
          <div className={styles.heroText}>
            <p className={styles.kicker}>{pageKicker}</p>
            <h1 className={styles.h1}>{title}</h1>
            <p className={styles.tagline}>{pageTagline}</p>
            <p className={styles.badge}>
              <span className={styles.badgeDot} />
              {subtitle}
            </p>
          </div>
        </header>

        <hr className={styles.divider} />

        <section className={styles.scenes} aria-label="Miami Vice universe">
          {scenes.map((s) => (
            <article
              key={s.act}
              className={styles.scene}
              data-act={s.act}
            >
              <p className={styles.scenePhase}>{s.phase}</p>
              <h2 className={styles.sceneTitle}>{s.title}</h2>
              <p className={styles.sceneBody}>{s.body}</p>
              <p className={styles.sceneMeta}>{s.meta}</p>
            </article>
          ))}
        </section>

        <p className={styles.footerNote}>{footerNote}</p>
      </div>
    </div>
  );
}
