import { motion } from 'framer-motion';
import AnniversarySlider from '../UI/AnniversarySlider';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
  const [ref, inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative pt-16 pb-4 md:pt-18 md:pb-6 flex flex-col items-center w-full overflow-hidden">
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
              <span className="whitespace-nowrap">OF <span className="text-red-600">KENYA</span> – CCCK</span>
            </h1>
          </div>
        </div>
        
        <p className="text-xs sm:text-base md:text-lg font-['Montserrat'] text-gray-700 mb-4 sm:mb-6 md:mb-8 max-w-full sm:max-w-2xl mx-auto leading-relaxed italic tracking-wide border-l-4 border-blue-600/40 pl-2 sm:pl-4 py-2 bg-blue-50/30 rounded-r-lg shadow-sm">
          Founded on 22 Sept 2015, the conference of the contemplative communities of Kenya (CCCK), is a conference of Nuns from different monastic traditions established in Kenya. Besides the CCCK full member monasteries established in Kenya, CCCK membership includes  associate members from other countries in Anglophone Africa.
        </p>

        {/* Anniversary Slider */}
        <div className="mx-auto w-full px-4 sm:px-6 md:px-8 max-w-7xl mb-4 sm:mb-6 md:mb-8">
          <AnniversarySlider />
        </div>
      </motion.div>
    </section>
  );
}
