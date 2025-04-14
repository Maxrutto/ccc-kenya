import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

export default function Vision() {
    return (
        <section className="py-16 mt-8 bg-light-gray" id="vision">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <FaLightbulb className="text-6xl text-blue-600 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 text-blue-600">
                        Our Vision
                    </h2>
                    <p className="text-xl md:text-2xl italic">
                        "We strive to ensure that the contemplative Sisters have access to solid, 
                        appropriate and updated theological and human formation which enables them 
                        to effectively give a united witness to the Church's prayerful face in Africa"
                    </p>
                </motion.div>
            </div>
        </section>
    );
}