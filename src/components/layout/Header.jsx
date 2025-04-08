import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Monasteries', path: '/monasteries' },
        { name: 'Work', path: '/work' },
        { name: 'News', path: '/news' },
        { name: 'Contact', path: '/contact' },
    ];

    const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`;

    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img 
                        src="/src/assets/images/logo.jpeg" 
                        alt="CCC Kenya Logo" 
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <span className={`ml-2 font-bold text-lg md:text-xl ${isScrolled ? 'text-secondary' : 'text-white'}`}>
                        CCC Kenya
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link 
                                    to={link.path}
                                    className={`font-medium transition-colors hover:text-secondary ${
                                        isScrolled ? 'text-dark-gray' : 'text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? 
                        <FiX className={isScrolled ? 'text-dark-gray' : 'text-white'} /> : 
                        <FiMenu className={isScrolled ? 'text-dark-gray' : 'text-white'} />
                    }
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white shadow-lg"
                    >
                        <ul className="flex flex-col px-4 py-2">
                            {navLinks.map((link) => (
                                <li key={link.name} className="py-2 border-b border-gray-100 last:border-0">
                                    <Link 
                                        to={link.path}
                                        className="block font-medium text-dark-gray hover:text-secondary"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}