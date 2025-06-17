import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaListUl, FaHandshake, FaUserTie } from 'react-icons/fa';
import AnimWrapper from '../components/UI/AnimWrapper';

// Annual Meetings data
const annualMeetings = [
  {
    id: 1,
    year: 2015,
    title: "First Meeting (Birth of CCCK)",
    date: "September 2015",
    venue: "Subiaco Retreat Centre, Karen, Nairobi",
    participants: "Superiors of 19 monasteries in Kenya with a few apostolic religious"
  },
  {
    id: 2,
    year: 2016,
    title: "Second Meeting",
    date: "September 2016",
    venue: "Subiaco Retreat Centre, Karen, Nairobi",
    participants: "Kenyan monasteries and representatives from Tanzania, Uganda, Zambia, South Africa, and Malawi"
  },
  {
    id: 3,
    year: 2017,
    title: "First Annual Executive Meeting",
    date: "September 2017",
    venue: "Subiaco Retreat Centre, Karen, Nairobi",
    participants: "Representatives from Kenya, Cameroon, Nigeria, and Zimbabwe"
  },
  {
    id: 4,
    year: 2018,
    title: "Second Annual Executive Meeting",
    date: "September 2018",
    venue: "Subiaco Retreat Centre, Karen, Nairobi",
    participants: "Superiors of contemplative communities from eight African countries"
  },
  {
    id: 5,
    year: 2019,
    title: "Third Annual Executive Meeting",
    date: "September 2019",
    venue: "Rousel House, Karen, Nairobi",
    participants: "Superiors and delegates from 24 monasteries"
  },
  {
    id: 6,
    year: 2020,
    title: "Virtual Meeting",
    date: "September 2020",
    venue: "Online Zoom Meeting",
    participants: "Representatives from all member monasteries"
  },
  {
    id: 7,
    year: 2021,
    title: "Virtual Meeting",
    date: "September 2021",
    venue: "Online Zoom Meeting",
    participants: "Representatives from all member monasteries"
  },
  {
    id: 8,
    year: 2022,
    title: "Fourth Annual Executive Meeting",
    date: "September 2022",
    venue: "Dominican Nuns Guest House, Nairobi",
    participants: "Superiors and delegates from member monasteries"
  },
  {
    id: 9,
    year: 2023,
    title: "Fifth Annual Executive Meeting",
    date: "September 2023",
    venue: "Dominican Nuns Guest House, Nairobi",
    participants: "Representatives from 26 monasteries across 9 countries"
  },
  {
    id: 10,
    year: 2024,
    title: "Sixth Annual Executive Meeting",
    date: "September 2024",
    venue: "Dominican Nuns Guest House, Nairobi",
    participants: "Representatives from 28 monasteries across 10 countries"
  }
];

