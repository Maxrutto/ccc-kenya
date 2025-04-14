import { motion } from 'framer-motion';
import ImageSlider from '../UI/ImageSlider';
import { useInView } from 'react-intersection-observer';

// Define images with direct paths to existing files in public/images
const images = [
  { url: 'images/Executive commitee.jpg', alt: 'CCC Kenya Executive Committee' },
  { url: 'images/Picture homepage2.jpg', alt: 'CCC Kenya Homepage Picture 2' },
  { url: 'images/Picture homepage3.jpg', alt: 'CCC Kenya Homepage Picture 3' },
  { url: 'images/Picturehomepage4.jpg', alt: 'CCC Kenya Homepage Picture 4' },
  { url: 'images/Picture homepage5.jpg', alt: 'CCC Kenya Homepage Picture 5' },
  { url: 'images/image2.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image3.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image4.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image6.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image7.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image9.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image11.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image12.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image13.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image14.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image15.jpeg', alt: 'CCC Kenya Community' },
  { url: 'images/image17.jpeg', alt: 'CCC Kenya Community' }
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
        {/* Header with Logo and Title */}
        <div className="flex flex-row items-start justify-center md:items-center gap-x-3 md:gap-x-4 mb-12 max-w-full px-2">
          <img 
            src="images/logo.jpeg"
            alt="CCC Kenya logo"
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full shadow-lg flex-shrink-0"
          />
          <div className="text-left">
            <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-['Playfair_Display'] tracking-wide text-blue-600 font-bold leading-tight">
              CONFERENCE OF <br className="sm:hidden" />
              CONTEMPLATIVE <br className="sm:hidden" /> 
              COMMUNITIES <br className="sm:hidden" />
              <span className="whitespace-nowrap">OF KENYA – CCCK</span>
            </h1>
          </div>
        </div>
        
        <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Founded on 22 Sept 2015, the conference of the contemplative communities of Kenya -CCCK, is an association of Nuns from different monastic traditions established in Kenya and other English speaking countries in Africa.
        </p>

        {/* Image Slider */}
        <div className="mx-auto w-full sm:w-[85%] md:w-3/4 h-[250px] sm:h-[350px] md:h-[450px] mb-8 rounded-lg overflow-hidden shadow-lg">
          <ImageSlider images={images} />
        </div>
      </motion.div>
    </section>
  );
}