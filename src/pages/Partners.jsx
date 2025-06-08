import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimWrapper from '../components/UI/AnimWrapper';
import LazyImage from '../components/UI/LazyImage';
import { FaHandshake, FaChevronDown, FaChevronUp, FaEnvelope, FaPhone, FaUserPlus } from 'react-icons/fa';

const Partners = () => {
  const [activePartner, setActivePartner] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const togglePartner = (id, event) => {
    // Prevent default behavior to avoid automatic scrolling
    if (event) event.preventDefault();
    
    // Toggle the active partner
    setActivePartner(activePartner === id ? null : id);
    
    // Maintain the current scroll position
    const currentScrollPosition = window.scrollY;
    
    // Use setTimeout to maintain scroll position after DOM updates
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 10);
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Main partners data
  const mainPartners = [
    {
      id: 'porticus',
      name: 'PORTICUS AFRICA',
      logo: 'images/Porticus Africa.jpg',
      description: 'In the first 5 years of the inception of CCCK (2015-2019), Porticus Africa gave the Nuns\' Conference a gigantic haul which enabled them to carry out the following capacity building activities for the nuns Superiors, formators, and bursars.',
      activities: [
        {
          title: 'Meeting and workshop (2015)',
          details: 'Meeting and workshop for the superiors from Kenyan monasteries held at Subiaco retreat Centre in Karen - Nairobi in Sept. 2015.'
        },
        {
          title: 'Theology month for nuns (2016)',
          details: 'Theology month for nuns in a program called Twendeni peke Yetu in 2016. Note: The Twendeni peke yetu theology Program later was approved by the Dicastery (DICLSAL) and became known as the Venite Serosum theology program for nuns in on-going formation.'
        },
        {
          title: 'Study meeting on Apostolic Constitution (2017)',
          details: 'Superiors and formators study meeting on the Apostolic Constitution Vultum Dei Querere on women contemplative life, first Annual Executive Meeting and one month in-person theology course for formators in the months of Sept. and Oct. 2017.'
        },
        {
          title: 'Second Annual Executive meeting (2018)',
          details: 'The Second CCCK Annual Executive meeting in Sept. 2018. In that meeting was present 13 nuns from the Philippines who had come as observers to learn from the African Conference how to organize themselves into a Conference too. During the same meeting the nuns had an in-depth study of the dicasterial document - Cor Orans.'
        },
        {
          title: 'Workshop for superiors, bursars and formators (2019)',
          details: 'The Superiors, bursars and formators had a workshop to study the document "Economy at the service of Charism and mission", workshop and training on Safeguarding and protection of minors and vulnerable persons for all the superiors from the CCCK member monasteries in Sept. and Oct. 2019.'
        },
        {
          title: 'Study meetings and workshops (2020-2021)',
          details: 'Study meetings and workshop on the document "Seeking the Face of God: Guidelines on the formation of nuns" from the Dicastery (DICLSAL) in 2020 and evaluation of all the CCCK capacity building activities carried out in the first 5 years from its inception in 2020/2021.'
        },
        {
          title: 'Third Annual Executive meeting (2022)',
          details: 'In Sept. 2022, CCCK held the 3rd Annual Executive meeting. Present were delegates from Spanish and Philippine monasteries given the chance to share, in a synodal spirit, their experiences with the African nuns who had managed to organize themselves into a Conference and get reciprocal insight on how to form their own Conference back in their continents.'
        }
      ],
      images: [
        'images/Porticus Africa 1.jpg',
        'images/PORTICUS AFRICA 2.jpg',
        'images/PORTICUS AFRICA 3.jpg'
      ]
    },
    {
      id: 'hilton',
      name: 'HILTON FOUNDATION',
      logo: 'images/Hilton foundation.jpg',
      description: 'Through the support of Hilton Foundation, CCCK is currently engaged in the following activities:',
      activities: [
        {
          title: 'Theological formation for nuns',
          details: 'The Venite Seorsum Theology program for nuns - first cohort (2023-2025).'
        },
        {
          title: 'Training of nuns on Safeguarding',
          details: 'Training of nuns on Safeguarding and protection of minors and vulnerable adults.'
        },
        {
          title: 'Workshops on Magisterial documents',
          details: 'Yearly workshop on the recent Magisterial documents on contemplative life for entire women communities.'
        },
        {
          title: 'Annual workshops on Safeguarding',
          details: 'Annual workshops for all CCCK member monastery on the official Church teaching on Safeguarding and protection of minors and vulnerable adults.'
        }
      ],
      images: [
        'images/Hilton foundation 1.jpg',
        'images/Hilton foundation 2.jpg',
        'images/Hilton foundation 3.jpg',
        'images/Hilton foundation 4.jpg',
        'images/Hilton foundation 5.jpg',
        'images/Hilton foundation 6.jpg'
      ]
    },
    {
      id: 'dicastery',
      name: 'THE DICASTERY FOR THE CONSECRATED LIFE - DICLSAL – ROME',
      logo: 'images/Secretariat for the Assistance of nuns (SAM).jpg',
      description: 'The Roman Dicastery (DICLSAL) co-funded CCCK with Porticus Africa in running the above activities between the years 2015-2021.',
      activities: [],
      images: [
        'images/THE DICASTERY FOR THE CONSECRATED LIFE - DICLSAL – ROME 1.jpg',
        'images/THE DICASTERY FOR THE CONSECRATED LIFE - DICLSAL – ROME 2.jpg'
      ]
    },
    {
      id: 'sam',
      name: 'SECRETARIAT FOR THE ASSISTANCE OF NUNS (SAM)',
      logo: 'images/Secretariat for the Assistance of nuns (SAM).jpg',
      description: 'The Secretariat for the Assistance of Nuns (SAM) provides ongoing support and guidance to contemplative communities through the Dicastery for the Institutes of Consecrated Life and Societies of Apostolic Life.',
      activities: [
        {
          title: 'Formation guidance',
          details: 'Provides guidance on formation programs and spiritual development for contemplative nuns.'
        },
        {
          title: 'Canonical support',
          details: 'Offers canonical advice and support for the proper governance of monastic communities.'
        },
        {
          title: 'Inter-monastic coordination',
          details: 'Facilitates collaboration and communication between different contemplative communities worldwide.'
        }
      ],
      images: []
    },
    {
      id: 'magisterium',
      name: 'ONLINE FORMATION - MAGISTERIUM, CANONICAL NORMS AND PRACTICE FOR CONSECRATED LIFE',
      logo: 'images/Magisterium, canonical norms and practice for consecrated Life.jpg',
      description: 'An online formation platform providing comprehensive education on Church Magisterium, canonical norms, and best practices for consecrated life communities.',
      activities: [
        {
          title: 'Online theological courses',
          details: 'Comprehensive online courses covering Church doctrine, theology, and spirituality for consecrated persons.'
        },
        {
          title: 'Canonical formation',
          details: 'Education on canonical norms and legal frameworks governing religious institutes and consecrated life.'
        },
        {
          title: 'Best practices sharing',
          details: 'Platform for sharing successful practices and experiences among different religious communities globally.'
        },
        {
          title: 'Virtual workshops and seminars',
          details: 'Regular online workshops and seminars on current issues in consecrated life and religious formation.'
        }
      ],
      images: []
    }
  ];

  // Collaborators data
  const collaborators = [
    {
      id: 'chemichemi',
      name: 'CHEMICHEMI PASTORAL COLLEGE',
      logo: 'images/Chemichemi ya Uzima College 2.jpg',
      description: 'Trains the CCCK nuns in Integrative spiritual counselling and catechetics online',
      details: 'CCCK, collaborated with Chemi Chemi college to train over 30 nuns in certificate in Integrative spiritual counselling and Catechetical theology online.',
      image: 'images/Graduates of Chemchemi pastoral college.jpeg'
    },
    {
      id: 'tangaza',
      name: 'TANGAZA UNIVERSITY',
      logo: 'images/Tangaza University College 2.jpg',
      description: 'Academic collaboration for theological formation',
      details: 'Lecturers from the University teach in the Venite Seorsum Theology program for nuns either online and in-person. The Institute of Youth Ministry collaborates with CCCK in the training of the nuns on Safeguarding and protection of minors and vulnerable persons.',
      image: 'images/TANGAZA UNIVERSITY.jpg'
    },
    {
      id: 'friends',
      name: 'CCCK FRIENDS',
      logo: null,
      description: 'A group of lay people who freely offer support to the nuns\' Conference',
      details: 'This is a group of lay people who freely offer technical, material and professional support to the nuns\' Conference. The CCCK Friends also share the contemplative spirituality of the nuns. This group was formed in the year 2023 and was approved by the Executive by a deliberate vote. Its operations are outlined in the CCCK Statutes.',
      image: 'images/CCCK FRIENDS.jpg',
      contact: {
        title: 'Become a CCCK Friend',
        info: 'If you would like to become a CCCK Friend and support our mission, please contact the coordinator using the information below:',
        email: 'ccckmonasteries@gmail.com',
        phone: '0757537700'
      }
    }
  ];

  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-center mb-8 text-blue-600">
              Our <span className="text-red-600">Partners</span>
            </h1>
            <p className="text-xl text-center max-w-4xl mx-auto mb-12 font-['Montserrat'] text-gray-700">
              We are grateful for the invaluable support and collaboration of our partners and collaborators who make our mission possible.
            </p>
          </AnimWrapper>

          {/* Main Partners Section */}
          <div className="mb-16">
            <AnimWrapper delay={0.1}>
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-10 text-center text-blue-700 flex items-center justify-center">
                <FaHandshake className="mr-3 text-red-500" />
                Main Partners
              </h2>
            </AnimWrapper>

            <div className="space-y-10">
              {mainPartners.map((partner, index) => (
                <AnimWrapper key={partner.id} delay={0.2 + index * 0.1}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Partner Header with Logo */}
                    <div 
                      className={`px-6 py-4 cursor-pointer transition-all ${activePartner === partner.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={(e) => togglePartner(partner.id, e)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {/* Partner Logo */}
                          {partner.logo && (
                            <div className="w-16 h-16 mr-4 flex-shrink-0 bg-white rounded-lg shadow-sm p-2 border border-gray-100">
                              <img
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-blue-600">
                              {partner.name}
                            </h3>
                          </div>
                        </div>
                        <div className="text-blue-600 flex-shrink-0 ml-4">
                          {activePartner === partner.id ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700 font-['Montserrat'] ml-20">{partner.description}</p>
                    </div>

                    {/* Partner Content (Expanded) */}
                    {activePartner === partner.id && (
                      <div className="p-6 bg-gray-50">
                        {/* Activities List */}
                        {partner.activities.length > 0 && (
                          <div className="mb-8">
                            <h4 className="text-xl font-['Playfair_Display'] font-semibold mb-4 text-blue-700">Activities</h4>
                            <div className="space-y-4">
                              {partner.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                                  <h5 className="font-['Montserrat'] font-semibold text-blue-600 mb-2">{activity.title}</h5>
                                  <p className="text-gray-700 font-['Montserrat']">{activity.details}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Image Gallery */}
                        {partner.images.length > 0 && (
                          <>
                            <h4 className="text-xl font-['Playfair_Display'] font-semibold mb-4 text-blue-700">Gallery</h4>
                            <div className={`grid grid-cols-1 ${partner.id === 'dicastery' ? 'sm:grid-cols-1 md:grid-cols-2' : 'sm:grid-cols-2'} gap-6`}>
                              {partner.images.map((image, imgIndex) => (
                                <div 
                                  key={imgIndex} 
                                  className={`rounded-lg overflow-hidden shadow-sm max-w-full ${partner.id === 'dicastery' ? 'bg-gray-50 p-2' : ''}`}
                                >
                                  <img
                                    src={image}
                                    alt={`${partner.name} - Image ${imgIndex + 1}`}
                                    className={`w-full ${partner.id === 'dicastery' ? 'max-h-[500px]' : 'max-h-[400px]'} object-contain transition-transform hover:scale-105 duration-300 mx-auto`}
                                    style={{ display: 'block' }}
                                  />
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </AnimWrapper>
              ))}
            </div>
          </div>

          {/* Collaborators Section */}
          <AnimWrapper delay={0.3}>
            <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-10 text-center text-blue-700 flex items-center justify-center">
              <FaHandshake className="mr-3 text-red-500" />
              Collaborators
            </h2>
          </AnimWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborators.map((item, index) => (
              <AnimWrapper key={item.id} delay={0.4 + index * 0.1}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                  {/* Logo Header */}
                  {item.logo && (
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-center">
                      <div className="w-20 h-20 bg-white rounded-lg shadow-sm p-2 border border-gray-200">
                        <img
                          src={item.logo}
                          alt={`${item.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Image */}
                  <div className="h-56 overflow-hidden">
                    <LazyImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-['Playfair_Display'] font-bold text-blue-600 mb-2">{item.name}</h3>
                    <p className="font-['Montserrat'] font-medium text-blue-500 mb-3">{item.description}</p>
                    
                    {item.id === 'friends' && item.contact && (
                      <div className="mt-2 mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="flex items-center font-['Montserrat'] font-semibold text-blue-700 mb-2">
                          <FaUserPlus className="mr-2" /> {item.contact.title}
                        </h4>
                        <p className="text-gray-700 mb-3">{item.contact.info}</p>
                        <div className="flex items-center mb-2">
                          <FaEnvelope className="text-blue-600 mr-2" />
                          <a href={`mailto:${item.contact.email}`} className="text-blue-600 hover:underline">
                            {item.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <FaPhone className="text-blue-600 mr-2" />
                          <a href={`tel:${item.contact.phone}`} className="text-blue-600 hover:underline">
                            {item.contact.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-auto">
                      <button
                        className="mt-2 text-blue-600 font-['Montserrat'] font-medium flex items-center"
                        onClick={() => toggleSection(item.id)}
                        aria-expanded={expandedSections[item.id]}
                      >
                        {expandedSections[item.id] ? (
                          <>Read Less <FaChevronUp className="ml-1" /></>
                        ) : (
                          <>Read More <FaChevronDown className="ml-1" /></>
                        )}
                      </button>
                      
                      {expandedSections[item.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-gray-700 font-['Montserrat']"
                        >
                          {item.details}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimWrapper>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;