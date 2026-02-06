import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, MapPin } from 'lucide-react';

const CAROUSEL_PROPERTIES = [
    {
        id: 1,
        title: "Skyline Penthouse",
        location: "Manhattan, New York",
        price: "$8,950,000",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        specs: "4 Bed • 3 Bath • 4,200 sq ft"
    },
    {
        id: 2,
        title: "Ocean View Villa",
        location: "Malibu, California",
        price: "$12,500,000",
        image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2670&auto=format&fit=crop",
        specs: "5 Bed • 6 Bath • 6,500 sq ft"
    },
    {
        id: 3,
        title: "Alpine Retreat",
        location: "Aspen, Colorado",
        price: "$14,900,000",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2670&auto=format&fit=crop",
        specs: "6 Bed • 7 Bath • 8,100 sq ft"
    },
    {
        id: 4,
        title: "Modern Estate",
        location: "Beverly Hills",
        price: "$9,500,000",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
        specs: "4 Bed • 4.5 Bath • 5,200 sq ft"
    }
];

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0.5
    })
};

export default function Hero() {
    const [[page, direction], setPage] = useState([0, 0]);
    const [isPaused, setIsPaused] = useState(false);

    // We only have N slides, so we wrap the index
    const imageIndex = Math.abs(page % CAROUSEL_PROPERTIES.length);
    const property = CAROUSEL_PROPERTIES[imageIndex];

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            paginate(1);
        }, 6000);
        return () => clearInterval(interval);
    }, [isPaused, page]);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#0D0D0D] text-luxury-cream">

            {/* Background Ambient Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                {/* Radial Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
            </div>

            {/* Floating Geometric Elements (Subtle) */}
            <motion.div
                className="absolute top-[15%] left-[10%] w-32 h-32 border border-luxury-gold/5 rounded-full"
                animate={{ rotate: 360, y: [0, 40, 0] }}
                transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 20, repeat: Infinity, ease: "easeInOut" } }}
            />
            <motion.div
                className="absolute bottom-[20%] right-[15%] w-48 h-48 border border-luxury-gold/5 opacity-30 rotate-45"
                animate={{ rotate: [45, 90, 45], y: [0, -30, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Hero Overlay Content - Top */}
            <div className="absolute top-[120px] left-0 right-0 z-30 text-center px-4">
                <motion.h1
                    className="font-sans font-light text-4xl md:text-6xl text-luxury-cream tracking-[0.2em] uppercase drop-shadow-2xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                >
                    Discover Extraordinary Living
                </motion.h1>
                <motion.p
                    className="mt-4 font-sans font-light text-luxury-taupe text-sm md:text-lg tracking-[0.15em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                >
                    Curated luxury properties for the discerning few
                </motion.p>
            </div>

            {/* Main Feature: Centered Carousel */}
            <div
                className="absolute inset-0 flex items-center justify-center z-20"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="relative w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[1200px] aspect-[16/9] md:aspect-[2/1] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-luxury-glass">

                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.5 }
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Inner Gradient for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                            {/* Glassmorphic Info Card - Bottom Left */}
                            <motion.div
                                className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-[90%] md:max-w-[420px] p-6 md:p-8 rounded-xl border border-white/10 bg-[#0D0D0D]/60 backdrop-blur-xl shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <div className="flex items-start justify-between flex-col md:flex-row gap-4 md:gap-0">
                                    <div>
                                        <h3 className="font-serif text-2xl md:text-3xl text-luxury-cream font-light mb-1">{property.title}</h3>
                                        <div className="flex items-center text-luxury-taupe text-sm tracking-wider mb-4">
                                            <MapPin size={14} className="mr-2" />
                                            {property.location}
                                        </div>
                                        <div className="text-luxury-cream/70 text-xs uppercase tracking-widest border-t border-white/10 pt-3">
                                            {property.specs}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-serif text-2xl md:text-3xl text-luxury-gold">{property.price}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows (Inside Container) */}
                    <button
                        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-luxury-cream hover:bg-luxury-gold/20 hover:border-luxury-gold/40 hover:scale-110 transition-all duration-300 group"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:text-luxury-gold" />
                    </button>
                    <button
                        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-luxury-cream hover:bg-luxury-gold/20 hover:border-luxury-gold/40 hover:scale-110 transition-all duration-300 group"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight className="w-6 h-6 group-hover:text-luxury-gold" />
                    </button>
                </div>
            </div>

            {/* Pagination & Bottom CTAs */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center">

                {/* Pagination Dots */}
                <div className="flex space-x-3 mb-8">
                    {CAROUSEL_PROPERTIES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                const diff = idx - imageIndex;
                                setPage([page + diff, diff]);
                            }}
                            className={`transition-all duration-500 rounded-full border border-white/30 
                        ${idx === imageIndex ? 'w-8 bg-luxury-gold border-luxury-gold shadow-[0_0_10px_rgba(212,165,116,0.5)]' : 'w-2.5 bg-white/10 hover:bg-white/30'}
                        h-2.5
                    `}
                        />
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <motion.button
                        className="w-[200px] h-[54px] bg-gradient-to-br from-luxury-gold to-[#c9a869] rounded-full text-[#0D0D0D] font-sans font-medium uppercase text-sm tracking-[0.15em] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                    >
                        Explore Collection
                    </motion.button>

                    <motion.button
                        className="w-[180px] h-[54px] bg-transparent border border-white/30 rounded-full text-luxury-cream font-sans font-medium uppercase text-sm tracking-[0.15em] hover:bg-white/5 hover:border-luxury-gold hover:text-luxury-gold hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 }}
                    >
                        <Play size={12} fill="currentColor" />
                        Virtual Tours
                    </motion.button>
                </div>

            </div>

        </div>
    );
}
