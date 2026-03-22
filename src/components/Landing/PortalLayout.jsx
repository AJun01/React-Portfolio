import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, motionValue, animate } from "framer-motion";
import PortalItem from "./PortalItem";
import { panoramaObjectPosition } from "./portalPanorama";
import styles from "../../styles/portals.module.css";
import { PORTALS, POSTER_ALIGN_Y_FALLBACK } from "./portals";

// ---------------------------------------------------------------------------
// 整页最外面只有「一条」横条容器包着四列，所以宽度和左移只能设一份，四列共用。
// 想改左右露黑边、整条往哪挪，只改这里。
// ---------------------------------------------------------------------------
const PORTAL_OUTER_ROW = {
  /** 这一条有多宽（vw）。数字越大，左右越不容易露出黑底。 */
  containerWidthVw: 120,
  /** 整条往左挪多少（vw，一般是负数）。跟宽度没关系，单独调位置。 */
  containerMarginLeftVw: -10,
};

// ---------------------------------------------------------------------------
// 和「某一列长什么样」无关，整页一起生效的动效：手风琴、点进去延迟、闪一下、谁压谁。
// ---------------------------------------------------------------------------
const PORTAL_BEHAVIOR = {
  /** 鼠标悬停时，当前这一条相对变宽多少倍 */
  hoverExpandMult: 9,
  /** 悬停时，其它几条相对变窄多少倍 */
  hoverSiblingMult: 0.97,
  /** 点下去之后，当前这条 flex 权重（越大越占满） */
  expandActiveWeight: 14,
  /** 点下去之后，其它几条 flex 权重 */
  expandInactiveWeight: 0.28,
  /** 手风琴变宽变窄要动画多久（秒） */
  flexTransitionSec: 0.6,
  /** 手风琴缓动；数组格式同时供 CSS cubic-bezier 和 framer-motion ease 使用 */
  flexTransitionBezier: [0.25, 1, 0.5, 1],
  /** 点下去之后等多久再跳转页面（毫秒） */
  clickNavigateDelayMs: 620,
  /** 跳转前中间闪一下有多亮（0～1） */
  flashOpacity: 0.35,
  /** 闪一下持续多久（秒） */
  flashDurationSec: 0.2,
  /** 闪一下的缓动，给 framer-motion 用的 */
  flashEase: [0.25, 1, 0.5, 1],
  /** 鼠标悬停时，这一条 z-index 提到多少（盖住邻居） */
  zHoveredActive: 30,
  /** 点下去展开时，这一条 z-index 提到多少 */
  zExpandingActive: 40,
};

/** 只负责最外层容器 + 手风琴 transition 的 CSS 变量 */
function portalRowCssVars() {
  const R = PORTAL_OUTER_ROW;
  const B = PORTAL_BEHAVIOR;
  return {
    "--portal-container-width": `${R.containerWidthVw}vw`,
    "--portal-container-margin-left": `${R.containerMarginLeftVw}vw`,
    "--portal-flex-transition": `flex ${B.flexTransitionSec}s cubic-bezier(${B.flexTransitionBezier.join(", ")})`,
  };
}

function flexWeights(hoveredIndex, expandingIndex, n) {
  const B = PORTAL_BEHAVIOR;
  if (expandingIndex !== null) {
    return Array.from({ length: n }, (_, i) =>
      i === expandingIndex ? B.expandActiveWeight : B.expandInactiveWeight
    );
  }
  if (hoveredIndex !== null) {
    return Array.from({ length: n }, (_, i) => {
      const mult =
        i === hoveredIndex ? B.hoverExpandMult : B.hoverSiblingMult;
      return Math.round(mult * 1000) / 1000;
    });
  }
  return Array(n).fill(1);
}

function zForIndex(i, hoveredIndex, expandingIndex) {
  const B = PORTAL_BEHAVIOR;
  if (expandingIndex !== null) {
    return expandingIndex === i ? B.zExpandingActive : i + 1;
  }
  if (hoveredIndex !== null) {
    return hoveredIndex === i ? B.zHoveredActive : i + 1;
  }
  return i + 1;
}

/**
 * 根据 flex 权重数组，计算每列左边缘相对于视口的 vw 坐标。
 * 公式：slice_i_left = containerMarginLeft + (累加前序权重 / 总权重) × containerWidth
 */
