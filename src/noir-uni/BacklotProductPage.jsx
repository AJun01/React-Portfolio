import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import backlotProduct from "./content/backlotProduct";
import { FeatureIllustration } from "./BacklotProductIllustrations";
import { StoryboardFilmstrip } from "./components/StoryboardFilmstrip";
import { EcosystemOrbit } from "./components/EcosystemOrbit";
import { FaqAccordion } from "./components/FaqAccordion";
import { BacklotFooter } from "./components/BacklotFooter";
import { NoirParticles } from "./components/NoirParticles";
import { storyboard } from "./content/storyboard";
import backlotHeroShot from "../assets/noir/overview.png";
import crewMembersStrip from "../assets/noir/members.png";
import "./components/BackToPortals.css";
import styles from "./BacklotProductPage.module.css";

function hashStringToSeed(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function AskChip({ label }) {
  return (
    <div className={styles.askChip} aria-hidden>
      <svg
        className={styles.askChipGlyph}
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <path
          d="M12 2 L13.6 8.6 L20.4 10.2 L13.8 11.8 L12 18.6 L10.2 11.8 L3.6 10.2 L10.4 8.6 Z"
          fill="currentColor"
        />
        <path
          d="M18.5 15 L19.2 17.3 L21.5 18 L19.2 18.7 L18.5 21 L17.8 18.7 L15.5 18 L17.8 17.3 Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}

const CAPABILITY_ICONS = {
  // Backlot Chatroom — speech bubble w/ @ tail
  chat: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="11" r="2.2" />
      <path d="M14.2 11v1.1a1.4 1.4 0 0 0 2.8 0V11a5 5 0 1 0-2 4" />
    </svg>
  ),
  // React Flow Workspace — three connected nodes
  flow: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="16.5" y="3.5" width="5" height="5" rx="1" />
      <rect x="16.5" y="15.5" width="5" height="5" rx="1" />
      <path d="M7.5 12h4M11.5 12c2 0 2-6 4-6" />
      <path d="M11.5 12c2 0 2 6 4 6" />
    </svg>
  ),
  // AAV Settings DAG — book/wiki w/ connected dots spine
  wiki: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z" />
      <path d="M5 17h13" />
      <path d="M9 8h5M9 11h5" />
      <circle cx="18" cy="6" r="1.2" fill="currentColor" />
      <circle cx="18" cy="11" r="1.2" fill="currentColor" />
      <circle cx="18" cy="15" r="1.2" fill="currentColor" />
    </svg>
  ),
  // Shared Context (SSOT) — stacked layers converging
  ssot: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" />
      <path d="M3.5 12 12 16.5 20.5 12" />
      <path d="M3.5 16.5 12 21l8.5-4.5" />
    </svg>
  ),
};

const BENEFIT_ICONS = {
  // Automated Pre-Production — lightning bolt (automation/speed)
  bolt: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  ),
  // Seamless Integration — two interlocking rings
  link: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.5 14.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" />
      <path d="M14.5 9.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" />
    </svg>
  ),
  // Boost Productivity — upward-stepping chart
  chart: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 20h18" />
      <path d="M6 17v-5" />
      <path d="M11 17V9" />
      <path d="M16 17V6" />
      <path d="M14 5l2-2 2 2" />
    </svg>
  ),
  // 24/7 AI Co-Producer — headset / chat combo
  headset: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 14a7 7 0 0 1 14 0" />
      <rect x="3.5" y="13.5" width="4" height="6" rx="1" />
      <rect x="16.5" y="13.5" width="4" height="6" rx="1" />
      <path d="M19 19.5v.5a2 2 0 0 1-2 2h-3" />
    </svg>
  ),
  // Canon × Continuity Safeguards — shield with check
  shield: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 4 6v6c0 4.3 3.1 7.6 8 9 4.9-1.4 8-4.7 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  // Intuitive Three-Pane Workspace — layout w/ three columns
  panes: (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 5v14" />
      <path d="M15 5v14" />
    </svg>
  ),
};

