/**
 * mergePortal({ ... }) = 先铺这一份默认值，再被各 *Portal.js 里写的字段盖住。
 *
 * 完整字段名（含文案/媒体）已写在 cyberPortal.js；noirPortal / pixelPortal / aurora 与 cyber 同结构。
 * Noir 的 path、title 等从 BACKLOT_ALPHA 引用，避免和站内页文案分叉。
 *
 * 下列键与 PortalLayout 里读取的 p.xxx 一致（缺了会用这里的数）：
 *
 *   path                  点进去跳哪条路由
 *   sliceVariant          "default" | "filmNoir" | "cyber" | "pixel"
 *   title / subtitle / sliceLabel / hintAction   文案
 *   skewDeg               斜切角度
 *   sliceCanvasHeightVh   里层画布多高（vh，100 = 一屏高）
 *   sliceCanvasTopVh      里层画布竖直偏移（vh，负数为向上）
 *   sliceBorderPx         右边竖线多粗（px）
 *   sliceBorderColor      竖线颜色
 *   posterSrc             静态海报图（import 的图片）；没有就 undefined
 *   posterAlignY          海报竖直对准（object-position 垂直 %，越大越靠下）
 *   posterAlignX          海报水平对准（object-position 水平 %）；不写则按列自动算长卷
 *   posterBleedScale      海报/视频略放大，压黑角（skew 边缘）
 *   videoSrc              悬停时播的视频；没有就 undefined
 *   videoObjectPosition   视频 object-position，例如 "50% 40%"
 *   accent                叠在图上的 CSS 渐变字符串
 */

export const PORTAL_SLICE_DEFAULTS = {
  skewDeg: 25,
  sliceCanvasHeightVh: 100,
  sliceCanvasTopVh: 0,
  sliceBorderPx: 2,
  sliceBorderColor: "rgba(255, 255, 255, 0.1)",
  posterBleedScale: 0.8,
};

export function mergePortal(entry) {
  return { ...PORTAL_SLICE_DEFAULTS, ...entry };
}

/** 没单独写 posterAlignY 时，全景竖直方向用百分之几对准 */
export const POSTER_ALIGN_Y_FALLBACK = 50;
