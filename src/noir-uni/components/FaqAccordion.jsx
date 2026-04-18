import React, { useState, useCallback } from "react";
import styles from "./FaqAccordion.module.css";

/**
 * Single accordion row. Uses controlled React state (not native `<details>`)
 * so we can animate both open AND close with CSS grid-rows trick.
 *
 * The "+" mark rotates 45° to render as an "×" when the row is open — keeps
 * the DOM simple while still giving a clear affordance.
 */
function FaqRow({ item, isOpen, onToggle }) {
  const contentId = `${item.id}-content`;
  const triggerId = `${item.id}-trigger`;

  return (
    <li
      className={`${styles.row} ${isOpen ? styles.rowOpen : ""}`.trim()}
    >
      <button
        type="button"
        id={triggerId}
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
      >
        <span className={styles.question}>{item.q}</span>
        <span className={styles.toggleMark} aria-hidden>
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.answerWrap}
        aria-hidden={!isOpen}
      >
        <div className={styles.answer}>
          <p className={styles.answerText}>{item.a}</p>
        </div>
      </div>
    </li>
  );
}

/**
 * FAQ accordion list. Only one row can be open at a time (standard a11y
 * pattern for a FAQ; prevents the page from jumping around). Pass `multi`
 * to allow multiple rows open simultaneously.
 */
export function FaqAccordion({ items, multi = false, defaultOpenId = null }) {
  const [openSet, setOpenSet] = useState(
    () => new Set(defaultOpenId ? [defaultOpenId] : [])
  );

  const toggle = useCallback(
    (id) => {
      setOpenSet((prev) => {
        const next = new Set(multi ? prev : []);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [multi]
  );

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <FaqRow
          key={item.id}
          item={item}
          isOpen={openSet.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </ul>
  );
}
