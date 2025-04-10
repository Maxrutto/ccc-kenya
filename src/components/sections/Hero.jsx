import { motion } from 'framer-motion';
import ImageSlider from '../UI/ImageSlider';
import { useInView } from 'react-intersection-observer';

// Define images with direct paths to existing files in public/images
const images = [
  { url: 'images/image1.jpeg', alt: 'CCC Kenya Community 1' },
  { url: 'images/image2.jpeg', alt: 'CCC Kenya Community 2' },
  { url: 'images/image3.jpeg', alt: 'CCC Kenya Community 3' },
  { url: 'images/image4.jpeg', alt: 'CCC Kenya Community 4' },
  { url: 'images/image5.jpeg', alt: 'CCC Kenya Community 5' },
  { url: 'images/image6.jpeg', alt: 'CCC Kenya Community 6' },
  { url: 'images/image7.jpeg', alt: 'CCC Kenya Community 7' },
  { url: 'images/image8.jpeg', alt: 'CCC Kenya Community 8' },
  { url: 'images/image9.jpeg', alt: 'CCC Kenya Community 9' },
  { url: 'images/image10.jpeg', alt: 'CCC Kenya Community 10' },
  { url: 'images/image11.jpeg', alt: 'CCC Kenya Community 11' },
  { url: 'images/image12.jpeg', alt: 'CCC Kenya Community 12' },
  { url: 'images/image13.jpeg', alt: 'CCC Kenya Community 13' },
  { url: 'images/image14.jpeg', alt: 'CCC Kenya Community 14' },
  { url: 'images/image15.jpeg', alt: 'CCC Kenya Community 15' },
  { url: 'images/image16.jpeg', alt: 'CCC Kenya Community 16' },
  { url: 'images/image17.jpeg', alt: 'CCC Kenya Community 17' }, 
];

export default function Hero() {
  const [ref, inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative pt-20 pb-10 flex flex-col items-center overflow-hidden w-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 20
        }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center w-full"
      >
        {/* Logo Section */}
        <div className="mb-4">
          <motion.img 
            src="images/logo.jpeg"
            alt="CCC Kenya logo"
            className="w-20 h-20 mx-auto mb-2 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: inView ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          />
        </div>

        {/* Text Content */}
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-red-600">
          <span className="block mb-1">Conference of</span>
          <span className="block bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Contemplative Communities
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
          Founded on 22 Sept 2015, the conference of the contemplative communities of Kenya -CCCK, is an association of Nuns from different monastic traditions established in Kenya and other English speaking countries in Africa.
        </p>

        {/* Image Slider */}
        <div className="mx-auto w-full sm:w-[85%] md:w-3/4 h-[250px] mb-8 rounded-lg overflow-hidden shadow-lg">
          <ImageSlider images={images} />
        </div>
      </motion.div>
    </section>
  );
}