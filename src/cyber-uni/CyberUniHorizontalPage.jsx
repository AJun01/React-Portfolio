import React, {
  useRef, useCallback, useState, useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import openingVideo from '../assets/cyber/opening_scrub.mp4';
import BackToUniverses from './components/Shared/BackToUniverses';
import HUDFrame from './components/HUDFrame/HUDFrame';
import ImageSlot from './components/Experience/ImageSlot';
import psuHero from '../assets/cyber/psu/hero.png';
import psu1 from '../assets/cyber/psu/1.jpg';
import psu2 from '../assets/cyber/psu/2.jpg';
import bu1 from '../assets/cyber/bu/1.jpg';
import bu2 from '../assets/cyber/bu/2.jpg';
import buHero      from '../assets/cyber/bu/hero.png';
import workMosaic  from '../assets/cyber/work/mosaic.png';
import workWowpc   from '../assets/cyber/work/wowpc.png';
import PlayerStats from './playerStats/PlayerStats';
import ProgressBar from './components/ProgressBar/ProgressBar';
import GSocPanel  from './components/GSocPanel/GSocPanel';
import SkillsMenu from './skills/SkillsMenu';
import ProjectsPanel from './projects/ProjectsPanel';
import ContactMenu from './contact/ContactMenu';
import './styles/app.css';
import styles from './CyberUniHorizontalPage.module.css';

// ── Scramble-text hook ─────────────────────────────────────────────
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&*<>[]{}?';
function useScramble(text, active) {
  const [display, setDisplay] = useState(() => text.split('').map(() => '_'));
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearInterval);
    timers.current = [];

    if (!active) {
      setDisplay(text.split('').map(() => '_'));
      return;
    }

    const TICK   = 35;  // ms per scramble tick
    const SETTLE = 65;  // ms per character before it locks

    text.split('').forEach((char, i) => {
      if (char === ' ') {
        setDisplay((prev) => { const n = [...prev]; n[i] = ' '; return n; });
        return;
      }
      const locksAt = Math.floor((i * SETTLE) / TICK);
      let tick = 0;
      const id = setInterval(() => {
        tick++;
        setDisplay((prev) => {
          const n = [...prev];
          if (tick >= locksAt) {
            n[i] = char;
            clearInterval(id);
          } else {
            n[i] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          return n;
        });
      }, TICK);
      timers.current.push(id);
    });

    return () => { timers.current.forEach(clearInterval); };
  }, [active, text]);

  return display;
}

