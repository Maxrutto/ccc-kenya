import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import History from '../components/sections/History';
import About from '../components/sections/About';
import Mission from '../components/sections/Mission';
import Vision from '../components/sections/Vision';
import Loader from '../components/UI/Loader';

export default function Home() {
    const location = useLocation();
    
    // Handle scrolling to sections on load
    useEffect(() => {
        // Check if there's a hash in the URL when component mounts
        if (location.hash) {
            const targetId = location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Add a small delay to ensure the page is fully rendered
                setTimeout(() => {
                    // Smooth scroll to the target section
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);
    
    return (
        <div className="flex flex-col">
            <Hero />
            <div className="flex flex-col gap-y-8">
                <History />
                <About />
                <Mission />
                <Vision />
                {/* Additional sections will be added here */}
            </div>
        </div>
    );
}