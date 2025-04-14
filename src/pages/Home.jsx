import { lazy, Suspense } from 'react';
import Loader from '../components/UI/Loader';
import AnimWrapper from '../components/UI/AnimWrapper';

const Hero = lazy(() => import('../components/sections/Hero'));
const History = lazy(() => import('../components/sections/History'));
const About = lazy(() => import('../components/sections/About'));
const Mission = lazy(() => import('../components/sections/Mission'));
const Vision = lazy(() => import('../components/sections/Vision'));

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen gap-y-8 overflow-x-hidden w-full">
            <Suspense fallback={<Loader />}>
                <Hero />
                <div className="flex-1 flex flex-col gap-y-8">
                    <History />
                    <About />
                    <Mission />
                    <Vision />
                    {/* Additional sections will be added here */}
                </div>
            </Suspense>
        </div>
    );
}