function CrewMarquee() {
  return (
    <div
      className={styles.marqueeVisual}
      role="img"
      aria-label="Backlot crew roles: Director, Script Analyst, Art Director, Playwright, Acting Coach, Cinematographer, Production Manager, Floor Manager."
    >
      <div className={styles.marqueeTrack}>
        <img
          className={styles.marqueeImg}
          src={crewMembersStrip}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
        />
        <img
          className={styles.marqueeImg}
          src={crewMembersStrip}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function buildThemeStyle(t) {
  return {
    "--color-bg": t.bg,
    "--color-bg-elevated": t.bgElevated,
    "--color-text": t.text,
    "--color-text-muted": t.textMuted,
    "--color-accent": t.accent,
    "--color-accent-muted": t.accentMuted,
    "--color-glass-bg": t.glassBg,
    "--color-glass-border": t.glassBorder,
    "--color-glow": t.glow,
    "--glass-blur": `${t.glassBlurPx}px`,
    "--card-radius": `${t.cardRadiusPx}px`,
    "--max-width-content": `${t.maxWidthContentPx}px`,
    "--max-width-text": `${t.maxWidthTextRem}rem`,
    "--bp-stack": `${t.bpStackPx}px`,
    "--bp-hero": `${t.bpHeroPx}px`,
    "--feature-illustration-min-height": `${t.featureIllustrationMinHeightPx}px`,
    "--illu-accent": t.accent,
    "--grain-opacity": String(t.grainOpacity ?? 0.18),
  };
}

/**
 * Page-scoped inertia scroll — gives the Backlot page a slightly more
 * cinematic, "decelerating" feel instead of the browser's default hard
 * wheel step. Intercepts wheel events, accumulates a target scrollY,
 * and lerps the real scroll toward it each RAF tick.
 *
 * Design choices:
 *   - Only intercepts `wheel`. Keyboard / scrollbar / touch still use
 *     native behavior (touch is already smooth via inertia on mobile,
 *     keyboard + scrollbar are accessibility-critical and users expect
 *     them to be instant / predictable).
 *   - Syncs target ← scrollY whenever a non-wheel scroll happens, so
 *     native scrollIntoView() calls, arrow keys, and scrollbar drags
 *     all stay in sync with no fighting.
 *   - Disables itself under `prefers-reduced-motion: reduce`.
 *   - Lerp `factor = 0.1`: each frame current moves 10% of the way
 *     toward target → ~20 frames / ~330ms to settle. Tunable via arg.
 *
 * Scoped: only mounted while BacklotProductPage is on screen; the hook
 * tears everything down on unmount, so other routes (Cyber Uni etc)
 * keep native scroll.
 */
function useInertiaScroll({ factor = 0.1 } = {}) {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = null;
    let wheelActive = false;
    const doc = document.documentElement;

    const step = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.3) {
        current = target;
        window.scrollTo(0, current);
        raf = null;
        wheelActive = false;
        return;
      }
      current += diff * factor;
      window.scrollTo(0, current);
      raf = requestAnimationFrame(step);
    };

    const onWheel = (e) => {
      // Don't fight pinch-zoom (Ctrl+wheel) or horizontal wheels.
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Normalize deltaMode → pixels. LINE (1) and PAGE (2) modes are
      // rare (Firefox with specific prefs, older Safari) but worth
      // handling so the scroll distance stays consistent.
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= window.innerHeight;

      e.preventDefault();

      // If we weren't already animating, re-sync from real scrollY in
      // case something else (keyboard, scrollbar) moved the page since.
      if (!wheelActive) {
        target = window.scrollY;
        current = window.scrollY;
      }
      wheelActive = true;

      const max = doc.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(max, target + delta));

      if (raf == null) raf = requestAnimationFrame(step);
    };

    // Keep target in sync whenever the page scrolls by some other
    // means (keyboard arrows, spacebar, scrollbar drag, anchor jump),
    // so the next wheel tick doesn't snap back to a stale target.
    const onScroll = () => {
      if (!wheelActive) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor]);
}

