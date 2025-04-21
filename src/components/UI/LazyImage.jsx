import { useState, useEffect, useRef, memo } from 'react';
import { FaImage } from 'react-icons/fa';

/**
 * LazyImage - A reusable component for lazily loading images with fallbacks
 * 
 * @param {Object} props
 * @param {string} props.src - The image source URL
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.containerClassName - CSS classes for the container
 * @param {string} props.placeholderClassName - CSS classes for the placeholder
 * @param {boolean} props.usePlaceholder - Whether to use a placeholder image if load fails
 * @param {string} props.placeholderSrc - URL to a placeholder image
 * @param {function} props.onLoad - Callback for when image loads
 * @param {function} props.onError - Callback for when image fails to load
 */
const LazyImage = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  placeholderClassName = '',
  usePlaceholder = true,
  placeholderSrc = 'images/placeholder.jpeg',
  onLoad,
  onError,
}) => {
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
    // Use Intersection Observer for lazy loading
    if (!src) return;
    
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
        rootMargin: '200px', // Load when image is 200px from viewport
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
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.warn(`Image failed to load: ${src}`);
    setError(true);
    setLoaded(true);
    if (onError) onError();
  };

  const baseContainerClass = "relative overflow-hidden";
  const combinedContainerClass = `${baseContainerClass} ${containerClassName}`;
  
  const placeholderBaseClass = "flex items-center justify-center bg-gray-100";
  const combinedPlaceholderClass = `${placeholderBaseClass} ${placeholderClassName}`;

  return (
    <div className={combinedContainerClass}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <FaImage className="text-gray-400 text-3xl" />
        </div>
      )}
      
      {error ? (
        usePlaceholder ? (
          placeholderSrc ? (
            <img 
              src={placeholderSrc} 
              alt={alt || 'Image placeholder'} 
              className={className}
            />
          ) : (
            <div className={`w-full h-full ${combinedPlaceholderClass}`}>
              <div className="text-center p-4">
                <FaImage className="mx-auto text-3xl text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">{alt || 'Image unavailable'}</p>
              </div>
            </div>
          )
        ) : null
      ) : (
        <img
          ref={imgRef}
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          data-src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default memo(LazyImage); 