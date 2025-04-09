import { motion } from 'framer-motion';
import ImageSlider from '../UI/ImageSlider';
import { useInView } from 'react-intersection-observer';

// Update image paths to use public directory
const images = Array.from({ length: 17 }, (_, i) => ({
  url: `/images/image${i + 1}.jpeg`,  // Changed path
  alt: `CCC Kenya Community ${i + 1}`,
}));

export default function Hero() {
  const [ref, inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative pt-20 pb-8 min-h-[50vh] flex items-center"> {/* Reduced height */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 20
        }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center"
      >
        {/* Logo Section */}
        <div className="mb-8">
          <motion.img 
            src="/images/logo.jpeg"  // Ensure logo is in public/images
            alt="CCC Kenya logo"
            className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: inView ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          />
        </div>

        {/* Text Content */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-red-600">
          <span className="block mb-2">Conference of</span>
          <span className="block bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Contemplative Communities
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Founded on 22 Sept 2015, the conference of the contemplative communities of Kenya -CCCK, is an association of Nuns from different monastic traditions established in Kenya and other English speaking countries in Africa. It received it's juridicial status from the holy see on 26th October 2017.
        </p>

        {/* Image Slider - Reduced height */}
        <div className="mx-auto w-full h-[40vh]">
          <ImageSlider images={images} />
        </div>
      </motion.div>
    </section>
  );
}