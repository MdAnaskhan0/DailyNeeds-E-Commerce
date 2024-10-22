import React, { useState } from "react";
import { AiFillShop } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useAuth();

    const toggleDropdown = () => setIsOpen(!isOpen);

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
                    <NavLink to="/" className="text-lg font-bold flex items-center"><AiFillShop className="mr-2 tracking-wide" />DailyNeeds</NavLink>
                </div>

                {/* Right Side: Menu for Desktop */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <NavLink to="/" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/category" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Category
                        </NavLink>
                    </li>
                    {
                        !auth.user ? (
                            <>
                                <li>
                                    <NavLink to="/register" className="text-gray-600 text-lg font-semibold hover:text-black">
                                        Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login" className="text-gray-600 text-lg font-semibold hover:text-black">
                                        Login
                                    </NavLink>
                                </li>
                            </>) : (
                            <>
                                <div className="relative inline-block text-left">
                                    {/* Dropdown Button */}
                                    <button
                                        id="dropdownDefaultButton"
                                        onClick={toggleDropdown}
                                        className="text-gray-600 text-lg font-semibold hover:text-black focus:outline-none"
                                    >
                                        Menu ▼
                                    </button>

                                    {/* Dropdown Content */}
                                    {isOpen && (
                                        <ul
                                            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                                            aria-labelledby="dropdownDefaultButton"
                                        >
                                            <li>
                                                <NavLink
                                                    to="/dashboard"
                                                    className="block px-4 py-2 text-gray-600 text-lg font-semibold hover:bg-gray-100"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/login"
                                                    onClick={() => {
                                                        handleLogOut();
                                                        setIsOpen(false);
                                                    }}
                                                    className="block px-4 py-2 text-gray-600 text-lg font-semibold hover:bg-gray-100"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </>)
                    }
                    <li>
                        <NavLink to="/cart" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Cart (0)
                        </NavLink>
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
                        <NavLink to="/" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/category" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Category
                        </NavLink>
                    </li>
                    {!auth.user ? (
                        <>
                            {/* Register--Login */}
                            <li>
                                <NavLink to="/register" className="text-gray-600 text-lg font-semibold hover:text-black">
                                    Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" className="text-gray-600 text-lg font-semibold hover:text-black">
                                    Login
                                </NavLink>
                            </li>
                        </>) : (
                        <>
                            <li>
                                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="text-gray-600 text-lg font-semibold hover:text-black">
                                    Dashboard
                                </NavLink>  
                            </li>

                            <li>
                                <NavLink to="/login" onClick={handleLogOut} className="text-gray-600 text-lg font-semibold hover:text-black">
                                    Logout
                                </NavLink>
                            </li>

                        </>)}


                    <li>
                        <NavLink to="/cart" className="text-gray-600 text-lg font-semibold hover:text-black">
                            Cart (0)
                        </NavLink>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
