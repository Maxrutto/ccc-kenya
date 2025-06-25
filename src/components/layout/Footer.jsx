import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    // Function to handle section navigation
    const handleSectionNavigation = (e, sectionId) => {
        // If already on homepage, use smooth scrolling
        if (location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Otherwise let the router and ScrollToTop handle it
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle newsletter subscription
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validate email
        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            // Check if already subscribed (using localStorage)
            const subscribers = JSON.parse(localStorage.getItem('ccck_newsletter_subscribers') || '[]');
            
            if (subscribers.includes(email.toLowerCase())) {
                setError('This email is already subscribed');
                setIsSubmitting(false);
                return;
            }

            // Simulate API call delay for better UX
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Add to localStorage (simulating backend storage)
            subscribers.push(email.toLowerCase());
            localStorage.setItem('ccck_newsletter_subscribers', JSON.stringify(subscribers));

            // Show success state
            setIsSubscribed(true);
            setEmail('');

            // Reset success state after 3 seconds
            setTimeout(() => {
                setIsSubscribed(false);
            }, 3000);

        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Newsletter subscription error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-gray-100 pt-12 pb-6 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Organization Info */}
                    <div>
                        <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold mb-4 text-blue-600">
                            <span className="text-blue-700">C</span>
                            <span className="text-blue-600">C</span>
                            <span className="text-blue-500">C</span>
                            <span className="text-blue-400">K</span>
                            <span className="font-cursive ml-1 text-xl sm:text-2xl font-bold text-blue-700 italic">Nuns</span>
                        </h3>
                        <div className="flex items-start mb-3">
                            <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                            <p className="font-['Montserrat'] text-gray-700 text-sm sm:text-base">1244-00502- KAREN, Nairobi, Kenya</p>
                        </div>
                        <div className="flex items-center mb-3">
                            <FaPhone className="text-blue-600 mr-3 flex-shrink-0" />
                            <p className="font-['Montserrat'] text-gray-700 text-sm sm:text-base">0757537700</p>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="text-blue-600 mr-3 flex-shrink-0" />
                            <p className="font-['Montserrat'] text-gray-700 text-sm sm:text-base">ccckmonasteries@gmail.com</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4 text-blue-600">Quick Links</h3>
                        <ul className="space-y-2 font-['Montserrat']">
                            <li>
                                <Link 
                                    to="/#about" 
                                    className="text-gray-700 hover:text-blue-500 transition-all"
                                    onClick={(e) => handleSectionNavigation(e, 'about')}
                                >
                                    About Us
                                </Link>
                            </li>
                            <li><Link to="/monasteries" className="text-gray-700 hover:text-blue-500 transition-all">Member Monasteries</Link></li>
                            <li><Link to="/work" className="text-gray-700 hover:text-blue-500 transition-all">What We Do</Link></li>
                            <li><Link to="/blog" className="text-gray-700 hover:text-blue-500 transition-all">Contemplative Voices</Link></li>
                            <li><Link to="/contact" className="text-gray-700 hover:text-blue-500 transition-all">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4 text-blue-600">Resources</h3>
                        <ul className="space-y-2 font-['Montserrat']">
                            <li><Link to="/news" className="text-gray-700 hover:text-blue-500 transition-all">News & Events</Link></li>
                            <li><Link to="/annual-meetings" className="text-gray-700 hover:text-blue-500 transition-all">Annual Meetings</Link></li>
                            <li><Link to="/blog" className="text-gray-700 hover:text-blue-500 transition-all">Contemplative Voices</Link></li>
                            <li>
                                <Link 
                                    to="/#mission" 
                                    className="text-gray-700 hover:text-blue-500 transition-all"
                                    onClick={(e) => handleSectionNavigation(e, 'mission')}
                                >
                                    Our Mission
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/#vision" 
                                    className="text-gray-700 hover:text-blue-500 transition-all"
                                    onClick={(e) => handleSectionNavigation(e, 'vision')}
                                >
                                    Our Vision
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4 text-blue-600">Connect With Us</h3>
                        <div className="flex space-x-4 text-2xl">
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-all" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-all" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-all" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                        </div>
                        <div className="mt-6">
                            <h4 className="font-['Montserrat'] font-semibold mb-2 text-gray-700">Newsletter</h4>
                            
                            {/* Success notification */}
                            {isSubscribed && (
                                <div className="mb-3 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center">
                                    <FaCheck className="text-green-600 mr-2" />
                                    <span className="text-green-800 font-['Montserrat'] text-sm font-medium">
                                        Subscribed! Thank you for joining our newsletter.
                                    </span>
                                </div>
                            )}

                            {/* Error message */}
                            {error && (
                                <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm font-['Montserrat']">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                <div className="flex">
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email"
                                        disabled={isSubmitting || isSubscribed}
                                        className={`flex-1 py-2 px-3 border rounded-l focus:outline-none focus:border-blue-500 font-['Montserrat'] text-sm transition-all ${
                                            error ? 'border-red-300' : 'border-gray-300'
                                        } ${isSubmitting || isSubscribed ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                                    />
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting || isSubscribed}
                                        className={`py-2 px-4 rounded-r transition-all font-['Montserrat'] text-sm font-medium ${
                                            isSubmitting || isSubscribed 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        } text-white`}
                                    >
                                        {isSubmitting ? 'Subscribing...' : isSubscribed ? 'Subscribed!' : 'Subscribe'}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 font-['Montserrat']">
                                    Stay updated with our latest news and events
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-10 pt-6 text-center">
                    <p className="font-['Montserrat'] text-gray-600 text-sm">&copy; {currentYear} Conference of Contemplative Communities of Kenya. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}