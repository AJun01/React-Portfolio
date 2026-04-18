/**
 * Backlot product landing page — single source of truth for copy, theme, and flags.
 * Layout follows Aurix (centered hero + headline features); palette is Noir black/white
 * (no neon green). Tweak strings here only; components must never hard-code copy or color.
 *
 * @typedef {'noirFilm' | 'neonSaaS'} VisualPreset
 */

/** @type {VisualPreset} stays in sync with `theme` below */
export const visualPreset = "noirFilm";

/**
 * Design tokens — Noir black & white: deep black background, silver/white accents,
 * no chromatic accent.
 */
export const theme = {
  bg: "#0a0a0a",
  bgElevated: "#111111",
  text: "#e8e8e8",
  textMuted: "rgba(180, 180, 180, 0.82)",
  accent: "#f0f0f0",
  accentMuted: "rgba(255, 255, 255, 0.28)",
  glassBg: "rgba(22, 22, 22, 0.68)",
  glassBorder: "rgba(255, 255, 255, 0.12)",
  glow: "rgba(255, 255, 255, 0.12)",
  glassBlurPx: 16,
  cardRadiusPx: 20,
  maxWidthContentPx: 1240,
  maxWidthTextRem: 38,
  bpStackPx: 768,
  bpHeroPx: 720,
  featureIllustrationMinHeightPx: 210,
  grainOpacity: 0.2,
};

export const meta = {
  pageTitle: "Backlot — AI Production Workspace",
};

export const nav = {
  backLabel: "← Noir Universe",
  // `?skip=intro` tells NoirHub to jump past the opening video and land
  // straight on "Select Your Chapter" — you've already watched that once.
  backTo: "/noir-uni?skip=intro",
};

export const flags = {
  showTechStrip: false,
  /** When true, render a lightweight trust/stack line. Never place fabricated client logos. */
  showSocialProofLogos: false,
};

export const hero = {
  badge: "NEW · Backlot Alpha · v5.1 Roundtable",
  audienceLine:
    "Built for serialized IP, original fiction, and pre-production teams.",
  title: "Long-form writing to shootable scenes, in one workspace.",
  subtitle:
    "One Production Bible, one source of truth — a crew of role-based agents takes script to shot through a live DAG.",
  finePrint:
    "Final-cut quality, continuity, and end-to-end render behavior are governed by our engineering docs and release notes. This page describes the product and is not a guarantee of results.",
  primaryCta: {
    label: "Enter Noir Universe",
    href: "/noir-uni",
    variant: "primary",
  },
  secondaryCta: {
    label: "See core capabilities",
    href: "#roundtable",
    scrollTo: "roundtable",
  },
  heroImage: null,
};

/** Mirrors Aurix's "Features + headline + one-liner" pattern. */
export const featureIntro = {
  kicker: "Features",
  title: "Everything a studio needs, in one cockpit.",
  subtitle:
    "Three-pane workspace, a crew of agents, and Bible × AAV continuity — end to end.",
};

/**
 * Features are placed on a 6-column bento grid.
 * `span` = number of columns the card occupies on desktop (sums per row to 6).
 * Current layout — Row 1: 3 + 3, Row 2: 2 + 4.
 *
 * Card variants:
 *   - default:     visual on top, title + one-liner pinned to bottom.
 *   - "ai":        compact chat-CTA card inspired by Aurix's AI Teammate tile.
 *   - "marquee":   horizontally scrolling strip (e.g. role chips); paused by
 *                  default, runs on card hover.
 *   - "filmstrip": embedded StoryboardFilmstrip showing a real ALPHA-B34
 *                  production's scenes × shots, also hover-driven.
 */
export const features = [
  {
    id: "automation",
    illustrationKey: "workflow",
    title: "Automate Workflow & Produce",
    lede: "Kick off production in seconds — one DAG chains text → Bible → assets → shots.",
    span: 3,
  },
  {
    id: "crew",
    variant: "marquee",
    title: "Your whole crew, on call.",
    lede: "Seven studio roles, wired to one Production Bible.",
    span: 3,
  },
  {
    id: "roundtable",
    variant: "ai",
    title: "AI Co-Producer",
    lede: "A roundtable of agents, one ask away.",
    cta: { label: "Ask Backlot AI" },
    span: 2,
  },
  {
    id: "aav",
    variant: "filmstrip",
    title: "Canon × continuity, scene by scene.",
    lede: "Real ALPHA-B34 boards — Bible-anchored, continuity-aware, every shot queryable like a wiki.",
    span: 4,
  },
];

