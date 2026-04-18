import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FilmsPage.module.css";

/**
 * Screening Room — personal film appreciation archive.
 * Ten films I keep coming back to, ranked by how often I rewatch them
 * rather than any objective "greatness" — this is a shelf, not a canon.
 */
const FILMS = [
  {
    id: 1,
    title: "Whiplash",
    director: "Damien Chazelle",
    year: 2014,
    rating: 5,
    genre: "Music Drama",
    note:
      "Chazelle weaponized a drum kit into a 106-minute argument about obsession. \"Not my tempo\" is the cruelest three-word performance direction ever filmed. The final nine minutes are a duet between actor and editor.",
  },
  {
    id: 2,
    title: "Little Miss Sunshine",
    director: "Jonathan Dayton & Valerie Faris",
    year: 2006,
    rating: 5,
    genre: "Family Comedy-Drama",
    note:
      "A van that won't start, a family that shouldn't work. The beauty pageant finale is the warmest middle finger to conformity American cinema has ever thrown. I rewatch it whenever I feel like I'm not enough.",
  },
  {
    id: 3,
    title: "Scent of a Woman",
    director: "Martin Brest",
    year: 1992,
    rating: 5,
    genre: "Drama",
    note:
      "Pacino's \"Hoo-ah\" is the Stanley Kowalski scream of its generation, but the tango scene is what I actually remember — a blind colonel teaching a boy that some things you just have to feel your way through.",
  },
  {
    id: 4,
    title: "The Banshees of Inisherin",
    director: "Martin McDonagh",
    year: 2022,
    rating: 5,
    genre: "Tragic Comedy",
    note:
      "A friendship ending over nothing, on an island that exists outside time. McDonagh makes cruelty funny and then makes you feel awful for laughing. Colin Farrell's face is the whole film.",
  },
  {
    id: 5,
    title: "Howl's Moving Castle",
    director: "Hayao Miyazaki",
    year: 2004,
    rating: 5,
    genre: "Animated Fantasy",
    note:
      "Miyazaki's most maximalist film — war, curses, a walking Victorian house, and a love story that aged a teenage girl into her nineties. I rewatch it whenever the world starts to feel mechanical.",
  },
  {
    id: 6,
    title: "The Irishman",
    director: "Martin Scorsese",
    year: 2019,
    rating: 5,
    genre: "Crime Epic",
    note:
      "Three and a half hours that earn every minute. The last twenty are among the quietest, saddest things Scorsese has ever filmed. De Niro eating alone in that nursing-home room breaks me every time.",
  },
  {
    id: 7,
    title: "Spider-Man: No Way Home",
    director: "Jon Watts",
    year: 2021,
    rating: 5,
    genre: "Superhero / Multiverse",
    note:
      "A movie that knows exactly what it is and what it means to the audience. When the three of them stand on the Statue of Liberty together, two decades of superhero filmmaking collapse into a single collective gasp.",
  },
  {
    id: 8,
    title: "Captain America: Civil War",
    director: "Anthony & Joe Russo",
    year: 2016,
    rating: 5,
    genre: "Superhero",
    note:
      "The airport battle is still the best superhero action sequence ever choreographed. But the heart is Zemo — a villain whose entire plan is to remind friends of what friends are capable of doing to each other.",
  },
  {
    id: 9,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    rating: 5,
    genre: "Superhero / Crime Thriller",
    note:
      "Heath Ledger redefined what a comic-book antagonist could be. \"Why so serious?\" is the moment superhero movies grew up and refused to be toys again. The interrogation scene is a two-hander for the ages.",
  },
  {
    id: 10,
    title: "The Lord of the Rings Trilogy",
    director: "Peter Jackson",
    year: 2003,
    rating: 5,
    genre: "Epic Fantasy",
    note:
      "Not a trilogy — a pilgrimage. Jackson turned Tolkien into a landscape you can walk through. Every year I do all three extended cuts in one weekend. Every year Boromir still dies and I still care.",
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
      <Link className="noir-back-portals" to="/noir-uni?skip=intro">← Noir Universe</Link>

      <header className={styles.masthead}>
        <p className={styles.kicker}>ACT II</p>
        <h1 className={styles.title}>Screening Room</h1>
        <p className={styles.subtitle}>Ten films I keep coming back to — the ones that shaped how I watch everything else</p>
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
