import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';

export default function Mission() {
    return (
        <section className="py-10 sm:py-16 mt-6 sm:mt-8 w-full overflow-hidden" id="mission">
            <div className="container mx-auto px-2 sm:px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="flex justify-center items-center mb-4 sm:mb-6">
                        <div className="w-8 sm:w-12 h-1 bg-red-500 rounded mr-3 sm:mr-4"></div>
                        <FaHandshake className="text-3xl sm:text-5xl text-blue-600 mx-1 sm:mx-2" />
                        <div className="w-8 sm:w-12 h-1 bg-red-500 rounded ml-3 sm:ml-4"></div>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-4 sm:mb-6 text-blue-600">
                        Our <span className="text-red-600">Mission</span>
                    </h2>
                    <div className="relative inline-block">
                        <p className="text-base sm:text-xl md:text-2xl italic font-['Montserrat'] bg-blue-50 p-4 sm:p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                            "To foster communion and collaboration among nuns in Anglophone Africa"
                        </p>
                        <div className="absolute -top-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}