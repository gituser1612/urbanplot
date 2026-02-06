import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Bed, ArrowRight, Coins, Bath, Plane, Train, Car, Maximize, Heart, ArrowLeft, Phone, Mail, Share2, Play, X, ChevronRight, ChevronLeft, Wifi, Shield, Utensils, Trees } from "lucide-react";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useWishlist } from '../contexts/WishlistContext';
import clsx from 'clsx';

// Fallback data in case page is accessed directly without state
import luxuryVilla1 from '../assets/images/luxury-villa-1.jpg';
import luxuryVilla2 from '../assets/images/luxury-villa-2.jpg';
import luxuryVilla3 from '../assets/images/luxury-villa-3.jpg';
import luxuryVilla4 from '../assets/images/luxury-villa-4.jpg';
import luxuryVilla5 from '../assets/images/luxury-villa-5.jpg';
import PropertyCard from '../components/PropertyCard';

const PropertyDetails = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [showAuth, setShowAuth] = useState(false);

    // Use passed state or fallback data
    const property = state?.property || {
        id: id,
        title: "Luxury Property",
        price: "$2,500,000",
        location: "Exclusive Location",
        beds: 4,
        baths: 3,
        sqft: 3500,
        image: luxuryVilla1,
        description: "Experience the epitome of luxury living in this stunning architectural masterpiece. featuring breathtaking views, state-of-the-art amenities, and meticulous attention to detail throughout. The open-concept living space is perfect for entertaining, while the private master suite offers a serene retreat."
    };

    const relatedProperties = [
        {
            id: 'rel-1',
            title: 'Modern Beach House',
            price: '$3,200,000',
            location: 'Malibu, CA',
            beds: 5,
            baths: 4,
            sqft: 4200,
            image: luxuryVilla2
        },
        {
            id: 'rel-2',
            title: 'Downtown Penthouse',
            price: '$1,850,000',
            location: 'Los Angeles, CA',
            beds: 3,
            baths: 3,
            sqft: 2800,
            image: luxuryVilla3
        },
        {
            id: 'rel-3',
            title: 'Desert Oasis',
            price: '$2,100,000',
            location: 'Palm Springs, CA',
            beds: 4,
            baths: 3,
            sqft: 3100,
            image: luxuryVilla4
        },
        {
            id: 'rel-4',
            title: 'Historic Estate',
            price: '$4,500,000',
            location: 'Pasadena, CA',
            beds: 6,
            baths: 5,
            sqft: 5500,
            image: luxuryVilla5
        }
    ];

    const [activeImage, setActiveImage] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1000);
    };

    const resetContactForm = () => {
        setIsContactOpen(false);
        setTimeout(() => setIsSubmitted(false), 300); // Reset after animation
    };

    // Mock images array for the gallery
    const images = [property.image, property.image, property.image, property.image]; // In real app, these would be different

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": property.title,
        "image": [images[0], images[1], images[2]],
        "description": property.description,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": property.price.replace(/[^0-9.]/g, '')
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": property.location,
            "addressLocality": "Los Angeles", // Mock data inference
            "addressRegion": "CA",
            "addressCountry": "US"
        }
    };

    return (
        <div className="bg-white min-h-screen selection:bg-luxury-gold selection:text-white">
            <Helmet>
                <title>{property.title} | UrbanPlot Luxury Real Estate</title>
                <meta name="description" content={`Discover ${property.title} in ${property.location}. ${property.beds} Beds, ${property.baths} Baths. ${(property.description || "").substring(0, 150)}...`} />
                <link rel="canonical" href={`https://urbanplot.com/property/${property.id}`} />
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>
            <Navbar onLoginClick={() => setShowAuth(true)} variant="solid" enableIntro={false} />

            <main className="pt-[72px] min-h-screen bg-white">
                {/* Product Split View Section */}
                <section className="lg:grid lg:grid-cols-[55%_45%] relative">
                    {/* LEFT COLUMN: Main Visuals */}
                    <div className="relative h-[50vh] lg:h-[calc(100vh-72px)] lg:sticky lg:top-[72px] bg-[#f0f0f0] overflow-hidden group">
                        {/* Mobile Back Button (Floating) */}
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute top-4 left-4 z-10 lg:hidden p-2 bg-white/80 backdrop-blur rounded-full shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <motion.img
                            key={activeImage}
                            src={images[activeImage]}
                            alt={property.title}
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                        />

                        {/* Image Navigation Arrows (Desktop) */}
                        <button
                            onClick={() => setActiveImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/0 hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <ChevronLeft size={32} strokeWidth={1} />
                        </button>
                        <button
                            onClick={() => setActiveImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/0 hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <ChevronRight size={32} strokeWidth={1} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={clsx(
                                        "w-2 h-2 rounded-full transition-all duration-300",
                                        idx === activeImage ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Details */}
                    <div className="px-6 py-8 md:px-12 md:py-16 bg-white">
                        <div className="max-w-xl mx-auto">
                            {/* Desktop Back Button */}
                            <button
                                onClick={() => navigate(-1)}
                                className="hidden lg:flex items-center gap-2 text-gray-400 hover:text-luxury-charcoal transition-colors mb-8 group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium uppercase tracking-[0.2em] text-xs">Back to Listings</span>
                            </button>

                            {/* Tag */}
                            <div className="mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold border border-luxury-gold/30 px-2 py-1">New Listing</span>
                            </div>

                            {/* Title & Wishlist */}
                            <div className="flex justify-between items-start gap-4 mb-2">
                                <h1 className="font-['Montserrat'] font-light text-3xl md:text-4xl uppercase tracking-wide text-luxury-charcoal leading-tight">
                                    {property.title}
                                </h1>
                                <button
                                    onClick={() => toggleWishlist(property)}
                                    className="text-gray-400 hover:text-luxury-gold transition-colors pt-1"
                                >
                                    <Heart size={24} className={isInWishlist(property.id) ? "fill-luxury-gold text-luxury-gold" : ""} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Price */}
                            <div className="mb-8 flex items-baseline gap-4">
                                <span className="font-medium text-2xl tracking-wide text-luxury-charcoal">{property.price}</span>
                                <span className="text-sm text-gray-400 uppercase tracking-wider">USD</span>
                            </div>

                            {/* Info Line (Specs & Location) */}
                            <div className="py-6 border-y border-dashed border-gray-200 mb-8 space-y-6">
                                {/* Specs with Icons */}
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm uppercase tracking-[0.1em] text-gray-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-luxury-gold" />
                                        <span>{property.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Bed size={16} className="text-luxury-gold" />
                                        <span>{property.beds} Beds</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Bath size={16} className="text-luxury-gold" />
                                        <span>{property.baths} Baths</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Maximize size={16} className="text-luxury-gold" />
                                        <span>{property.sqft} Sq Ft</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-luxury-charcoal font-bold bg-luxury-cream/50 px-3 py-1 rounded-sm">
                                        <Coins size={16} className="text-luxury-charcoal" />
                                        <span>Deposit: 10%</span>
                                    </div>
                                </div>

                                {/* Nearby Location Details */}
                                <div className="flex flex-wrap gap-6 text-xs text-gray-400 uppercase tracking-wider border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-2">
                                        <Plane size={14} />
                                        <span>4km from Airport</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Train size={14} />
                                        <span>2km from Railway</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-sm max-w-none text-gray-600 font-light mb-10 leading-relaxed">
                                <p>{property.description || "Experience the epitome of luxury living in this stunning architectural masterpiece. Featuring breathtaking views, state-of-the-art amenities, and meticulous attention to detail throughout. The open-concept living space is perfect for entertaining, while the private master suite offers a serene retreat."}</p>
                            </div>

                            {/* Amenities Grid */}
                            <div className="mb-12">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Property Amenities</h3>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-light">
                                        <div className="p-2 bg-[#F9F9F9] rounded-full text-luxury-charcoal">
                                            <Wifi size={14} />
                                        </div>
                                        <span>Smart Home</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-light">
                                        <div className="p-2 bg-[#F9F9F9] rounded-full text-luxury-charcoal">
                                            <Car size={14} />
                                        </div>
                                        <span>4-Car Garage</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-light">
                                        <div className="p-2 bg-[#F9F9F9] rounded-full text-luxury-charcoal">
                                            <Shield size={14} />
                                        </div>
                                        <span>24/7 Security</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-light">
                                        <div className="p-2 bg-[#F9F9F9] rounded-full text-luxury-charcoal">
                                            <Utensils size={14} />
                                        </div>
                                        <span>Chef's Kitchen</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-light">
                                        <div className="p-2 bg-[#F9F9F9] rounded-full text-luxury-charcoal">
                                            <Trees size={14} />
                                        </div>
                                        <span>Private Garden</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Action Button */}
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="w-full py-4 border border-luxury-charcoal text-luxury-charcoal font-medium uppercase tracking-[0.2em] hover:bg-luxury-charcoal hover:text-white transition-all duration-300 mb-6 text-sm flex items-center justify-center gap-3"
                            >
                                <Mail size={16} />
                                Contact Agent
                            </button>

                            {/* Thumbnails (Complete your look style) */}
                            <div className="mb-12">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Complete the Tour</h3>
                                    <div className="flex gap-2">
                                        <ArrowLeft size={14} className="text-gray-300" />
                                        <ArrowRight size={14} className="text-gray-400" />
                                    </div>
                                </div>

                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImage(i)}
                                            className={clsx(
                                                "flex-shrink-0 w-24 h-32 object-cover cursor-pointer transition-all duration-300 border",
                                                activeImage === i ? "border-luxury-charcoal opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                                            )}
                                        >
                                            <img src={img} alt={`View ${i}`} loading="lazy" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                    {/* Video Thumbnail Placeholder */}
                                    <div className="flex-shrink-0 w-24 h-32 bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors group">
                                        <Play size={20} className="text-gray-400 group-hover:text-luxury-charcoal" />
                                    </div>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest space-y-2">
                                <p>Ref: {property.id?.substring(0, 8) || 'LUXE-001'}</p>
                                <p>Listed by UrbanPlot Realty</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recommendations Section */}
                <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#FAFAFA] border-t border-gray-100">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <h2 className="font-['Montserrat'] font-light text-2xl uppercase tracking-widest text-luxury-charcoal mb-4">You Might Also Like</h2>
                                <div className="h-px w-24 bg-luxury-gold" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProperties.map((item, index) => (
                                <PropertyCard key={item.id} property={item} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Contact Modal w/ AnimatePresence wrapper... */}
            <AnimatePresence>
                {isContactOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={resetContactForm}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-md p-8 md:p-12 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={resetContactForm}
                                className="absolute top-6 right-6 text-gray-400 hover:text-luxury-charcoal transition-colors"
                            >
                                <X size={24} strokeWidth={1} />
                            </button>

                            {!isSubmitted ? (
                                <>
                                    <h2 className="text-2xl font-light font-['Montserrat'] uppercase tracking-widest mb-2">Inquire</h2>
                                    <p className="text-gray-500 text-sm mb-8">About {property.title}</p>

                                    <form onSubmit={handleContactSubmit} className="space-y-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Name</label>
                                            <input required type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300" placeholder="JANE DOE" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</label>
                                            <input required type="email" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300" placeholder="EMAIL@EXAMPLE.COM" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                                            <textarea required rows="3" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 resize-none" placeholder="I am interested..."></textarea>
                                        </div>

                                        <button type="submit" className="w-full py-4 bg-luxury-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors mt-4">
                                            Send Inquiry
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-light font-['Montserrat'] uppercase tracking-widest mb-4">Inquiry Sent</h2>
                                    <p className="text-gray-500 text-sm mb-8">Thank you for your interest. <br />An agent will contact you shortly.</p>
                                    <button
                                        onClick={resetContactForm}
                                        className="px-8 py-3 border border-gray-200 text-xs uppercase tracking-widest font-bold hover:bg-luxury-charcoal hover:text-white transition-all duration-300"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PropertyDetails;
