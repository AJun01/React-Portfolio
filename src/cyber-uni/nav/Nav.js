import React from 'react';
import { CYBER_ROUTES } from '../routes';
import '../styles/nav.css';

/**
 * Horizontal-layout nav: icons are anchor buttons that scroll to
 * their section. The active section is highlighted.
 *
 * Props:
 *   onNavigate(section: string) — called when an icon is clicked
 *   activeSection: string       — currently visible section key
 */
export default function Nav({ onNavigate, activeSection }) {
  return (
    <nav className="nav">
      {CYBER_ROUTES.map((route) => {
        const isCurrent = route.section === activeSection;
        return (
          <button
            key={route.section}
            className={`nav-btn${isCurrent ? ' current' : ''}`}
            onClick={() => onNavigate(route.section)}
            aria-label={route.label}
            title={route.label}
          >
            <img className="icon" src={route.icon} alt={route.iconAlt} />
            {isCurrent && (
              <span className="page-title">{route.label}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
