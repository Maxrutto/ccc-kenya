import { useState, useEffect } from 'react';
import AnimWrapper from '../components/UI/AnimWrapper';
import LazyImage from '../components/UI/LazyImage';
import { FaHandshake, FaEnvelope, FaPhone, FaUserPlus } from 'react-icons/fa';

const Partners = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // All partners data (simplified - just logos and names)
  const partners = [
    {
      id: 'porticus',
      name: 'PORTICUS AFRICA',
      logo: 'images/Porticus Africa.jpg',
    },
    {
      id: 'hilton',
      name: 'HILTON FOUNDATION',
      logo: 'images/Hilton foundation.jpg',
    },
    {
      id: 'dicastery',
      name: 'THE DICASTERY FOR THE CONSECRATED LIFE - DICLSAL – ROME',
      logo: 'images/Secretariat for the Assistance of nuns (SAM).jpg',
    },
    {
      id: 'sam',
      name: 'SECRETARIAT FOR THE ASSISTANCE OF NUNS (SAM)',
      logo: 'images/Secretariat for the Assistance of nuns (SAM).jpg',
    },
    {
      id: 'magisterium',
      name: 'ONLINE FORMATION - MAGISTERIUM, CANONICAL NORMS AND PRACTICE FOR CONSECRATED LIFE',
      logo: 'images/Magisterium, canonical norms and practice for consecrated Life.jpg',
    },
    {
      id: 'chemichemi',
      name: 'CHEMICHEMI PASTORAL COLLEGE',
      logo: 'images/Chemichemi ya Uzima College 2.jpg',
    },
    {
      id: 'tangaza',
      name: 'TANGAZA UNIVERSITY',
      logo: 'images/Tangaza University College 2.jpg',
    }
  ];

  // CCCK Friends data (detailed section)
  const ccckFriends = {
    id: 'friends',
    name: 'CCCK FRIENDS',
    description: 'A group of lay people who freely offer support to the nuns\' Conference',
    details: 'This is a group of lay people who freely offer technical, material and professional support to the nuns\' Conference. The CCCK Friends also share the contemplative spirituality of the nuns. This group was formed in the year 2023 and was approved by the Executive by a deliberate vote. Its operations are outlined in the CCCK Statutes.',
    image: 'images/CCCK FRIENDS.jpg',
    contact: {
      title: 'Become a CCCK Friend',
      info: 'If you would like to become a CCCK Friend and support our mission, please contact the coordinator using the information below:',
      email: 'ccckmonasteries@gmail.com',
      phone: '0757537700'
    }
  };

  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-center mb-8 text-blue-600">
              Our <span className="text-red-600">Partners</span>
            </h1>
            <p className="text-xl text-center max-w-4xl mx-auto mb-12 font-['Montserrat'] text-gray-700">
              We are grateful for the invaluable support and collaboration of our partners who make our mission possible.
            </p>
          </AnimWrapper>

          {/* Partners Grid Section */}
          <div className="mb-16">
            <AnimWrapper delay={0.1}>
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-10 text-center text-blue-700 flex items-center justify-center">
                <FaHandshake className="mr-3 text-red-500" />
                Our Partners & Collaborators
              </h2>
            </AnimWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {partners.map((partner, index) => (
                <AnimWrapper key={partner.id} delay={0.2 + index * 0.1}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 flex flex-col items-center text-center h-full">
                    {/* Partner Logo */}
                    <div className="w-24 h-24 mb-4 flex-shrink-0 bg-gray-50 rounded-lg shadow-sm p-3 border border-gray-100">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Partner Name */}
                    <h3 className="text-sm md:text-base font-['Montserrat'] font-semibold text-blue-600 leading-tight">
                      {partner.name}
                    </h3>
                  </div>
                </AnimWrapper>
              ))}
            </div>
          </div>

          {/* CCCK Friends Section (Detailed) */}
          <AnimWrapper delay={0.5}>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-10 text-center text-blue-700 flex items-center justify-center">
              <FaHandshake className="mr-3 text-red-500" />
              CCCK Friends
            </h2>
          </AnimWrapper>

          <div className="max-w-4xl mx-auto">
            <AnimWrapper delay={0.6}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Image */}
                <div className="h-64 overflow-hidden">
                  <LazyImage
                    src={ccckFriends.image}
                    alt={ccckFriends.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    containerClassName="w-full h-full"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-blue-600 mb-3">{ccckFriends.name}</h3>
                  <p className="font-['Montserrat'] font-medium text-blue-500 mb-4 text-lg">{ccckFriends.description}</p>
                  <p className="text-gray-700 font-['Montserrat'] mb-6 leading-relaxed">{ccckFriends.details}</p>
                  
                  {/* Contact Information */}
                  <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                    <h4 className="flex items-center font-['Montserrat'] font-semibold text-blue-700 mb-3 text-lg">
                      <FaUserPlus className="mr-2" /> {ccckFriends.contact.title}
                    </h4>
                    <p className="text-gray-700 mb-4">{ccckFriends.contact.info}</p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaEnvelope className="text-blue-600 mr-3 text-lg" />
                        <a href={`mailto:${ccckFriends.contact.email}`} className="text-blue-600 hover:underline font-medium">
                          {ccckFriends.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="text-blue-600 mr-3 text-lg" />
                        <a href={`tel:${ccckFriends.contact.phone}`} className="text-blue-600 hover:underline font-medium">
                          {ccckFriends.contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimWrapper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;