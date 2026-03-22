import { useState, useEffect } from 'react';

const useAppearAnimation = (initialDelay = 0, staggerDelay = 500) => {
  const [animationStates, setAnimationStates] = useState({
    showNav: false,
    showPlayerStats: false,
    showContent: false,
  });

  useEffect(() => {
    const timers = [];

    // Start the sequence after the initial delay
    timers.push(
      setTimeout(() => {
        setAnimationStates((prev) => ({ ...prev, showNav: true }));

        // Show PlayerStats after staggerDelay
        timers.push(
          setTimeout(() => {
            setAnimationStates((prev) => ({ ...prev, showPlayerStats: true }));

            // Show Content after another staggerDelay
            timers.push(
              setTimeout(() => {
                setAnimationStates((prev) => ({ ...prev, showContent: true }));
              }, staggerDelay)
            );
          }, staggerDelay)
        );
      }, initialDelay)
    );

    // Clear timers on unmount
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [initialDelay, staggerDelay]);

  return animationStates;
};

export default useAppearAnimation;
