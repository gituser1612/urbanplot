import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, X, Check } from 'lucide-react';

export default function FilterPanel() {
    const [priceRange, setPriceRange] = useState(5000000);

    return (
        <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 h-fit space-y-8 p-6 glass-panel rounded-xl">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h3 className="font-serif text-xl font-bold text-luxury-charcoal">Filters</h3>
                <button className="text-xs uppercase tracking-wider text-luxury-sage hover:text-luxury-gold transition-colors">
                    Reset
                </button>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-wider text-luxury-charcoal">Max Price</label>
                <div className="flex items-center justify-between text-sm font-serif text-gold font-bold">
                    <span>$1M</span>
                    <span>${(priceRange / 1000000).toFixed(1)}M</span>
                    <span>$20M+</span>
                </div>
                <input
                    type="range"
                    min="1000000"
                    max="20000000"
                    step="500000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
                />
            </div>

            {/* Property Type */}
            <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-luxury-charcoal">Property Type</label>
                {['Penthouse', 'Villa', 'Modern Manor', 'Seafront'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-luxury-charcoal/20 rounded-sm transition-colors group-hover:border-luxury-gold">
                            <input type="checkbox" className="peer w-full h-full opacity-0 cursor-pointer" />
                            <div className="absolute inset-0 bg-luxury-gold opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Check className="w-3 h-3" />
                            </div>
                        </div>
                        <span className="font-sans text-sm text-gray-600 group-hover:text-luxury-charcoal transition-colors">{type}</span>
                    </label>
                ))}
            </div>

            {/* Amenities */}
            <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-luxury-charcoal">Amenities</label>
                <div className="flex flex-wrap gap-2">
                    {['Pool', 'Spa', 'Gym', 'Cinema', 'Wine Cellar', 'Helipad'].map((item) => (
                        <button key={item} className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-luxury-gold hover:text-luxury-gold transition-colors duration-300">
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <button className="w-full btn-primary rounded-lg shadow-lg shadow-luxury-gold/20">
                Apply Filters
            </button>
        </aside>
    );
}
