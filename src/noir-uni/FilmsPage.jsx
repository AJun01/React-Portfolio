import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FilmsPage.module.css";

/**
 * Screening Room — personal film appreciation archive.
 * Replace FILMS entries with your own picks and notes.
 */
const FILMS = [
  {
    id: 1,
    title: "Chinatown",
    director: "Roman Polanski",
    year: 1974,
    rating: 5,
    genre: "Neo-Noir",
    note:
      "The purest noir ever made. Evaton's arc is a masterclass in dramatic irony — we know exactly what he doesn't, and it destroys us anyway. The final line is cinema.",
  },
  {
    id: 2,
    title: "Blade Runner 2049",
    director: "Denis Villeneuve",
    year: 2017,
    rating: 5,
    genre: "Sci-Fi Noir",
    note:
      "Villeneuve understood that the original wasn't about replicants — it was about longing. 2049 extends that into something even lonelier and more beautiful.",
  },
  {
    id: 3,
    title: "Parasite",
    director: "Bong Joon-ho",
    year: 2019,
    rating: 5,
    genre: "Social Thriller",
    note:
      "A genre film that refuses to be one genre. Every rewatch reveals another layer of visual foreshadowing Bong planted in the architecture itself.",
  },
  {
    id: 4,
    title: "The Double Life of Véronique",
    director: "Krzysztof Kieślowski",
    year: 1991,
    rating: 5,
    genre: "Drama",
    note:
      "Not a story you follow — a feeling you inhabit. Irène Jacob carries something ineffable in every frame. I can't explain why it moves me, which is the point.",
  },
  {
    id: 5,
    title: "No Country for Old Men",
    director: "Coen Brothers",
    year: 2007,
    rating: 5,
    genre: "Neo-Noir Thriller",
    note:
      "Anton Chigurh isn't a villain. He's an argument. The Coens film McCarthy's fatalism with such restraint that the violence hits harder for what they leave out.",
  },
  {
    id: 6,
    title: "In the Mood for Love",
    director: "Wong Kar-wai",
    year: 2000,
    rating: 5,
    genre: "Romance Drama",
    note:
      "A film about what isn't said, what isn't done. Every slow-motion staircase descent is a love scene. Wong Kar-wai proved restraint is the most romantic choice.",
  },
  {
    id: 7,
    title: "Mulholland Drive",
    director: "David Lynch",
    year: 2001,
    rating: 5,
    genre: "Surrealist Noir",
    note:
      "Hollywood as a machine that eats people. The dream logic isn't confusion — it's the only honest way to depict desire, failure, and Los Angeles.",
  },
  {
    id: 8,
    title: "There Will Be Blood",
    director: "Paul Thomas Anderson",
    year: 2007,
    rating: 5,
    genre: "Epic Drama",
    note:
      "Daniel Plainview might be the most complete portrait of American ambition ever filmed. DDL doesn't act in this — he becomes.",
  },
];

function Stars({ count }) {
  return (
    <span className={styles.stars} aria-label={`${count} out of 5`}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function FilmsPage() {
  const [active, setActive] = useState(FILMS[0]);

  return (
    <div className={styles.page}>
      <Link className="noir-back-portals" to="/noir-uni">← Noir Universe</Link>

      <header className={styles.masthead}>
        <p className={styles.kicker}>ACT II</p>
        <h1 className={styles.title}>Screening Room</h1>
        <p className={styles.subtitle}>A personal archive of films worth remembering</p>
        <div className={styles.rule} />
      </header>

      <main className={styles.main}>
        {/* ── Left: film list ──────────────────────────────── */}
        <nav className={styles.filmList} aria-label="Film list">
          {FILMS.map((film) => (
            <button
              key={film.id}
              className={`${styles.filmRow}${active.id === film.id ? ` ${styles.filmRowActive}` : ""}`}
              onClick={() => setActive(film)}
              aria-pressed={active.id === film.id}
            >
              <span className={styles.filmYear}>{film.year}</span>
              <span className={styles.filmTitle}>{film.title}</span>
              <span className={styles.filmGenreBadge}>{film.genre}</span>
            </button>
          ))}
        </nav>

        {/* ── Right: selected film detail ───────────────────── */}
        <article className={styles.detail} key={active.id}>
          <div className={styles.detailHeader}>
            <p className={styles.detailGenre}>{active.genre}</p>
            <h2 className={styles.detailTitle}>{active.title}</h2>
            <p className={styles.detailMeta}>
              {active.director} · {active.year}
            </p>
            <Stars count={active.rating} />
          </div>
          <div className={styles.detailDivider} />
          <blockquote className={styles.detailNote}>{active.note}</blockquote>
          <p className={styles.detailCue}>— Personal note</p>
        </article>
      </main>

      <p className={styles.footer}>REEL CHANGE.</p>
    </div>
  );
}
