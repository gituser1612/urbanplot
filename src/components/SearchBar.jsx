import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, ChevronDown } from 'lucide-react';

export default function SearchBar() {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('Property Type');

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 flex flex-col md:flex-row items-center gap-2 relative z-30 -mt-10 md:-mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            {/* Location Input */}
            <div className="flex-1 w-full md:w-auto relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-charcoal/40 group-focus-within:text-luxury-gold transition-colors">
                    <MapPin size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-transparent outline-none text-luxury-charcoal font-sans placeholder:text-gray-400"
                />
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden md:block w-[1px] h-10 bg-gray-100" />

            {/* Property Type Dropdown */}
            <div className="flex-1 w-full md:w-auto relative group cursor-pointer">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-charcoal/40 group-hover:text-luxury-gold transition-colors">
                    <Home size={20} />
                </div>
                <div className="w-full h-14 pl-12 pr-10 flex items-center text-luxury-charcoal font-sans select-none relative">
                    {propertyType}
                    <ChevronDown size={16} className="absolute right-4 text-gray-400" />
                </div>
                {/* Dropdown would go here - simplified for UI demo */}
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto h-14 px-10 bg-luxury-gold hover:bg-[#c99a3c] text-white rounded-xl font-medium tracking-wide uppercase text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                <Search size={18} />
                <span>Search</span>
            </button>
        </motion.div>
    );
}
