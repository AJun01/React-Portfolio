import React, { useEffect, useRef } from "react";
import { motion, useTransform } from "framer-motion";
import classNames from "classnames";
import styles from "../../styles/portals.module.css";
import fn from "../../noir-uni/styles/FilmNoirPortal.module.css";
import cyber from "../../cyber-uni/styles/CyberPortalLanding.module.css";
import px from "../../pixel-uni/styles/PixelPortalLanding.module.css";
import mv from "../../miami-vice-uni/styles/MiamiVicePortalLanding.module.css";

export default function PortalItem({
  portalIndex,
  title,
  accentGradient,
  posterSrc,
  posterObjectPosition,
  videoSrc,
  videoObjectPosition,
  sliceVariant = "default",
  sliceLabel,
  subtitle,
  /** 这一条斜切角度，内层自动取相反数 */
  skewDeg,
  sliceBorderPx,
  sliceBorderColor,
  /** 里层画布高度（vh，100 = 满屏高） */
  sliceCanvasHeightVh,
  /** 里层画布 top 偏移（vh，负数往上挪） */
  sliceCanvasTopVh,
  /** 海报/视频略放大，盖住斜切黑角 */
  posterBleedScale,
  /**
   * 当前列左边缘的 viewport x 坐标（vw）。
   * portalCounter 使用 translateX(-sliceLeftVw) + skewX(-skewDeg) 组合 transform，
   * GPU 合成层，不触发 layout reflow。
   */
  sliceLeftMv,
  flexWeight = 1,
  isHovered,
  isExpanding,
  zIndex,
  onPointerEnter,
  onPointerLeave,
  onClick,
}) {
  // translateX(-sliceLeft) 锚定 counter 到 viewport 左边缘；skewX 反向抵消 slice 的倾斜。
  // 使用 transform（GPU 合成）而非 left（触发 layout reflow），消除动画频闪。
  const counterTransform = useTransform(
    sliceLeftMv,
    (v) => `translateX(${-v}vw) skewX(${-skewDeg}deg)`
  );

  const videoRef = useRef(null);
  const showMedia = isHovered || isExpanding;
  const isFilmNoir = sliceVariant === "filmNoir";
  const isCyber = sliceVariant === "cyber";
  const isPixel = sliceVariant === "pixel";
  const isMiamiVice = sliceVariant === "miamiVice";

  useEffect(() => {
    if (!videoSrc || !showMedia) return;
    const el = videoRef.current;
    if (!el) return;
    const p = el.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [videoSrc, showMedia]);

  const posterBleedTransform =
    posterSrc || (videoSrc && showMedia)
      ? { transform: `scale(${posterBleedScale})`, transformOrigin: "center center" }
      : null;

  const posterStyle = posterSrc
    ? {
        ...(posterObjectPosition ? { objectPosition: posterObjectPosition } : {}),
        ...posterBleedTransform,
      }
    : undefined;

  const videoStyle =
    videoSrc && showMedia
      ? {
          ...(videoObjectPosition ? { objectPosition: videoObjectPosition } : {}),
          ...posterBleedTransform,
        }
      : undefined;

  const posterAndVideo = (
    <>
      {posterSrc ? (
        <img
          className={styles.portalPoster}
          src={posterSrc}
          alt=""
          style={posterStyle}
        />
      ) : null}
      {videoSrc && showMedia ? (
        <video
          ref={videoRef}
          className={styles.portalVideo}
          style={videoStyle}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const accentLayer = accentGradient ? (
    <div
      className={styles.bg}
      style={{ backgroundImage: accentGradient }}
      aria-hidden="true"
    />
  ) : null;

  return (
    <div
      className={styles.portalSlice}
      data-index={portalIndex}
      data-has-poster={posterSrc ? "true" : "false"}
      data-has-video={videoSrc ? "true" : "false"}
      data-variant={sliceVariant}
      data-active={showMedia ? "true" : "false"}
      style={{
        zIndex,
        flex: `${flexWeight} 1 0%`,
        "--portal-skew-deg": `${skewDeg}deg`,
        "--portal-slice-border": `${sliceBorderPx}px solid ${sliceBorderColor}`,
        "--portal-slice-canvas-height": `${sliceCanvasHeightVh}vh`,
        "--portal-slice-canvas-top": `${sliceCanvasTopVh}vh`,
        "--border-anim-delay": `${-(portalIndex * 1.1)}s`,
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* counterTransform = translateX(-sliceLeftVw) skewX(-deg)
          GPU 合成层：translateX 锚定视口，skewX 抵消父级倾斜，两者合并为单条 transform。 */}
      <motion.div
        className={styles.portalCounter}
        style={{ transform: counterTransform }}
      >
        <div
          className={classNames(
            styles.counterStack,
            isFilmNoir && fn.innerRoot,
            isCyber && cyber.innerRoot,
            isPixel && px.innerRoot,
            isMiamiVice && mv.innerRoot
          )}
        >
          {isFilmNoir ? (
            <>
              <div className={fn.mediaStack}>
                <div className={fn.filteredBackdrop}>{posterAndVideo}</div>
                {accentLayer}
              </div>
              <div className={fn.grainOverlay} aria-hidden="true" />
              <div
                className={classNames(
                  fn.dimFilmNoir,
                  showMedia ? fn.dimFilmNoirActive : fn.dimFilmNoirInactive
                )}
                aria-hidden="true"
              />
            </>
          ) : isCyber ? (
            <>
              <div className={cyber.mediaStack}>
                <div className={cyber.mediaBoost}>{posterAndVideo}</div>
                <div className={cyber.scanBeam} aria-hidden="true" />
              </div>
              <div
                className={classNames(
                  cyber.dimCyber,
                  showMedia ? cyber.dimCyberActive : cyber.dimCyberInactive
                )}
                aria-hidden="true"
              />
            </>
          ) : isPixel ? (
            <>
              <div className={px.mediaStack}>
                <div className={px.mediaBoost}>{posterAndVideo}</div>
                <div className={px.scanOverlay} aria-hidden="true" />
                <div className={px.bezelGlow} aria-hidden="true" />
              </div>
              <div
                className={classNames(
                  px.dimPixel,
                  showMedia ? px.dimPixelActive : px.dimPixelInactive
                )}
                aria-hidden="true"
              />
            </>
          ) : isMiamiVice ? (
            <>
              <div className={mv.mediaStack}>
                <div className={mv.mediaBoost}>{posterAndVideo}</div>
                <div className={mv.sunsetBeam} aria-hidden="true" />
              </div>
              <div
                className={classNames(
                  mv.dimVice,
                  showMedia ? mv.dimViceActive : mv.dimViceInactive
                )}
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              {posterAndVideo}
              {accentLayer}
              <div className={styles.dim} aria-hidden="true" />
            </>
          )}
        </div>
      </motion.div>

      <div
        className={classNames(
          styles.content,
          isFilmNoir && fn.contentFilmNoir,
          isCyber && cyber.contentCyber,
          isPixel && px.contentPixel,
          isMiamiVice && mv.contentVice
        )}
      >
        {isFilmNoir ? (
          <>
            <p className={fn.labelNoir}>{sliceLabel || "Film Noir"}</p>
            <h2 className={fn.titleNoir}>{title}</h2>
            {subtitle ? <p className={fn.subtitleNoir}>{subtitle}</p> : null}
          </>
        ) : (
          <h2
            className={classNames(
              styles.title,
              isCyber && cyber.titleCyber,
              isPixel && px.titlePixel,
              isMiamiVice && mv.titleVice
            )}
          >
            {title}
          </h2>
        )}
      </div>
    </div>
  );
}
