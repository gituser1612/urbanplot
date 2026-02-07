import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader2, Search, Filter, ChevronDown } from 'lucide-react';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            // Using Supabase Client directly for read-only public access as per Plan
            // But we can also use the edge function: supabase.functions.invoke('properties', { method: 'GET' })
            // Let's use the Edge Function as verified in the walkthrough

            const { data, error } = await supabase
                .from('properties')
                .select('*');

            if (error) throw error;

            // Transform data to match PropertyCard props if necessary
            // PropertyCard expects: { id, image, title, price, location, beds, baths, sqft }
            // DB has: { id, images, property_name, price, location, bedrooms, bathrooms, area_sqft }

            const formattedData = data.map(p => ({
                id: p.id,
                image: (p.images && p.images.length > 0) ? p.images[0] : 'https://images.unsplash.com/photo-1600596542815-60c37c65b567?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: p.property_name,
                price: `$${p.price.toLocaleString()}`,
                location: p.location,
                beds: p.bedrooms,
                baths: p.bathrooms,
                sqft: p.area_sqft,
                type: p.property_type
            }));

            setProperties(formattedData);
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredProperties = filterType === 'all'
        ? properties
        : properties.filter(p => p.type === filterType);

    return (
        <div className="bg-luxury-cream min-h-screen selection:bg-luxury-gold selection:text-white flex flex-col">
            <Navbar variant="solid" />

            <main className="flex-grow container mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-light text-luxury-charcoal mb-2 font-['Montserrat'] uppercase tracking-widest">Properties</h1>
                        <div className="h-px w-24 bg-luxury-gold mb-4" />
                        <p className="text-luxury-charcoal text-sm uppercase tracking-wider">Find your perfect home</p>
                    </div>

                    <div className="mt-4 md:mt-0 relative z-50">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-6 py-3 bg-white border border-luxury-gold text-luxury-charcoal uppercase text-xs tracking-widest font-bold min-w-[200px] justify-between hover:bg-luxury-cream transition-colors"
                        >
                            <span>{filterType === 'all' ? 'All Types' : filterType}</span>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-100 shadow-xl py-2 flex flex-col"
                                >
                                    {['all', 'Villa', 'Apartment', 'Penthouse', 'Estate', 'Townhouse'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                setFilterType(type);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`text-left px-6 py-3 text-xs uppercase tracking-widest font-medium transition-colors hover:bg-luxury-gold hover:text-white
                                                ${filterType === type ? 'bg-luxury-cream text-luxury-charcoal' : 'text-gray-500'}
                                            `}
                                        >
                                            {type === 'all' ? 'All Types' : type}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader2 className="w-10 h-10 text-luxury-gold animate-spin" />
                        <p className="mt-4 text-luxury-charcoal uppercase tracking-widest text-xs">Loading properties...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-500 mb-4">Error: {error}</p>
                        <button
                            onClick={fetchProperties}
                            className="px-8 py-3 bg-luxury-charcoal text-white uppercase tracking-widest text-xs font-bold hover:bg-black transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No properties found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {filteredProperties.map((property, index) => (
                                <PropertyCard key={property.id} property={property} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
