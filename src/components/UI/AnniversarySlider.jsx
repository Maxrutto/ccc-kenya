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

            {/* Enhanced 3D Animated Text Overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              initial={{ 
                opacity: 0, 
                y: 100,
                rotateX: 45,
                rotateY: 5,
                rotateZ: -2,
                scale: 0.8,
                z: -200,
                filter: 'blur(15px) brightness(0.7)'
              }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0, 
                y: imageLoaded ? 0 : 100,
                rotateX: imageLoaded ? 0 : 45,
                rotateY: imageLoaded ? 0 : 5,
                rotateZ: imageLoaded ? 0 : -2,
                scale: imageLoaded ? 1 : 0.8,
                z: imageLoaded ? 0 : -200,
                filter: imageLoaded ? 'blur(0px) brightness(1)' : 'blur(15px) brightness(0.7)'
              }}
              transition={{ 
                delay: 0.5, 
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                rotateX: {
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  mass: 1.2
                },
                rotateY: {
                  type: "spring",
                  stiffness: 90,
                  damping: 17
                },
                scale: {
                  type: "spring",
                  stiffness: 100,
                  damping: 18,
                  mass: 1
                },
                z: {
                  type: "spring",
                  stiffness: 70,
                  damping: 14
                }
              }}
            >
              <GlitchText 
                text={currentImage.caption}
                delay={imageLoaded ? 500 : 0}
                className="text-white text-lg md:text-2xl lg:text-3xl xl:text-4xl font-['Playfair_Display'] font-bold drop-shadow-2xl"
              />
              
              {/* Progress indicator */}
              <motion.div 
                className="mt-4 text-white/90 text-sm md:text-base font-['Montserrat'] backdrop-blur-sm bg-black/20 inline-block px-3 py-1 rounded-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <span className="font-semibold">{currentIndex + 1}</span> / {anniversaryImages.length}
              </motion.div>
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

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          {anniversaryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Anniversary Badge */}
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnniversarySlider;

