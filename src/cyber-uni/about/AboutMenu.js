import React, { useState } from 'react';
import AboutMenuItem from "./AboutMenuItem";
import AboutSubheading from "./AboutSubheading";
import subheadingsData from "./subheadingsData";
import personalIcon from "../../assets/cyber/moebius-triangle.png";
import educationIcon from "../../assets/cyber/upgrade.png";
import careerIcon from "../../assets/cyber/triple-corn.png";

const MENU_ITEMS = [
  { id: 1, label: "PERSONAL", icon: personalIcon },
  { id: 2, label: "EDUCATION", icon: educationIcon },
  { id: 3, label: "CAREER",    icon: careerIcon    },
];

export default function AboutMenu() {
  const [activeMenuItem, setActiveMenuItem]   = useState(1);
  const [activeSubheading, setActiveSubheading] = useState(1);

  const handleMenuItemClick = (id) => {
    setActiveMenuItem(id);
    setActiveSubheading(1);
  };

  const activeItem     = MENU_ITEMS.find((m) => m.id === activeMenuItem);
  const subheadings    = subheadingsData[activeMenuItem];

  return (
    <>
      <div className="menu">
        {MENU_ITEMS.map((item) => (
          <AboutMenuItem
            key={item.id}
            title={item.label}
            active={activeMenuItem === item.id}
            onClick={() => handleMenuItemClick(item.id)}
          />
        ))}
      </div>

      <div className="sub-container">
        <div className="icon-title-container">
          <img src={activeItem.icon} alt={activeItem.label} className="icon" />
          <h3>{activeItem.label}</h3>
        </div>
        {subheadings.map((subheading, index) => (
          <AboutSubheading
            key={subheading.title}
            title={subheading.title}
            content={subheading.content}
            active={activeSubheading === index + 1}
            onClick={() => setActiveSubheading(index + 1)}
            menuItem={activeMenuItem}
          />
        ))}
      </div>
    </>
  );
}
