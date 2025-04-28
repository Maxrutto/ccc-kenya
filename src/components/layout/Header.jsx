import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Mission', path: '/#mission' },
    { name: 'Vision', path: '/#vision' },
    { name: 'Monasteries', path: '/monasteries' },
    { name: 'Initiatives', path: '/work' },
    { name: 'News', path: '/news' },
    { name: 'Annual Meetings', path: '/annual-meetings' },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Handle navigation - updated to handle section navigation from any page
  const handleNavigation = (path, e) => {
    // First, close the mobile menu
    setIsMenuOpen(false);
    
    // Special case for hash links on the same page
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      
      // If we're already on the same page as the hash link
      if (location.pathname === route || (route === '/' && location.pathname === '/')) {
        e.preventDefault(); // Prevent default link behavior
        
        // Directly scroll to the section if we're on the same page
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Otherwise, let the router and ScrollToTop component handle it
      // The updated ScrollToTop will handle section navigation from other pages
    }
  };

  const [inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.1
  });

  // Check if a nav link is active
  const isActive = (path) => {
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      
      // Check if we're on the home page and the hash matches the current section
      if (location.pathname === '/' && location.hash === `#${hash}`) {
        return true;
      }
      
      // Otherwise, just highlight based on the route
      return location.pathname === route || (route === '/' && location.pathname === '/');
    }
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-[990] transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-sm py-2 shadow-md' : 'bg-transparent py-3 md:py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center">
          <Link to="/" className="z-50 flex items-center group">
            <div className="flex items-center">
              <span className="font-['Playfair_Display'] text-lg sm:text-xl md:text-2xl font-bold text-blue-600 tracking-wider transition-all duration-300 group-hover:text-blue-700">
                <span className="text-blue-700">C</span>
                <span className="text-blue-600">C</span>
                <span className="text-blue-500">C</span>
                <span className="text-blue-400">K</span>             
                <span className="font-cursive ml-1 text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 italic">Nuns</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm xl:text-base font-['Montserrat'] font-medium transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'text-blue-600 border-b-2 border-red-500' 
                    : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-red-400'
                }`}
                onClick={(e) => handleNavigation(link.path, e)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Placeholder for mobile menu button (actual button is rendered outside header) */}
          <div className="lg:hidden w-10 h-10 opacity-0"></div>
        </div>
      </motion.header>

      {/* Mobile Menu Button - Positioned absolutely outside the header */}
      <div className="fixed top-3 right-3 z-[999] lg:hidden">
        <button
          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md"
          onClick={toggleMenu}
          aria-label="Navigation Menu"
          aria-expanded={isMenuOpen}
        >
          <div className="w-10 h-10 flex items-center justify-center">
            {isMenuOpen ? (
              <FiX className="w-6 h-6 text-red-500" />
            ) : (
              <FiMenu className="w-6 h-6 text-blue-600" />
            )}
          </div>
        </button>
      </div>

      {/* Mobile Menu - Full-screen overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[998] lg:hidden overflow-auto">
          <div className="w-full h-full flex flex-col pt-20 px-6 pb-10">
            {navLinks.map((link, index) => (
              <div 
                key={link.path}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link
                  to={link.path}
                  className={`block py-4 text-xl font-['Montserrat'] font-medium border-b border-gray-100 relative ${
                    isActive(link.path) 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-500'
                  }`}
                  onClick={(e) => handleNavigation(link.path, e)}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Link>
              </div>
            ))}
            
            {/* Extra contact info for mobile menu */}
            <div 
              className="mt-8 border-t border-gray-200 pt-6 animate-fadeIn"
              style={{ animationDelay: `${navLinks.length * 50}ms` }}
            >
              <h3 className="text-lg font-medium text-blue-600 mb-4">Contact Us</h3>
              <p className="text-gray-700 mb-2">ccckmonasteries@gmail.com</p>
              <p className="text-gray-700">0757537700</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}