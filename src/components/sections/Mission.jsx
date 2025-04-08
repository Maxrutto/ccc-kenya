import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';

export default function Mission() {
    return (
        <section className="py-16" id="mission">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <FaHandshake className="text-6xl text-primary mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
                        Our Mission
                    </h2>
                    <p className="text-xl md:text-2xl italic">
                        "To foster communion and collaboration among nuns in Anglophone Africa"
                    </p>
                </motion.div>
            </div>
        </section>
    );
}