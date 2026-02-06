import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';

export default function PropertyCard({ property, index }) {
    return (
        <motion.div
            className="group relative bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transform-gpu"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)"
            }}
        >
            {/* Image Container */}
            <div className="relative h-[300px] overflow-hidden">
                <motion.img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {property.featured && (
                        <span className="px-3 py-1 bg-luxury-gold/90 text-luxury-charcoal text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">
                            Featured
                        </span>
                    )}
                    <span className="px-3 py-1 bg-black/50 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                        For Sale
                    </span>
                </div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-red-500 transition-all duration-300 transform hover:scale-110 group/heart">
                    <Heart className="w-5 h-5 group-hover/heart:fill-current" />
                </button>

                {/* Price Tag (Overlaid on Image bottom) */}
                <div className="absolute bottom-6 left-6">
                    <p className="font-serif text-3xl text-white font-bold tracking-wide drop-shadow-md">
                        {property.price}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative bg-white">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-serif text-2xl text-luxury-charcoal font-bold mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                            {property.title}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm font-sans">
                            <MapPin className="w-4 h-4 mr-1 text-luxury-gold" />
                            {property.location}
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-gray-100 mb-4" />

                <div className="flex items-center justify-between text-gray-600 font-sans text-sm">
                    <div className="flex items-center space-x-2">
                        <Bed className="w-4 h-4 text-luxury-sage" />
                        <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Bath className="w-4 h-4 text-luxury-sage" />
                        <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Maximize className="w-4 h-4 text-luxury-sage" />
                        <span>{property.sqft} sqft</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
