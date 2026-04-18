import React from "react";
import styles from "./BacklotProductIllustrations.module.css";
import backlotWorkspaceShot from "../assets/noir/overview.png";
import backlotWorkflowShot from "../assets/noir/workflow.png";

function IlluRoundtable() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="rt-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--illu-accent, #c9a962)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--illu-accent, #c9a962)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#rt-glow)" rx="12" />
      <circle cx="160" cy="100" r="28" fill="rgba(255,255,255,0.06)" stroke="var(--illu-accent, #c9a962)" strokeWidth="1.5" />
      <path
        d="M160 72 L160 56 M160 128 L160 144 M132 100 L116 100 M188 100 L204 100 M138 78 L126 66 M182 122 L194 134 M182 78 L194 66 M138 122 L126 134"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * 2 * Math.PI;
        return (
          <circle
            key={i}
            cx={160 + 78 * Math.cos(angle)}
            cy={100 + 78 * Math.sin(angle)}
            r="10"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
        );
      })}
      <path
        d="M88 160 Q160 176 232 160"
        fill="none"
        stroke="var(--illu-accent, #c9a962)"
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
}

function IlluCrew() {
  const avatars = [0, 1, 2, 3, 4];
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="320" height="200" rx="12" fill="rgba(255,255,255,0.03)" />
      <rect x="24" y="36" width="272" height="128" rx="10" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.1)" />
      {avatars.map((i) => (
        <g key={i} transform={`translate(${48 + i * 52}, 64)`}>
          <circle r="18" fill="rgba(255,255,255,0.07)" stroke="var(--illu-accent, #c9a962)" strokeWidth="1" opacity="0.85" />
          <circle cx="0" cy="-4" r="6" fill="rgba(255,255,255,0.35)" />
        </g>
      ))}
      <rect x="40" y="118" width="240" height="8" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="40" y="132" width="180" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
    </svg>
  );
}

function IlluWorkspace() {
  return (
    <img
      className={styles.shot}
      src={backlotWorkspaceShot}
      alt="Backlot Alpha workspace: Writers' Room × Factory Floor × Inspector with a live Production Bible DAG."
      loading="lazy"
      decoding="async"
    />
  );
}

function IlluWorkflow() {
  return (
    <img
      className={styles.shot}
      src={backlotWorkflowShot}
      alt="Backlot production DAG: Script Analyst analyzes the Production Bible and branches out to characters, environments, and shots."
      loading="lazy"
      decoding="async"
    />
  );
}

function IlluAav() {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="320" height="200" rx="12" fill="rgba(255,255,255,0.03)" />
      <rect x="32" y="48" width="256" height="36" rx="8" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.12)" />
      <circle cx="52" cy="66" r="8" stroke="var(--illu-accent, #c9a962)" fill="none" strokeWidth="1.5" opacity="0.8" />
      <path d="M72 66 H248" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <rect x="48" y="104" width="96" height="56" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      <rect x="176" y="104" width="96" height="56" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      <rect x="52" y="122" width="40" height="10" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="188" y="122" width="52" height="10" rx="2" fill="rgba(255,255,255,0.08)" />
    </svg>
  );
}

const MAP = {
  roundtable: IlluRoundtable,
  crew: IlluCrew,
  workspace: IlluWorkspace,
  workflow: IlluWorkflow,
  aav: IlluAav,
};

/**
 * @param {{ illustrationKey: string }} props
 */
export function FeatureIllustration({ illustrationKey }) {
  const Cmp = MAP[illustrationKey] || IlluRoundtable;
  return (
    <div className={styles.wrap}>
      <Cmp />
    </div>
  );
}
