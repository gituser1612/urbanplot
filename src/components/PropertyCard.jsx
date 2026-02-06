import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import clsx from 'clsx';
import { useWishlist } from '../contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';

export default function PropertyCard({ property, index }) {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/property/${property.id}`, { state: { property } });
    };

    return (
        <motion.div
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={handleCardClick}
        >
            {/* Image Section */}
            <div className="relative h-[280px] w-full overflow-hidden">
                <motion.img
                    src={property.image}
                    alt={property.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* For Sale Badge (Golden as requested) */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-1.5 bg-[#EAB308] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                        For Sale
                    </span>
                </div>

                {/* Wishlist Button (White Circle) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(property);
                    }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 group/btn"
                >
                    <Heart
                        size={20}
                        className={clsx(
                            "transition-colors duration-300",
                            isInWishlist(property.id)
                                ? "fill-[#EAB308] text-[#EAB308]"
                                : "text-gray-600 group-hover/btn:text-[#EAB308]"
                        )}
                        strokeWidth={2}
                    />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Price */}
                <div className="mb-2">
                    <h3 className="font-sans text-3xl font-medium text-[#0F172A] tracking-tight">
                        {property.price}
                    </h3>
                </div>

                {/* Location */}
                <div className="mb-6">
                    <div className="flex items-start gap-2 mb-1">
                        <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" strokeWidth={2} />
                        <div>
                            <h4 className="font-sans text-lg text-[#0F172A] font-normal leading-tight mb-1">
                                {property.title}
                            </h4>
                            <p className="font-sans text-sm text-gray-500">
                                {property.location}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 mb-5" />

                {/* Specs */}
                <div className="flex items-center justify-between mb-6 text-gray-600">
                    <div className="flex items-center gap-2">
                        <Bed className="w-5 h-5 text-gray-400" strokeWidth={2} />
                        <span className="font-sans text-sm">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bath className="w-5 h-5 text-gray-400" strokeWidth={2} />
                        <span className="font-sans text-sm">{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Maximize className="w-5 h-5 text-gray-400" strokeWidth={2} />
                        <span className="font-sans text-sm">{property.sqft} sqft</span>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick();
                    }}
                    className="w-full h-12 rounded-lg bg-[#0F0F0F] text-white font-sans font-bold text-sm tracking-wide flex items-center justify-center transition-all duration-300 hover:bg-black hover:shadow-lg border-2 border-transparent hover:border-[#EAB308]"
                >
                    View Property
                </button>
            </div>
        </motion.div>
    );
}
