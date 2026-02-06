import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        name: "Eleanor P.",
        role: "Architecture Critic",
        text: "UrbanPlot curated a collection that wasn't just housing, but art. I found a penthouse that speaks to my soul.",
        location: "New York",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "James Sterling",
        role: "Tech Entrepreneur",
        text: "Efficiency and elegance. The process was as seamless as the glass walls of my new Malibu estate.",
        location: "California",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Sophia V.",
        role: "Interior Designer",
        text: "I see potential in spaces, but UrbanPlot showed me perfection. The attention to detail is unmatched.",
        location: "London",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Michael Chen",
        role: "Investment Banker",
        text: "A truly premium experience. They understood that my time is as valuable as the property I was buying.",
        location: "Hong Kong",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Isabella R.",
        role: "Gallery Owner",
        text: "The aesthetics of the platform matched the quality of the homes. Finding my sanctuary was a joy.",
        location: "Paris",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    }
];

const TestimonialCard = ({ data }) => (
    <div className="w-[400px] bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-luxury-charcoal/5 flex-shrink-0 mx-4 group hover:border-luxury-gold/30 transition-colors duration-500">
        <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-luxury-gold text-luxury-gold" />
            ))}
        </div>

        <div className="mb-6 relative">
            <Quote className="absolute -top-2 -left-2 text-luxury-gold/20 w-8 h-8 transform -scale-x-100" />
            <p className="font-serif text-xl italic text-luxury-charcoal leading-relaxed relative z-10 pl-4">
                "{data.text}"
            </p>
        </div>

        <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
            <img src={data.image} alt={data.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div>
                <h4 className="font-sans font-bold text-sm text-luxury-charcoal">{data.name}</h4>
                <p className="font-sans text-xs text-luxury-charcoal/60">{data.role}, {data.location}</p>
            </div>
        </div>
    </div>
);

export default function Testimonials() {
    return (
        <section className="py-32 bg-luxury-cream overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 relative z-10">
                <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-luxury-charcoal mb-4 text-center">Client Stories</h2>
                <div className="h-1 w-20 bg-luxury-gold mx-auto" />
                <p className="mt-4 text-center text-luxury-charcoal/60 max-w-2xl mx-auto">
                    Join the exclusive circle of homeowners who found their perfect match with UrbanPlot.
                </p>
            </div>

            {/* Infinite Scroll Container */}
            <div className="flex overflow-hidden relative group/track">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-luxury-cream to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-luxury-cream to-transparent z-10" />

                <motion.div
                    className="flex"
                    animate={{
                        x: [0, -100 * TESTIMONIALS.length * 2] // Arbitrary large number to keep it moving, reset via loop logic usually better but CSS marquee easier for simple loop
                    }}
                    style={{
                        width: "max-content"
                    }}
                >
                    {/* 
                      Simpler framer motion marquee approach: 
                      Use CSS animation for infinite loop or Framer's built-in animate 
                   */}
                    <MarqueeContent />
                </motion.div>
            </div>
        </section>
    );
}

const MarqueeContent = () => {
    return (
        <div className="flex animate-marquee group-hover/track:pause-animation">
            {/* Double the list to create seamless loop */}
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
                <TestimonialCard key={`${item.id}-${idx}`} data={item} />
            ))}
        </div>
    );
};
