/**
 * Miami Vice 宇宙 — 传送门与站内页共用文案（单一数据源）
 */
export const MIAMI_VICE = {
  path: "/miami-vice",
  title: "Miami Vice",
  subtitle: "Design & Identity",
  sliceLabel: undefined,
  hintAction: "Enter the City",

  pageKicker: "Miami Vice Universe",
  pageTagline:
    "Where Art Deco meets neon. Every surface tells the time of night.",
  footerNote:
    "Shot on location. Magic hour only. Do not disturb the silence.",

  /** 传送门海报水平 %（0 = 最左，100 = 最右） */
  posterAlignX: 50,
  /** 传送门海报竖直 % */
  posterAlignY: 40,

  sliceVariant: "miamiVice",

  scenes: [
    {
      act: "I",
      phase: "Aesthetic",
      title: "Art Deco Meets Neon",
      body:
        "Miami Vice was never about cops. It was about surfaces — linen, glass, standing water, and the way neon bleeds into humid night air. Every design decision in this universe follows that same logic: begin with texture, let the story emerge from contrast.",
      meta: "PALETTE — #FF2D78 · #00E5FF · #FF7050 · #B84FEB",
    },
    {
      act: "II",
      phase: "Type & Motion",
      title: "The Italic Economy",
      body:
        "Headlines lean. Body text breathes. Transitions do not happen — they arrive. The typographic voice here is restrained, as if every word reached port by private yacht at 2 AM and refused to apologise for being late.",
      meta: "TYPOGRAPHY — Playfair Display Italic · Raleway Thin",
    },
    {
      act: "III",
      phase: "Under Construction",
      title: "Coming In Hot",
      body:
        "This universe is actively being built. Future pages will cover brand identity work, editorial layout systems, motion studies, and design retrospectives — all filtered through that distinctly 1980s Miami register. The city is open; the studio is not.",
      meta: "STATUS — Filming on location. Stand by.",
    },
  ],
};
