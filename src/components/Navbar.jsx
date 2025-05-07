import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();

    const [scrollYes, setScrollYes] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrollYes(true);
            } else {
                setScrollYes(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/book-catalog', label: 'Book Catalog' },
        { to: '/about-us', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <nav className={`sticky top-0 z-50 ${scrollYes ? 'bg-white shadow-md' : 'bg-transparent'} transition-all duration-100`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        <FaBookOpen className="h-6 w-6" />
                        <span className="text-xl font-bold tracking-tight">BookVista</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(n => (
                            <NavLink to={n.to} key={n.label} currentPath={location.pathname}>
                                {n.label}
                            </NavLink>
                        ))}

                        {/* Cart and User Icons */}
                        <div className="flex items-center space-x-4 ml-4">
                            <button className="p-1 flex justify-center items-center rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </button>
                            <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center z-50">
                        {
                            isMobileMenuOpen ? (
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            ) : (
                                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                </button>
                            )
                        }
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-40 bg-white shadow-lg md:hidden transition-transform duration-300 ease-in-out h-screen flex items-center justify-center">
                        <div className="flex flex-col space-y-2 w-full items-center p-4 justify-center">
                            {navLinks.map(n => (
                                <NavLink to={n.to} key={n.label} currentPath={location.pathname} onClick={() => setIsMobileMenuOpen(false)}>
                                    {n.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

// Reusable NavLink component for active state styling
const NavLink = ({ to, currentPath, children }) => {
    const isActive = currentPath === to;
    return (
        <Link
            to={to}
            className={`px-1 py-2 text-lg font-medium border-b-2 transition-colors ${isActive
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-indigo-500 hover:border-indigo-300'
                }`}
        >
            {children}
        </Link>
    );
};

export default Navbar;