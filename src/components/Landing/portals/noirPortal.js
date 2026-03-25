/**
 * 传送门 — Film Noir / Backlot 这一列。
 * 结构与 cyberPortal.js 一致；文案字段从 BACKLOT_ALPHA 引用，站内页仍共用同一份数据。
 */
import noirPortalPoster from "../../../assets/noir/portal.png";
import noirPortalVideo from "../../../assets/noir/portal.mp4";
import { BACKLOT_ALPHA } from "../../../noir-uni/content/backlotAlpha";
import { mergePortal } from "./portalSliceDefaults";

export const noirPortal = mergePortal({
  // —— 路由 & 文案（PortalLayout → PortalItem）——
  path: BACKLOT_ALPHA.path,
  sliceVariant: BACKLOT_ALPHA.sliceVariant,
  title: BACKLOT_ALPHA.title,
  subtitle: BACKLOT_ALPHA.subtitle,
  sliceLabel: BACKLOT_ALPHA.sliceLabel,
  hintAction: BACKLOT_ALPHA.hintAction,

  // —— 斜条 & 里层画布 & 列间线 ——
  skewDeg: 25,
  sliceCanvasHeightVh: 100,
  sliceCanvasTopVh: 0,
  sliceBorderPx: 2,
  sliceBorderColor: "rgba(255, 255, 255, 0.1)",

  // —— 海报 / 视频（不用就保持 undefined）——
  posterSrc: noirPortalPoster,
  posterAlignX: BACKLOT_ALPHA.posterAlignX,
  posterAlignY: 100,
  posterBleedScale: 1,
  videoSrc: noirPortalVideo,
  videoObjectPosition: "50% 100%",

  // —— 叠在底图上的渐变遮罩 ——
  accent:
    "linear-gradient(165deg, rgba(28, 28, 28, 0.62) 0%, rgba(58, 58, 58, 0.48) 38%, rgba(15, 15, 15, 0.72) 100%)",
});
