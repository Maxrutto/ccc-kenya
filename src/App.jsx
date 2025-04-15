import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/UI/Loader';

// Custom ErrorBoundary for lazy-loaded components
const LazyLoadErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
        <p className="text-gray-700 mb-4">Please refresh the page and try again.</p>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return children;
};

// Pre-load the frequently accessed components/sections
// These are small components so we don't need to lazy load them
import About from './components/sections/About';
import Mission from './components/sections/Mission';
import Vision from './components/sections/Vision';

// Enhanced lazy loading with loading indicators and retry
const createLazyComponent = (factory, attemptsLeft = 3) => {
  return lazy(() => factory().catch(err => {
    if (attemptsLeft === 1) {
      console.error('Component failed to load after multiple attempts:', err);
      return Promise.reject(err);
    }
    return createLazyComponent(factory, attemptsLeft - 1)();
  }));
};

// Lazy loaded pages with retry mechanism
const Home = createLazyComponent(() => import('./pages/Home'));
const Monasteries = createLazyComponent(() => import('./pages/Monasteries'));
const Work = createLazyComponent(() => import('./pages/Work'));
const News = createLazyComponent(() => import('./pages/News'));
const AnnualMeetings = createLazyComponent(() => import('./pages/AnnualMeetings'));
const Contact = createLazyComponent(() => import('./pages/Contact'));
const NotFound = createLazyComponent(() => import('./pages/NotFound'));

// Loading fallback component with progressive enhancement
const PageLoadingFallback = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
    <div className="text-center">
      <Loader />
      <p className="mt-4 text-gray-600 animate-pulse">Loading content...</p>
    </div>
  </div>
);

function App() {
  // Detect if we're on a mobile device 
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-x-hidden relative">
        <Header />
        <main className="min-h-screen overflow-x-hidden w-full">
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* Use About, Mission, Vision components directly in Home page instead of separate routes */}
                <Route path="/monasteries" element={<Monasteries />} />
                <Route path="/work" element={<Work />} />
                <Route path="/news" element={<News />} />
                <Route path="/annual-meetings" element={<AnnualMeetings />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </LazyLoadErrorBoundary>
        </main>
        <Footer />
        
        {/* Mobile Navigation Button Overlay - ensures it's available at all scroll positions */}
        {isMobile && (
          <div className="fixed top-0 right-0 w-16 h-16 pointer-events-none z-[998]"></div>
        )}
      </div>
    </Router>
  );
}

export default App;