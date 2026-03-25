/**
 * 传送门 — Miami Vice 这一列。
 * mergePortal 会再叠一层 portalSliceDefaults；下面已写全量字段，改数字只动本列即可。
 */
import miamiVicePortalPoster from "../../../assets/MiamiVice/portal.png";
import miamiVicePortalVideo from "../../../assets/MiamiVice/portal.mp4";
import { MIAMI_VICE } from "../../../miami-vice-uni/content/miamiVice";
import { mergePortal } from "./portalSliceDefaults";

export const miamiVicePortal = mergePortal({
  // —— 路由 & 文案（PortalLayout → PortalItem）——
  path: MIAMI_VICE.path,
  sliceVariant: MIAMI_VICE.sliceVariant,
  title: MIAMI_VICE.title,
  subtitle: MIAMI_VICE.subtitle,
  sliceLabel: undefined,
  hintAction: MIAMI_VICE.hintAction,

  // —— 斜条 & 里层画布 & 列间线 ——
  skewDeg: 25,
  sliceCanvasHeightVh: 100,
  sliceCanvasTopVh: 0,
  sliceBorderPx: 2,
  sliceBorderColor: "rgba(255, 45, 120, 0.18)",

  // —— 海报 / 视频（不用就保持 undefined）——
  posterSrc: miamiVicePortalPoster,
  posterAlignX: MIAMI_VICE.posterAlignX,
  posterAlignY: MIAMI_VICE.posterAlignY,
  posterBleedScale: 1,
  videoSrc: miamiVicePortalVideo,
  videoObjectPosition: "50% 40%",

  // hover 时由 MiamiVicePortalLanding 做日落扫光效果，idle 无渐变
  accent: undefined,
});
