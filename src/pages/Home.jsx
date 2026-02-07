import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import Testimonials from '../components/Testimonials';
import AuthPage from '../components/AuthPage';

import luxuryVilla1 from '../assets/images/luxury-villa-1.jpg';
import luxuryVilla2 from '../assets/images/luxury-villa-2.jpg';
import luxuryVilla3 from '../assets/images/luxury-villa-3.jpg';
import luxuryVilla4 from '../assets/images/luxury-villa-4.jpg';
import luxuryVilla5 from '../assets/images/luxury-villa-5.jpg';
import urbanLuxe from '../assets/images/urban-luxe.jpg';
import golfCourse from '../assets/images/golf-course.jpg';
import ranch from '../assets/images/ranch.jpg';

const SectionHeader = ({ title }) => (
    <div className="flex items-end justify-between mb-8">
        <div>
            <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-luxury-charcoal mb-2">{title}</h2>
            <div className="h-1 w-16 bg-luxury-gold" />
        </div>
        <button className="text-sm font-medium uppercase tracking-widest text-luxury-gold hover:text-luxury-charcoal transition-colors">
            View All
        </button>
    </div>
);

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleNewListed, setVisibleNewListed] = useState(8);
    const [visibleNearby, setVisibleNearby] = useState(8);

    const propertyImages = [luxuryVilla1, luxuryVilla2, luxuryVilla3, luxuryVilla4, luxuryVilla5];

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Fetch properties from Supabase
                const { data, error } = await import('../lib/supabaseClient').then(module =>
                    module.supabase.from('properties').select('*').order('created_at', { ascending: false })
                );

                if (error) {
                    console.error('Error fetching properties:', error);
                    return;
                }

                if (data) {
                    // Map DB fields to UI fields
                    const mapped = data.map(p => ({
                        id: p.id,
                        title: p.property_name,
                        price: `$${p.price.toLocaleString()}`,
                        location: p.location,
                        beds: p.bedrooms,
                        baths: p.bathrooms,
                        sqft: p.area_sqft,
                        image: (p.images && p.images.length > 0) ? p.images[0] : propertyImages[0], // Fallback
                        featured: p.status.toLowerCase() === 'available',
                        type: p.property_type,
                        description: p.description
                    }));
                    setProperties(mapped);
                }
            } catch (err) {
                console.error('Unexpected error fetching properties:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Derived lists logic: Split 50/50 or just duplicate if not enough? 
    // We expect 40 properties, so 20/20 works.
    const newListed = properties.slice(0, Math.ceil(properties.length / 2));
    const nearbyProperties = properties.slice(Math.ceil(properties.length / 2), properties.length);

    const lifestyleTypes = [
        { name: 'Waterfront', count: 128, image: luxuryVilla2 },
        { name: 'Mountain View', count: 64, image: luxuryVilla1 },
        { name: 'Urban Luxe', count: 256, image: urbanLuxe },
        { name: 'Eco-Friendly', count: 42, image: luxuryVilla3 },
        { name: 'Historic', count: 18, image: luxuryVilla5 },
        { name: 'Minimalist', count: 95, image: luxuryVilla4 },
        { name: 'Golf Course', count: 33, image: golfCourse },
        { name: 'Ranch', count: 12, image: ranch },
    ];


    return (
        <div className="bg-luxury-cream min-h-screen selection:bg-luxury-gold selection:text-white pb-0">
            <Navbar variant="transparent" enableIntro={true} />
            <Hero />

            {/* Main Content Area */}
            <main className="max-w-[1600px] mx-auto px-4 md:px-8 pb-24 relative z-10 w-full">
                {/* Horizontal Search Bar - Overlapping Hero/Content */}
                <SearchBar />

                <div className="space-y-20 mt-16 text-luxury-charcoal">
                    {/* SECTION 1: New Listed */}
                    <section id="featured-listings">
                        <SectionHeader title="Newly Listed" />
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                            {newListed.slice(0, visibleNewListed).map((property, index) => (
                                <PropertyCard key={property.id} property={property} index={index} />
                            ))}
                        </div>
                        {visibleNewListed < newListed.length && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={() => setVisibleNewListed(prev => Math.min(prev + 8, newListed.length))}
                                    className="px-8 py-3 bg-white border border-luxury-gold text-luxury-charcoal font-medium uppercase tracking-wider hover:bg-luxury-gold hover:text-white transition-all duration-300 shadow-sm"
                                >
                                    View More Properties
                                </button>
                            </div>
                        )}
                    </section>

                    {/* SECTION 2: Nearby */}
                    <section>
                        <SectionHeader title="Properties Nearby" />
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                            {nearbyProperties.slice(0, visibleNearby).map((property, index) => (
                                <PropertyCard key={property.id} property={property} index={index} />
                            ))}
                        </div>
                        {visibleNearby < nearbyProperties.length && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={() => setVisibleNearby(prev => Math.min(prev + 8, nearbyProperties.length))}
                                    className="px-8 py-3 bg-white border border-luxury-gold text-luxury-charcoal font-medium uppercase tracking-wider hover:bg-luxury-gold hover:text-white transition-all duration-300 shadow-sm"
                                >
                                    View More Nearby
                                </button>
                            </div>
                        )}
                    </section>

                    {/* SECTION 3: Browse by Type */}
                    <section>
                        <SectionHeader title="Browse by Lifestyle" />
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {lifestyleTypes.map((type, index) => (
                                <motion.div
                                    key={index}
                                    className="relative group cursor-pointer overflow-hidden rounded-xl h-48 md:h-64 shadow-md"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="absolute inset-0">
                                        <img
                                            src={type.image}
                                            alt={type.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="font-serif text-xl font-medium mb-1">{type.name}</h3>
                                        <p className="font-sans text-xs opacity-80 uppercase tracking-wider">{type.count} Listings</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Bottom CTA Section */}
            <section className="py-32 bg-[#0F172A] relative overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={luxuryVilla2}
                        alt="Luxury Home"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-[#0F172A]/60" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="font-display font-medium text-4xl md:text-5xl text-white mb-6 tracking-wide">
                        Ready to Find Your Dream Home?
                    </h2>
                    <p className="font-sans text-gray-300 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join our exclusive network of homeowners and investors. Let our expert agents guide you to your perfect property.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => {
                                const element = document.getElementById('featured-listings');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-10 py-4 bg-luxury-gold text-luxury-charcoal font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 min-w-[200px]"
                        >
                            Browse Listings
                        </button>
                        <a
                            href="mailto:concierge@urbanplot.com"
                            className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-luxury-charcoal transition-all duration-300 min-w-[200px]"
                        >
                            Contact Agent
                        </a>
                    </div>
                </div>
            </section>

            <Testimonials />
            <Footer />

            {/* Auth Modal Removed in favor of dedicated pages */}
        </div>
    );
}

