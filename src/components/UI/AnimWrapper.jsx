import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function AnimWrapper({ children, delay = 0.5 }) {
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay
      }
    }
  };

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