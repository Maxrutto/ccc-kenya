import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * AnniversaryImage - Optimized image component with progressive loading
 */
function AnniversaryImage({
  src,
  alt,
  className = '',
  onLoad,
  onError,
  priority = false
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Reset states if src changes
    if (src) {
      setLoaded(false);
      setError(false);
    }
  }, [src]);

  useEffect(() => {
    // Preload high-priority images immediately
    if (priority && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoaded(true);
        if (onLoad) onLoad();
      };
      img.onerror = () => {
        setError(true);
        if (onError) onError();
      };
    }
  }, [src, priority, onLoad, onError]);

  useEffect(() => {
    // Use Intersection Observer for lazy loading non-priority images
    if (!priority && src) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const img = imgRef.current;
            if (img && img.getAttribute('data-src')) {
              img.src = img.getAttribute('data-src');
              observer.disconnect();
            }
          }
        },
        { 
          rootMargin: '300px', // Load when image is 300px from viewport
          threshold: 0.01 
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => {
        if (observer && imgRef.current) {
          observer.disconnect();
        }
      };
    }
  }, [src, priority]);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.warn(`Anniversary image failed to load: ${src}`);
    setError(true);
    if (onError) onError();
  };

  // Generate blur placeholder using a tiny data URL
  const blurDataURL = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cfilter id="b" color-interpolation-filters="sRGB"%3E%3CfeGaussianBlur stdDeviation="20"/%3E%3C/filter%3E%3Cimage preserveAspectRatio="none" filter="url(%23b)" x="0" y="0" height="100%25" width="100%25" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="/%3E%3C/svg%3E';

  return (
    <div className={`anniversary-image-container ${className}`}>
      {/* Blur placeholder background */}
      {!loaded && !error && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.5 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1.5 
          }}
        >
          <div className="absolute inset-0 bg-blue-200/30 animate-pulse" />
        </motion.div>
      )}

      {/* Main Image */}
      {!error && (
        <motion.img
          ref={imgRef}
          src={priority ? src : blurDataURL}
          data-src={!priority ? src : undefined}
          alt={alt}
          className={`anniversary-image ${loaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ 
            opacity: 0, 
            scale: 1.2,
            filter: 'blur(30px) brightness(0.7)',
            rotateZ: 2
          }}
          animate={{ 
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 1.2,
            filter: loaded ? 'blur(0px) brightness(1)' : 'blur(30px) brightness(0.7)',
            rotateZ: loaded ? 0 : 2
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            scale: {
              type: "spring",
              stiffness: 80,
              damping: 20
            }
          }}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{ 
            willChange: loaded ? 'auto' : 'transform, opacity, filter'
          }}
        />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}

AnniversaryImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  priority: PropTypes.bool
};

export default memo(AnniversaryImage);

