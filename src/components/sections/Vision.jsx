import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

export default function Vision() {
    return (
        <section className="py-10 sm:py-16 mt-6 sm:mt-8 bg-light-gray w-full overflow-hidden" id="vision">
            <div className="container mx-auto px-2 sm:px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="inline-block p-3 sm:p-4 bg-blue-100 rounded-full mb-4 sm:mb-6 relative">
                        <FaLightbulb className="text-3xl sm:text-5xl text-blue-600 mx-auto" />
                        <span className="absolute top-0 right-0 h-2 w-2 sm:h-3 sm:w-3 bg-red-500 rounded-full animate-pulse"></span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 sm:mb-6 text-blue-600">
                        Our <span className="text-red-600">Vision</span>
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl italic font-['Montserrat'] leading-relaxed relative px-3 sm:px-0">
                        <span className="absolute -left-2 sm:-left-4 top-0 text-red-500 text-2xl sm:text-4xl font-serif">"</span>
                        We strive to ensure that the contemplative nuns have access to solid, 
                        appropriate and updated theological and human formation which enables them 
                        to effectively give a united witness to the Church's prayerful face in Africa
                        <span className="absolute -bottom-4 right-0 text-red-500 text-2xl sm:text-4xl font-serif">"</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}