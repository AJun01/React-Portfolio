import React from "react";
import styles from "./StoryboardFilmstrip.module.css";
import { SHOT_SRC } from "../content/storyboard";

/**
 * Cinematic horizontal filmstrip for a production storyboard.
 *
 * - Renders the track twice back-to-back and animates translateX 0 → -50% so the
 *   loop is visually seamless.
 * - Animation is paused by default; runs while the filmstrip is hovered or has
 *   focus-within. Fully respects prefers-reduced-motion.
 *
 * @param {{ storyboard: import("../content/storyboard").default }} props
 */
export function StoryboardFilmstrip({ storyboard }) {
  const copies = [
    { key: "a", ariaHidden: false },
    { key: "b", ariaHidden: true },
  ];

  return (
    <div className={styles.filmstripVisual}>
      <div className={styles.filmstripHeader}>
        <span className={styles.filmstripTag}>{storyboard.id}</span>
        <span className={styles.filmstripTitle}>{storyboard.title}</span>
        <span className={styles.filmstripHint} aria-hidden>
          hover to scrub
        </span>
      </div>

      <div className={styles.track}>
        {copies.map((copy) => (
          <React.Fragment key={copy.key}>
            {storyboard.scenes.map((scene) => (
              <section
                key={`${copy.key}-${scene.id}`}
                className={styles.sceneGroup}
                aria-hidden={copy.ariaHidden}
              >
                <div className={styles.sceneTag}>
                  <span className={styles.sceneTagId}>{scene.id}</span>
                  <span className={styles.sceneTagSlug}>{scene.slugline}</span>
                  <span
                    className={`${styles.sceneTagCont} ${
                      scene.continuity === "continuous"
                        ? styles.sceneTagContLinked
                        : ""
                    }`}
                  >
                    {scene.continuity === "continuous" ? "Continuous" : "Cut"}
                  </span>
                </div>

                <div className={styles.sceneShots}>
                  {scene.shots.map((shot) => (
                    <figure
                      key={`${copy.key}-${scene.id}-${shot.id}`}
                      className={styles.frame}
                    >
                      <img
                        className={styles.frameImg}
                        src={SHOT_SRC[shot.file]}
                        alt={
                          copy.ariaHidden
                            ? ""
                            : `${scene.id} shot ${shot.id} — ${shot.framing}, ${shot.move}`
                        }
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption className={styles.frameMeta}>
                        <span className={styles.frameId}>
                          {scene.id}.{shot.id}
                        </span>
                        <span>{shot.framing}</span>
                        <span className={styles.frameMove}>{shot.move}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default StoryboardFilmstrip;
