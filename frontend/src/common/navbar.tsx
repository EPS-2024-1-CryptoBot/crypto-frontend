import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logobot.png';

const Navbar = () => {
    const menuRef = useRef([] as any);
    const dropdownRef = useRef([] as any);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState([
        {
            id: 1,
            name: 'Ailton',
            email: 'ailton@gmail.com',
        },
    ]);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleClickOutside = (event:any) => {
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            !event.target.closest('button') && !event.target.closest('.dropdown')
        ) {
            setIsMenuOpen(false);
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-secondary p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="w-8 h-8 rounded-full mr-2" />
                <span className="text-white text-lg lg:text-xl">CryptoBot</span>
            </div>

            <div className="lg:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <span className="material-icons">Menu</span>
                </button>
            </div>

            <div
                ref={menuRef}
                className={`absolute top-14 right-0 bg-secondary rounded shadow-lg max-lg:p-5 lg:static lg:bg-transparent lg:shadow-none lg:rounded-none lg:p-0 ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:space-x-4 max-lg:mr-1 max-lg:shadow-[20px_25px_90px_10px_rgba(1,1,1,0.8)]`}
            >
                <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0">
                    {user.length ? (
                        <li className="lg:hidden">
                            <div
                                className="flex lg:justify-end cursor-pointer items-center space-x-2"
                                onClick={toggleDropdown}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="avatar"
                                    className="w-7 h-7 rounded-full"
                                />
                                <span className="text-white">{user[0].name}</span>
                            </div>
                            {isDropdownOpen && (
                                <div className="text-white dropdown bg-secondary rounded lg:shadow-[20px_25px_90px_10px_rgba(1,1,1,0.8)]">
                                    <Link to="/profile" className="block px-4 py-2">Profile</Link>
                                    <Link to="/settings" className="block px-4 py-2">Settings</Link>
                                    <Link to="/help" className="block px-4 py-2">Help</Link>
                                    <Link to="/logout" className="block px-4 py-2">Logout</Link>
                                </div>
                            )}
                        </li>
                    ) : (
                        <Link to="/login" className="text-white hover:underline">Login</Link>
                    )}
                    <li>
                        <Link to="/" className="text-white hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link to="/wallet" className="text-white hover:underline">Carteira</Link>
                    </li>
                    <li>
                        <Link to="/extract" className="text-white hover:underline">Extrato</Link>
                    </li>
                    <li>
                        <Link to="/exchange" className="text-white hover:underline">Cotação</Link>
                    </li>
                    <li>
                        <Link to="/crypto_bot" className="text-white hover:underline">Crypto Bot</Link>
                    </li>
                    <li>
                        <Link to="/traders" className="text-white hover:underline">Traders</Link>
                    </li>
                    <li>
                        <Link to="/news" className="text-white hover:underline">Notícias</Link>
                    </li>
                    {user.length ? (
                        <li className="max-lg:hidden" ref={dropdownRef} onClick={toggleDropdown}>
                            <div className="flex lg:justify-end cursor-pointer items-center space-x-2">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="avatar"
                                    className="w-7 h-7 rounded-full"
                                />
                            </div>
                            {isDropdownOpen && (
                                <div className="text-white dropdown bg-secondary rounded lg:shadow-[20px_25px_90px_10px_rgba(1,1,1,0.8)] absolute right-1 mt-2 py-2">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</Link>
                                    <Link to="/help" className="block px-4 py-2 hover:bg-gray-200">Help</Link>
                                    <Link to="/logout" className="block px-4 py-2 hover:bg-gray-200">Logout</Link>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li className="max-lg:hidden">
                            <Link to="/login" className="text-white hover:underline">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
