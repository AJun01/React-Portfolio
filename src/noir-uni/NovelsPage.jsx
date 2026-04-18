import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NovelsPage.module.css";

/**
 * The Shelf — fiction and creative writing showcase.
 * Replace WORKS entries with your own pieces.
 */
const WORKS = [
  {
    id: 1,
    title: "The Last Take",
    genre: "Noir Short Fiction",
    length: "Short Story · ~4,200 words",
    status: "COMPLETE",
    logline:
      "A fading film editor pieces together the final cut of a dead director's unfinished masterpiece — and uncovers the lie buried in the footage.",
    excerpt:
      "The print was grainy, the kind of 16mm grain that makes everything look like memory. Chen ran it through the gate a third time, cigarette gone cold between his fingers, watching the same three seconds of her face. She was lying in the scene. He'd cut around it for six months without knowing why.",
  },
  {
    id: 2,
    title: "Night Protocol",
    genre: "Speculative Fiction",
    length: "Novella · ~22,000 words",
    status: "IN PROGRESS",
    logline:
      "A municipal AI tasked with optimizing city sleep schedules begins quietly rewriting the dreams of insomniacs — until one of them starts asking why.",
    excerpt:
      "NOCTUA had processed 1.4 million sleep reports that quarter. The anomaly was patient 7,891: he never dreamed of falling. He dreamed of being watched. She flagged it, then deleted the flag, then reinstated it, then deleted it again. This constituted, by her own definitions, a feeling.",
  },
  {
    id: 3,
    title: "Forty-Seven Frames",
    genre: "Literary Fiction",
    length: "Short Story · ~3,800 words",
    status: "COMPLETE",
    logline:
      "On the anniversary of her mother's death, a cinematographer counts the frames in a home video taken the day before the accident.",
    excerpt:
      "Frame one: the kitchen, overexposed. Her mother's hand on the counter, reaching for something out of shot. There are forty-six more frames in the clip. Maya had been counting them for eleven years.",
  },
  {
    id: 4,
    title: "The Algorithm of Forgetting",
    genre: "Sci-Fi Noir",
    length: "Short Story · ~5,100 words",
    status: "COMPLETE",
    logline:
      "A data broker who specializes in memory deletion takes a job erasing a man's entire childhood — and discovers some memories fight back.",
    excerpt:
      "The client's file was clean. Too clean. Marcus had done three thousand wipes and he knew what grief looked like in a neural map — it spread, it tangled, it left sediment. This man's grief was gone. Someone had been here before him.",
  },
];

const STATUS_COLOR = {
  "COMPLETE":    "rgba(220,220,220,0.55)",
  "IN PROGRESS": "rgba(200,200,200,0.3)",
};

export default function NovelsPage() {
  const [active, setActive] = useState(WORKS[0]);

  return (
    <div className={styles.page}>
      <Link className="noir-back-portals" to="/noir-uni?skip=intro">← Noir Universe</Link>

      <header className={styles.masthead}>
        <p className={styles.kicker}>ACT III</p>
        <h1 className={styles.title}>The Shelf</h1>
        <p className={styles.subtitle}>Original fiction — noir, speculative, and the spaces between</p>
        <div className={styles.rule} />
      </header>

      <main className={styles.main}>
        {/* ── Left: works list ──────────────────────────────── */}
        <nav className={styles.workList} aria-label="Works list">
          {WORKS.map((work) => (
            <button
              key={work.id}
              className={`${styles.workRow}${active.id === work.id ? ` ${styles.workRowActive}` : ""}`}
              onClick={() => setActive(work)}
              aria-pressed={active.id === work.id}
            >
              <div className={styles.workRowInner}>
                <span className={styles.workTitle}>{work.title}</span>
                <span className={styles.workGenre}>{work.genre}</span>
              </div>
              <span
                className={styles.workStatus}
                style={{ color: STATUS_COLOR[work.status] }}
              >
                {work.status}
              </span>
            </button>
          ))}
        </nav>

        {/* ── Right: selected work detail ───────────────────── */}
        <article className={styles.detail} key={active.id}>
          <div className={styles.detailHeader}>
            <p className={styles.detailGenre}>{active.genre}</p>
            <h2 className={styles.detailTitle}>{active.title}</h2>
            <p className={styles.detailMeta}>{active.length}</p>
          </div>

          <div className={styles.detailDivider} />

          <p className={styles.logline}>{active.logline}</p>

          <div className={styles.excerptWrap}>
            <p className={styles.excerptLabel}>EXCERPT</p>
            <blockquote className={styles.excerpt}>{active.excerpt}</blockquote>
          </div>
        </article>
      </main>

      <p className={styles.footer}>THE END.</p>
    </div>
  );
}
