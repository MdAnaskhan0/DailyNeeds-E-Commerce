import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white py-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start">
                    {/* Left Div */}
                    <div className="w-full md:w-1/3 mb-4 text-left md:text-left order-1 text-center">
                        <p className="text-gray-600">© 2020 Your Company, Inc. All rights reserved.</p>
                    </div>

                    {/* Middle Div - Moves to bottom on mobile */}
                    <div className="w-full md:w-1/3 mb-4 text-center md:text-center order-3 md:order-2">
                        <ul className="flex justify-center space-x-4 text-gray-600">
                            <li><Link to="/about" className="text-gray-600 text-lg font-semibold hover:text-black">About</Link></li>
                            <li><Link to="/contact" className="text-gray-600 text-lg font-semibold hover:text-black">Contact</Link></li>
                            <li><Link to="/privacy-policy" className="text-gray-600 text-lg font-semibold hover:text-black">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Right Div */}
                    <div className="w-full md:w-1/3 mb-4 text-right md:text-right order-2 md:order-3">
                        <div className="flex justify-center md:justify-end space-x-6">
                            <Link to="#" className="text-gray-600 hover:text-gray-800"><FaFacebook /></Link>
                            <Link to="#" className="text-gray-600 hover:text-gray-800"><FaInstagram /></Link>
                            <Link to="#" className="text-gray-600 hover:text-gray-800"><FaTwitter /></Link>
                            <Link to="#" className="text-gray-600 hover:text-gray-800"><FaGithub /></Link>
                            <Link to="#" className="text-gray-600 hover:text-gray-800"><FaYoutube /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
