import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag } from 'lucide-react';
import PageLayout from '../layouts/PageLayout';
import PropertyCard from '../components/PropertyCard';
import { useWishlist } from '../contexts/WishlistContext';

export default function Wishlist() {
    const { wishlist, clearWishlist } = useWishlist();

    return (
        <PageLayout>
            <div className="pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full pt-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="font-serif text-4xl md:text-5xl text-luxury-charcoal mb-4"
                        >
                            Your Collection
                        </motion.h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-1 bg-luxury-gold"
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-luxury-charcoal/60 font-sans max-w-lg leading-relaxed"
                        >
                            Review your curated selection of premium properties.
                        </motion.p>
                    </div>

                    {wishlist.length > 0 && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={clearWishlist}
                            className="px-6 py-3 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all font-sans text-sm tracking-wider uppercase flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Clear All
                        </motion.button>
                    )}
                </div>

                {/* Content */}
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {wishlist.map((property, index) => (
                                <motion.div
                                    key={property.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <PropertyCard property={property} index={index} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-luxury-charcoal/5 rounded-3xl"
                    >
                        <div className="w-20 h-20 bg-luxury-gold/10 rounded-full flex items-center justify-center mb-6 text-luxury-gold">
                            <ShoppingBag size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-serif text-2xl text-luxury-charcoal mb-2">Your collection is empty</h3>
                        <p className="text-luxury-charcoal/50 font-sans mb-8 max-w-md">
                            Browse our exclusive listings and discover the property that speaks to you.
                        </p>
                        <a href="/" className="btn-primary rounded-full shadow-lg">
                            Browse Properties
                        </a>
                    </motion.div>
                )}
            </div>
        </PageLayout>
    );
}
