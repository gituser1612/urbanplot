import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
    {
        id: 1,
        image: "/assets/images/hero-view.jpg",
        title: "Skyline Perspectives",
        headline: "Turn Your Vision into Exclusive Reality",
        subtitle: "Experience urban living from a new vantage point."
    },
    {
        id: 2,
        image: "/assets/images/hero-main.jpg",
        title: "Architectural Masterpieces",
        headline: "Crafting Homes That Define Your Legacy",
        subtitle: "Homes designed to inspire and endure."
    },
    {
        id: 3,
        image: "/assets/images/hero-interior.jpg",
        title: "Refined Interiors",
        headline: "Curating Spaces of Timeless Elegance",
        subtitle: "Curated spaces for the modern connoisseur."
    },
    {
        id: 4,
        image: "/assets/images/hero-detail.jpg",
        title: "Exquisite Details",
        headline: "Elevating Life Through Exquisite Design",
        subtitle: "Luxury found in every corner and finish."
    }
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black text-white">

            {/* Background Carousel */}
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentIndex}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <img
                        src={SLIDES[currentIndex].image}
                        alt={SLIDES[currentIndex].title}
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
                </motion.div>
            </AnimatePresence>

            {/* Content Content (Centered) */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 md:px-12 text-center">

                <motion.div
                    key={`text-${currentIndex}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <p className="font-sans text-luxury-gold uppercase tracking-[0.2em] mb-4 text-sm md:text-base">
                        {SLIDES[currentIndex].title}
                    </p>
                    <h1 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl leading-tight mb-8 drop-shadow-2xl max-w-5xl mx-auto tracking-widest">
                        {SLIDES[currentIndex].headline}
                    </h1>
                    <p className="font-sans text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 drop-shadow-md">
                        {SLIDES[currentIndex].subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => {
                                const element = document.getElementById('featured-listings');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="h-14 px-10 rounded-full bg-luxury-gold text-luxury-charcoal font-bold tracking-widest text-sm uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-xl flex items-center gap-2"
                        >
                            Browse Properties
                            <ArrowRight size={16} />
                        </button>
                        <button className="h-14 px-10 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-white font-bold tracking-widest text-sm uppercase hover:bg-white hover:text-black transition-all duration-300">
                            Explore Gallery
                        </button>
                    </div>
                </motion.div>

            </div>

            {/* Mobile Navigation (Side Arrows) */}
            <div className="absolute inset-0 z-30 flex items-center justify-between px-4 pointer-events-none md:hidden">
                <button
                    onClick={prevSlide}
                    className="pointer-events-auto w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={nextSlide}
                    className="pointer-events-auto w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Desktop Navigation Controls (Bottom Bar) */}
            <div className="absolute bottom-8 md:bottom-12 inset-x-0 z-30 px-4 md:px-12 flex justify-center md:justify-between items-end">

                {/* Progress Indicators */}
                <div className="flex gap-4">
                    {SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 transition-all duration-500 rounded-full ${idx === currentIndex ? 'w-16 bg-luxury-gold' : 'w-8 bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Arrows (Desktop Only) */}
                <div className="hidden md:flex gap-4">
                    <button
                        onClick={prevSlide}
                        className="w-14 h-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-luxury-gold hover:border-luxury-gold hover:text-black transition-all duration-300 group"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-14 h-14 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-luxury-gold hover:border-luxury-gold hover:text-black transition-all duration-300 group"
                    >
                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

        </section>
    );
}
