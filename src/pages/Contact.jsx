import PageLayout from '../layouts/PageLayout';

export default function Contact() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <h1 className="font-display font-medium text-4xl md:text-5xl text-luxury-charcoal mb-8">Contact Us</h1>
                <div className="h-1 w-20 bg-luxury-gold mb-12" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-serif text-2xl mb-2">Concierge Service</h3>
                            <p className="font-sans text-gray-600">
                                Our dedicated team is available 24/7 to assist with your property inquiries.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-luxury-gold uppercase tracking-widest text-xs mb-2">Email</h4>
                            <p className="font-sans text-gray-800">concierge@urbanplot.com</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-luxury-gold uppercase tracking-widest text-xs mb-2">Phone</h4>
                            <p className="font-sans text-gray-800">+1 (888) 555-0199</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-luxury-gold uppercase tracking-widest text-xs mb-2">Headquarters</h4>
                            <p className="font-sans text-gray-800">
                                1520 Luxury Lane, Suite 100<br />
                                Beverly Hills, CA 90210
                            </p>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                            <input type="text" className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-luxury-gold transition-colors" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                            <input type="email" className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-luxury-gold transition-colors" placeholder="Your Email" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                            <textarea rows="4" className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-luxury-gold transition-colors" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="btn-primary w-full bg-luxury-charcoal text-white py-4 px-8 uppercase tracking-widest text-xs font-bold hover:bg-luxury-gold transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </PageLayout>
    );
}
