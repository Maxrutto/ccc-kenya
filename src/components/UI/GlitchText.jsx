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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <motion.div
        className="glitch-text"
        initial={{ 
          filter: 'blur(20px) brightness(0.5)',
          y: 40,
          x: -10,
          opacity: 0,
          scale: 0.9
        }}
        animate={isVisible ? { 
          filter: 'blur(0px) brightness(1)',
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1
        } : {}}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: delay / 1000 + 0.3,
          scale: {
            type: "spring",
            stiffness: 100,
            damping: 15
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

