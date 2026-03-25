import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import gsocImg from '../../../assets/cyber/GSOC/1.png';
import styles from './GSocPanel.module.css';

// PDF.js worker (CDN — most reliable for CRA/webpack)
pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const GITHUB_URL = 'https://github.com/flexivian/flexbench/tree/develop';

const HIGHLIGHTS = [
  'HTTP load-testing framework built on Node.js cluster module',
  'Contributed anonymization pipeline for HTTPS traffic',
  'Integrated OpenAPI module for spec-driven test generation',
  'Improved throughput scalability across multi-core systems',
];

// Inline GitHub SVG icon
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={styles.ghIcon}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-1.93c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 2.87-.39c.97.01 1.95.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.06.78 2.13v3.17c0 .3.2.66.79.55C20.21 21.41 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}

export default function GSocPanel({ panelStyle, isVisible }) {
  const [numPages,   setNumPages]   = useState(null);
  const [pdfWidth,   setPdfWidth]   = useState(400);
  const pdfColRef = useRef(null);

  // Measure the PDF column width and set page width accordingly
  // ← TUNE: change 0.72 to make PDF pages wider (1.0) or narrower (0.5)
  const PDF_SCALE = 0.72;
  const measureWidth = useCallback(() => {
    if (pdfColRef.current) {
      setPdfWidth((pdfColRef.current.clientWidth - 32) * PDF_SCALE);
    }
  }, []);

  useEffect(() => {
    measureWidth();
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, [measureWidth]);

  const onLoadSuccess = useCallback(({ numPages: n }) => setNumPages(n), []);

  const pdfFile = `${process.env.PUBLIC_URL}/gsoc-proposal.pdf`;

  return (
    <section className={styles.panel} style={panelStyle} aria-label="About – GSOC 2024">

      {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
      <div className={`${styles.leftCol}${isVisible ? ` ${styles.leftColActive}` : ''}`}>

        {/* Screenshot image */}
        <div className={styles.imgFrame}>
          <div className={styles.imgScanline} aria-hidden="true" />
          <img src={gsocImg} alt="Flexbench project screenshot" className={styles.img} />
          <div className={styles.imgCornerTL} aria-hidden="true" />
          <div className={styles.imgCornerBR} aria-hidden="true" />
        </div>

        {/* Info block */}
        <div className={styles.info}>
          <span className={styles.badge}>
            2024 · GOOGLE SUMMER OF CODE
          </span>

          <h2 className={styles.org}>Flexivian</h2>
          <p className={styles.project}>flexbench</p>

          <ul className={styles.highlights}>
            {HIGHLIGHTS.map((h) => (
              <li key={h} className={styles.highlight}>
                <span className={styles.arrow}>▸</span>{h}
              </li>
            ))}
          </ul>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghLink}
          >
            <GithubIcon />
            VIEW ON GITHUB
          </a>
        </div>
      </div>

      {/* ── RIGHT COLUMN — PDF viewer ────────────────────────────── */}
      <div className={`${styles.rightCol}${isVisible ? ` ${styles.rightColActive}` : ''}`} ref={pdfColRef}>
        <div className={styles.pdfHeader}>
          <span className={styles.pdfLabel}>[ GSOC PROPOSAL ]</span>
          {numPages && (
            <span className={styles.pdfPages}>{numPages} PAGES</span>
          )}
        </div>

        <div className={styles.pdfScroll}>
          <Document
            file={pdfFile}
            onLoadSuccess={onLoadSuccess}
            loading={<p className={styles.pdfLoading}>LOADING DOCUMENT…</p>}
            error={<p className={styles.pdfLoading}>FAILED TO LOAD PDF</p>}
          >
            {Array.from({ length: numPages ?? 0 }, (_, i) => (
              <div key={i + 1} className={styles.pdfPageWrap}>
                <Page
                  pageNumber={i + 1}
                  width={pdfWidth}
                  renderTextLayer
                  renderAnnotationLayer
                />
                <span className={styles.pdfPageNo}>{i + 1} / {numPages}</span>
              </div>
            ))}
          </Document>
        </div>
      </div>

      {/* Bottom label strip */}
      <div className={styles.labelStrip}>
        <span className={styles.labelText}>[ RECORD 04 · OPEN SOURCE ]</span>
      </div>

    </section>
  );
}
