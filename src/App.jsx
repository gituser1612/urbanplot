import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterPanel from './components/FilterPanel';
import PropertyCard from './components/PropertyCard';
import AuthPage from './components/AuthPage';

const PROPERTIES = [
  {
    id: 1,
    title: "The Royal Penthouse",
    location: "TriBeCa, New York",
    price: "$28,500,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    beds: 5,
    baths: 6.5,
    sqft: "6,500",
    featured: true,
    type: "Penthouse"
  },
  {
    id: 2,
    title: "Oceanfront Glass Villa",
    location: "Malibu, California",
    price: "$18,250,000",
    image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop",
    beds: 4,
    baths: 5,
    sqft: "4,200",
    featured: true,
    type: "Villa"
  },
  {
    id: 3,
    title: "Modern Alpine Chalet",
    location: "Aspen, Colorado",
    price: "$14,900,000",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop",
    beds: 6,
    baths: 7,
    sqft: "8,100",
    featured: false,
    type: "Chalet"
  },
  {
    id: 4,
    title: "Skyline Haven",
    location: "Downtown Dubai",
    price: "$9,500,000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    beds: 3,
    baths: 3.5,
    sqft: "3,800",
    featured: false,
    type: "Apartment"
  },
  {
    id: 5,
    title: "Haussmann Elegance",
    location: "Paris, 7th Arr.",
    price: "$12,400,000",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    beds: 4,
    baths: 3,
    sqft: "3,100",
    featured: true,
    type: "Apartment"
  },
  {
    id: 6,
    title: "Zen Concrete Estate",
    location: "Kyoto, Japan",
    price: "$7,800,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    beds: 4,
    baths: 4,
    sqft: "4,500",
    featured: false,
    type: "Villa"
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-luxury-cream min-h-screen selection:bg-luxury-gold selection:text-white">
          <Navbar onLoginClick={() => setShowAuth(true)} />
          <Hero />

          <main className="max-w-7xl mx-auto px-4 md:px-8 py-24 flex flex-col lg:flex-row gap-12">

            {/* Sidebar Filters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <FilterPanel />
            </motion.div>

            {/* Content Grid */}
            <div className="flex-1">
              <motion.div
                className="flex items-end justify-between mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl text-luxury-charcoal mb-2">Exclusive Listings</h2>
                  <div className="h-1 w-20 bg-luxury-gold" />
                </div>
                <span className="font-sans text-gray-500 uppercase tracking-widest text-sm hidden md:block">
                  Showing {PROPERTIES.length} Properties
                </span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {PROPERTIES.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>

              <div className="mt-20 flex justify-center">
                <button className="btn-primary rounded-full px-12 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                  View All Collections
                </button>
              </div>
            </div>
          </main>

          {/* Luxury Footer */}
          <footer className="bg-luxury-charcoal text-white pt-24 pb-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 border border-luxury-gold transform rotate-45 flex items-center justify-center">
                    <div className="w-4 h-4 bg-luxury-gold/50" />
                  </div>
                  <span className="font-serif font-bold text-2xl tracking-widest uppercase">UrbanPlot</span>
                </div>
                <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
                  Redefining luxury living through curated architectural masterpieces.
                </p>
              </div>

              <div>
                <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-sans">
                  <li className="hover:text-white cursor-pointer transition-colors">Buy Property</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Sell Property</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Rent</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Agents</li>
                </ul>
              </div>

              <div>
                <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-xs mb-6">Legal</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-sans">
                  <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Cookies</li>
                </ul>
              </div>

              <div>
                <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
                <div className="flex border-b border-gray-700 pb-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 text-sm"
                  />
                  <button className="text-luxury-gold uppercase text-xs font-bold tracking-wider hover:text-white transition-colors">Subscribe</button>
                </div>
              </div>
            </div>

            <div className="text-center border-t border-white/5 pt-8">
              <p className="text-gray-600 text-xs tracking-wider">© 2026 UrbanPlot Estates. All rights reserved.</p>
            </div>
          </footer>
        </div>
      )}

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && <AuthPage onClose={() => setShowAuth(false)} />}
      </AnimatePresence>
    </>
  );
}
