import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Heart, User, Menu, X, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ variant = 'transparent' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const { wishlist } = useWishlist();
    const { user, signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Close mobile menu on resize > 768px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Buy', path: '/properties' },
        { name: 'Rent', path: '/properties' },
        { name: 'Sell', path: '/add-property' },
        { name: 'Featured', path: '/' },
        { name: 'Agents', path: '/contact' }
    ];

    const mobileLinks = [
        { name: 'Buy Properties', href: '/properties' },
        { name: 'Rentals', href: '/properties' },
        { name: 'Sell Your Home', href: '/add-property' },
        { name: 'Our Agents', href: '/contact' },
        { name: 'Journal', href: '#' }
    ];

    return (
        <>
            <motion.nav
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-between px-6 md:px-16",
                    (isScrolled || variant === 'dark' || variant === 'solid') ? "h-[72px] bg-[#0D0D0D]/85 backdrop-blur-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-b border-[#F5F5F0]/10" : "h-[88px] bg-transparent"
                )}
            >
                {/* LEFT: LOGO */}
                <div className="flex items-center z-50">
                    <Link
                        to="/"
                        className="group flex flex-col justify-center"
                    >
                        <span className={clsx(
                            "font-['Montserrat'] font-light tracking-[0.3em] uppercase text-xl transition-all duration-500 group-hover:text-[#d4a574] group-hover:tracking-[0.4em]",
                            isScrolled ? "text-[#F5F5F0]" : "text-[#F5F5F0]"
                        )}>
                            UrbanPlot
                        </span>
                    </Link>
                </div>

                {/* CENTER: NAV LINKS (Desktop) */}
                <div className="hidden lg:flex items-center gap-14">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="relative text-[11px] uppercase tracking-[0.27em] text-[rgba(245,245,240,0.6)] hover:text-[#F5F5F0] transition-colors duration-400 font-light font-['Montserrat'] group py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d4a574] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left mt-2" style={{ top: 'calc(100% + 2px)' }} />
                        </Link>
                    ))}
                </div>

                {/* RIGHT: ACTION BUTTONS */}
                <div className="flex items-center gap-6">
                    {/* Search Icon */}
                    <button
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[rgba(245,245,240,0.6)] hover:text-[#d4a574] hover:bg-white/5 hover:border hover:border-[#d4a574]/30 hover:scale-105 active:scale-95 transition-all duration-350"
                    >
                        <Search strokeWidth={1.5} size={20} />
                    </button>

                    {/* Heart Icon (Desktop) */}
                    <Link to="/wishlist" className="hidden md:flex relative group/wishlist">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[rgba(245,245,240,0.6)] hover:text-[#d4a574] hover:bg-white/5 hover:border hover:border-[#d4a574]/30 transition-all duration-350">
                            <Heart strokeWidth={1.5} size={20} />
                        </div>
                        {wishlist.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4a574] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0D0D0D]">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    {/* Auth UI */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="hidden md:flex w-10 h-10 rounded-full items-center justify-center text-[rgba(245,245,240,0.6)] hover:text-[#d4a574] hover:bg-white/5 hover:border hover:border-[#d4a574]/30 hover:scale-105 active:scale-95 transition-all duration-350"
                            title="Sign Out"
                        >
                            <LogOut strokeWidth={1.5} size={20} />
                        </button>
                    ) : (
                        <>
                            {/* Signup Link (Desktop) */}
                            <Link
                                to="/signup"
                                className="hidden md:flex items-center justify-center px-5 py-2 rounded-full border border-white/20 text-[#F5F5F0] hover:bg-[#d4a574] hover:border-[#d4a574] hover:text-[#0D0D0D] transition-all duration-300 text-xs uppercase tracking-widest font-medium mr-2"
                            >
                                Sign Up
                            </Link>

                            {/* User Icon (Desktop) */}
                            <Link
                                to="/login"
                                className="hidden md:flex w-10 h-10 rounded-full items-center justify-center text-[rgba(245,245,240,0.6)] hover:text-[#d4a574] hover:bg-white/5 hover:border hover:border-[#d4a574]/30 hover:scale-105 active:scale-95 transition-all duration-350"
                                aria-label="Account"
                            >
                                <User strokeWidth={1.5} size={20} />
                            </Link>
                        </>
                    )}



                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-[rgba(245,245,240,0.7)] hover:text-[#d4a574] transition-colors"
                    >
                        <Menu strokeWidth={1.5} size={24} />
                    </button>
                </div>
            </motion.nav>

            {/* MOBILE MENU DRAWER */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-[#0D0D0D] border-l border-[#F5F5F0]/10 shadow-2xl flex flex-col"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-8 border-b border-[#F5F5F0]/5">
                                <span className="font-['Montserrat'] font-light tracking-[0.2em] uppercase text-lg text-[#F5F5F0]">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center text-[rgba(245,245,240,0.6)] hover:text-[#d4a574] transition-colors rounded-full hover:bg-white/5"
                                >
                                    <X strokeWidth={1.5} size={24} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto py-8 px-8 flex flex-col justify-center">
                                <nav className="flex flex-col gap-6">
                                    {mobileLinks.map((link, i) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.href}
                                            className="font-serif text-3xl md:text-4xl text-[#F5F5F0] hover:text-[#d4a574] transition-colors flex items-center gap-4 group"
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 + (i * 0.05) }}
                                        >
                                            <span className="w-0 group-hover:w-8 h-[1px] bg-[#d4a574] transition-all duration-300" />
                                            {link.name}
                                        </motion.a>
                                    ))}
                                </nav>

                                <div className="w-full h-[1px] bg-[#F5F5F0]/10 my-10" />

                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                    {[
                                        ...(user ? [] : [
                                            { name: 'Login', href: '/login' },
                                            { name: 'Sign Up', href: '/signup' }
                                        ]),
                                        { name: 'Contact', href: '/contact' },
                                        { name: 'Properties', href: '/properties' }
                                    ].map((item, i) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="font-sans text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/50 hover:text-[#d4a574] transition-colors flex items-center gap-2"
                                        >
                                            <div className="w-1 h-1 rounded-full bg-[#d4a574]" />
                                            {item.name}
                                        </Link>
                                    ))}
                                    {user && (
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="font-sans text-xs uppercase tracking-[0.2em] text-[#F5F5F0]/50 hover:text-[#d4a574] transition-colors flex items-center gap-2 text-left"
                                        >
                                            <div className="w-1 h-1 rounded-full bg-[#d4a574]" />
                                            Log Out
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-8 border-t border-[#F5F5F0]/5">
                                <Link to="/add-property" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-4 border border-[#d4a574]/30 text-[#d4a574] font-sans text-xs uppercase tracking-[0.2em] hover:bg-[#d4a574] hover:text-[#0D0D0D] transition-all duration-300">
                                    List Your Property
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
