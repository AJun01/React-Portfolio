import React, {
  useState, useEffect, useRef, useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import BackToPortals from "./components/BackToPortals";
import openingVideo from "../assets/noir/opening_scrub.mp4";
import styles from "./NoirHub.module.css";

// ── Scroll + video constants ──────────────────────────────────────
// SPACER_VH: how many viewport-heights to scroll through the opening video.
// Noir video is ~16s (vs cyber's 30s), so we need a longer spacer to give
// the same "pixels per video-frame" ratio → same smoothness feel.
// Formula: SPACER_VH ≈ (videoDuration / 30) × cyber_SPACER_VW × (vw/vh)
// Using 5 gives ~8px per frame at a 900px-tall viewport (matches cyber).
const SPACER_VH  = 5;    // ← TUNE (increase if still too fast)
// Fraction of spacer used for actual video scrubbing (rest = fade-to-black)
const PHASE1_END = 0.85; // ← TUNE
// Max seconds of video advanced per real second in the lerp loop.
// Slightly lower than cyber (2.0) since the video is shorter — prevents
// over-shooting on fast trackpad swipes.
const SEEK_MAX_RATE = 1.5; // ← TUNE

const ACTS = [
  {
    act: "ACT I",
    slug: "backlot",
    title: "Backlot",
    subtitle: "Film Maker",
    logline:
      "An AI-powered film production tool — from script breakdown to shot lists. Built with Python, FastAPI, and LlamaIndex.",
    cue: "ENTER PRODUCTION",
  },
  {
    act: "ACT II",
    slug: "films",
    title: "Screening Room",
    subtitle: "Film Appreciation",
    logline:
      "A curated archive of films that shaped how I think about storytelling, composition, and the craft behind every frame.",
    cue: "VIEW ARCHIVE",
  },
  {
    act: "ACT III",
    slug: "novels",
    title: "The Shelf",
    subtitle: "Fiction & Writing",
    logline:
      "Original short fiction and long-form prose — noir detective pieces, speculative fiction, and the occasional unreliable narrator.",
    cue: "OPEN SHELF",
  },
];

export default function NoirHub() {
  const navigate   = useNavigate();
  const vidRef     = useRef(null);
  const rafRef     = useRef(null);         // scroll rAF throttle
  const targetRef  = useRef(0);            // desired video time
  const seekLoopId = useRef(null);         // lerp rAF id
  const [hovered,        setHovered]        = useState(null);
  const [videoFilter,    setVideoFilter]    = useState("none");
  const [hintOpacity,    setHintOpacity]    = useState(1);
  const [contentVisible, setContentVisible] = useState(false);

  // ── Lerp seek loop (same pattern as cyber-uni) ─────────────────
  const startSeekLoop = useCallback(() => {
    if (seekLoopId.current) return;
    const loop = () => {
      const vid = vidRef.current;
      if (!vid || !isFinite(vid.duration)) { seekLoopId.current = null; return; }
      const diff = targetRef.current - vid.currentTime;
      if (Math.abs(diff) > 0.03) {
        const maxStep = SEEK_MAX_RATE / 60;
        const step    = Math.sign(diff) * Math.min(Math.abs(diff) * 0.3, maxStep);
        const next    = Math.max(0, Math.min(vid.duration, vid.currentTime + step));
        if (typeof vid.fastSeek === "function") vid.fastSeek(next);
        else vid.currentTime = next;
        seekLoopId.current = requestAnimationFrame(loop);
      } else {
        seekLoopId.current = null;
      }
    };
    seekLoopId.current = requestAnimationFrame(loop);
  }, []);

  // ── Scroll handler ─────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const sy  = window.scrollY;
      const vh  = window.innerHeight;
      const spacerPx  = SPACER_VH * vh;
      const phase1Px  = PHASE1_END * spacerPx;

      // ── Scroll hint fades as soon as user scrolls ──────────────
      setHintOpacity(Math.max(0, 1 - sy / (vh * 0.25)));

      // ── Video scrub ────────────────────────────────────────────
      const vid = vidRef.current;
      if (vid && isFinite(vid.duration)) {
        const frac = Math.min(sy / phase1Px, 1);
        targetRef.current = frac * vid.duration;
        startSeekLoop();
      }

      // ── Phase 2: fade video to black, reveal content ───────────
      if (sy >= spacerPx) {
        setVideoFilter("brightness(0)");
        setContentVisible(true);
      } else if (sy >= phase1Px) {
        const t      = (sy - phase1Px) / (spacerPx - phase1Px);
        const bright = (1 - t).toFixed(3);
        setVideoFilter(`brightness(${bright})`);
        // Start revealing content a little early (t > 0.6)
        if (t > 0.6) setContentVisible(true);
        else setContentVisible(false);
      } else {
        setVideoFilter("none");
        setContentVisible(false);
      }
    });
  }, [startSeekLoop]);

  // ── Mount: reset scroll, init video, attach listeners ─────────
  useEffect(() => {
    window.scrollTo(0, 0);

    // Hide the browser scrollbar for this page only; restore on unmount
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      html::-webkit-scrollbar { display: none; }
      html { scrollbar-width: none; -ms-overflow-style: none; }
    `;
    document.head.appendChild(styleEl);

    const vid = vidRef.current;
    if (vid) {
      vid.preload     = "auto";
      vid.pause();
      vid.currentTime = 0;
      vid.load();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current)     cancelAnimationFrame(rafRef.current);
      if (seekLoopId.current) cancelAnimationFrame(seekLoopId.current);
      document.head.removeChild(styleEl);
    };
  }, [handleScroll]);

  return (
    <div className={styles.page}>
      {/* ── Fixed background video ─────────────────────────── */}
      <video
        ref={vidRef}
        className={styles.bgVideo}
        style={{ filter: videoFilter }}
        src={openingVideo}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* ── Film grain + vignette ──────────────────────────── */}
      <div className={styles.vignette}   aria-hidden="true" />

      {/* ── "Please scroll to play" hint ──────────────────── */}
      <div
        className={styles.scrollHint}
        style={{ opacity: hintOpacity }}
        aria-hidden="true"
      >
        <span className={styles.hintText}>please&nbsp;scroll&nbsp;to&nbsp;play</span>
        <span className={styles.hintArrow}>↓</span>
      </div>

      {/* ── Scroll spacer — drive video by scrolling ───────── */}
      <div
        className={styles.spacer}
        style={{ height: `${SPACER_VH * 100}vh` }}
        aria-hidden="true"
      />

      {/* ── Chapter select content ─────────────────────────── */}
      <div className={`${styles.hubContent}${contentVisible ? ` ${styles.hubContentVisible}` : ""}`}>
        <BackToPortals />

        <header className={styles.masthead}>
          <p className={styles.kicker}>NOIR UNIVERSE</p>
          <h1 className={styles.title}>Select Your Chapter</h1>
          <div className={styles.rule} />
        </header>

        <main className={styles.acts} aria-label="Chapter navigation">
          {ACTS.map((act, i) => (
            <button
              key={act.slug}
              className={`${styles.actCard}${hovered === i ? ` ${styles.actCardHovered}` : ""}`}
              style={{ transitionDelay: contentVisible ? `${i * 0.08}s` : "0s" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/noir-uni/${act.slug}`)}
              aria-label={`Enter ${act.title}`}
            >
              <span className={styles.accentBar} aria-hidden="true" />
              <span className={styles.actNum}>{act.act}</span>
              <div className={styles.actBody}>
                <p className={styles.actSubtitle}>{act.subtitle}</p>
                <h2 className={styles.actTitle}>{act.title}</h2>
                <p className={styles.actLogline}>{act.logline}</p>
              </div>
              <span className={styles.actCue}>{act.cue} →</span>
            </button>
          ))}
        </main>

        <p className={styles.footer}>FADE IN.</p>
      </div>
    </div>
  );
}
