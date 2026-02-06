import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthPage from '../components/AuthPage';

export default function PageLayout({ children }) {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div className="bg-luxury-cream min-h-screen selection:bg-luxury-gold selection:text-white flex flex-col">
            <Navbar onLoginClick={() => setShowAuth(true)} variant="dark" />

            <main className="flex-grow pt-24 text-luxury-charcoal">
                {children}
            </main>

            <Footer />

            <AnimatePresence>
                {showAuth && <AuthPage onClose={() => setShowAuth(false)} />}
            </AnimatePresence>
        </div>
    );
}
