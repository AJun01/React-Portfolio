/**
 * 首页四列传送门：顺序即从左到右。改某一列请编辑对应的 cyber / noir / pixel / miamiVice 文件。
 */
import { cyberPortal } from "./cyberPortal";
import { noirPortal } from "./noirPortal";
import { pixelPortal } from "./pixelPortal";
import { miamiVicePortal } from "./miamiVicePortal";

export { cyberPortal, noirPortal, pixelPortal, miamiVicePortal };

export const PORTALS = [cyberPortal, noirPortal, pixelPortal, miamiVicePortal];

export {
  mergePortal,
  PORTAL_SLICE_DEFAULTS,
  POSTER_ALIGN_Y_FALLBACK,
} from "./portalSliceDefaults";
