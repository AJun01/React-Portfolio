/**
 * 四列当作同一张横拼长卷的四个取景窗；竖直用 posterAlignY。
 * 若传入 posterAlignX，横坐标用该 %；否则按列自动算长卷锚点。
 *
 * 注：object-position 现在作用于固定 100vw×100vh 的 portalCounter，
 * 因此百分比等价于视口百分比，hover 展开不会影响取景位置。
 */
export function panoramaObjectPosition(
  columnIndex,
  columnCount,
  alignYPercent = 50,
  alignXPercent
) {
  const useAutoX = alignXPercent === undefined || alignXPercent === null;
  const x = useAutoX
    ? ((columnIndex + 0.5) / columnCount) * 100
    : alignXPercent;
  return `${x}% ${alignYPercent}%`;
}
