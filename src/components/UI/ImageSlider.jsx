import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from './LazyImage';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const ImageSlider = ({ images, autoPlayInterval = 5000, height = "600px" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const autoPlayTimerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Autoplay functionality
    if (autoPlayInterval > 0) {
      restartAutoPlay();
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, autoPlayInterval]);

  const restartAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    
    autoPlayTimerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, autoPlayInterval);
  };

  const handleNext = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    setDirection(1);
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    restartAutoPlay();
  };

  const handlePrev = () => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    setDirection(-1);
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    restartAutoPlay();
  };

  const handleDotClick = (index) => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    restartAutoPlay();
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current - touchEndXRef.current > 100) {
      // Swipe left - go to next
      handleNext();
    } else if (touchEndXRef.current - touchStartXRef.current > 100) {
      // Swipe right - go to previous
      handlePrev();
    }
  };

  // Dynamic height that correctly adjusts for mobile
  const sliderHeight = isMobile ? "350px" : height;
  const buttonSize = isMobile ? "text-xl" : "text-3xl";

  // Variants for framer motion
  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 500 : -500,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 500 : -500,
        opacity: 0
      };
    }
  };

  return (
    <div 
      ref={sliderRef}
      className="relative overflow-hidden w-full rounded-lg shadow-lg" 
      style={{ height: sliderHeight }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full"
        >
          <LazyImage
            src={images[currentIndex]?.url || ''}
            alt={images[currentIndex]?.alt || 'Slider image'}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
            usePlaceholder={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full text-white z-10 transition duration-300 ${buttonSize}`}
        aria-label="Previous image"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={handleNext}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full text-white z-10 transition duration-300 ${buttonSize}`}
        aria-label="Next image"
      >
        <FaAngleRight />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;