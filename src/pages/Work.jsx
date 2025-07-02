import { memo } from 'react';
import AnimWrapper from '../components/UI/AnimWrapper';
import { FaPrayingHands, FaBook, FaHandHoldingHeart, FaCross, FaSeedling, FaGraduationCap, 
         FaGraduationCap as FaEducation, FaUsers, FaShieldAlt, FaGlobeAmericas, FaHandsHelping } from 'react-icons/fa';

const work = [
  {
    icon: <FaPrayingHands className="text-4xl text-blue-600" />,
    title: "Prayer and Contemplation",
    description: "At the heart of our communities is the dedication to prayer and contemplation, offering continuous prayer for the Church and the world."
  },
  {
    icon: <FaBook className="text-4xl text-blue-600" />,
    title: "Theological Formation",
    description: "We provide solid theological education and formation for contemplative nuns across English-speaking Africa."
  },
  {
    icon: <FaHandHoldingHeart className="text-4xl text-blue-600" />,
    title: "Spiritual Accompaniment",
    description: "Our members offer spiritual direction and accompaniment to those seeking deeper connection with God."
  },
  {
    icon: <FaCross className="text-4xl text-blue-600" />,
    title: "Monastic Hospitality",
    description: "Our monasteries welcome visitors for retreats, offering a peaceful environment for prayer and reflection."
  },
  {
    icon: <FaSeedling className="text-4xl text-blue-600" />,
    title: "Sustainable Living",
    description: "We engage in sustainable agricultural practices and crafts that support our communities and care for the environment."
  },
  {
    icon: <FaGraduationCap className="text-4xl text-blue-600" />,
    title: "Educational Outreach",
    description: "We support education initiatives in the communities surrounding our monasteries."
  }
];

function Work() {
  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-2 sm:px-4">
          <AnimWrapper>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-center mb-8 text-blue-600">
              Our Initiatives
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto mb-12 font-['Montserrat']">
              The Conference of Contemplative Communities of Kenya is engaged in various forms of ministry
              that emerge from our contemplative way of life.
            </p>
          </AnimWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {work.map((item, index) => (
              <AnimWrapper key={index} delay={0.1 * index}>
                <div 
                  className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300"
                >
                  <div className="mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-700">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </AnimWrapper>
            ))}
          </div>

          <AnimWrapper delay={0.3}>
            <div className="mt-20 bg-blue-50 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto shadow-lg">
              <h2 className="text-3xl font-['Playfair_Display'] font-bold mb-6 text-center text-blue-600">Key Initiatives</h2>
              <p className="mb-8 text-center font-['Montserrat'] text-gray-700">
                Beyond our daily contemplative life, we engage in special initiatives that extend our mission.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <FaEducation className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />,
                    title: "Regular Education of Nuns",
                    content: "CCCK has established the Venite Seorsum Theology Program, a unique school for the intellectual formation of nuns with solemn vows. Attendance in periodic online classes are also made possible by granting each member monastery with computers and projectors."
                  },
                  {
                    icon: <FaUsers className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />,
                    title: "Capacity Building Courses for Superiors and Formators",
                    content: "Every year the superiors and formators from all the 34 plus member monasteries in Africa meet in Nairobi to study and share. Helped by an expert, they explore different topics to keep themselves updated and possibly learn new ways of leadership and administration."
                  },
                  {
                    icon: <FaShieldAlt className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />,
                    title: "Protection of Minors and Vulnerable Adults",
                    content: "Nuns and employees of every member monastery are regularly trained to be vigilant in preventing any form of physical or psychological violence or abuse, abandonment, neglect, ill-treatment or exploitation of minors and vulnerable adults."
                  },
                  {
                    icon: <FaGlobeAmericas className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />,
                    title: "Global Outreach",
                    content: "CCCK has been actively helping nuns from other parts of the world in forming conferences within their own geographical realities."
                  },
                  {
                    icon: <FaHandsHelping className="text-3xl text-blue-600 mt-1 mr-4 flex-shrink-0" />,
                    title: "Collaboration with CCCK Friends",
                    content: <>
                      <div>You can share in our work by becoming a Friend of CCCK. In this collaboration, we will invite you to:</div>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Promote among your family and friends an awareness of the role of women contemplatives in the Church and the world</li>
                        <li>Present to us the needs of those who could use our intercessory ministry</li>
                        <li>Develop a contemplative disposition in your own busy lifestyle</li>
                        <li>Help us achieve financial sustainability through your technical knowledge and voluntary outreach</li>
                      </ul>
                    </>
                  }
                ].map((initiative, index) => (
                  <AnimWrapper key={index} delay={0.15 * (index + 1)}>
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start">
                        {initiative.icon}
                        <div>
                          <h3 className="text-xl font-bold mb-3 text-blue-700">{initiative.title}</h3>
                          <div className="text-gray-700">
                            {initiative.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimWrapper>
                ))}
              </div>
            </div>
          </AnimWrapper>
        </div>
      </section>
    </div>
  );
}

export default memo(Work);
