/**
 * Pixel 宇宙 — 传送门与站内页共用文案（单一数据源）
 */
export const PIXEL_REALM = {
  path: "/pixel-uni",
  title: "Pixel Grid",
  subtitle: "8-Bit Craft Lab",
  sliceLabel: undefined,
  hintAction: "Press Start",

  pageKicker: "Pixel Universe",
  pageTagline: "Low-res worlds, high-res intent — tiles, palettes, and readable silhouettes.",
  footerNote: "INSERT COIN TO CONTINUE.",

  /** 传送门海报水平 %（不写 portal 里可覆盖；支持负值微调） */
  posterAlignX: -10,
  /** 传送门海报竖直 %（站内视觉可与传送门分项配置） */
  posterAlignY: 48,

  storyboard: [
    {
      scene: "LV.01",
      phase: "World building",
      title: "Tile discipline",
      body:
        "Every scene starts as a grid: repeat patterns that read at a glance, edges that line up, and negative space that breathes. The goal is clarity — if a sprite muddies the read at 1×, it fails at every scale.",
      meta: "TILEMAP — collision layers, autotile rules, palette locks.",
    },
    {
      scene: "LV.02",
      phase: "Character read",
      title: "Silhouette first",
      body:
        "Animation is cheap when the pose carries the story. Three frames can sell a jump if the arc and anticipation read in silhouette. Contrast and single-pixel highlights do the rest.",
      meta: "SPRITES — walk cycles, FX strips, hitboxes.",
    },
    {
      scene: "LV.03",
      phase: "Ship & polish",
      title: "CRT optional, craft not",
      body:
        "Scanlines and bloom are seasoning, not the meal. Shipping means consistent lighting, accessible UI at small sizes, and assets that survive compression — crisp where it counts.",
      meta: "BUILD — UI scaling, export pipelines, performance budgets.",
    },
  ],
};
