import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Nav from "./nav/Nav";
import About from "./about/About";
import Skills from "./skills/Skills";
import Projects from "./projects/Projects";
import Contact from "./contact/Contact";
import "./styles/app.css";
import Background from "./background/Background";
import PlayerStats from "./playerStats/PlayerStats";
import useSlideDirection from "./hooks/useSlideDirection";
import BackToUniverses from "./components/Shared/BackToUniverses";

export default function CyberUniPage() {
  const location = useLocation();
  const slideDirection = useSlideDirection();

  return (
    <div>
      <BackToUniverses />
      <Nav />
      <Background />
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames={slideDirection}
          timeout={500}
          unmountOnExit
        >
          <div className="page-wrapper">
            <Routes location={location}>
              <Route index element={<About />} />
              <Route path="skills" element={<Skills />} />
              <Route path="projects" element={<Projects />} />
              <Route path="contact" element={<Contact />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <PlayerStats />
    </div>
  );
}
