import React, { Component } from 'react';
import henshin from '../../assets/cyber/start.png';
import henshin1 from '../../assets/cyber/middle.png';
import henshin2 from '../../assets/cyber/end.png';
import "../styles/henshinEffect.css";

class HenshinEffect extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showFirstImage: true,    // Controls the visibility of the first image
          showSecondImage: false,  // Controls the visibility of the second image
          showThirdImage: false,   // Controls the visibility of the third image
          showLightEffect: false,  // Controls the visibility of the light effect
          showWhiteOverlay: false,
          henshinZIndex: 999,  // Controls the visibility of the white overlay
        };
      }
    
      componentDidMount() {
        const imageDuration = 1400; // Total duration each image is displayed
        const transitionDuration = 500; // Duration of fade transitions (overlap)
        const lightEffectDuration = 2000; // Duration of the light effect
        const overlayFadeDuration = 1000; // Duration of the overlay fade-out
    
        // Start the sequence
        setTimeout(() => {
          // Start fading in the second image
          this.setState({ showSecondImage: true });
    
          // Fade out the first image after overlap
          setTimeout(() => {
            this.setState({ showFirstImage: false });
          }, transitionDuration);
    
          // Display the second image for the remaining duration
          setTimeout(() => {
            // Start fading in the third image
            this.setState({ showThirdImage: true });
    
            // Fade out the second image after overlap
            setTimeout(() => {
              this.setState({ showSecondImage: false });
            }, transitionDuration);
    
            // Display the third image for the remaining duration
            setTimeout(() => {
              // Start the light effect
              this.setState({ showLightEffect: true });
    
              // Fade out the third image after overlap
              setTimeout(() => {
                this.setState({ showThirdImage: false });
              }, transitionDuration);
    
              // After light effect duration
              setTimeout(() => {
                // Show the white overlay
                this.setState({ showWhiteOverlay: true });
    
                // Hide the light effect
                this.setState({ showLightEffect: false });
    
                // Fade out the white overlay
                setTimeout(() => {
                  this.setState({ showWhiteOverlay: false });

                  this.setState({ henshinZIndex: -999 });

                  if (this.props.onComplete) {
                    this.props.onComplete();
                  }
                }, overlayFadeDuration); // Overlay fade-out duration
              }, lightEffectDuration); // Light effect duration
            }, imageDuration - transitionDuration); // Third image display duration
          }, imageDuration - transitionDuration); // Second image display duration
        }, imageDuration - transitionDuration); // First image display duration
      }
    
      render() {
        const {
          showFirstImage,
          showSecondImage,
          showThirdImage,
          showLightEffect,
          showWhiteOverlay,
          henshinZIndex,
        } = this.state;
    return (
      <>
       {/* First Image */}
       {(showFirstImage || showFirstImage === false) && (
          <img
            src={henshin}
            alt="Start"
            className={`transition-image ${!showFirstImage ? 'hidden' : ''}`}
            style={{
              position: 'fixed',
              top: 145,
              left: -16,
              width: '100%',
              height: '90%',
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: henshinZIndex,
            }}
          />
        )}

          {/* Second Image (Middle Image) */}
        {(showSecondImage || showSecondImage === false) && (
          <img
            src={henshin1}
            alt="Middle"
            className={`transition-image ${!showSecondImage ? 'hidden' : ''}`}
            style={{
                position: 'fixed',
                top: 160,
                left: 10,
                width: '100%',
                height: '90%',
                objectFit: 'contain',
                pointerEvents: 'none',
                zIndex: henshinZIndex,
            }}
          />
        )}

        {/* Third Image */}
        {(showThirdImage || showThirdImage === false) && (
          <img
            src={henshin2}
            alt="End"
            className={`transition-image ${!showThirdImage ? 'hidden' : ''}`}
            style={{
              position: 'fixed',
              top: 160,
              left: 10,
              width: '100%',
              height: '90%',
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: henshinZIndex,
            }}
          />
        )}

        {/* Light Effect */}
        {showLightEffect && <div className="light-effect"></div>}

        {/* White Overlay */}
        {showWhiteOverlay && <div className="white-overlay"></div>}
      </>
    );
  }
}

export default HenshinEffect;
