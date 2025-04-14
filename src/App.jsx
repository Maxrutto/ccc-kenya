import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/UI/Loader';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./components/sections/About'));
const Mission = lazy(() => import('./components/sections/Mission'));
const Vision = lazy(() => import('./components/sections/Vision'));
const Monasteries = lazy(() => import('./pages/Monasteries'));
const Work = lazy(() => import('./pages/Work'));
const News = lazy(() => import('./pages/News'));
const AnnualMeetings = lazy(() => import('./pages/AnnualMeetings'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <main className="min-h-screen overflow-x-hidden">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/monasteries" element={<Monasteries />} />
              <Route path="/work" element={<Work />} />
              <Route path="/news" element={<News />} />
              <Route path="/annual-meetings" element={<AnnualMeetings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;