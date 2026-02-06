import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Heart, User, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useWishlist } from '../contexts/WishlistContext';

export default function Navbar({ onLoginClick, variant = 'transparent' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const { wishlist } = useWishlist();

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
        { name: 'Buy', href: '#' },
        { name: 'Rent', href: '#' },
        { name: 'Sell', href: '#' },
        { name: 'Featured', href: '#' },
        { name: 'Agents', href: '#' }
    ];

    const mobileLinks = [
        { name: 'Buy Properties', href: '#' },
        { name: 'Rentals', href: '#' },
        { name: 'Sell Your Home', href: '#' },
        { name: 'Our Agents', href: '#' },
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
                    <a
                        href="#"
                        className="group flex flex-col justify-center"
                    >
                        <span className={clsx(
                            "font-['Montserrat'] font-light tracking-[0.3em] uppercase text-xl transition-all duration-500 group-hover:text-[#d4a574] group-hover:tracking-[0.4em]",
                            isScrolled ? "text-[#F5F5F0]" : "text-[#F5F5F0]"
                        )}>
                            UrbanPlot
                        </span>
                    </a>
                </div>

                {/* CENTER: NAV LINKS (Desktop) */}
                <div className="hidden lg:flex items-center gap-14">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="relative text-[11px] uppercase tracking-[0.27em] text-[rgba(245,245,240,0.6)] hover:text-[#F5F5F0] transition-colors duration-400 font-light font-['Montserrat'] group py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d4a574] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left mt-2" style={{ top: 'calc(100% + 2px)' }} />
                        </a>
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

                    {/* User Icon (Desktop) */}
                    <button
                        onClick={onLoginClick}
                        className="hidden md:flex w-10 h-10 rounded-full items-center justify-center text-[rgba(245,245,240,0.6)] hover:text-[#d4a574] hover:bg-white/5 hover:border hover:border-[#d4a574]/30 hover:scale-105 active:scale-95 transition-all duration-350"
                        aria-label="Account"
                    >
                        <User strokeWidth={1.5} size={20} />
                    </button>

                    {/* List Property CTA (Desktop) */}
                    <button
                        className="hidden lg:block px-8 h-[44px] rounded-full bg-gradient-to-br from-[#d4a574] to-[#c9a869] text-[#0D0D0D] font-medium text-[11px] uppercase tracking-[2px] shadow-[0_6px_20px_rgba(212,165,116,0.25)] border border-[#d4a574]/40 hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(212,165,116,0.35)] active:translate-y-0 transition-all duration-400 group overflow-hidden relative"
                    >
                        <span className="relative z-10 group-hover:tracking-[2.5px] transition-all duration-400">List Property</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-[rgba(245,245,240,0.7)] hover:text-[#d4a574] transition-colors"
                    >
                        <Menu strokeWidth={1.5} size={24} />
                    </button>
                </div>
            </motion.nav>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] bg-[#0D0D0D]/98 backdrop-blur-[30px] flex flex-col justify-center items-center"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-[rgba(245,245,240,0.6)] hover:text-[#d4a574] hover:scale-110 transition-all duration-300"
                        >
                            <X strokeWidth={1.5} size={32} />
                        </button>

                        {/* Mobile Links */}
                        <nav className="flex flex-col items-center gap-10">
                            {mobileLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="font-serif text-[#F5F5F0] text-4xl font-light tracking-wider hover:text-[#d4a574] hover:scale-105 transition-all duration-300"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </nav>

                        {/* Divider */}
                        <motion.div
                            className="w-20 h-[1px] bg-[#F5F5F0]/15 my-12"
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />

                        {/* Secondary Links */}
                        <div className="flex flex-col items-center gap-6">
                            {['My Account', 'Favorites', 'Contact'].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href="#"
                                    className="font-sans text-[12px] uppercase tracking-[0.2em] text-[#F5F5F0]/50 hover:text-[#F5F5F0] transition-colors"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 + (i * 0.1) }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
