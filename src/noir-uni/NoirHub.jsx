import React, {
  useState, useEffect, useRef, useCallback,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const skipIntro  = searchParams.get("skip") === "intro";
  const vidRef     = useRef(null);
  const rafRef     = useRef(null);         // scroll rAF throttle
  const targetRef  = useRef(0);            // desired video time
  const seekLoopId = useRef(null);         // lerp rAF id
  const handleScrollRef = useRef(() => {});// holds latest handleScroll
  const [hovered,        setHovered]        = useState(null);
  const [videoFilter,    setVideoFilter]    = useState(skipIntro ? "brightness(0)" : "none");
  const [hintOpacity,    setHintOpacity]    = useState(skipIntro ? 0 : 1);
  const [contentVisible, setContentVisible] = useState(skipIntro);

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
        // Re-evaluate the content-reveal gate: if the user had already
        // scrolled past the fade threshold but we were holding the
        // chapter-select hidden because the video wasn't at its last
        // frame yet, this is the moment to let it in.
        handleScrollRef.current();
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

      const vid = vidRef.current;

      // ── Video scrub ────────────────────────────────────────────
      // Normal mode: scrub frame-by-frame as scrollY progresses.
      // Fast-scroll fix: if the user has already scrolled past the
      // end of the spacer but the lerp seek hasn't caught up yet,
      // snap the video to its final frame immediately so the content
      // reveal below isn't blocked waiting for the lerp.
      if (vid && isFinite(vid.duration)) {
        if (sy >= spacerPx) {
          if (vid.currentTime < vid.duration - 0.05) {
            targetRef.current = vid.duration;
            vid.currentTime = vid.duration;
          }
        } else {
          const frac = Math.min(sy / phase1Px, 1);
          targetRef.current = frac * vid.duration;
          startSeekLoop();
        }
      }

      // Compute "is video actually at its last frame?" AFTER the
      // potential snap above, so a fast scroll-past immediately
      // unlocks the content reveal on the very same frame.
      const videoAtEnd =
        !!vid &&
        isFinite(vid.duration) &&
        vid.currentTime >= vid.duration - 0.08;

      // ── Phase 2: fade video to black, reveal content ───────────
      // Content reveal is gated on BOTH "user scrolled past" AND
      // "video is visibly at the last frame" — this prevents the
      // awkward race where the chapter-select slides in over a
      // mid-scrub video frame when the user swipes through fast.
      if (sy >= spacerPx) {
        setVideoFilter("brightness(0)");
        setContentVisible(videoAtEnd);
      } else if (sy >= phase1Px) {
        const t      = (sy - phase1Px) / (spacerPx - phase1Px);
        const bright = (1 - t).toFixed(3);
        setVideoFilter(`brightness(${bright})`);
        // Start revealing a little early (t > 0.6) ONLY once the
        // video has actually reached the end frame — otherwise hold.
        setContentVisible(t > 0.6 && videoAtEnd);
      } else {
        setVideoFilter("none");
        setContentVisible(false);
      }
    });
  }, [startSeekLoop]);

  // Keep the ref pointing at the latest handleScroll so the seek lerp
  // can trigger a reveal re-check when it finishes catching up.
  useEffect(() => {
    handleScrollRef.current = handleScroll;
  }, [handleScroll]);

  // ── Mount: reset scroll, init video, attach listeners ─────────
  // Snapshot the URL intent into a ref so this effect runs exactly
  // once on mount (setSearchParams below would otherwise retrigger it).
  const skipIntroRef = useRef(skipIntro);
  useEffect(() => {
    // If the user is returning from a sub-page (?skip=intro), drop them
    // straight into the chapter-select area instead of replaying the
    // opening scrub video. Otherwise start at the very top.
    const shouldSkip = skipIntroRef.current;
    const vh = window.innerHeight;
    const spacerPx = SPACER_VH * vh;
    if (shouldSkip) {
      window.scrollTo(0, spacerPx + 1);
      // Strip ?skip=intro from the URL so a later manual refresh still
      // plays the full intro.
      setSearchParams({}, { replace: true });
    } else {
      window.scrollTo(0, 0);
    }

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
      if (shouldSkip) {
        // Park the video at its last frame so the "past spacer" visual
        // state matches (fully faded to black, video at the end).
        // Duration may not be known until metadata loads, so wait.
        const setEnd = () => {
          if (isFinite(vid.duration) && vid.duration > 0) {
            vid.currentTime = vid.duration;
          }
        };
        if (isFinite(vid.duration) && vid.duration > 0) setEnd();
        else vid.addEventListener("loadedmetadata", setEnd, { once: true });
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current)     cancelAnimationFrame(rafRef.current);
      if (seekLoopId.current) cancelAnimationFrame(seekLoopId.current);
      document.head.removeChild(styleEl);
    };
  }, [handleScroll, setSearchParams]);

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
