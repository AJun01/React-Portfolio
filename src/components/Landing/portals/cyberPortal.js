/**
 * 传送门 — Cyber Uni 这一列。
 * mergePortal 会再叠一层 portalSliceDefaults；下面已写全量字段，改数字只动本列即可。
 */
import cyberPortalPoster from "../../../assets/cyber/portal.png";
import { mergePortal } from "./portalSliceDefaults";

export const cyberPortal = mergePortal({
  // —— 路由 & 文案（PortalLayout → PortalItem）——
  path: "/cyber-uni",
  sliceVariant: "cyber",
  title: "Cyber Uni",
  subtitle: undefined,
  sliceLabel: undefined,
  hintAction: undefined,

  // —— 斜条 & 里层画布 & 列间线 ——
  skewDeg: 25,
  sliceCanvasHeightVh: 100,
  sliceCanvasTopVh: 0,
  sliceBorderPx: 2,
  sliceBorderColor: "rgba(255, 255, 255, 0.1)",

  // —— 海报 / 视频（不用就保持 undefined）——
  posterSrc: cyberPortalPoster,
  /** 水平 %：0=最左，100=最右，相当于视口宽度百分比 */
  posterAlignX: 50,
  posterAlignY: 100,
  posterBleedScale: 1,
  videoSrc: undefined,
  videoObjectPosition: undefined,

  // hover 时由 CyberPortalLanding 叠层做闪烁/增色，idle 不盖渐变
  accent: undefined,
});