/**
 * Capability strip — a four-up row of smaller "under the hood" capabilities
 * that complement the bento features above. Icons are inline SVG, keyed by
 * `iconKey` and resolved in `BacklotProductPage.jsx`.
 */
export const capabilities = {
  kicker: "Under the hood",
  title: "Four primitives that keep the room in sync.",
  subtitle:
    "Chat, canvas, wiki, and one shared Bible — the plumbing behind every Backlot scene.",
  items: [
    {
      id: "chatroom",
      iconKey: "chat",
      title: "Backlot Chatroom",
      lede:
        "Real-time room with every agent — @-mention to task, debate, or loop in the crew.",
    },
    {
      id: "flow",
      iconKey: "flow",
      title: "React Flow Workspace",
      lede:
        "Design your own production pipeline on an infinite canvas — drag, wire, and branch nodes.",
    },
    {
      id: "wiki",
      iconKey: "wiki",
      title: "AAV Settings DAG",
      lede:
        "An LLM-queryable production wiki — every setting anchored to the Bible, canon enforced.",
    },
    {
      id: "ssot",
      iconKey: "ssot",
      title: "Shared Context · SSOT",
      lede:
        "One Production Bible feeds every agent the same truth. No drift across writers, art, or camera.",
    },
  ],
};

/**
 * Benefits grid — a 3×2 card deck answering "why pick Backlot?". Modelled on
 * Aurix's "Why Businesses Choose …" block, but with copy rewritten where the
 * Aurix business-tooling framing doesn't fit a pre-production context (e.g.
 * "Data Security" becomes "Canon × Continuity Safeguards" because our safety
 * story is story canon, not enterprise encryption).
 */
export const benefits = {
  kicker: "Benefits",
  title: "Why studios choose Backlot",
  subtitle:
    "Unlock the full potential of your production with unparalleled continuity and velocity.",
  items: [
    {
      id: "automated",
      iconKey: "bolt",
      title: "Automated Pre-Production",
      lede:
        "Generate shootable Bibles, boards, and shot lists effortlessly — stay aligned with ease.",
    },
    {
      id: "integration",
      iconKey: "link",
      title: "Seamless Integration",
      lede:
        "Effortlessly connect Backlot with your existing tools for a unified production workflow.",
    },
    {
      id: "productivity",
      iconKey: "chart",
      title: "Boost Productivity",
      lede:
        "Automate routine tasks to save time and enhance your team's efficiency.",
    },
    {
      id: "support",
      iconKey: "headset",
      title: "24/7 AI Co-Producer",
      lede:
        "Get round-the-clock collaboration with Backlot's agent roundtable, always ready to help.",
    },
    {
      id: "continuity",
      iconKey: "shield",
      title: "Canon × Continuity Safeguards",
      lede:
        "Protect your story with Bible-anchored continuity checks and canon enforcement on every shot.",
    },
    {
      id: "ux",
      iconKey: "panes",
      title: "Intuitive Three-Pane Workspace",
      lede:
        "Start shooting with Backlot quickly — roundtable, canvas, and inspector in one clean cockpit.",
    },
  ],
};

/**
 * Ecosystem — a radial orbit of the models and tools Backlot plugs into.
 * `ring: "inner"` items are live today; `ring: "outer"` items are on the
 * roadmap and render with a softer/dashed treatment. `angle` is in degrees
 * clockwise from 12 o'clock (0° = top, 90° = right, etc.). Angles are chosen
 * so outer items visually sit between inner items, not on the same spoke.
 */
export const ecosystem = {
  kicker: "Ecosystem",
  title: "Best-in-class models, orchestrated in one cockpit.",
  subtitle:
    "Plug-and-play across today's foundation models — shot-streaming, world-mapping, and storyline tools landing next.",
  items: [
    // Inner ring — live integrations
    { id: "claude", iconKey: "claude", label: "Claude", ring: "inner", angle: 0, status: "live" },
    { id: "gemini", iconKey: "gemini", label: "Gemini", ring: "inner", angle: 120, status: "live" },
    { id: "veo", iconKey: "veo", label: "Veo", ring: "inner", angle: 240, status: "live" },
    // Outer ring — roadmap
    { id: "seedance", iconKey: "seedance", label: "Seedance", ring: "outer", angle: 55, status: "soon", note: "shot stream" },
    { id: "kling", iconKey: "kling", label: "Kling", ring: "outer", angle: 145, status: "soon", note: "shot stream" },
    { id: "mapai", iconKey: "mapai", label: "Map AI", ring: "outer", angle: 215, status: "soon", note: "world design" },
    { id: "timeline", iconKey: "timeline", label: "Timeline", ring: "outer", angle: 305, status: "soon", note: "story beats" },
  ],
  legend: {
    live: "Live",
    soon: "Roadmap",
  },
};

