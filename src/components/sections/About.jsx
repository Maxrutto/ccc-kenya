import { motion } from 'framer-motion';

export default function About() {
    return (
        <section className="py-16 bg-light-gray" id="about">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-secondary">
                        About Us
                    </h2>

                    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                        <p className="mb-6">
                            Founded on 22 Sept 2015, the conference of the contemplative communities of Kenya -CCCK, 
                            is an association of Nuns from different monastic traditions established in Kenya and 
                            other English speaking countries in Africa. It received it's juridicial status from the 
                            holy see on 26th October 2017.
                        </p>
                        
                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-secondary">
                            WHY DID WE COME TOGETHER?
                        </h3>
                        
                        <p>
                            With the encouragement and help of the Holy See, our monasteries chose to come together so that, 
                            by combined effort, we can truly live our primary common vocation as intercessors before God for 
                            the needs of member of the church, as well as those who are outside our Catholic faith. In this 
                            synodal journey, we are also able to help each other to achieve more fully the purpose of our 
                            respective religious institutes.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}