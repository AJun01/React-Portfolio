import React from "react";
import { Link } from "react-router-dom";
import styles from "./BacklotFooter.module.css";

/**
 * Backlot product page footer.
 *
 * Deliberately NOT a corporate multi-column sitemap. Instead, renders
 * the creator's GitHub-profile-style card (avatar + name + role tags +
 * bio) plus three focused action buttons:
 *   1. GitHub
 *   2. LinkedIn
 *   3. "Find the Creator" → /cyber-uni?to=about (precise scroll-to
 *      the About hero panel on the horizontal-scroll universe page)
 *
 * Matches the noir aesthetic (black cards + 1px white borders + soft
 * backdrop blur) rather than Aurix's neon pill sitemap.
 */

/**
 * Inline SVG icons. Keeping them as React components means:
 *   - no extra network requests / asset pipeline changes
 *   - they inherit `currentColor` so hover states just work
 *   - they're trivially themeable
 */
const IconGithub = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .5C5.73.5.67 5.56.67 11.83c0 5 3.24 9.24 7.74 10.74.57.1.77-.25.77-.55v-2.09c-3.15.68-3.81-1.34-3.81-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.17 1.73 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.51-.29-5.15-1.25-5.15-5.58 0-1.23.44-2.23 1.17-3.02-.12-.29-.51-1.44.11-3 0 0 .95-.31 3.12 1.16.9-.25 1.87-.38 2.83-.38.96 0 1.93.13 2.83.38 2.17-1.47 3.12-1.16 3.12-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.79 1.17 3.02 0 4.34-2.65 5.29-5.17 5.57.41.35.77 1.03.77 2.08v3.08c0 .3.2.66.78.55 4.5-1.5 7.73-5.75 7.73-10.74C23.33 5.56 18.27.5 12 .5z" />
  </svg>
);

const IconLinkedIn = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
  </svg>
);

const IconArrowRight = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export function BacklotFooter({ footer: footerData }) {
  const { profile, roleTags, copyright } = footerData;

  return (
    <footer className={styles.footer} aria-label="Creator footer">
      <div className={styles.card}>
        {/* ─ Left: profile identity (avatar + name + tags + bio) ─ */}
        <div className={styles.profile}>
          <a
            className={styles.avatarLink}
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${profile.name} on GitHub`}
          >
            <img
              src={profile.avatarUrl}
              alt=""
              className={styles.avatar}
              loading="lazy"
            />
            <span className={styles.avatarRing} aria-hidden />
          </a>

          <div className={styles.profileText}>
            <div className={styles.nameRow}>
              <h3 className={styles.name}>{profile.name}</h3>
              <a
                className={styles.handle}
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{profile.handle}
              </a>
            </div>

            {roleTags?.length ? (
              <div className={styles.tagRow} aria-label="Roles">
                {roleTags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <p className={styles.headline}>{profile.headline}</p>
          </div>
        </div>

        {/* ─ Right: action buttons stack ─ */}
        <div className={styles.actions}>
          <a
            className={`${styles.actionBtn} ${styles.actionBtnSocial}`.trim()}
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGithub />
            <span>GitHub</span>
          </a>

          <a
            className={`${styles.actionBtn} ${styles.actionBtnSocial}`.trim()}
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLinkedIn />
            <span>LinkedIn</span>
          </a>

          {/* ─ Hybrid portal button ─
              Two-halves design to foreshadow the universe change:
                - Left half keeps the existing noir white-pill look.
                - Right half is cyber (neon grid + scanline sweep).
                - A sharp rift line + animated lightning bolts sit at
                  the seam, implying "something is tearing the surface."
              The label/arrow use `mix-blend-mode: difference` so their
              color auto-inverts against whichever half they sit over —
              no manual text coloring needed. */}
          <Link
            className={`${styles.actionBtn} ${styles.actionBtnHybrid}`.trim()}
            to="/cyber-uni?to=about"
            aria-label="Find the creator — jump to the Cyber Uni about panel"
          >
            {/* Cyber half bg: neon scanline grid, clipped to right 50% */}
            <span className={styles.hybridCyberHalf} aria-hidden />

            {/* Animated vertical scanline sweep on the cyber half */}
            <span className={styles.hybridScan} aria-hidden />

            {/* Rift — glowing vertical neon seam between the two halves */}
            <span className={styles.hybridRift} aria-hidden />

            {/* Lightning bolts clustered near the right edge.
                Three staggered bolts with chromatic-aberration offsets
                (cyan + magenta) give the classic cyberpunk flicker. */}
            <span className={styles.hybridBolts} aria-hidden>
              <svg
                className={styles.hybridBoltsSvg}
                viewBox="0 0 60 56"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Bolt 1 — cyan, fires first */}
                <path
                  className={`${styles.hybridBolt} ${styles.hybridBoltCyan}`}
                  d="M 30 2 L 18 24 L 26 24 L 14 54"
                  style={{ animationDelay: "0s" }}
                />
                {/* Bolt 2 — magenta, offset for chromatic split */}
                <path
                  className={`${styles.hybridBolt} ${styles.hybridBoltMagenta}`}
                  d="M 32 4 L 20 26 L 28 26 L 16 54"
                  style={{ animationDelay: "-0.15s" }}
                />
                {/* Bolt 3 — secondary cyan fork, different delay/path */}
                <path
                  className={`${styles.hybridBolt} ${styles.hybridBoltCyan}`}
                  d="M 46 10 L 36 26 L 42 26 L 32 50"
                  style={{ animationDelay: "-1.4s" }}
                />
              </svg>
            </span>

            <span className={styles.hybridLabel}>Find the creator</span>
            <span className={styles.hybridArrow} aria-hidden>
              <IconArrowRight />
            </span>
          </Link>
        </div>
      </div>

      <p className={styles.copyright}>{copyright}</p>
    </footer>
  );
}
