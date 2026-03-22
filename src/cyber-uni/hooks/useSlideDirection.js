import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSlideDirection = () => {
  const location = useLocation();
  const previousPathname = useRef(null);
  const [slideDirection, setSlideDirection] = useState('slide-right');

  useEffect(() => {
    // Define the order of the routes
    const routeOrder = [
      '/cyber-uni',
      '/cyber-uni/skills',
      '/cyber-uni/projects',
      '/cyber-uni/contact',
    ];

    // Get indexes of current and previous paths in the order array
    const currentIndex = routeOrder.indexOf(location.pathname);
    const previousIndex = routeOrder.indexOf(previousPathname.current);

    // Determine slide direction
    let newSlideDirection = 'slide-right'; // Default

    if (currentIndex === -1 && previousIndex === -1) {
      newSlideDirection = 'slide-none'; // Both routes are unknown
    } else if (currentIndex === -1) {
      newSlideDirection = 'slide-right'; // Navigating to unknown route
    } else if (previousIndex === -1) {
      newSlideDirection = 'slide-right'; // Navigating from unknown route
    } else if (currentIndex === previousIndex) {
      newSlideDirection = 'slide-none'; // Same route
    } else if (currentIndex > previousIndex) {
      newSlideDirection = 'slide-right'; // Navigating forward
    } else if (currentIndex < previousIndex) {
      newSlideDirection = 'slide-left'; // Navigating backward
    }

    setSlideDirection(newSlideDirection);

    // Update the previous pathname after the state update
    previousPathname.current = location.pathname;
  }, [location.pathname]);

  return slideDirection;
};

export default useSlideDirection;
