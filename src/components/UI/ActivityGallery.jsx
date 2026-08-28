import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

function ActivityGallery({ activity }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const tileRefs = useRef([]);
  const openerIndexRef = useRef(0);
  const closeButtonRef = useRef(null);
  const wasOpenRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const count = activity.images.length;

  const openLightbox = (index) => {
    openerIndexRef.current = index;
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    tileRefs.current[openerIndexRef.current]?.focus();
  };

  useEffect(() => {
    if (activeIndex === null) {
      wasOpenRef.current = false;
      return;
    }
    if (!wasOpenRef.current) {
      wasOpenRef.current = true;
      closeButtonRef.current?.focus();
    }
    const total = activity.images.length;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + total) % total);
      if (e.key === 'Escape') {
        setActiveIndex(null);
        tileRefs.current[openerIndexRef.current]?.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, activity.images.length]);

  return (
    <div>
      <p className="text-sm font-['Montserrat'] font-semibold uppercase tracking-widest text-red-600">
        {activity.dateLabel}
      </p>
      <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-blue-700 mt-1">
        {activity.title}
      </h3>
      <p className="text-sm font-['Montserrat'] text-gray-600 mt-2">
        {activity.venue} · {activity.mode}
      </p>
      <p className="font-['Montserrat'] text-gray-700 max-w-3xl mt-3 mb-6">
        {activity.description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {activity.images.map((image, index) => (
          <button
            key={image.src}
            ref={(el) => { tileRefs.current[index] = el; }}
            onClick={() => openLightbox(index)}
            aria-label={`View photograph ${index + 1} of ${count}`}
            className="group aspect-square overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-[400ms] motion-safe:group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activity.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
            className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center"
          >
            <button
              ref={closeButtonRef}
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 text-2xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <FaTimes />
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i - 1 + count) % count)}
              aria-label="Previous photograph"
              className="absolute left-4 p-2 text-2xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <FaChevronLeft />
            </button>
            <img
              src={activity.images[activeIndex].src}
              alt={activity.images[activeIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain"
            />
            <button
              onClick={() => setActiveIndex((i) => (i + 1) % count)}
              aria-label="Next photograph"
              className="absolute right-4 p-2 text-2xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <FaChevronRight />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-['Montserrat'] text-sm text-white">
              {activeIndex + 1} / {count}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActivityGallery;
