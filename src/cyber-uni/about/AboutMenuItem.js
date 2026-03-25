import React from 'react';
import classNames from 'classnames';
import "../styles/aboutMenu.css";

const AboutMenuItem = ({ title, active, onClick }) => (
  <div
    className={classNames("item", { active })}
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <h2 className="title">{title}</h2>
  </div>
);

export default AboutMenuItem;
