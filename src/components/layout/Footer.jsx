import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Organization Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-secondary">CCC Kenya</h3>
                        <div className="flex items-start mb-3">
                            <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                            <p>Conference of Contemplative Communities of Kenya, Nairobi, Kenya</p>
                        </div>
                        <div className="flex items-center mb-3">
                            <FaPhone className="text-primary mr-3" />
                            <p>+254 123 456 789</p>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="text-primary mr-3" />
                            <p>info@ccckenya.org</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-secondary">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/monasteries" className="hover:text-primary transition-colors">Member Monasteries</Link></li>
                            <li><Link to="/work" className="hover:text-primary transition-colors">What We Do</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-secondary">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link to="/news" className="hover:text-primary transition-colors">News & Events</Link></li>
                            <li><Link to="/initiatives" className="hover:text-primary transition-colors">Our Initiatives</Link></li>
                            <li><Link to="/partnerships" className="hover:text-primary transition-colors">Partnerships</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-secondary">Connect With Us</h3>
                        <div className="flex space-x-4 text-2xl">
                            <a href="#" className="text-primary hover:text-secondary transition-colors" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="#" className="text-primary hover:text-secondary transition-colors" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-primary hover:text-secondary transition-colors" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                        </div>
                        <div className="mt-6">
                            <h4 className="font-semibold mb-2">Newsletter</h4>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email"
                                    className="py-2 px-3 border border-gray-300 rounded-l focus:outline-none focus:border-primary"
                                />
                                <button className="bg-primary text-white py-2 px-4 rounded-r hover:bg-blue-700 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm">
                    <p>&copy; {currentYear} Conference of Contemplative Communities of Kenya. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}