import React, { useEffect, useRef } from 'react';
import '../styles/background.css';
import video from '../../assets/cyber/bg-universe.mp4';

const Background = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  }, []);

  return (
    <>
      <div className="shadow-overlay"></div>
      <video
        ref={videoRef}
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
        id="bg"
        aria-hidden="true"
      >
        <source src={video} type="video/mp4" />
      </video>
    </>
  );
};

export default Background;
