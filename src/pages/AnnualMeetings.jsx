import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaListUl, FaHandshake, FaVoteYea, FaUserTie } from 'react-icons/fa';
import AnimWrapper from '../components/UI/AnimWrapper';

// Annual Meetings data
const annualMeetings = [
  {
    id: 1,
    year: 2015,
    title: "First Meeting (Birth of CCCK)",
    date: "September 2015",
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
    date: "September 2016",
    venue: "Subiaco Retreat Centre, Karen, Nairobi",
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
    title: "First Annual Executive Meeting",
    date: "September 2017",
    venue: "Subiaco Retreat Centre, Karen, Nairobi",
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
    title: "Second Annual Executive Meeting",
    date: "September 2018",
    venue: "Subiaco Retreat Centre, Karen, Nairobi",
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
    title: "Third Annual Executive Meeting",
    date: "September 2019",
    venue: "Rousel House, Karen, Nairobi",
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
    date: "September 2020",
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
    title: "Fourth Annual Executive Meeting",
    date: "September 2021",
    venue: "Online Zoom Meeting",
    participants: "Representatives from all member monasteries",
    agenda: [
      "Post-pandemic recovery strategies for monasteries",
      "Strengthening inter-monastic collaboration",
      "Formation program planning for 2022"
    ]
  },
  {
    id: 8,
    year: 2022,
    title: "Fifth Annual Executive Meeting",
    date: "September 2022",
    venue: "Dominican Nuns Guest House, Nairobi",
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
    title: "Sixth Annual Executive Meeting",
    date: "September 2023",
    venue: "Dominican Nuns Guest House, Nairobi",
    participants: "Representatives from 26 monasteries across 9 countries",
    agenda: [
      "Evaluation of formation programs",
      "Discussion on financial sustainability of monasteries",
      "Planning for the 2024 Pan-African Contemplative Conference"
    ]
  },
  {
    id: 10,
    year: 2024,
    title: "Seventh Annual Executive Meeting",
    date: "September 2024",
    venue: "Dominican Nuns Guest House, Nairobi",
    participants: "Representatives from 28 monasteries across 10 countries",
    agenda: [
      "Pan-African Contemplative Conference outcomes and next steps",
      "Enhancing digital communication between member monasteries",
      "Implementing sustainable practices for monastic communities",
      "Planning collaborative formation initiatives for 2025"
    ]
  }
];

// Monasteries that received provisional approval in 2023
const approvedMonasteries2023 = [
  "Capuchin nuns (TOR) - Maua, Tanzania",
  "Benedictine Nuns of Perpetual Adoration in Tororo - Uganda",
  "Poor Clare Nuns - Harare, Zimbabwe",
  "Poor Clare Colettine Nuns in Bukoba – Tanzania",
  "Discalced Carmelite Nuns in Bunda - Tanzania",
  "Capuchin Poor Clare Nuns in Melville – S. Africa",
  "Dominican Nuns – Monastery of the Queen of the Most Holy Rosary – Fort Portal Uganda",
  "Servants of the Holy Spirit of Perpetual Adoration Nuns in Lomé – Togo",
  "Discalced Carmelite Nuns in Zomba – Malawi",
  "Poor Clare Nuns – Monastery of the Holy Church – Mbarara in Uganda",
  "Dominican Nuns in Bamenda, Cameroon",
  "Dominican Nuns – Monastère De la Paix – Rweza – Burundi",
  "Dominican Nuns – Monastère St. Dominique et N.D. du Rosaire, Douala - Cameroon"
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
              A comprehensive overview of CCCK's Annual Ordinary and Executive Meetings, marking our journey of growth and collaboration since our founding in 2015.
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

              <AnimWrapper delay={0.5}>
                <div className="bg-green-50 rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-green-500">
                  <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-blue-700 flex items-center">
                    <FaVoteYea className="mr-3 text-green-500" />
                    2023 Provisional Approvals
                  </h3>
                  <p className="text-lg font-['Montserrat'] text-gray-700 mb-6">
                    The CCCK Executive Committee, during the Annual Ordinary Meeting held on 29/09/2023 voted unanimously positive and granted provisional approval to the following monasteries:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {approvedMonasteries2023.map((monastery, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
                        <span className="font-bold text-green-600 mr-2">{index + 1}.</span>
                        <span className="text-gray-700 font-['Montserrat']">{monastery}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm font-['Montserrat'] text-blue-800 font-medium">
                      <strong>NB:</strong> The list above received membership confirmation from the Dicastery (DICLSAL) in the year 2024.
                    </p>
                  </div>
                </div>
              </AnimWrapper>
            </div>
          </div>

          {/* Annual Executive Meetings Timeline Section */}
          <div className="mb-8">
            <AnimWrapper delay={0.6}>
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
              <AnimWrapper key={meeting.id} delay={0.7 + 0.1 * index}>
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