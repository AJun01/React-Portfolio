/**
 * 传送门 — Pixel Grid 这一列。
 * 文案与渐变与 pixel-uni 共用 PIXEL_REALM。
 */
import pixelPortalPoster from "../../../assets/pixel/portal.png";
import { PIXEL_REALM } from "../../../pixel-uni/content/pixelRealm";
import { mergePortal } from "./portalSliceDefaults";

export const pixelPortal = mergePortal({
  path: PIXEL_REALM.path,
  sliceVariant: "pixel",
  title: PIXEL_REALM.title,
  subtitle: PIXEL_REALM.subtitle,
  sliceLabel: PIXEL_REALM.sliceLabel,
  hintAction: PIXEL_REALM.hintAction,

  // —— 斜条 & 里层画布 & 列间线 ——
  skewDeg: 25,
  sliceCanvasHeightVh: 100,
  sliceCanvasTopVh: 0,
  sliceBorderPx: 2,
  sliceBorderColor: "rgba(120, 240, 255, 0.15)",

  // —— 海报 / 视频（不用就保持 undefined）——
  posterSrc: pixelPortalPoster,
  posterAlignX: PIXEL_REALM.posterAlignX,
  posterAlignY: -20,
  posterBleedScale: 1.1,
  videoSrc: undefined,
  videoObjectPosition: undefined,

  accent: undefined,
});
