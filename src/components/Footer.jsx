import { Link } from 'react-router-dom';

export default function Footer() {
    return (
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
                    <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-light font-['Montserrat']">
                        <li><Link to="/" className="hover:text-white transition-colors">Buy Property</Link></li>
                        <li><Link to="/sell" className="hover:text-white transition-colors">Sell Property</Link></li>
                        <li><Link to="/rent" className="hover:text-white transition-colors">Rent</Link></li>
                        <li><Link to="/agents" className="hover:text-white transition-colors">Agents</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-xs mb-6">Legal</h4>
                    <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-light font-['Montserrat']">
                        <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-xs mb-6">Company</h4>
                    <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-light font-['Montserrat']">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>
            </div>

            <div className="text-center border-t border-white/5 pt-8">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-['Montserrat']">© 2026 UrbanPlot Estates. All rights reserved.</p>
            </div>
        </footer>
    );
}
