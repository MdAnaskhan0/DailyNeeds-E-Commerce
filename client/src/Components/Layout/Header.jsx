import React, { useState } from "react";
import { AiFillShop } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut = () => {
        setAuth({
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };
    

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Side: Brand */}
                <div>
                    <Link to="/" className="text-lg font-bold flex items-center"><AiFillShop className="mr-2 tracking-wide" />DailyNeeds</Link>
                </div>

                {/* Right Side: Menu for Desktop */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link to="/" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/category" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Category
                        </Link>
                    </li>
                    {
                        !auth.user ? (
                            <>
                                <li>
                                    <Link to="/register" className="text-gray-600 text-lg font-semibold hover:text-black">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="text-gray-600 text-lg font-semibold hover:text-black">
                                        Login
                                    </Link>
                                </li>
                            </>) : (
                            <>
                                <li>
                                    <Link to="/login" onClick={handleLogOut} className="text-gray-600 text-lg font-semibold hover:text-black">
                                        Logout
                                    </Link>
                                </li>
                            </>)
                    }
                    <li>
                        <Link to="/cart" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Cart (0)
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="flex flex-col items-center space-y-4 mt-4 md:hidden">
                    <li>
                        <Link to="/" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/category" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Category
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Cart (0)
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