function AnnualMeetings() {
  useEffect(() => {
    // Force scroll to top with multiple approaches to ensure it works
    window.scrollTo(0, 0);
    
    // Also use the following as a backup
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 0);
    
    // Add a class to help with CSS scroll behavior
    document.documentElement.style.scrollBehavior = 'auto';
    
    return () => {
      // Restore scroll behavior
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-['Playfair_Display'] text-blue-600">
              Annual Meetings
            </h1>
            <p className="text-xl text-center max-w-4xl mx-auto mb-12 font-['Montserrat']">
              A comprehensive overview of CCCK's Annual Ordinary Executive Meetings, marking our journey of growth and collaboration since our founding in 2015.
            </p>
          </AnimWrapper>

          {/* CCCK Annual Ordinary Meetings Section */}
          <div className="mb-16">
            <AnimWrapper delay={0.1}>
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-10 text-center text-blue-700 flex items-center justify-center">
                <FaHandshake className="mr-3 text-red-500" />
                CCCK Annual Ordinary Meetings
              </h2>
            </AnimWrapper>

            <div className="max-w-4xl mx-auto space-y-8">
              <AnimWrapper delay={0.2}>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-blue-600">
                  <p className="text-lg font-['Montserrat'] text-gray-700 mb-4">
                    Every year CCCK holds an Annual Ordinary Meeting. From its foundation in 2015 to the year 2024, CCCK has held 6 Annual Ordinary meetings.
                  </p>
                  <p className="text-lg font-['Montserrat'] text-gray-700">
                    During these meetings, each member monastery is represented by its Superior or a delegate.
                  </p>
                </div>
              </AnimWrapper>

              <AnimWrapper delay={0.3}>
                <div className="bg-blue-50 rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-red-500">
                  <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-blue-700 flex items-center">
                    <FaListUl className="mr-3 text-red-500" />
                    Functions and Competence of the Annual Ordinary Meeting
                  </h3>
                  <ul className="space-y-4 text-lg font-['Montserrat'] text-gray-700">
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-2">a)</span>
                      <span>to provide an opportunity for discussions among the members which enables them to experience solidarity and to extend mutual encouragement;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-2">b)</span>
                      <span>to foster and coordinate, when appropriate, initiatives and project of mutual concern which would strengthen the Church's contemplative vision and values;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-2">c)</span>
                      <span>to elect officials;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-2">d)</span>
                      <span>to address in a spirit of synodality any arising concern affecting a member monastery;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-2">e)</span>
                      <span>when possible, to have some suitable inputs on the contemplative life and other relevant topics;</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-2">f)</span>
                      <span>to share areas of on-going interests and concerns among the contemplative communities; and</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-2">g)</span>
                      <span>to address any arising issues within the Conference.</span>
                    </li>
                  </ul>
                </div>
              </AnimWrapper>

              <AnimWrapper delay={0.4}>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-blue-700 flex items-center">
                    <FaUserTie className="mr-3 text-red-500" />
                    Governance of CCCK
                  </h3>
                  <p className="text-lg font-['Montserrat'] text-gray-700">
                    CCCK is governed by a Council composed of a chairperson and 4 councilors who are elected by the Conference Executive Committee by secret ballot every four years during the Annual Executive Meeting.
                  </p>
                </div>
              </AnimWrapper>
            </div>
          </div>

          {/* Annual Executive Meetings Timeline Section */}
          <div className="mb-8">
            <AnimWrapper delay={0.5}>
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-10 text-center text-blue-700 flex items-center justify-center">
                <FaCalendarAlt className="mr-3 text-red-500" />
                Annual Executive Meetings Timeline
              </h2>
              <p className="text-lg text-center max-w-4xl mx-auto mb-12 font-['Montserrat'] text-gray-600">
                A chronological record of CCCK's Annual Executive Meetings, marking our journey of growth and collaboration since our founding in 2015.
              </p>
            </AnimWrapper>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

            {/* Timeline items */}
            {annualMeetings.map((meeting, index) => (
              <AnimWrapper key={meeting.id} delay={0.6 + 0.1 * index}>
                <div className={`flex flex-col md:flex-row items-center mb-16 relative ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Year marker (shown only on mobile) */}
                  <div className="md:hidden bg-blue-600 text-white font-bold rounded-full h-12 w-12 flex items-center justify-center mb-4">
                    {meeting.year}
                  </div>
                  
                  {/* Content card */}
                  <div className="w-full md:w-5/12">
                    <motion.div 
                      className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-blue-600"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-center mb-4">
                        <h3 className="text-2xl font-['Playfair_Display'] font-bold text-blue-600">
                          {meeting.title}
                        </h3>
                      </div>
                      
                      <div className="mb-4 flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        <span>{meeting.date}</span>
                      </div>
                      
                      <div className="mb-4 flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        <span>{meeting.venue}</span>
                      </div>
                      
                      <div className="flex items-start text-gray-600">
                        <FaUsers className="mr-2 mt-1 text-blue-500" />
                        <span>{meeting.participants}</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Year marker for desktop */}
                  <div className="hidden md:flex bg-blue-600 text-white font-bold rounded-full h-16 w-16 items-center justify-center mx-6 z-10">
                    {meeting.year}
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              </AnimWrapper>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnnualMeetings; 