/**
 * 传送门 — Aurora IV 占位列。字段清单与 cyberPortal / pixelPortal 相同。
 */
import { mergePortal } from "./portalSliceDefaults";

export const auroraPortal = mergePortal({
  path: "/theme-4",
  sliceVariant: "default",
  title: "Aurora IV",
  subtitle: undefined,
  sliceLabel: undefined,
  hintAction: undefined,

  // —— 斜条 & 里层画布 & 列间线 ——
  skewDeg: 25,
  sliceCanvasHeightVh: 100,
  sliceCanvasTopVh: 0,
  sliceBorderPx: 2,
  sliceBorderColor: "rgba(255, 255, 255, 0.1)",

  posterSrc: undefined,
  /** 有海报时：第 4 列长卷默认锚点约 87.5 */
  posterAlignX: 87.5,
  posterAlignY: undefined,
  posterBleedScale: 0.8,
  videoSrc: undefined,
  videoObjectPosition: undefined,

  accent:
    "linear-gradient(135deg, #0b1020 0%, #1b3a5f 40%, #4c1d95 100%)",
});
