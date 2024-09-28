import React, { useState } from "react";
import { AiFillShop } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for the mobile menu toggle

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Side: Brand */}
                <div className="text-lg font-bold flex items-center">
                    <AiFillShop className="mr-2 tracking-wide" />
                    DailyNeeds
                </div>

                {/* Right Side: Menu for Desktop */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <a href="/" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/category" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Category
                        </a>
                    </li>
                    <li>
                        <a href="/register" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Register
                        </a>
                    </li>
                    <li>
                        <a href="/login" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Login
                        </a>
                    </li>
                    <li>
                        <a href="/cart" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Cart (0)
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col items-center space-y-4 mt-4">
                    <li>
                        <a href="/" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/category" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Category
                        </a>
                    </li>
                    <li>
                        <a href="/register" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Register
                        </a>
                    </li>
                    <li>
                        <a href="/login" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Login
                        </a>
                    </li>
                    <li>
                        <a href="/cart" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Cart (0)
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
