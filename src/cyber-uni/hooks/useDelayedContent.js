import { useState, useEffect } from 'react';

const useDelayedContent = (delay = 5000) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set a timer to update showContent after the specified delay
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delay);

    // Clear the timer if the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return showContent;
};

export default useDelayedContent;