// ── ScrambleText component ──────────────────────────────────────────
function ScrambleText({ text, active, className }) {
  const chars = useScramble(text, active);
  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          data-locked={ch === text[i] ? 'true' : undefined}
          style={{ display: 'inline-block', minWidth: ch === ' ' ? '0.4em' : undefined }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

// ── About section static data ──────────────────────────────────────
const BIRTH_DATE = new Date(2000, 2, 22); // March 24, 2000

function calculateAge(bd) {
  const today = new Date();
  let years = today.getFullYear() - bd.getFullYear();
  const m = today.getMonth() - bd.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) years--;
  return years;
}

// Panel 2 — Pennsylvania State University
const PSU = {
  period:  '2018 — 2022',
  degree:  "Bachelor's in Information Sciences",
  school:  'Pennsylvania State University',
  dept:    'College of Information Sciences and Technology',
  details: [
    'Picked up a passion for software development',
    'Learned skills around technology',
    'Realized my leadership potential',
  ],
};

// Panel 3 — Work Gap (2022 – 2023)
const WORK_GAP = [
  {
    period:   'SEP 2022 — JAN 2023',
    company:  'LeadershipEdge',
    location: 'DE',
    role:     'Full-Stack Software Engineer Intern',
    tech:     ['PHP', 'WordPress', 'MySQL'],
    img:      null, // set after import at render time
    bullets: [
      'Frontend: Dynamic survey website in WordPress with extensive questionnaire UIs',
      'Backend: PHP data API hooks → relational MySQL via MyPHPAdmin',
      'Ads & SEO: YoastSEO optimization → +100 users/week; secured with JetPack',
      'Analytics: Survey data visualizations across lifestyle segments',
    ],
  },
  {
    period:   'JAN 2023 — JUL 2023',
    company:  'Teamwave PC',
    location: 'DE',
    role:     'Technical Trainee',
    tech:     ['JavaScript', 'Wix', 'AWS'],
    img:      null, // set after import at render time
    bullets: [
      'Frontend: Commercial-grade brand marketing website built in Wix',
      'AWS Re-Arch: Migrated enterprise system from Jiandaoyun → serverless AWS stack (S3 + CDN + Lambda + API Gateway)',
    ],
  },
];

// Panel 4 — Boston University
const BU = {
  period:  '2023 — 2025',
  degree:  "Master's in Computer Science",
  school:  'Boston University',
  dept:    'Software Engineering',
  details: [
    'Picked core computer science courses',
    'Gained hands-on experience with software development',
    'Developed a strong foundation in computer science',
  ],
};

// Panel 5 — GSOC: content lives in GSocPanel component

// ── Layout constants ────────────────────────────────────────────────
// Scroll track: 200vw opening spacer + 8 × 100vw content panels = 10 × 100vw
// maxScroll = 9 × vw
//
// Snap points (× 1vw):  0   1   2    3    4    5    6     7     8     9
// Sections:            ←spacer→ hero psu  gap  bu  gsoc  ski  proj  cont
//
// Opening scroll phases (within the 2vw spacer):
//   Phase 1  [0     → 1.4vw]  video scrubs 0→last frame (SPACER×PHASE1_END)
//   Phase 2  [1.4vw → 2.0vw]  freeze + grayscale/blur in + UI fades in
//
// Doubling the spacer gives 2× more scroll distance per second of video
// → smoother scrubbing for longer opening clips.

const SPACER_VW   = 4;     // ← TUNE: more = more scroll per video-frame = smoother
const PHASE1_END  = 0.85;  // ← TUNE: fraction of spacer used for video (rest = fade-to-black)

// Filter applied once phase 2 completes — video becomes pure black,
// leaving content panels floating on a dark canvas (GTA6-style).
const FILTER_MAX  = 'grayscale(100%) blur(2px) brightness(0)';


function getActiveSection(sl, vw) {
  if (sl < SPACER_VW * 0.5 * vw) return 'opening'; // < 2vw
  if (sl < 8.5 * vw)             return 'about';   // panels 4–8
  if (sl < 9.5 * vw)             return 'skills';
  if (sl < 10.5 * vw)            return 'projects';
  return 'contact';
}

// ── Panel-index map for deep links (`?to=<section>`) ───────────────
// Units: multiples of 100vw (the horizontal-scroll container's page width).
//   spacer(4) → hero(4) → psu(5) → gap(6) → bu(7) → gsoc(8) → skills(9)
//   → projects(10) → contact(11)
// Values align with the panel layout comments above and with
// `getActiveSection`. Add more entries as needed.
const DEEP_LINK_TARGETS = {
  about:    SPACER_VW,        // hero panel (AJ name intro)
  psu:      SPACER_VW + 1,
  workgap:  SPACER_VW + 2,
  bu:       SPACER_VW + 3,
  gsoc:     SPACER_VW + 4,
  skills:   SPACER_VW + 5,
  projects: SPACER_VW + 6,
  contact:  SPACER_VW + 7,
};

// ── Main component ──────────────────────────────────────────────────
export default function CyberUniHorizontalPage() {
  const scrollRef     = useRef(null);
  const vidRef        = useRef(null);   // opening.mp4 — the ONLY video
  const rafRef        = useRef(null);
  const snapTimerRef  = useRef(null);   // debounce handle for JS panel snap
  const targetTimeRef = useRef(0);      // desired video time (updated by scroll, consumed by seek loop)
  const seekLoopId    = useRef(null);   // rAF id for the smooth lerp seek loop

  const [fraction,      setFraction]      = useState(0);
  const [activeSection, setActiveSection] = useState('opening');
  const [entryVisible,  setEntryVisible]  = useState([]);
  const [atWorkGap,     setAtWorkGap]     = useState(false);
  const [schoolVis,     setSchoolVis]     = useState({ psu: false, bu: false });
  const [gsocVisible,      setGsocVisible]      = useState(false);
  const [skillsVisible,    setSkillsVisible]    = useState(false);
  const [projectsVisible,  setProjectsVisible]  = useState(false);
  const [heroNameActive,   setHeroNameActive]   = useState(false);

  // CSS filter applied to the fixed video (none → grey/blur → stays at max)
  const [videoFilter,   setVideoFilter]   = useState('none');

  // Opacity for ALL UI chrome + content panels (0 during opening, 1 after)
  const [uiOpacity,     setUiOpacity]     = useState(0);

  const age = calculateAge(BIRTH_DATE);

  // ── Smooth seek loop ──────────────────────────────────────────────
  // Instead of seeking directly on each scroll event (causes big frame jumps),
  // we lerp video.currentTime toward targetTimeRef each rAF frame.
  // Small incremental seeks stay within decoded buffer → silky smooth.
  //
  // ← TUNE: SEEK_MAX_RATE: max seconds of video advanced per real second.
  //         Lower (e.g. 1.5) = smoother but slower catch-up after fast scroll.
  //         Higher (e.g. 4)   = faster catch-up but slightly choppier.
  const SEEK_MAX_RATE = 2.0; // s of video per real second
  const startSeekLoop = useCallback(() => {
    if (seekLoopId.current) return; // loop already running
    const loop = () => {
      const vid = vidRef.current;
      if (!vid || !isFinite(vid.duration)) { seekLoopId.current = null; return; }
      const diff = targetTimeRef.current - vid.currentTime;
      if (Math.abs(diff) > 0.03) {
        // Cap step so video never jumps more than SEEK_MAX_RATE / 60 seconds per frame
        const maxStep = SEEK_MAX_RATE / 60;
        // Also apply a 30% lerp factor so small diffs snap quickly
        const step = Math.sign(diff) * Math.min(Math.abs(diff) * 0.3, maxStep);
        const next = Math.max(0, Math.min(vid.duration, vid.currentTime + step));
        if (typeof vid.fastSeek === 'function') vid.fastSeek(next);
        else vid.currentTime = next;
        seekLoopId.current = requestAnimationFrame(loop);
      } else {
        seekLoopId.current = null;
      }
    };
    seekLoopId.current = requestAnimationFrame(loop);
  }, [SEEK_MAX_RATE]);

  // ── Scroll handler ────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = scrollRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth; // 9 × vw
      if (maxScroll <= 0) return;

      const sl = el.scrollLeft;
      const vw = window.innerWidth;

      // ── Progress bar fraction ─────────────────────────────────────
      setFraction(sl / maxScroll);

      // ── Active section ────────────────────────────────────────────
      setActiveSection(getActiveSection(sl, vw));

      // ── Work Gap panel visibility (6vw snap point) ────────────────
      setAtWorkGap(sl >= 5.5 * vw && sl <= 6.5 * vw);

      // ── School panel visibility (PSU=5vw, BU=7vw) ─────────────────
      setSchoolVis({
        psu: sl >= 4.5 * vw && sl <= 5.5 * vw,
        bu:  sl >= 6.5 * vw && sl <= 7.5 * vw,
      });

      // ── GSOC panel visibility (8vw snap point) ─────────────────────
      setGsocVisible(sl >= 7.5 * vw && sl <= 8.5 * vw);

      // ── Skills panel visibility (9vw snap point) ────────────────────
      setSkillsVisible(sl >= 8.5 * vw && sl <= 9.5 * vw);

      // ── Projects panel visibility (10vw snap point) ──────────────────
      setProjectsVisible(sl >= 9.5 * vw && sl <= 10.5 * vw);

      // ── About Hero name scramble (first content panel ~4vw) ──────────
      setHeroNameActive(sl >= SPACER_VW * vw && sl <= 5 * vw);

      // ── Video scrub: just update target; seek loop handles smoothing ────
      const vid = vidRef.current;
      if (vid && isFinite(vid.duration)) {
        const phase1Scroll = PHASE1_END * SPACER_VW * vw;
        const scrubFrac    = Math.min(sl / phase1Scroll, 1);
        targetTimeRef.current = scrubFrac * vid.duration;
        startSeekLoop();
      }

      // ── Phase 2 filter + UI fade ──────────────────────────────────
      // Transition zone: PHASE1_END × SPACER_VW × vw  →  SPACER_VW × vw
      //                  (1.4 vw)                         (2.0 vw)
      const spacerEnd    = SPACER_VW * vw;
      const phase1End    = PHASE1_END * spacerEnd;
      if (sl >= spacerEnd) {
        setUiOpacity(1);
        setVideoFilter(FILTER_MAX);
      } else if (sl >= phase1End) {
        const t = (sl - phase1End) / (spacerEnd - phase1End);
        setUiOpacity(t);
        const gray   = (t * 100).toFixed(0);
        const blur   = (t * 2).toFixed(1);
        const bright = (1 - t).toFixed(3);
        setVideoFilter(
          `grayscale(${gray}%) blur(${blur}px) brightness(${bright})`
        );
      } else {
        setUiOpacity(0);
        setVideoFilter('none');
      }

      // ── JS panel snap ─────────────────────────────────────────────
      // Full 2vw opening spacer is free-scroll. Past that, snap to grid.
      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        const container = scrollRef.current;
        if (!container) return;
        const cur = container.scrollLeft;
        if (cur < SPACER_VW * window.innerWidth) return; // opening — no snap
        const target = Math.round(cur / window.innerWidth) * window.innerWidth;
        if (Math.abs(target - cur) > 2) {
          container.scrollTo({ left: target, behavior: 'smooth' });
        }
      }, 150);
    });
  }, [startSeekLoop]);

  // ── Listeners ────────────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (rafRef.current)        cancelAnimationFrame(rafRef.current);
      if (snapTimerRef.current)  clearTimeout(snapTimerRef.current);
      if (seekLoopId.current)    cancelAnimationFrame(seekLoopId.current);
    };
  }, [handleScroll]);

  // Convert vertical mouse-wheel to horizontal scroll.
  // Skips elements that actually have vertical overflow (e.g. career list).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const canScrollV = (node) => {
      const ov = window.getComputedStyle(node).overflowY;
      return (ov === 'auto' || ov === 'scroll') && node.scrollHeight > node.clientHeight;
    };

    const onWheel = (e) => {
      const absX   = Math.abs(e.deltaX);
      const absY   = Math.abs(e.deltaY);
      const vw     = window.innerWidth;
      const inSpacer = el.scrollLeft < SPACER_VW * vw;
      // ← TUNE: max px per wheel event while in the opening spacer (lower = slower video)
      const MAX_SPACER_DELTA = 55;

      if (absX > absY * 0.3) {
        // Horizontal swipe — intercept in spacer only to cap speed
        if (inSpacer) {
          e.preventDefault();
          el.scrollLeft += Math.sign(e.deltaX) * Math.min(absX, MAX_SPACER_DELTA);
        }
        return;
      }

      // Vertical wheel → horizontal: skip vertically-scrollable ancestors
      let node = e.target;
      while (node && node !== el) {
        if (canScrollV(node)) return;
        node = node.parentElement;
      }
      e.preventDefault();
      const raw   = e.deltaY;
      const delta = inSpacer
        ? Math.sign(raw) * Math.min(Math.abs(raw), MAX_SPACER_DELTA)
        : raw;
      el.scrollLeft += delta;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Init: ensure video is paused at frame 0 and fully preloaded
  useEffect(() => {
    const vid = vidRef.current;
    if (!vid) return;
    vid.preload = 'auto';
    vid.pause();
    vid.currentTime = 0;
    // Force buffering so fastSeek has frames ready immediately
    vid.load();
  }, []);

  // ── Deep-link: `?to=about` jumps straight to a panel on mount ─────
  // When arriving from an external CTA (e.g. Backlot footer's
  // "Find the creator" button), skip the opening video scrub and land
  // precisely on the requested panel. Uses double-rAF so the scroll
  // container has finished its initial layout before we seek.
  //
  // The existing scroll handler picks up the jumped scrollLeft and
  // updates ui opacity / video filter / active section → no extra
  // state wiring needed here.
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const target = searchParams.get('to');
    if (!target) return;
    const panelIndex = DEEP_LINK_TARGETS[target];
    if (panelIndex == null) return;

    const el = scrollRef.current;
    if (!el) return;

    // Double-rAF → layout + video preload cycle has a chance to settle,
    // otherwise window.innerWidth can briefly report 0 on some browsers
    // during hard-refresh.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        el.scrollLeft = panelIndex * window.innerWidth;
        // Clean the URL so back-nav / share links aren't sticky.
        setSearchParams({}, { replace: true });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
    // Only run on mount — subsequent `searchParams` mutations are our
    // own cleanup and should NOT re-trigger the jump.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Work Gap stagger — triggers whenever the panel enters/leaves view ──
  useEffect(() => {
    if (!atWorkGap) {
      setEntryVisible([]);
      return;
    }
    // Play stagger animation when panel snaps into view
    setEntryVisible([]);
    WORK_GAP.forEach((_, i) => {
      setTimeout(() => {
        setEntryVisible((prev) => {
          const n = [...prev]; n[i] = true; return n;
        });
      }, i * 200);
    });
  }, [atWorkGap]);


  const handleSeek = useCallback((frac, isDragging) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (isDragging) {
      // Direct assignment during drag (no scroll animation)
      el.scrollLeft = frac * maxScroll;
    } else {
      // Smooth scroll to snapped position on release
      const vw     = window.innerWidth;
      const raw    = frac * maxScroll;
      const target = raw < SPACER_VW * vw
        ? raw                                // inside opening spacer: exact position
        : Math.round(raw / vw) * vw;        // content panels: snap to grid
      el.scrollTo({ left: target, behavior: 'smooth' });
    }
  }, []);

  // ── Shared style for content panels (fade in with UI) ────────────
  const panelStyle = { opacity: uiOpacity };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className={styles.pageRoot}>

      {/* ── Fixed background: opening.mp4 (never moves, always fills screen) */}
      {/* Phase 1: scrubbed frame-by-frame via scrollLeft                      */}
      {/* Phase 2+: frozen at last frame with grey/blur filter                 */}
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

      {/* ── Persistent overlays (always visible) ── */}
      <div className={styles.videoOverlay} aria-hidden="true" />
      <div className={styles.scanline}     aria-hidden="true" />
      <div className={styles.vignette}     aria-hidden="true" />

      {/* ── "Scroll to play" hint — fades out the moment user scrolls ── */}
      <div
        className={styles.scrollHint}
        style={{ opacity: Math.max(0, 1 - fraction * 35) }}
        aria-hidden="true"
      >
        <span className={styles.scrollHintText}>scroll&nbsp;to&nbsp;play</span>
        <span className={styles.scrollHintArrow}>›&nbsp;›&nbsp;›</span>
      </div>

      {/* ── UI chrome: fades in during phase 2, invisible during opening ──
           uiLayer stays pointer-events:none always (CSS default) so the
           fixed fullscreen div never blocks trackpad swipes on the scroll
           container. Each interactive child overrides pointer-events in
           its own stylesheet.                                             */}
      <div
        className={styles.uiLayer}
        style={{ opacity: uiOpacity }}
      >
        <HUDFrame />
        <BackToUniverses />
        <PlayerStats />
        <ProgressBar fraction={fraction} onSeek={handleSeek} activeSection={activeSection} />
      </div>

      {/* ── Horizontal scroll container ── */}
      <div ref={scrollRef} className={styles.scrollContainer}>
        <div className={styles.track}>

          {/* 200vw empty spacer — scroll through this to control video */}
          <div className={styles.openingSpacer} aria-hidden="true" />

          {/* ─── Panel: About · Hero ────────────────────────────── */}
          <section className={styles.panel} style={panelStyle} aria-label="About – Hero">
            <div className={styles.contentCenter}>
              <div className={styles.heroContent}>
                <p className={styles.heroLevel}>
                  [ OPERATOR PROFILE · LEVEL {age} ]
                </p>
                <h1 className={styles.heroName}>
                  <ScrambleText text="AJ LIU" active={heroNameActive} className={styles.heroNameScramble} />
                </h1>
                <div className={styles.heroDivider} />
                <p className={styles.heroRole}>FULL-STACK Software Engineer</p>
                <p className={styles.heroTagline}>
                  Curiosity driven, extremely motivated, and a quick learner.
                </p>
              </div>
            </div>
          </section>

          {/* ═══ Panel 2: Pennsylvania State University ══════════
               Layout: text LEFT · image RIGHT (bleeds to edge)     */}
          <section
            className={`${styles.panel}${schoolVis.psu ? ` ${styles.panelSchoolActive}` : ''}`}
            style={panelStyle}
            aria-label="About – Penn State"
          >
            {/* Full-bleed portrait — right half */}
            <div className={styles.expImgRight}>
              <ImageSlot
                src={psuHero}
                alt="Penn State"
                variant="fullBleed"
              />
            </div>

            {/* Text — left half */}
            <div className={styles.expTextLeft}>
              <span className={styles.expEra}>{PSU.period}</span>
              <h2 className={styles.expTitle}>
                PENNSYLVANIA<br />STATE<br />UNIVERSITY
              </h2>
              <p className={styles.expSubtitle}>{PSU.degree}</p>
              <p className={styles.expDept}>{PSU.dept}</p>
              <ul className={styles.expList}>
                {PSU.details.map((d) => (
                  <li key={d} className={styles.expListItem}>
                    <span className={styles.expArrow}>▸</span>{d}
                  </li>
                ))}
              </ul>

              <div className={styles.expThumbs}>
                <ImageSlot src={psu1} alt="PSU photo 1" variant="thumb" />
                <ImageSlot src={psu2} alt="PSU photo 2" variant="thumb" />
              </div>
            </div>

            {/* Bottom-left label strip */}
            <div className={styles.expLabelStrip}>
              <span className={styles.expLabelText}>[ RECORD 01 · EDUCATION ]</span>
            </div>
          </section>

          {/* ═══ Panel 3: Work Gap 2022–2023 ═════════════════════
               Layout: two "dossier case-files" side-by-side        */}
          <section className={styles.panel} style={panelStyle} aria-label="About – Work Gap">
            <div className={styles.dossierLayout}>
              <p className={styles.dossierHeader}>[ WORK GAP · 2022 — 2023 ]</p>

              <div className={styles.dossierFiles}>
                {WORK_GAP.map((c, i) => (
                  <div
                    key={c.role}
                    className={`${styles.dossierFile} ${
                      entryVisible[i] ? styles.dossierFileVisible : ''
                    }`}
                  >
                    {/* Image at top of each file */}
                    <ImageSlot
                      src={[workMosaic, workWowpc][i]}
                      alt={c.company}
                      variant="dossier"
                    />

                    {/* File content */}
                    <div className={styles.dossierBody}>
                      <span className={styles.dossierFileNo}>FILE·0{i + 1} · {c.location}</span>
                      <p className={styles.dossierYear}>{c.period}</p>
                      <p className={styles.dossierCompany}>{c.company}</p>
                      <h3 className={styles.dossierRole}>{c.role}</h3>
                      <div className={styles.dossierTech}>
                        {c.tech.map((t) => (
                          <span key={t} className={styles.dossierTag}>{t}</span>
                        ))}
                      </div>
                      <ul className={styles.dossierBullets}>
                        {c.bullets.map((b) => (
                          <li key={b} className={styles.dossierBullet}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.expLabelStrip}>
              <span className={styles.expLabelText}>[ RECORD 02 · EXPERIENCE ]</span>
            </div>
          </section>

          {/* ═══ Panel 4: Boston University ══════════════════════
               Layout: image LEFT (bleeds to edge) · text RIGHT     */}
          <section
            className={`${styles.panel}${schoolVis.bu ? ` ${styles.panelSchoolActive}` : ''}`}
            style={panelStyle}
            aria-label="About – Boston University"
          >
            {/* Full-bleed portrait — left half */}
            <div className={styles.expImgLeft}>
              <ImageSlot
                src={buHero}
                alt="Boston University"
                variant="fullBleed"
              />
            </div>

            {/* Text — right half */}
            <div className={styles.expTextRight}>
              <span className={styles.expEra}>{BU.period}</span>
              <h2 className={styles.expTitle}>
                BOSTON<br />UNIVERSITY
              </h2>
              <p className={styles.expSubtitle}>{BU.degree}</p>
              <p className={styles.expDept}>{BU.dept}</p>
              <ul className={styles.expList}>
                {BU.details.map((d) => (
                  <li key={d} className={styles.expListItem}>
                    <span className={styles.expArrow}>▸</span>{d}
                  </li>
                ))}
              </ul>

              <div className={styles.expThumbs}>
                <ImageSlot src={bu1} alt="BU photo 1" variant="thumb" />
                <ImageSlot src={bu2} alt="BU photo 2" variant="thumb" />
              </div>
            </div>

            <div className={styles.expLabelStrip}>
              <span className={styles.expLabelText}>[ RECORD 03 · EDUCATION ]</span>
            </div>
          </section>

          {/* ═══ Panel 5: GSOC 2024 ══════════════════════════════
               Layout: info LEFT · PDF viewer RIGHT               */}
          <GSocPanel panelStyle={panelStyle} isVisible={gsocVisible} />

          {/* ─── Panel: Skills ──────────────────────────────────── */}
          <section className={styles.panel} style={panelStyle} aria-label="Skills">
            <SkillsMenu isVisible={skillsVisible} />
          </section>

          {/* ─── Panel: Projects ────────────────────────────────── */}
          <ProjectsPanel panelStyle={panelStyle} isVisible={projectsVisible} />

          {/* ─── Panel: Contact ─────────────────────────────────── */}
          <section className={styles.panel} style={panelStyle} aria-label="Contact">
            <ContactMenu />
          </section>

        </div>{/* /track */}
      </div>{/* /scrollContainer */}

    </div>
  );
}
