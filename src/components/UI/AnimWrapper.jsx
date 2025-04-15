import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function AnimWrapper({ children, delay = 0.5 }) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 10,  // Only use vertical movement to avoid horizontal overflow
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.6,
        ease: "easeOut",
        delay: isMobile ? Math.min(delay * 0.5, 0.15) : delay // Much shorter delays on mobile
      }
    }
  };

  // On small mobile, use ultra-simplified animation strategy for better performance
  if (isMobile && window.innerWidth < 400) {
    return (
      <motion.div
        className="overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3,
          delay: Math.min(delay * 0.3, 0.1) // Very minimal delay on small screens
        }}
      >
        {children}
      </motion.div>
    );
  }

  // On larger mobile, use simpler animation strategy
  if (isMobile) {
    return (
      <motion.div
        className="overflow-visible"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4,
          delay: Math.min(delay * 0.4, 0.2) // Reduced delay on mobile
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Full animation for desktop
  return (
    <motion.div
      className="overflow-visible"
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