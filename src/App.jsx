import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/UI/Loader';
import ScrollToTop from './components/UI/ScrollToTop';

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

// Import Contact component directly to avoid lazy loading issues
import Contact from './pages/Contact';

// Advanced lazy loading with preloading
const createLazyComponent = (importFunc, options = {}) => {
  // Start preloading in background for critical components
  if (options.preload) {
    const preloadPromise = importFunc();
  }
  
  return lazy(() => {
    // Create a promise that resolves with the imported module
    return new Promise((resolve) => {
      // Immediately start the import
      importFunc().then(module => {
        // Add a small delay before resolving to ensure rendering
        setTimeout(() => {
          resolve(module);
        }, 10);
      }).catch(error => {
        console.error("Error loading module:", error);
        // Still resolve with the module even if there was an error to avoid blank screen
        importFunc().then(resolve);
      });
    });
  });
};

// Lazy loaded pages with enhanced loading
const Home = createLazyComponent(() => import('./pages/Home'));
const Monasteries = createLazyComponent(() => import('./pages/Monasteries'));
const Work = createLazyComponent(() => import('./pages/Work'));
const News = createLazyComponent(() => import('./pages/News'));
const AnnualMeetings = createLazyComponent(() => import('./pages/AnnualMeetings'));
const Partners = createLazyComponent(() => import('./pages/Partners'), { preload: true });
const Blog = createLazyComponent(() => import('./pages/Blog'));
const NotFound = createLazyComponent(() => import('./pages/NotFound'));

// Improved loading fallback component
const PageLoadingFallback = () => {
  // Ensure the loader is visible
  useEffect(() => {
    document.body.classList.add('loading-page');
    return () => {
      document.body.classList.remove('loading-page');
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
      <div className="text-center">
        <Loader />
        <p className="mt-4 text-gray-600 animate-pulse">Loading content...</p>
      </div>
    </div>
  );
};

function App() {
  // Detect if we're on a mobile device 
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Mark as loaded after component mounts
    setIsLoaded(true);
    
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add special CSS to the document to ensure visibility
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .loading-page #root, .loading-page body {
        min-height: 100vh !important;
        display: flex !important;
        flex-direction: column !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col relative">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <LazyLoadErrorBoundary>
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* Use About, Mission, Vision components directly in Home page instead of separate routes */}
                <Route path="/monasteries" element={<Monasteries />} />
                <Route path="/work" element={<Work />} />
                <Route path="/news" element={<News />} />
                <Route path="/annual-meetings" element={<AnnualMeetings />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/blog" element={<Blog />} />
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