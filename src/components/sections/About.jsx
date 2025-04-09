import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-red-600">
            Our Sacred Journey
          </h2>
          
          <div className="prose-lg text-gray-700 space-y-6">
            <p>
              Founded in 2015 and officially recognized by the Holy See in 2017, 
              the Conference of Contemplative Communities of Kenya (CCCK) unites 
              monastic traditions across Africa in shared spiritual purpose.
            </p>

            <h3 className="text-2xl font-semibold text-red-600 mt-8">
              Why We Gather
            </h3>
            
            <p>
              Through collective prayer and mutual support, we amplify our 
              intercessory role for both Church members and those beyond our faith, 
              while preserving the unique charisms of each community.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}