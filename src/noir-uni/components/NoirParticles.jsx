import React, { useMemo } from "react";
import styles from "./NoirParticles.module.css";

/**
 * Deterministic 32-bit PRNG — same seed always produces the same scatter so
 * cards don't visually reshuffle on every render.
 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A thin layer of drifting dust motes for the Backlot noir aesthetic.
 * Each particle is a tiny radial-gradient dot that drifts upward with a small
 * horizontal wander, fading in and out on loop. `mix-blend-mode: screen` in the
 * CSS makes them brighten whatever sits behind, reading as real light.
 *
 * @param {{
 *   count?: number,   // number of dots (default 20)
 *   seed?: number,    // RNG seed for the scatter; pick something stable per host
 *   intensity?: number // 0..1 multiplier on peak opacity; dial particles down
 *                       where the host image is already busy
 * }} props
 */
export function NoirParticles({ count = 26, seed = 1, intensity = 1 }) {
  const particles = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 1.4 + rand() * 2.8,
      delay: rand() * -14,
      duration: 7 + rand() * 13,
      drift: (rand() - 0.5) * 48,
      rise: -50 - rand() * 70,
      peakOpacity: Math.min(1, (0.42 + rand() * 0.55) * intensity),
    }));
  }, [count, seed, intensity]);

  return (
    <div className={styles.particles} aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className={styles.dust}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift": `${p.drift}px`,
            "--rise": `${p.rise}px`,
            "--peak-opacity": p.peakOpacity,
          }}
        />
      ))}
    </div>
  );
}

export default NoirParticles;
