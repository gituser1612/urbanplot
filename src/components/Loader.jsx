import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Randomize increment for organic feel
                const increment = Math.random() * 2 + 0.5;
                return Math.min(prev + increment, 100);
            });
        }, 30); // ~3 seconds total roughly (100 / 1.5 * 40ms)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => {
                onComplete();
            }, 800); // Wait a bit at 100% before unmounting
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    // Circular Progress Params
    const radius = 40;
    const stroke = 2;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D] text-luxury-cream overflow-hidden"
            exit={{
                opacity: 0,
                y: -50,
                transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] }
            }}
        >
            {/* Circular Loader */}
            <div className="relative mb-12">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                >
                    <circle
                        stroke="rgba(245, 241, 232, 0.1)" // warm-cream with opacity
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#d4af37" // gold
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.1s linear' }}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
            </div>

            {/* Brand Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="font-serif text-3xl md:text-4xl tracking-[0.2em] font-bold text-luxury-warm-cream mb-4">
                    URBANPLOT
                </h1>
                <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-luxury-soft-taupe uppercase mb-8">
                    Loading Experience
                </p>
            </motion.div>

            {/* Linear Progress Bar */}
            <div className="w-64 h-[1px] bg-luxury-warm-cream/10 rounded-full overflow-hidden mb-6">
                <motion.div
                    className="h-full bg-luxury-gold"
                    style={{ width: `${progress}%` }}
                    transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
                />
            </div>

            {/* Percentage Text */}
            <div className="font-sans text-lg tracking-widest text-luxury-gold">
                {Math.round(progress)}%
            </div>

            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
            </div>
        </motion.div>
    );
}
