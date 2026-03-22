import React from 'react'
import { Link, useLocation } from "react-router-dom";
import astronautHelmet from "../../assets/cyber/helmet.png";
import deadEye from "../../assets/cyber/blade.png";
import stack from "../../assets/cyber/fist.png";
import envelop from "../../assets/cyber/envelope.png";
import "../styles/nav.css";


export default function Nav() {
    const location = useLocation();

    const getNavPositionClass = () => {
        switch (location.pathname){
            case "/cyber-uni": 
                return "nav-about";
            case "/cyber-uni/skills": 
                return "nav-skills";
            case "/cyber-uni/projects": 
                return "nav-projects";
            case "/cyber-uni/contact": 
                return "nav-contact";
            default: 
                return "";
        }
    }

    const getPageTitle = () => {
        switch (location.pathname){
            case "/cyber-uni": 
                return "ABOUT";
            case "/cyber-uni/skills": 
                return "SKILLS";
            case "/cyber-uni/projects": 
                return "PROJECTS";
            case "/cyber-uni/contact": 
                return "CONTACT";
            default: 
                return "";
        }
    }

    const navPositionClass = getNavPositionClass();
    const PageTitle = getPageTitle();

    const isCurrentPage = (navClass) => {
        return navClass === navPositionClass
    };

    const renderNavLink = (to, imgSrc, altText, navClass) => {
        const isCurrent = isCurrentPage(navClass);
        const linkClass = isCurrent ? "nav-link current" : "nav-link"
    
        return(
            <Link to={to} className={linkClass}>
                <img className='icon' src={imgSrc} alt={altText}/>
                {isCurrent && <h1 className='page-title'>{PageTitle}</h1>}
            </Link>
        );
    };



    return (
        <nav className={`nav ${navPositionClass}`}>
            {renderNavLink(
                "/cyber-uni",
                astronautHelmet,
                "astronaut helmet icon",
                "nav-about"
            )}
            {renderNavLink(
                "/cyber-uni/skills",
                deadEye,
                "deadEye icon",
                "nav-skills"
            )}
            {renderNavLink(
                "/cyber-uni/projects",
                stack,
                "stack icon",
                "nav-projects"
            )}
            {renderNavLink(
                "/cyber-uni/contact",
                envelop,
                "envelop icon",
                "nav-contact"
            )}
            </nav>
    )

}
