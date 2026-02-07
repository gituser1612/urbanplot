import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Upload, DollarSign, MapPin, Home, Layout, Bed, Bath, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

export default function AddProperty() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            // navigate('/login'); // Commented out for now to allow viewing the UI, but strictly should default to login
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        type: 'Villa',
        beds: '',
        baths: '',
        sqft: '',
        description: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!user) {
            setError("You must be logged in to list a property.");
            setLoading(false);
            return;
        }

        try {
            const propertyData = {
                user_id: user.id,
                property_name: formData.title,
                price: parseFloat(formData.price),
                location: formData.location,
                property_type: formData.type,
                bedrooms: parseInt(formData.beds),
                bathrooms: parseInt(formData.baths),
                area_sqft: parseInt(formData.sqft),
                description: formData.description,
                images: [formData.imageUrl], // Store as JSON array
                status: 'available'
            };

            const { data, error: insertError } = await supabase
                .from('properties')
                .insert([propertyData])
                .select();

            if (insertError) throw insertError;

            // Redirect to the new property details
            if (data && data.length > 0) {
                navigate(`/property/${data[0].id}`);
            } else {
                navigate('/');
            }

        } catch (err) {
            console.error('Error adding property:', err);
            setError(err.message || "Failed to add property");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-luxury-cream min-h-screen selection:bg-luxury-gold selection:text-white">
            <Helmet>
                <title>List Your Property | UrbanPlot</title>
            </Helmet>
            <Navbar variant="solid" />

            <main className="pt-28 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="font-['Montserrat'] font-light text-4xl md:text-5xl text-luxury-charcoal uppercase tracking-widest mb-4">
                        List Your Property
                    </h1>
                    <div className="h-px w-24 bg-luxury-gold mx-auto" />
                    <p className="mt-6 text-gray-500 font-light tracking-wide max-w-xl mx-auto">
                        Reach our exclusive network of qualified buyers. Submit your property details below.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100"
                >
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border-l-2 border-red-500 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {!user && (
                        <div className="mb-8 p-4 bg-yellow-50 border-l-2 border-yellow-500 text-yellow-800 text-sm flex justify-between items-center">
                            <span>You verified you are not logged in. Please login to submit.</span>
                            <button onClick={() => navigate('/login')} className="underline font-bold">Login</button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Basic Info */}
                        <div>
                            <h3 className="font-['Montserrat'] text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                <Home size={14} /> Property Overview
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Property Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Modern Villa with Ocean View"
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 font-light text-lg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                                        <DollarSign size={12} /> Price (USD)
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="2500000"
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 font-light"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                                        <MapPin size={12} /> Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Beverly Hills, CA"
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 font-light"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Details */}
                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="font-['Montserrat'] text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                <Layout size={14} /> Specifications
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent font-light"
                                    >
                                        <option value="Villa">Villa</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Penthouse">Penthouse</option>
                                        <option value="Estate">Estate</option>
                                        <option value="Townhouse">Townhouse</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                                        <Bed size={12} /> Beds
                                    </label>
                                    <input
                                        type="number"
                                        name="beds"
                                        required
                                        value={formData.beds}
                                        onChange={handleChange}
                                        placeholder="4"
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 font-light"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                                        <Bath size={12} /> Baths
                                    </label>
                                    <input
                                        type="number"
                                        name="baths"
                                        required
                                        value={formData.baths}
                                        onChange={handleChange}
                                        placeholder="3"
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 font-light"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Sq Ft</label>
                                    <input
                                        type="number"
                                        name="sqft"
                                        required
                                        value={formData.sqft}
                                        onChange={handleChange}
                                        placeholder="3500"
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 font-light"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Visuals & Description */}
                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="font-['Montserrat'] text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                <FileText size={14} /> Description & Media
                            </h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Description</label>
                                    <textarea
                                        name="description"
                                        required
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe the property features, view, and lifestyle..."
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 font-light resize-none"
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 flex items-center gap-2">
                                        <Upload size={12} /> Header Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="imageUrl"
                                        required
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-luxury-charcoal transition-colors bg-transparent placeholder-gray-300 font-light"
                                    />
                                    <p className="text-[10px] text-gray-400">Provide a direct link to a high-quality image (Unsplash, etc.)</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-luxury-gold text-luxury-charcoal hover:bg-white hover:border hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 uppercase tracking-[0.2em] font-bold text-sm shadow-md"
                            >
                                {loading ? 'Submitting...' : 'Submit Listing'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
