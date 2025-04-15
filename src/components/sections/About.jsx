import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimWrapper from '../UI/AnimWrapper';
import { FaUsers, FaQuoteLeft, FaHandshake, FaLightbulb, FaBullseye, FaUserTie } from 'react-icons/fa';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-8 sm:py-12 md:py-16 mt-6 sm:mt-10 md:mt-20 bg-gray-50 w-full" id="about">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <AnimWrapper>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 md:mb-8 text-center text-blue-600">
              ABOUT <span className="text-red-600">US</span>
            </h2>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8 md:mb-10 border-l-4 border-blue-500">
              <h3 className="text-lg sm:text-xl md:text-2xl font-['Playfair_Display'] font-semibold mb-3 md:mb-4 text-blue-600 flex items-center">
                <FaUsers className="mr-2 flex-shrink-0 text-red-500" />
                FOUNDATION OF CCCK
              </h3>
              <p className="text-xs sm:text-base md:text-lg font-['Montserrat'] text-gray-700 mb-4 md:mb-6 leading-relaxed">
                The Conference of Contemplative Communities of Kenya -CCCK, is an association of nuns from different monastic traditions established in Kenya and other English-speaking countries in Africa.
              </p>
              <p className="text-xs sm:text-base md:text-lg font-['Montserrat'] text-gray-700 leading-relaxed">
                CCCK was founded in Sept 2015. This happened within the context of the Year of Consecrated Life and in harmony with the renewal of the life for women contemplatives which Pope Francis has ushered. Conscious of the need to update the theological education of cloistered nuns the nuns welcomed the idea of forming their own Conference to help them actualize their dream of having monasteries in Africa that are united, capable of offering solid formation to their sisters and able to work together to establish financial and spiritual stability of women monastic communities in Anglophone Africa. CCCK is registered with the government of Kenya as a Charitable Trust. It received its juridical status from the Holy See on 26 October 2017.
              </p>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.2}>
            <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8 md:mb-10 border-l-4 border-red-500">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                <img 
                  src="images/logo.jpeg"
                  alt="CCC Kenya logo"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md mb-3 sm:mb-0 sm:mr-4 ring-2 ring-red-300"
                />
                <h3 className="text-xl sm:text-2xl font-['Playfair_Display'] text-center text-blue-700 flex items-center">
                  <FaQuoteLeft className="mr-2 text-red-500" />
                  CCCK MOTTO
                </h3>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-['Dancing_Script'] text-blue-700 text-center italic font-medium">
                "One Praying <span className="text-red-600">Heart</span> for the Church of Africa and Beyond"
              </p>
            </div>
          </AnimWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
            <AnimWrapper delay={0.3}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg h-full border-t-2 border-red-400 hover:border-t-4 transition-all">
                <h3 className="text-lg sm:text-xl font-['Playfair_Display'] font-semibold mb-3 md:mb-4 text-blue-600 flex items-center">
                  <FaHandshake className="mr-2 text-red-500 flex-shrink-0" />
                  OUR MISSION
                </h3>
                <p className="text-sm sm:text-base md:text-lg font-['Montserrat'] text-gray-700 leading-relaxed">
                  To foster communion and collaboration among contemplative nuns through appropriate theological and human formation in order to build spiritually and financially sustainable communities of nuns in Anglophone Africa
                </p>
              </div>
            </AnimWrapper>

            <AnimWrapper delay={0.4}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg h-full border-t-2 border-blue-400 hover:border-t-4 transition-all">
                <h3 className="text-lg sm:text-xl font-['Playfair_Display'] font-semibold mb-3 md:mb-4 text-blue-600 flex items-center">
                  <FaLightbulb className="mr-2 text-red-500 flex-shrink-0" />
                  OUR VISION
                </h3>
                <p className="text-sm sm:text-base md:text-lg font-['Montserrat'] text-gray-700 leading-relaxed">
                  To ensure that the contemplative sisters have access to solid, updated and appropriated theological and human formation which will enable them to effectively give a united witness to the Church's prayerful face in Africa
                </p>
              </div>
            </AnimWrapper>
          </div>

          <AnimWrapper delay={0.5}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8 md:mb-10">
              <h3 className="text-xl sm:text-2xl font-['Playfair_Display'] font-semibold mb-3 md:mb-5 text-blue-600 flex items-center">
                <FaBullseye className="mr-2 text-red-500 flex-shrink-0" />
                OUR OBJECTIVES
              </h3>
              <ol className="list-decimal pl-4 sm:pl-5 space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg font-['Montserrat'] text-gray-700">
                <li>Foster solidarity and cooperation among all the member monastic communities, particularly in ensuring the solid religious and intellectual formation of women contemplatives.</li>
                <li>Coordinate, when appropriate, initiatives and projects of mutual concern.</li>
                <li>Liaise with financial donors that would assist member communities in economic difficulties and infrastructural needs.</li>
              </ol>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.6}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border-r-4 border-red-500">
              <h3 className="text-xl sm:text-2xl font-['Playfair_Display'] font-semibold mb-3 md:mb-5 text-blue-600 flex items-center">
                <FaUserTie className="mr-2 text-red-500 flex-shrink-0" />
                LEADERSHIP
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-['Montserrat'] text-gray-700 leading-relaxed">
                CCCK is has a leadership body composed of the President and 4 Council members
                and an executive committee which comprises the superiors of the member monasteries
              </p>
            </div>
          </AnimWrapper>
        </motion.div>
      </div>
    </section>
  );
}