import { memo, useEffect } from 'react';
import AnimWrapper from '../components/UI/AnimWrapper';
import { FaHandHoldingHeart, FaPrayingHands, FaGraduationCap, FaHandsHelping, FaUniversity, FaInfoCircle } from 'react-icons/fa';

function Donate() {
  useEffect(() => {
    // Force a repaint/reflow to fix blank page issue
    const forceRepaint = () => {
      // Reading a property that causes reflow
      document.body.offsetHeight;
      
      // Ensure component is visible
      document.documentElement.style.visibility = 'visible';
    };
    
    // Execute immediately and after a small delay
    forceRepaint();
    const timeoutId = setTimeout(forceRepaint, 50);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-center mb-8 text-blue-600">
              Donate to <span className="text-red-600">CCCK Nuns</span>
            </h1>
            <p className="text-lg md:text-xl text-center max-w-4xl mx-auto mb-12 font-['Montserrat'] text-gray-700">
              The Conference of Contemplative communities of Kenya (CCCK) is a charitable NGO composed of over 35 monasteries of women spread in over 10 English-speaking countries in Africa.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.2}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg mb-10">
              <p className="text-base md:text-lg font-['Montserrat'] text-gray-700 leading-relaxed mb-4">
                The primary mission and apostolate of the CCCK member monasteries is to offer uninterrupted prayer and praise to God, interceding for all the people independent of their creed or nationality.
              </p>
              <p className="text-base md:text-lg font-['Montserrat'] text-gray-700 leading-relaxed">
                The monasteries are also committed to offer spiritual havens of peace, hospitality and spiritual rebirth to humanity through enduring daily prayer for the increasingly morally depraved world.
              </p>
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.3}>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-center mb-10 text-blue-700">
              Why Support CCCK
            </h2>
          </AnimWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <AnimWrapper delay={0.4}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="p-6">
                  <div className="flex items-start">
                    <FaGraduationCap className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-blue-700">1. Your donation will help to train a nun</h3>
                      <p className="text-gray-700">
                        CCCK runs the Venite Seorsum theological formation program for nuns to prepare them for their ministries. CCCK also organizes regular trainings and workshops on safeguarding and protection of minors and vulnerable persons in order to create a Church that is more inclusive, caring and safe for all and in this way, contributes in building a culture of care and protection in the Church and in the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimWrapper>

            <AnimWrapper delay={0.5}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="p-6">
                  <div className="flex items-start">
                    <FaPrayingHands className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-blue-700">2. Join a formidable force of prayer warriors</h3>
                      <p className="text-gray-700">
                        Through your donation, you join that formidable force of prayer warriors who work to transform the world from inside. Your donation makes you join throngs of women monastics who dedicate their existence to divine search and in this way powerfully impact the society.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimWrapper>

            <AnimWrapper delay={0.6}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="p-6">
                  <div className="flex items-start">
                    <FaHandHoldingHeart className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-blue-700">3. Express your gratitude for prayers answered</h3>
                      <p className="text-gray-700">
                        The CCCK NUNS commit all their life to interceding for Gods people. Your donation is a confirmation of your undauntable belief in the transformative and healing power of prayer and spirituality which you have experienced personally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimWrapper>

            <AnimWrapper delay={0.7}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="p-6">
                  <div className="flex items-start">
                    <FaHandsHelping className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-blue-700">4. Boost financial sustainability</h3>
                      <p className="text-gray-700">
                        Your donation will boost the financial sustainability of women monasteries in Anglophone Africa. The CCCK member monasteries are spread across sub-Sahara Africa. The nuns carry out different income generating activities such as agriculture, baking alter bread, hospitality, spiritual accompaniment and counselling, production of sacred vestment to mention but a few. These income generating businesses have been affected by climate change, drought, high market competition with producers of same items and loss of property due political instability in some countries. Your donation will directly be channeled to the CCCK monasteries most affected by the above conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimWrapper>
          </div>

          <AnimWrapper delay={0.8}>
            <div className="bg-blue-50 rounded-xl shadow-md p-8 max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-center text-blue-700">
                How to Donate
              </h2>
              
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <FaUniversity className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-blue-700">Bank Transfer</h3>
                    <p className="text-gray-700 mb-4">
                      You can make a donation through bank transfer to our account:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-bold text-blue-800">Account Number: 34 80 11 00 14</p>
                      <p className="font-bold text-blue-800">Bank: NCBA Bank</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start">
                  <FaInfoCircle className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-blue-700">Need More Information?</h3>
                    <p className="text-gray-700">
                      For further clarification about donations, please contact us via the email and phone number provided on our Contact page.
                    </p>
                    <a 
                      href="/contact" 
                      className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-red-600 transition-all duration-300"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimWrapper>
        </div>
      </section>
    </div>
  );
}

function EnsureRenderedDonate() {
  useEffect(() => {
    // Force a document repaint to fix blank page issue
    const repaint = () => {
      document.body.style.display = 'none';
      // The browser will flush CSS changes and apply them
      setTimeout(() => {
        document.body.style.display = '';
      }, 0);
    };
    
    // Execute after component mounts
    repaint();
    
    // Also set a small timeout for good measure
    const timeoutId = setTimeout(repaint, 50);
    return () => clearTimeout(timeoutId);
  }, []);
  
  return <Donate />;
}

export default memo(EnsureRenderedDonate); 