import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimWrapper from '../UI/AnimWrapper';
import { FaUsers, FaQuoteLeft, FaHandshake, FaLightbulb, FaBullseye, FaUserTie } from 'react-icons/fa';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 mt-20 bg-gray-50" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <AnimWrapper>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-8 text-center text-blue-600">
              ABOUT US
            </h2>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg mb-10">
              <h3 className="text-2xl font-['Playfair_Display'] font-semibold mb-4 text-blue-600 flex items-center">
                <FaUsers className="mr-2 flex-shrink-0" />
                FOUNDATION OF CCCK
              </h3>
              <p className="text-lg font-['Montserrat'] text-gray-700 mb-6 leading-relaxed">
                The Conference of Contemplative Communities of Kenya -CCCK, is an association of nuns from different monastic traditions established in Kenya and other English-speaking countries in Africa.
              </p>
              <p className="text-lg font-['Montserrat'] text-gray-700 leading-relaxed">
                CCCK was founded in Sept 2015. This happened within the context of the Year of Consecrated Life and in harmony with the renewal of the life for women contemplatives which Pope Francis has ushered. Conscious of the need to update the theological education of cloistered nuns the nuns welcomed the idea of forming their own Conference to help them actualize their dream of having monasteries in Africa that are united, capable of offering solid formation to their sisters and able to work together to establish financial and spiritual stability of women monastic communities in Anglophone Africa. CCCK is registered with the government of Kenya as a Charitable Trust. It received its juridical status from the Holy See on 26 October 2017.
              </p>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.2}>
            <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg mb-10 border-l-4 border-blue-500">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="images/logo.jpeg"
                  alt="CCC Kenya logo"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md mr-4"
                />
                <h3 className="text-2xl font-['Playfair_Display'] text-center text-blue-700 flex items-center">
                  <FaQuoteLeft className="mr-2 text-blue-400" />
                  CCCK MOTTO
                </h3>
              </div>
              <p className="text-xl md:text-2xl font-['Dancing_Script'] text-blue-700 text-center italic font-medium">
                "One Praying Heart for the Church of Africa and Beyond"
              </p>
            </div>
          </AnimWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <AnimWrapper delay={0.3}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg h-full">
                <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-4 text-blue-600 flex items-center">
                  <FaHandshake className="mr-2 text-blue-500 flex-shrink-0" />
                  OUR MISSION
                </h3>
                <p className="text-lg font-serif text-gray-700 leading-relaxed">
                  To foster communion and collaboration among contemplative nuns through appropriate theological and human formation in order to build spiritually and financially sustainable communities of nuns in Anglophone Africa
                </p>
              </div>
            </AnimWrapper>

            <AnimWrapper delay={0.4}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg h-full">
                <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-4 text-blue-600 flex items-center">
                  <FaLightbulb className="mr-2 text-blue-500 flex-shrink-0" />
                  OUR VISION
                </h3>
                <p className="text-lg font-serif text-gray-700 leading-relaxed">
                  To ensure that the contemplative sisters have access to solid, updated and appropriated theological and human formation which will enable them to effectively give a united witness to the Church's prayerful face in Africa
                </p>
              </div>
            </AnimWrapper>
          </div>

          <AnimWrapper delay={0.5}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg mb-10">
              <h3 className="text-2xl font-['Playfair_Display'] font-semibold mb-5 text-blue-600 flex items-center">
                <FaBullseye className="mr-2 text-blue-500 flex-shrink-0" />
                OUR OBJECTIVES
              </h3>
              <ol className="list-decimal pl-5 space-y-3 text-lg font-['Montserrat'] text-gray-700">
                <li>Foster solidarity and cooperation among all the member monastic communities, particularly in ensuring the solid religious and intellectual formation of women contemplatives.</li>
                <li>Coordinate, when appropriate, initiatives and projects of mutual concern.</li>
                <li>Liaise with financial donors that would assist member communities in economic difficulties and infrastructural needs.</li>
              </ol>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.6}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-2xl font-['Playfair_Display'] font-semibold mb-5 text-blue-600 flex items-center">
                <FaUserTie className="mr-2 text-blue-500 flex-shrink-0" />
                LEADERSHIP
              </h3>
              <p className="text-lg font-['Montserrat'] text-gray-700 leading-relaxed">
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