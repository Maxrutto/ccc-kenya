import { memo } from 'react';
import AnimWrapper from '../components/UI/AnimWrapper';
import { FaPrayingHands, FaBook, FaHandHoldingHeart, FaCross, FaSeedling, FaGraduationCap } from 'react-icons/fa';

const work = [
  {
    icon: <FaPrayingHands className="text-4xl text-secondary" />,
    title: "Prayer and Contemplation",
    description: "At the heart of our communities is the dedication to prayer and contemplation, offering continuous prayer for the Church and the world."
  },
  {
    icon: <FaBook className="text-4xl text-secondary" />,
    title: "Theological Formation",
    description: "We provide solid theological education and formation for contemplative sisters across English-speaking Africa."
  },
  {
    icon: <FaHandHoldingHeart className="text-4xl text-secondary" />,
    title: "Spiritual Accompaniment",
    description: "Our members offer spiritual direction and accompaniment to those seeking deeper connection with God."
  },
  {
    icon: <FaCross className="text-4xl text-secondary" />,
    title: "Monastic Hospitality",
    description: "Our monasteries welcome visitors for retreats, offering a peaceful environment for prayer and reflection."
  },
  {
    icon: <FaSeedling className="text-4xl text-secondary" />,
    title: "Sustainable Living",
    description: "We engage in sustainable agricultural practices and crafts that support our communities and care for the environment."
  },
  {
    icon: <FaGraduationCap className="text-4xl text-secondary" />,
    title: "Educational Outreach",
    description: "We support education initiatives in the communities surrounding our monasteries."
  }
];

function Work() {
  return (
    <div className="pt-16 pb-12">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <AnimWrapper>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-playfair text-secondary">
              Our Work
            </h1>
            <p className="text-xl text-center max-w-4xl mx-auto mb-12">
              The Conference of Contemplative Communities of Kenya is engaged in various forms of ministry
              that emerge from our contemplative way of life.
            </p>
          </AnimWrapper>

          <AnimWrapper delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {work.map((item, index) => (
                <div 
                  key={index} 
                  className="card p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300"
                >
                  <div className="mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </AnimWrapper>

          <AnimWrapper delay={0.5}>
            <div className="mt-20 bg-primary rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Initiatives</h2>
              <p className="mb-8 text-center">
                Beyond our daily contemplative life, we engage in special initiatives that extend our mission.
              </p>

              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3">Formation Programs</h3>
                  <p>
                    Regular programs for the ongoing formation of contemplative sisters, including theology,
                    spirituality, and human development.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3">Community Outreach</h3>
                  <p>
                    Support for vulnerable populations in the communities surrounding our monasteries,
                    including food security programs and educational assistance.
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3">Vocational Discernment</h3>
                  <p>
                    Support for women discerning a call to contemplative religious life through
                    retreats and spiritual direction.
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <button className="btn">Learn More About Our Initiatives</button>
              </div>
            </div>
          </AnimWrapper>
        </div>
      </section>
    </div>
  );
}

export default memo(Work);