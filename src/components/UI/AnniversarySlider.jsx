import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import AnniversaryImage from './AnniversaryImage';
import GlitchText from './GlitchText';
import { anniversaryImages } from '../../data/anniversaryImages';

const AnniversarySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef(null);
  const dragStartTime = useRef(0);
  const lastDragX = useRef(0);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload next and previous images
  useEffect(() => {
    const preloadImages = () => {
      const nextIndex = (currentIndex + 1) % anniversaryImages.length;
      const prevIndex = (currentIndex - 1 + anniversaryImages.length) % anniversaryImages.length;
      
      [nextIndex, prevIndex].forEach(index => {
        const img = new Image();
        img.src = anniversaryImages[index].src;
      });
    };
    preloadImages();
  }, [currentIndex]);

  // Auto-play functionality with longer duration for better viewing experience
  useEffect(() => {
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 8000); // Increased from 5000ms to 8000ms (8 seconds per image)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovering, currentIndex]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % anniversaryImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + anniversaryImages.length) % anniversaryImages.length);
  }, []);

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setImageLoaded(false);
    setCurrentIndex(index);
  };

  // Enhanced touch handlers for real-time drag sliding
  const handleTouchStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches[0].clientX;
    setDragStartX(clientX);
    touchStartX.current = clientX;
    lastDragX.current = clientX;
    dragStartTime.current = Date.now();
    setDragOffset(0);
    
    // Pause autoplay during drag
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.touches[0].clientX;
    const diff = clientX - dragStartX;
    const containerWidth = containerRef.current?.offsetWidth || 1000;
    
    // Calculate offset as percentage of container width
    // Add rubber-band effect at boundaries
    let offset = (diff / containerWidth) * 100;
    
    // Rubber-band effect - resistance at edges
    const maxDrag = 25; // Maximum drag distance in percentage
    if (currentIndex === 0 && offset > 0) {
      // At first slide, dragging right
      offset = offset * (1 - Math.min(offset / maxDrag, 0.8));
    } else if (currentIndex === anniversaryImages.length - 1 && offset < 0) {
      // At last slide, dragging left
      offset = offset * (1 - Math.min(Math.abs(offset) / maxDrag, 0.8));
    }
    
    setDragOffset(offset);
    lastDragX.current = clientX;
    touchEndX.current = clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const swipeThreshold = 50;
    const diff = touchStartX.current - lastDragX.current;
    const timeDiff = Date.now() - dragStartTime.current;
    const velocity = Math.abs(diff) / timeDiff; // pixels per ms
    
    // Determine if we should change slides based on drag distance or velocity
    const shouldChangeSlide = Math.abs(diff) > swipeThreshold || velocity > 0.5;
    
    if (shouldChangeSlide) {
      if (diff > 0 && currentIndex < anniversaryImages.length - 1) {
        handleNext();
      } else if (diff < 0 && currentIndex > 0) {
        handlePrev();
      } else {
        // Bounce back to current slide
        setDragOffset(0);
      }
    } else {
      // Snap back to current slide
      setDragOffset(0);
    }
    
    // Resume autoplay if it was enabled
    if (isAutoPlaying && !isHovering) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 8000); // Match the main autoplay interval
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentImage = anniversaryImages[currentIndex];
  const sliderHeight = isMobile ? '55vh' : '75vh';

  // Ultra-dramatic 3D Transform variants with enhanced parallax and depth
  const slideVariants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? 60 : -60,
      rotateX: direction > 0 ? 20 : -20,
      rotateZ: direction > 0 ? 5 : -5,
      opacity: 0,
      scale: 0.6,
      z: -1200,
      x: direction > 0 ? 1200 : -1200,
      y: direction > 0 ? -150 : 150,
      filter: 'blur(15px) brightness(0.5)',
    }),
    center: () => ({
      rotateY: isDragging ? dragOffset * 0.15 : 0,
      rotateX: isDragging ? dragOffset * 0.08 : 0,
      rotateZ: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      x: isDragging ? dragOffset * 8 : 0,
      y: 0,
      filter: 'blur(0px) brightness(1)',
    }),
    exit: (direction) => ({
      rotateY: direction < 0 ? 60 : -60,
      rotateX: direction < 0 ? 20 : -20,
      rotateZ: direction < 0 ? 5 : -5,
      opacity: 0,
      scale: 0.6,
      z: -1200,
      x: direction < 0 ? 1200 : -1200,
      y: direction < 0 ? -150 : 150,
      filter: 'blur(15px) brightness(0.5)',
    }),
  };

  return (
    <div 
      ref={containerRef}
      className="anniversary-slider-wrapper relative w-full mx-auto"
      style={{ height: sliderHeight, perspective: '2500px' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main slider container */}
      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={isDragging ? {
              rotateY: { type: "spring", stiffness: 300, damping: 30 },
              rotateX: { type: "spring", stiffness: 300, damping: 30 },
              x: { type: "spring", stiffness: 300, damping: 30 },
            } : {
              rotateY: { 
                type: "spring", 
                stiffness: 60, 
                damping: 15,
                mass: 1.2,
                duration: 1.4 
              },
              rotateX: {
                type: "spring",
                stiffness: 60,
                damping: 15,
                mass: 1.2,
                duration: 1.4
              },
              rotateZ: {
                type: "spring",
                stiffness: 80,
                damping: 20,
                duration: 1.2
              },
              opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
              scale: { 
                type: "spring", 
                stiffness: 80, 
                damping: 18,
                mass: 1,
                duration: 1.4
              },
              x: { 
                type: "spring", 
                stiffness: 60, 
                damping: 15,
                mass: 1.2,
                duration: 1.4
              },
              y: {
                type: "spring",
                stiffness: 70,
                damping: 16,
                mass: 1.1,
                duration: 1.3
              },
              z: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            }}
            className="absolute inset-0 w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

            {/* Anniversary Image with Zoom Animation (Ken Burns Effect) */}
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1 }}
              animate={{ scale: isDragging ? 1 : 1.15 }}
              transition={{
                duration: 8,
                ease: "linear"
              }}
              style={{ transformOrigin: 'center center' }}
            >
              <AnniversaryImage
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full"
                priority={currentIndex === 0}
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>

            {/* Enhanced 3D Animated Text Overlay - Moved Higher Up */}
            <motion.div
              className="absolute bottom-16 md:bottom-20 left-0 right-0 z-20 px-4 md:px-8"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              initial={{ 
                opacity: 0, 
                y: 120,
                rotateX: 60,
                rotateY: 8,
                rotateZ: -4,
                scale: 0.7,
                z: -300,
                filter: 'blur(20px) brightness(0.5) contrast(0.7)'
              }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0, 
                y: imageLoaded ? 0 : 120,
                rotateX: imageLoaded ? 0 : 60,
                rotateY: imageLoaded ? 0 : 8,
                rotateZ: imageLoaded ? 0 : -4,
                scale: imageLoaded ? 1 : 0.7,
                z: imageLoaded ? 0 : -300,
                filter: imageLoaded ? 'blur(0px) brightness(1) contrast(1)' : 'blur(20px) brightness(0.5) contrast(0.7)'
              }}
              transition={{ 
                delay: 1.2, // Slower, more dramatic entrance
                duration: 2.0, // Longer animation duration
                ease: [0.16, 1, 0.3, 1],
                rotateX: {
                  type: "spring",
                  stiffness: 60,
                  damping: 18,
                  mass: 1.5
                },
                rotateY: {
                  type: "spring",
                  stiffness: 70,
                  damping: 20,
                  mass: 1.3
                },
                scale: {
                  type: "spring",
                  stiffness: 80,
                  damping: 22,
                  mass: 1.2
                },
                z: {
                  type: "spring",
                  stiffness: 50,
                  damping: 16,
                  mass: 1.8
                }
              }}
            >
              {/* Enhanced background for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl backdrop-blur-sm"></div>
              
              <div className="relative z-10">
                <GlitchText 
                  text={currentImage.caption}
                  delay={imageLoaded ? 1500 : 0} // Slower delay for more drama
                  className="text-white text-xl md:text-3xl lg:text-4xl xl:text-5xl font-['Playfair_Display'] font-bold drop-shadow-2xl"
                />
                
                {/* Progress indicator - moved and styled better */}
                <motion.div 
                  className="mt-6 text-white/95 text-sm md:text-lg font-['Montserrat'] backdrop-blur-md bg-black/30 inline-block px-4 py-2 rounded-full border border-white/20"
                  initial={{ opacity: 0, x: -30, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  <span className="font-bold">{currentIndex + 1}</span>
                  <span className="mx-2 opacity-60">of</span>
                  <span className="font-bold">{anniversaryImages.length}</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-full transition-all duration-300 group"
          aria-label="Previous image"
        >
          <FaChevronLeft className="text-white text-lg md:text-2xl group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-full transition-all duration-300 group"
          aria-label="Next image"
        >
          <FaChevronRight className="text-white text-lg md:text-2xl group-hover:scale-110 transition-transform" />
        </button>

        {/* Play/Pause Control */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? (
            <FaPause className="text-white text-sm md:text-base" />
          ) : (
            <FaPlay className="text-white text-sm md:text-base" />
          )}
        </button>

        {/* Minimalist Dots Navigation - Redesigned to avoid caption conflicts */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 bg-black/20 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
          {anniversaryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-500 transform ${
                index === currentIndex 
                  ? 'bg-white scale-150 shadow-lg shadow-white/50' 
                  : 'bg-white/40 hover:bg-white/70 hover:scale-125'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Anniversary Badge with Duration */}
      <motion.div 
        className="absolute top-3 left-3 z-30 bg-gradient-to-br from-red-600 to-red-700 text-white px-3 py-1.5 rounded-lg shadow-2xl"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ 
          scale: 1, 
          rotate: 0, 
          opacity: 1,
          boxShadow: [
            '0 10px 30px rgba(220, 38, 38, 0.3)',
            '0 15px 40px rgba(220, 38, 38, 0.6)',
            '0 10px 30px rgba(220, 38, 38, 0.3)'
          ]
        }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.5,
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div 
          className="text-center"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-xl md:text-2xl font-bold font-['Playfair_Display']">10th</div>
          <div className="text-[10px] md:text-xs font-['Montserrat']">Anniversary</div>
          <div className="text-[8px] md:text-[10px] font-['Montserrat'] opacity-90 mt-0.5">2015-2025</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnniversarySlider;

