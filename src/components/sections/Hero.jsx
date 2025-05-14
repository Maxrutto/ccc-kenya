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
    <section className="relative pt-16 pb-6 md:pt-20 md:pb-10 flex flex-col items-center w-full overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 20
        }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-2 sm:px-4 text-center w-full max-w-full"
      >
        {/* Header with Logo and Title */}
        <div className="flex flex-row items-start justify-center md:items-center gap-x-2 sm:gap-x-3 md:gap-x-4 mb-6 sm:mb-8 md:mb-12 max-w-full">
          <img 
            src="images/logo.jpeg"
            alt="CCC Kenya logo"
            className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full shadow-lg flex-shrink-0"
          />
          <div className="text-left">
            <h1 className="text-xs sm:text-base md:text-xl lg:text-3xl font-['Playfair_Display'] tracking-wide text-blue-600 font-bold leading-tight">
              CONFERENCE OF <br className="sm:hidden" />
              CONTEMPLATIVE <br className="sm:hidden" /> 
              COMMUNITIES <br className="sm:hidden" />
              <span className="whitespace-nowrap">OF <span className="text-blue-500">KENYA</span> – CCCK</span>
            </h1>
          </div>
        </div>
        
        <p className="text-xs sm:text-base md:text-lg font-['Montserrat'] text-gray-700 mb-6 md:mb-10 max-w-full sm:max-w-2xl mx-auto leading-relaxed italic tracking-wide border-l-4 border-blue-600/40 pl-2 sm:pl-4 py-2 bg-blue-50/30 rounded-r-lg shadow-sm">
          Founded on 22 Sept 2015, the conference of the contemplative communities of Kenya -CCCK, is a conference of Nuns from different monastic traditions established in Kenya and other English speaking countries in Africa.
        </p>

        {/* Image Slider */}
        <div className="mx-auto w-full sm:w-[90%] md:w-3/4 h-[200px] sm:h-[300px] md:h-[450px] mb-4 sm:mb-6 md:mb-8 rounded-lg overflow-hidden shadow-lg">
          <ImageSlider images={images} />
        </div>
      </motion.div>
    </section>
  );
}