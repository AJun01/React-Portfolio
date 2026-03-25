import React from 'react';
import styles from './ImageSlot.module.css';

/**
 * Cyberpunk-framed image slot.
 *
 * Props:
 *   src      {string|null}  image URL; renders placeholder grid when null
 *   alt      {string}
 *   variant  {'portrait'|'landscape'|'dossier'|'fullBleed'}
 *   className {string}      extra classes on the outer wrapper
 */
export default function ImageSlot({ src, alt = '', variant = 'portrait', className = '' }) {
  return (
    <div className={`${styles.slot} ${styles[variant] ?? ''} ${className}`}>

      {src ? (
        <>
          <img src={src} alt={alt} className={styles.img} />
          {/* CRT scanline overlay */}
          <div className={styles.scanlines} aria-hidden="true" />
          {/* Colour-grade gradient */}
          <div className={styles.colorGrade} aria-hidden="true" />
        </>
      ) : (
        /* Placeholder when no photo supplied yet */
        <div className={styles.placeholder} aria-hidden="true">
          <div className={styles.gridLines} />
          <div className={styles.crosshair} />
          <span className={styles.placeholderTag}>{'// PHOTO PENDING'}</span>
        </div>
      )}

      {/* Corner brackets */}
      <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />

      {/* Bottom-left data strip */}
      <div className={styles.dataStrip} aria-hidden="true">
        <span className={styles.dataLabel}>{alt || 'IMG'}</span>
      </div>
    </div>
  );
}
