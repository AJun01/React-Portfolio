import React, { Component } from "react";
import "../styles/skillsMenu.css";
import classNames from "classnames";
import skills from "./skillsData";
import frontendIcon from "../../assets/cyber/front.png";
import backendIcon from "../../assets/cyber/back.png";

export default class SkillsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuItem: 1, // Default to FRONT-END
      initialRender: true, // To check if it is the first render
    };
  }

  handleMenuItemClick = (menuItem) => {
    // Update the active menu item
    this.setState({
      activeMenuItem: menuItem,
      initialRender: false, // Ensure subsequent renders don't trigger the animation
    });
  };

  renderContent = (skills) => {
    const { initialRender } = this.state;

    return skills.map((skill, index) => (
      <div key={index} className={`skill-sub-container-${this.state.activeMenuItem}`}>
        <h3>{skill.title}</h3>
        <div className="level-container">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`level-point ${
                i < skill.level
                  ? initialRender
                    ? "charging" // Trigger animation only on first render
                    : "filled" // Retain as filled after initial render
                  : "unfilled"
              }`}
              style={{
                animationDelay: initialRender && i < skill.level ? `${i * 0.2}s` : "0s", // Add stagger effect for the first render
              }}
            />
          ))}
        </div>
      </div>
    ));
  };

  render() {
    const { activeMenuItem } = this.state;
    const menuItems = ["FRONT-END", "BACK-END"];
    const currentIcon = activeMenuItem === 1 ? frontendIcon : backendIcon;

    return (
      <div className="skill-menu">
        {/* Menu items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={classNames("skill-item", {
              activeSkill: activeMenuItem === index + 1,
            })}
            onClick={() => this.handleMenuItemClick(index + 1)}
          >
            <h2 className="skill-title">{item}</h2>
          </div>
        ))}

        {/* Icon */}
        <img className="skill-icon" src={currentIcon} alt="current skill" />

        {/* Skill Content */}
        <div className="skill-sub-container">
          {this.renderContent(skills[activeMenuItem])}
        </div>
      </div>
    );
  }
}