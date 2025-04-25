import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaListUl } from 'react-icons/fa';
import AnimWrapper from '../components/UI/AnimWrapper';

// Annual Meetings data
const annualMeetings = [
  {
    id: 1,
    year: 2015,
    title: "First Meeting (Birth of CCCK)",
    date: "September 28 - October 23, 2015",
    venue: "Subiaco Retreat Centre, Karen, Nairobi",
    participants: "Superiors of 19 monasteries in Kenya with a few apostolic religious",
    agenda: [
      "Development of curriculum for theological education of cloistered nuns",
      "Meeting with Cardinal João Braz de Avís, prefect of CICLSAL",
      "Initial discussions on forming a conference of major superiors"
    ]
  },
  {
    id: 2,
    year: 2016,
    title: "Second Meeting",
    date: "October 2016",
    venue: "Karen, Nairobi",
    participants: "Kenyan monasteries and representatives from Tanzania, Uganda, Zambia, South Africa, and Malawi",
    agenda: [
      "Unanimous vote to accept the CICLSAL prefect's proposal",
      "Beginning the development of proper law for CCCK",
      "Establishment of the annual Venite Seorsum Theology program"
    ]
  },
  {
    id: 3,
    year: 2017,
    title: "First Annual Ordinary Meeting",
    date: "October 6, 2017",
    venue: "Nairobi, Kenya",
    participants: "Representatives from Kenya, Cameroon, Nigeria, and Zimbabwe",
    agenda: [
      "Finalization of CCCK statutes in the presence of Fr. Stefano Cañuto",
      "Election and nomination of the first officials of the conference",
      "Approval of statutes by CICLSAL on October 26, 2017",
      "Official erection of CCCK as a juridic person under Holy See direction"
    ]
  },
  {
    id: 4,
    year: 2018,
    title: "Second Annual Ordinary Meeting",
    date: "October 2018",
    venue: "Resurrection Garden, Nairobi",
    participants: "Superiors of contemplative communities from eight African countries",
    agenda: [
      "Implementation of Cor Orans instructions",
      "Discussion on challenges facing contemplative communities in Africa",
      "Planning for collaborative formation programs"
    ]
  },
  {
    id: 5,
    year: 2019,
    title: "Third Annual Ordinary Meeting",
    date: "October 2019",
    venue: "Dimesse Sisters, Karen",
    participants: "Superiors and delegates from 24 monasteries",
    agenda: [
      "Evaluation of the Venite Seorsum program",
      "Sharing of best practices in monastic formation",
      "Discussion on sustainability challenges facing monasteries"
    ]
  },
  {
    id: 6,
    year: 2020,
    title: "Virtual Meeting",
    date: "October 2020",
    venue: "Online Zoom Meeting",
    participants: "Representatives from all member monasteries",
    agenda: [
      "Addressing challenges posed by the COVID-19 pandemic",
      "Adaptation of formation programs to virtual platforms",
      "Strategies for maintaining contemplative life during lockdowns"
    ]
  },
  {
    id: 7,
    year: 2021,
    title: "Fourth Annual Ordinary Meeting",
    date: "October 2021",
    venue: "Dimesse Sisters, Karen",
    participants: "Limited in-person attendance with virtual participation",
    agenda: [
      "Post-pandemic recovery strategies for monasteries",
      "Strengthening inter-monastic collaboration",
      "Formation program planning for 2022"
    ]
  },
  {
    id: 8,
    year: 2022,
    title: "Fifth Annual Ordinary Meeting",
    date: "October 3-7, 2022",
    venue: "Resurrection Garden, Nairobi",
    participants: "Superiors and delegates from member monasteries",
    agenda: [
      "Celebration of 5 years of Pontifical approval",
      "Review of the implementation of Cor Orans",
      "Planning for expansion of CCCK membership"
    ]
  },
  {
    id: 9,
    year: 2023,
    title: "Sixth Annual Ordinary Meeting",
    date: "October 2-6, 2023",
    venue: "Resurrection Garden, Nairobi",
    participants: "Representatives from 26 monasteries across 9 countries",
    agenda: [
      "Evaluation of formation programs",
      "Discussion on financial sustainability of monasteries",
      "Planning for the 2024 Pan-African Contemplative Conference"
    ]
  }
];

function AnnualMeetings() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-['Playfair_Display'] text-blue-600">
              Annual Ordinary Meetings
            </h1>
            <p className="text-xl text-center max-w-4xl mx-auto mb-12 font-['Montserrat']">
              A chronological record of CCCK's Annual Ordinary Meetings, marking our journey of growth and collaboration since our founding in 2015.
            </p>
          </AnimWrapper>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

            {/* Timeline items */}
            {annualMeetings.map((meeting, index) => (
              <AnimWrapper key={meeting.id} delay={0.1 * index}>
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
                      
                      <div className="mb-4 flex items-start text-gray-600">
                        <FaUsers className="mr-2 mt-1 text-blue-500" />
                        <span>{meeting.participants}</span>
                      </div>
                      
                      <div className="flex items-start text-gray-600">
                        <FaListUl className="mr-2 mt-1 text-blue-500" />
                        <div>
                          <p className="font-semibold mb-2">Agenda:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {meeting.agenda.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
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