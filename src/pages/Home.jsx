import React from 'react';
import Hero from '../components/sections/Hero';
import History from '../components/sections/History';
import About from '../components/sections/About';
import Mission from '../components/sections/Mission';
import Vision from '../components/sections/Vision';
import Loader from '../components/UI/Loader';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen gap-y-8 overflow-x-hidden w-full">
            <Hero />
            <div className="flex-1 flex flex-col gap-y-8">
                <History />
                <div id="about">
                    <About />
                </div>
                <div id="mission">
                    <Mission />
                </div>
                <div id="vision">
                    <Vision />
                </div>
                {/* Additional sections will be added here */}
            </div>
        </div>
    );
}