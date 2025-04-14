import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function AnimWrapper({ children, delay = 0.5 }) {
  // Check if we're on mobile for simplified animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const variants = {
    hidden: { 
      opacity: 0, 
      x: isMobile ? 0 : -50, // No horizontal movement on mobile
      y: isMobile ? 10 : 0   // Small vertical movement on mobile instead
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: "easeOut",
        delay: isMobile ? Math.min(delay, 0.3) : delay // Cap delay at 0.3s on mobile
      }
    }
  };

  // On mobile, use simpler animation strategy to improve performance
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.5,
          delay: Math.min(delay, 0.3) // Cap delay at 0.3s on mobile
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Full animation for desktop
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

AnimWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number
};

export default memo(AnimWrapper);