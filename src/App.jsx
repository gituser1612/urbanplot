import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import ScrollToTop from './components/ScrollToTop';

import { WishlistProvider } from './contexts/WishlistContext';
import Wishlist from './pages/Wishlist';
import PropertyDetails from './pages/PropertyDetails';

import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <HelmetProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <AnimatePresence mode="wait">
            {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
          </AnimatePresence>

          {!loading && (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/wishlist" element={<Wishlist />} />
              {/* Fallback for other links demo */}
              <Route path="*" element={<Home />} />
            </Routes>
          )}
        </Router>
      </WishlistProvider>
    </HelmetProvider>
  );
}
