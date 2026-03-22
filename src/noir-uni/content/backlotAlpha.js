/**
 * Noir Uni — 传送门主页与站内页共用文案（单一数据源）
 */
export const BACKLOT_ALPHA = {
  path: "/noir-uni",
  sliceVariant: "filmNoir",
  sliceLabel: "Film Noir",
  title: "Backlot Alpha",
  subtitle: "The Making Of",
  hintAction: "ACTION",
  /** 传送门海报 object-position 水平 %（第 2 列长卷默认锚点约 37.5） */
  posterAlignX: 37.5,
  /** 传送门海报垂直 % */
  posterAlignY: 0,
  pageKicker: "Film Noir Universe",
  pageTagline: "THE MAKING OF — dev diary in three acts",
  footerNote: "FADE OUT.",
  storyboard: [
    {
      scene: "SC.01",
      phase: "Pre-production",
      title: "The Treatment",
      body:
        "Backlot Alpha began as a love letter to 90s Hollywood craft: blocking shots on paper before a single line of code shipped. Wireframes doubled as storyboards; user flows were written like scene beats so engineering and design stayed in the same screenplay.",
      meta: "INT. REPO — NIGHT — beat sheet, component audit, risk log.",
    },
    {
      scene: "SC.02",
      phase: "Principal Photography",
      title: "Shooting the Build",
      body:
        "Principal photography is where the set catches fire—in the best way. Daily builds, tight feedback loops, and ruthless cuts when a feature didn’t serve the story. Each sprint was a shooting day: call sheet in the morning, rushes at night, pick the best takes.",
      meta: "ON SET — continuous integration, playtests, performance passes.",
    },
    {
      scene: "SC.03",
      phase: "Post-production",
      title: "The Final Cut",
      body:
        "Post is where the picture locks. Refactors are re-edits; accessibility and polish are color timing and sound design. Shipping Backlot Alpha meant knowing when to stop tweaking—freeze the cut, print the DCP, roll credits on a version the audience can feel.",
      meta: "DUB STAGE — release checklist, docs, handoff, retrospective.",
    },
  ],
};
