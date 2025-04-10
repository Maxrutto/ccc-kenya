import { useState, useEffect } from 'react';

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
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

  if (!safeImages || safeImages.length === 0) {
    return <div className="h-full w-full bg-gray-200 flex items-center justify-center">No images available</div>;
  }

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg">
      <div className="w-full h-full">
        <img 
          src={safeImages[currentIndex].url} 
          alt={safeImages[currentIndex].alt} 
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            console.error(`Failed to load image: ${safeImages[currentIndex].url}`);
            e.target.src = `images/image${currentIndex + 1}.jpeg`;
          }}
        />
      </div>
      
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