function computeSliceLeftsVw(weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  const lefts = [];
  let acc = PORTAL_OUTER_ROW.containerMarginLeftVw;
  for (const w of weights) {
    lefts.push(acc);
    acc += (w / total) * PORTAL_OUTER_ROW.containerWidthVw;
  }
  return lefts;
}

export default function PortalLayout() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandingIndex, setExpandingIndex] = useState(null);

  const weights = useMemo(
    () => flexWeights(hoveredIndex, expandingIndex, PORTALS.length),
    [hoveredIndex, expandingIndex]
  );

  // 每列一个 motionValue，追踪该列左边缘的 viewport x 坐标（vw）。
  // 用等宽初始值初始化，避免首帧闪烁。
  const sliceLeftMvs = useMemo(
    () =>
      computeSliceLeftsVw(Array(PORTALS.length).fill(1)).map((v) =>
        motionValue(v)
      ),
    []
  );

  // 每当 flex 权重变化，用与 CSS flex transition 完全相同的曲线同步驱动 motionValues。
  // useLayoutEffect 确保两个动画在同一帧内启动，不产生漂移。
  useLayoutEffect(() => {
    const lefts = computeSliceLeftsVw(weights);
    const B = PORTAL_BEHAVIOR;
    sliceLeftMvs.forEach((mv, i) => {
      animate(mv, lefts[i], {
        duration: B.flexTransitionSec,
        ease: B.flexTransitionBezier,
      });
    });
  }, [weights, sliceLeftMvs]);

  const runEnterTransition = useCallback(
    (path) => {
      setExpandingIndex(null);
      navigate(path);
    },
    [navigate]
  );

  const handleClick = useCallback(
    (index, path) => {
      if (expandingIndex !== null) return;
      setHoveredIndex(index);
      setExpandingIndex(index);
      window.setTimeout(
        () => runEnterTransition(path),
        PORTAL_BEHAVIOR.clickNavigateDelayMs
      );
    },
    [expandingIndex, runEnterTransition]
  );

  const items = useMemo(
    () =>
      PORTALS.map((p, i) => (
        <PortalItem
          key={p.path}
          portalIndex={i}
          title={p.title}
          subtitle={p.subtitle}
          sliceLabel={p.sliceLabel}
          hintAction={p.hintAction}
          sliceVariant={p.sliceVariant || "default"}
          accentGradient={p.accent}
          posterSrc={p.posterSrc}
          posterObjectPosition={
            p.posterSrc
              ? panoramaObjectPosition(
                  i,
                  PORTALS.length,
                  p.posterAlignY ?? POSTER_ALIGN_Y_FALLBACK,
                  p.posterAlignX
                )
              : undefined
          }
          skewDeg={p.skewDeg}
          sliceBorderPx={p.sliceBorderPx}
          sliceBorderColor={p.sliceBorderColor}
          sliceCanvasHeightVh={p.sliceCanvasHeightVh}
          sliceCanvasTopVh={p.sliceCanvasTopVh}
          posterBleedScale={p.posterBleedScale}
          videoSrc={p.videoSrc}
          videoObjectPosition={p.videoObjectPosition}
          sliceLeftMv={sliceLeftMvs[i]}
          flexWeight={weights[i]}
          isHovered={hoveredIndex === i}
          isExpanding={expandingIndex === i}
          zIndex={zForIndex(i, hoveredIndex, expandingIndex)}
          onPointerEnter={() => setHoveredIndex(i)}
          onPointerLeave={() => {
            if (expandingIndex === null) setHoveredIndex(null);
          }}
          onClick={() => handleClick(i, p.path)}
        />
      )),
    [hoveredIndex, expandingIndex, handleClick, weights, sliceLeftMvs]
  );

  const B = PORTAL_BEHAVIOR;

  return (
    <div className={styles.root}>
      <div className={styles.stage}>
        <div
          className={styles.portalContainer}
          style={portalRowCssVars()}
        >
          {items}
        </div>
      </div>
      <motion.div
        className={styles.flash}
        initial={false}
        animate={{
          opacity: expandingIndex !== null ? B.flashOpacity : 0,
        }}
        transition={{
          duration: B.flashDurationSec,
          ease: B.flashEase,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
