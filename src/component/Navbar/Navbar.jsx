

import { Link } from 'react-router-dom';
import navberIcon from '../img/login_icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserTie } from "react-icons/fa";
import { useState } from 'react';
import { logout } from '../../Redux/authSlice';
// import { logout } from '../redux/authSlice'; 

const Navbar = () => {
    const isAuthenticated = localStorage.getItem('access_token');
    // const isAuthenticated = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Remove token from localStorage
        dispatch(logout()); // Dispatch logout action to clear Redux state
        closeModal(); // Close the modal
    };

    return (
        <div className="fixed top-8 left-0 right-0 z-50 w-full">
            <div className="roboto flex justify-between items-center md:max-w-[185vh] mx-auto py-3 px-4">
                {/* Logo */}
                <div className="flex gap-4 items-center">
                    <img src={navberIcon} alt="Logo" className="h-10 w-auto" />
                    <span className="md:text-[24px] text-sm font-bold font-roboto text-[#FFFFFF]">
                        ShipMate Ai
                    </span>
                </div>

                {/* Conditional Buttons */}
                <div className="relative flex items-center">
                    {isAuthenticated ? (
                        <>
                            <FaUserTie
                                className="text-[40px] text-gray-800 cursor-pointer"
                                onClick={toggleModal}
                            />
                            {isModalOpen && (
                                <div className="absolute top-14 right-0 rounded-xl shadow-lg z-40">
                                    <Link to="/dashboard" onClick={closeModal}>
                                        <button className="w-full text-white bg-[#0A3161] md:text-xl text-sm font-medium py-2 px-4 rounded-xl cursor-pointer mb-2">
                                            Dashboard
                                        </button>
                                    </Link>
                                    <Link to="/login" onClick={handleLogout}>
                                        <button className="w-full text-white bg-[#0A3161] md:text-xl text-sm font-medium py-2 px-4 rounded-xl cursor-pointer">
                                            Log out
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="text-white bg-[#0A3161] md:text-xl text-sm font-medium py-2 px-4 rounded-xl cursor-pointer">
                                    Log In
                                </button>
                            </Link>
                            <Link to="/registration">
                                <button className="text-[#0A3161] border border-[#0A3161] md:text-xl text-sm font-medium py-2 px-4 rounded-xl cursor-pointer">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;