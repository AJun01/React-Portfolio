import astronautHelmet from "../assets/cyber/helmet.png";
import blade          from "../assets/cyber/blade.png";
import fist           from "../assets/cyber/fist.png";
import envelope       from "../assets/cyber/envelope.png";

/**
 * Navigation configuration for Cyber Uni.
 * `section` is the key used by CyberUniHorizontalPage and Nav
 * to map icons → scroll targets.
 */
export const CYBER_ROUTES = [
  {
    section:  'about',
    label:    'ABOUT',
    icon:     astronautHelmet,
    iconAlt:  'astronaut helmet icon',
  },
  {
    section:  'skills',
    label:    'SKILLS',
    icon:     blade,
    iconAlt:  'blade icon',
  },
  {
    section:  'projects',
    label:    'PROJECTS',
    icon:     fist,
    iconAlt:  'fist icon',
  },
  {
    section:  'contact',
    label:    'CONTACT',
    icon:     envelope,
    iconAlt:  'envelope icon',
  },
];