export default function BacklotProductPage() {
  const {
    meta,
    theme,
    nav,
    hero,
    featureIntro,
    features,
    capabilities,
    benefits,
    ecosystem,
    faq,
    finalCta,
    footer,
  } = backlotProduct;

  const themeStyle = useMemo(() => buildThemeStyle(theme), [theme]);

  // Gentle inertia on wheel scroll — tune `factor` lower (e.g. 0.07)
  // for a slower / more cinematic feel, or higher (0.15+) for snappier.
  useInertiaScroll({ factor: 0.1 });

  useEffect(() => {
    const prev = document.title;
    document.title = meta.pageTitle;
    return () => {
      document.title = prev;
    };
  }, [meta.pageTitle]);

  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }, []);

  return (
    <div className={styles.page} style={themeStyle}>
      <Link className="noir-back-portals" to={nav.backTo}>
        {nav.backLabel}
      </Link>

      <main className={styles.inner}>
        <header className={styles.hero} aria-labelledby="backlot-hero-title">
          <div className={styles.heroGlow} aria-hidden />
          <div className={styles.heroCopy}>
            <p className={styles.badge}>{hero.badge}</p>
            <h1 id="backlot-hero-title" className={styles.h1}>
              {hero.title}
            </h1>
            <p className={styles.audience}>{hero.audienceLine}</p>
            <p className={styles.subtitle}>{hero.subtitle}</p>
            {hero.finePrint ? (
              <p className={styles.finePrint}>{hero.finePrint}</p>
            ) : null}
            <div className={styles.ctaRow}>
              <Link
                className={styles.ctaPrimary}
                to={hero.primaryCta.href}
              >
                {hero.primaryCta.label}
              </Link>
              <a className={styles.ctaGhost} href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroMockChrome} aria-hidden>
              <span className={styles.heroMockDot} />
              <span className={styles.heroMockDot} />
              <span className={styles.heroMockDot} />
            </div>
            <img
              className={styles.heroShot}
              src={backlotHeroShot}
              alt="Backlot Alpha workspace — Writers' Room roundtable, Factory Floor DAG, and Inspector panel working together."
              loading="eager"
              decoding="async"
            />
          </div>
        </header>

        <section
          className={styles.featuresSection}
          aria-labelledby="backlot-features-heading"
        >
          <p className={styles.featureKicker}>{featureIntro.kicker}</p>
          <h2 id="backlot-features-heading" className={styles.featureHeadline}>
            {featureIntro.title}
          </h2>
          <p className={styles.featureSubtitle}>{featureIntro.subtitle}</p>

          <div className={styles.grid}>
            {features.map((f) => {
              const cardStyle = { gridColumn: `span ${f.span ?? 3}` };
              const seed = hashStringToSeed(f.id);

              let variantClass = "";
              let visual = null;
              let particleCount = 20;
              let particleIntensity = 1;

              if (f.variant === "ai") {
                variantClass = styles.cardAi;
                visual = <AskChip label={f.cta.label} />;
                particleCount = 22;
                particleIntensity = 1.25;
              } else if (f.variant === "filmstrip") {
                variantClass = styles.cardFilmstrip;
                visual = <StoryboardFilmstrip storyboard={storyboard} />;
                particleCount = 32;
                particleIntensity = 0.95;
              } else if (f.variant === "marquee") {
                variantClass = styles.cardMarquee;
                visual = <CrewMarquee />;
                particleCount = 28;
                particleIntensity = 1.15;
              } else {
                visual = (
                  <FeatureIllustration illustrationKey={f.illustrationKey} />
                );
                particleCount = 28;
                particleIntensity = 1;
              }

              return (
                <article
                  key={f.id}
                  id={f.id}
                  className={`${styles.card} ${variantClass}`.trim()}
                  style={cardStyle}
                >
                  <div className={styles.cardVisual}>{visual}</div>
                  <NoirParticles
                    count={particleCount}
                    seed={seed}
                    intensity={particleIntensity}
                  />
                  <div className={styles.cardOverlay}>
                    <h3 className={styles.cardTitle}>{f.title}</h3>
                    <p className={styles.cardLede}>{f.lede}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className={styles.capabilitiesSection}
          aria-labelledby="backlot-capabilities-heading"
        >
          <p className={styles.capabilityKicker}>{capabilities.kicker}</p>
          <h2
            id="backlot-capabilities-heading"
            className={styles.capabilityHeadline}
          >
            {capabilities.title}
          </h2>
          {capabilities.subtitle ? (
            <p className={styles.capabilitySubtitle}>{capabilities.subtitle}</p>
          ) : null}

          <ul className={styles.capabilityGrid}>
            {capabilities.items.map((item) => (
              <li key={item.id} className={styles.capabilityItem}>
                <span className={styles.capabilityIconBox} aria-hidden>
                  {CAPABILITY_ICONS[item.iconKey]}
                </span>
                <h3 className={styles.capabilityTitle}>{item.title}</h3>
                <p className={styles.capabilityLede}>{item.lede}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.benefitsSection}
          aria-labelledby="backlot-benefits-heading"
        >
          <span className={styles.benefitsKicker}>{benefits.kicker}</span>
          <h2
            id="backlot-benefits-heading"
            className={styles.benefitsHeadline}
          >
            {benefits.title}
          </h2>
          {benefits.subtitle ? (
            <p className={styles.benefitsSubtitle}>{benefits.subtitle}</p>
          ) : null}

          <ul className={styles.benefitsGrid}>
            {benefits.items.map((item) => (
              <li key={item.id} className={styles.benefitCard}>
                <span className={styles.benefitIconBox} aria-hidden>
                  {BENEFIT_ICONS[item.iconKey]}
                </span>
                <h3 className={styles.benefitTitle}>{item.title}</h3>
                <p className={styles.benefitLede}>{item.lede}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.ecosystemSection}
          aria-labelledby="backlot-ecosystem-heading"
        >
          <span className={styles.ecosystemKicker}>{ecosystem.kicker}</span>
          <h2
            id="backlot-ecosystem-heading"
            className={styles.ecosystemHeadline}
          >
            {ecosystem.title}
          </h2>
          <p className={styles.ecosystemSubtitle}>{ecosystem.subtitle}</p>

          <EcosystemOrbit ecosystem={ecosystem} />
        </section>

        <section
          className={styles.faqSection}
          aria-labelledby="backlot-faq-heading"
        >
          <div className={styles.faqLayout}>
            <header className={styles.faqHeader}>
              <span className={styles.faqKicker}>{faq.kicker}</span>
              <h2
                id="backlot-faq-heading"
                className={styles.faqHeadline}
              >
                {faq.title.split("\n").map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </React.Fragment>
                ))}
              </h2>
              <p className={styles.faqSubtitle}>{faq.subtitle}</p>
            </header>

            <div className={styles.faqBody}>
              <FaqAccordion items={faq.items} />
            </div>
          </div>
        </section>

        {/* ─ Page closer ─
            FULL-VIEWPORT-WIDTH wrapper so the orb's halo dissolves into
            black at the actual viewport edges — not at the content
            column edges. Breaks out of the max-width:1240px .inner
            column using the `50% - 50vw` trick; .page has overflow-x:
            hidden so nothing bleeds sideways into scrollbars.

            Structure:
              .pageCloser        ← full-bleed, holds the orb as bg
                .finalCtaOrb     ← absolute, covers the wrapper
                .pageCloserInner ← re-clamps content to max-width
                  CTA headline
                  footer card */}
        <div className={styles.pageCloser}>
          <div className={styles.finalCtaOrb} aria-hidden>
            <span className={styles.finalCtaCore} />
            <span
              className={styles.finalCtaPulse}
              style={{ animationDelay: "0s" }}
            />
            <span
              className={styles.finalCtaPulse}
              style={{ animationDelay: "-2.5s" }}
            />
            <span
              className={styles.finalCtaPulse}
              style={{ animationDelay: "-5s" }}
            />
          </div>

          <div className={styles.pageCloserInner}>
            <section
              className={styles.finalCtaSection}
              aria-labelledby="backlot-final-cta-heading"
            >
              <div className={styles.finalCtaContent}>
                <span className={styles.finalCtaKicker}>{finalCta.kicker}</span>
                <h2
                  id="backlot-final-cta-heading"
                  className={styles.finalCtaHeadline}
                >
                  {finalCta.title}
                </h2>
                <p className={styles.finalCtaSubtitle}>{finalCta.subtitle}</p>
              </div>
            </section>

            <BacklotFooter footer={footer} />
          </div>
        </div>
      </main>
    </div>
  );
}
