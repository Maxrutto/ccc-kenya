import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function GlitchText({ text, delay = 0, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Calculate animation delays for glitch layers
  const glitchDelay1 = `${delay / 1000 + 0.3}s`;
  const glitchDelay2 = `${delay / 1000 + 0.4}s`;

  return (
    <motion.div
      className={`glitch-text-container ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '800px'
      }}
      initial={{ 
        opacity: 0, 
        scale: 0.9,
        rotateX: 20,
        rotateY: -10,
        z: -100
      }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.9,
        rotateX: isVisible ? 0 : 20,
        rotateY: isVisible ? 0 : -10,
        z: isVisible ? 0 : -100
      }}
      transition={{ 
        duration: 0.8, 
        delay: delay / 1000,
        rotateX: {
          type: "spring",
          stiffness: 100,
          damping: 15
        },
        rotateY: {
          type: "spring",
          stiffness: 110,
          damping: 17
        },
        z: {
          type: "spring",
          stiffness: 90,
          damping: 14
        }
      }}
    >
      <motion.div
        className="glitch-text"
        style={{
          transformStyle: 'preserve-3d'
        }}
        initial={{ 
          filter: 'blur(25px) brightness(0.4)',
          y: 50,
          x: -15,
          rotateX: 30,
          rotateZ: 5,
          opacity: 0,
          scale: 0.85,
          z: -150
        }}
        animate={isVisible ? { 
          filter: 'blur(0px) brightness(1)',
          y: 0,
          x: 0,
          rotateX: 0,
          rotateZ: 0,
          opacity: 1,
          scale: 1,
          z: 0
        } : {}}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          delay: delay / 1000 + 0.3,
          scale: {
            type: "spring",
            stiffness: 90,
            damping: 16,
            mass: 1.1
          },
          rotateX: {
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 1.2
          },
          rotateZ: {
            type: "spring",
            stiffness: 100,
            damping: 18
          },
          z: {
            type: "spring",
            stiffness: 70,
            damping: 13
          }
        }}
      >
        {/* Main text with shimmer effect */}
        <motion.span 
          className="glitch-text-main"
          initial={{ backgroundPosition: '-200%' }}
          animate={isVisible ? { 
            backgroundPosition: '200%',
            transition: {
              duration: 2,
              ease: "linear",
              repeat: Infinity,
              delay: delay / 1000 + 1
            }
          } : {}}
        >
          {text}
        </motion.span>

        {/* Enhanced glitch layers for RGB split effect */}
        <span 
          className="glitch-text-layer glitch-text-layer-1" 
          aria-hidden="true"
          style={{ animationDelay: glitchDelay1 }}
        >
          {text}
        </span>
        <span 
          className="glitch-text-layer glitch-text-layer-2" 
          aria-hidden="true"
          style={{ animationDelay: glitchDelay2 }}
        >
          {text}
        </span>
        <span 
          className="glitch-text-layer glitch-text-layer-3" 
          aria-hidden="true"
          style={{ animationDelay: `${delay / 1000 + 0.5}s` }}
        >
          {text}
        </span>
      </motion.div>
    </motion.div>
  );
}

GlitchText.propTypes = {
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
  className: PropTypes.string
};

export default memo(GlitchText);

