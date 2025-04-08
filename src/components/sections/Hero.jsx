import { motion } from 'framer-motion';
import ImageSlider from '../UI/ImageSlider';

// Use actual images from assets
const images = [
    { url: '/src/assets/images/image1.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image2.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image3.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image4.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image5.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image6.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image7.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image8.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image9.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image10.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image11.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image12.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image13.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image14.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image15.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image16.jpeg', alt: 'CCC Kenya' },
    { url: '/src/assets/images/image17.jpeg', alt: 'CCC Kenya' },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    {/* Actual logo */}
                    <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                        <img 
                            src="/src/assets/images/logo.jpeg" 
                            alt="CCC Kenya Logo" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-secondary">
                        Conference of Contemplative Communities of Kenya
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600">
                        Nurturing faith through contemplation and community
                    </p>
                </motion.div>
                
                <div className="mt-8">
                    <ImageSlider images={images} />
                </div>
            </div>
        </section>
    );
}