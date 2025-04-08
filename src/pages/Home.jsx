import { lazy, Suspense } from 'react';
import Loader from '../components/UI/Loader';
import AnimWrapper from '../components/UI/AnimWrapper';

const Hero = lazy(() => import('../components/sections/Hero'));
const About = lazy(() => import('../components/sections/About'));
const Mission = lazy(() => import('../components/sections/Mission'));
const Vision = lazy(() => import('../components/sections/Vision'));

export default function Home() {
    return (
        <div className="overflow-hidden">
            <Suspense fallback={<Loader />}>
                <Hero />
                <AnimWrapper>
                    <About />
                    <Mission />
                    <Vision />
                    {/* Additional sections will be added here */}
                </AnimWrapper>
            </Suspense>
        </div>
    );
}