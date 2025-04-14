import { useState, useEffect, useRef } from 'react';

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);
  
  // Use safer image paths that definitely exist in the public folder
  const safeImages = images.map(img => ({
    ...img,
    url: img.url.replace(/^\//, '')  // Remove leading slash if present
  }));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === safeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [safeImages.length]);

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next image
      setCurrentIndex(currentIndex === safeImages.length - 1 ? 0 : currentIndex + 1);
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous image
      setCurrentIndex(currentIndex === 0 ? safeImages.length - 1 : currentIndex - 1);
    }
  };

  // Manual navigation functions
  const goToNext = () => {
    setCurrentIndex(currentIndex === safeImages.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? safeImages.length - 1 : currentIndex - 1);
  };

  if (!safeImages || safeImages.length === 0) {
    return <div className="h-full w-full bg-gray-200 flex items-center justify-center">No images available</div>;
  }

  // Custom styling for specific images - especially the executive committee image
  const getImageStyle = (index) => {
    if (index === 0 && safeImages[currentIndex].url.includes('Executive commitee.jpg')) {
      return {
        objectFit: 'contain',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.9)'
      };
    }
    return { objectFit: 'cover' };
  };

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-lg"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-full">
        <img 
          src={safeImages[currentIndex].url} 
          alt={safeImages[currentIndex].alt} 
          className="w-full h-full rounded-lg"
          style={getImageStyle(currentIndex)}
          onError={(e) => {
            console.error(`Failed to load image: ${safeImages[currentIndex].url}`);
            e.target.src = `images/image${currentIndex + 1}.jpeg`;
          }}
        />
      </div>
      
      {/* Navigation arrows */}
      <button 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full cursor-pointer hover:bg-black/50"
        onClick={goToPrev}
      >
        &#10094;
      </button>
      
      <button 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full cursor-pointer hover:bg-black/50"
        onClick={goToNext}
      >
        &#10095;
      </button>
      
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
        {safeImages.map((_, index) => (
          <button 
            key={index}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-red-600' : 'bg-white/70'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}