/**
 * FAQ — written in AJ's voice. First-person singular ("I"), honest, a little
 * spiky. Only light copy-editing has been applied; phrases like "auto-crap
 * generator" are intentional and should stay.
 */
export const faq = {
  kicker: "FAQ",
  title: "Got questions?\nI've got answers.",
  subtitle:
    "Honest answers about Backlot, straight from the one building it.",
  items: [
    {
      id: "how-it-works",
      q: "How does it really work?",
      a: "Bring your own story text and drop it in. Backlot extracts the assets — characters, settings, beats — from your prose. If something feels off, a review sub-agent re-reads it with your intent in mind and tries hard to realign. And you can always edit or override anything by hand.",
    },
    {
      id: "availability",
      q: "Where can I use it? Is it online?",
      a: "Not yet — right now Backlot is a studio of one, built for me (AJ). If you want to play with it, reach out and I'll genuinely consider open-sourcing it for you. It's still in development, built for the love of learning and filmmaking.",
    },
    {
      id: "why-this",
      q: "Is it good? Why should I consider this with so many AI tools?",
      a: "Backlot isn't here to churn out cheesy AI clips for your feed. It's a creative partner — inspiring you, showing you the possibilities, building worlds alongside you, memorizing every detail in your story. It gives professional guidance, catches continuity drift, and manages your assets visually. A creativity tool, not an auto-crap generator.",
    },
    {
      id: "release",
      q: "When does it come out?",
      a: "Whenever I find people as passionate about this project as I am — and we're genuinely satisfied with the final clip Backlot puts out. No pre-baked ship date.",
    },
    {
      id: "join",
      q: "Can I join you?",
      a: "Of course! Hit me up via email or LinkedIn — let's shape this together.",
    },
  ],
};

export const techStrip = {
  lines: [
    "Backlot Alpha · FastAPI · Redis · React Client · optional AAV / Docker Compose",
  ],
};

/**
 * Final CTA + footer.
 *
 * NOTE: `linkedinUrl` below is a best-guess placeholder — please replace
 * with your actual LinkedIn URL. GitHub handle `ajun01` was pulled from
 * the repo README.
 */
export const finalCta = {
  kicker: "THE PROJECT",
  title: "Want to see who's building this?",
  subtitle:
    "Backlot is a one-person studio — and you're welcome to know the person behind it.",
  ctaLabel: "Find the creator",
  // Router path + query. The cyber-uni page reads `to=about` and jumps
  // straight to the About hero panel on mount.
  ctaTo: "/cyber-uni?to=about",
};

export const footer = {
  profile: {
    name: "AJ · Yujun Liu",
    handle: "ajun01",
    headline: "Full-Stack Software Engineer — building Backlot out of love for filmmaking and systems.",
    avatarUrl: "https://github.com/ajun01.png",
    githubUrl: "https://github.com/ajun01",
    // TODO: replace with your real LinkedIn URL
    linkedinUrl: "https://www.linkedin.com/in/yujun-liu-challenger/?locale=en",
  },
  // Roles live inline in the profile card
  roleTags: ["FULL-STACK", "FILMMAKER", "CREATIVE TECH"],
  copyright: "© 2026 Backlot · A solo studio project by AJ.",
};

const backlotProduct = {
  visualPreset,
  meta,
  theme,
  nav,
  flags,
  hero,
  featureIntro,
  features,
  capabilities,
  benefits,
  ecosystem,
  faq,
  techStrip,
  finalCta,
  footer,
};

export default backlotProduct;

/*
 * === neonSaaS alternative (Aurix-style neon green) ===
 * accent: '#00ff9d'
 * accentMuted: 'rgba(0, 255, 157, 0.35)'
 * glow: 'rgba(0, 255, 157, 0.22)'
 * grainOpacity: 0.07
 */
