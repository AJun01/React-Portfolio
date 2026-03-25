import React, { useState } from 'react';
import classNames from 'classnames';
import projects from "./projectsData";
import "../styles/projectsMenu.css";

const PROJECT_ITEMS = [
  { id: 1, label: "PROJECT ONE"   },
  { id: 2, label: "PROJECT TWO"   },
  { id: 3, label: "PROJECT THREE" },
];

export default function ProjectsMenu() {
  const [activeProject, setActiveProject] = useState(1);

  const project = projects[activeProject];

  return (
    <div className="project-menu">
      <div className="project-items-container">
        {PROJECT_ITEMS.map((item) => (
          <div
            key={item.id}
            className={classNames("project-item", { activeProject: activeProject === item.id })}
            role="button"
            tabIndex={0}
            onClick={() => setActiveProject(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveProject(item.id);
              }
            }}
          >
            <h2 className="title">{item.label}</h2>
          </div>
        ))}
      </div>

      <div className="project-sub-container">
        <div className={`project-sub-container-1`}>
          <h3>{project.title}</h3>
          <img src={project.image} alt={project.title} />
          <div>{project.description}</div>
          <div className="link-container">
            <a href={project.github} target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a href={project.demo}   target="_blank" rel="noopener noreferrer">DEMO</a>
          </div>
        </div>
      </div>
    </div>
  );
}
