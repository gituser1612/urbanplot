import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function useWishlist() {
    return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useAuth();

    // Fetch wishlist from Supabase when user logs in
    useEffect(() => {
        if (!user) {
            setWishlist([]); // Clear wishlist on logout
            return;
        }

        const fetchWishlist = async () => {
            const { data, error } = await supabase
                .from('wishlist')
                .select('property_id, properties(*)')
                .eq('user_id', user.id);

            if (error) {
                console.error("Error fetching wishlist:", error);
            } else if (data) {
                // Map the response to return the property objects matching UI schema
                const properties = data.map(item => {
                    const p = item.properties;
                    return {
                        id: p.id,
                        title: p.property_name,
                        price: `$${p.price.toLocaleString()}`,
                        location: p.location,
                        beds: p.bedrooms,
                        baths: p.bathrooms,
                        sqft: p.area_sqft,
                        image: (p.images && p.images.length > 0) ? p.images[0] : null,
                        type: p.property_type,
                        description: p.description,
                        featured: p.status.toLowerCase() === 'available'
                    };
                });
                setWishlist(properties);
            }
        };

        fetchWishlist();
    }, [user]);

    const addToWishlist = async (property) => {
        if (!user) {
            // Optional: Prompt user to login or handle guest wishlist
            // For now, valid requirement implies backend storage, so we need a user.
            // We could show a toast here "Please login to add to wishlist"
            alert("Please login to save properties to your wishlist.");
            return;
        }

        // Optimistic update
        setWishlist((prev) => [...prev, property]);

        const { error } = await supabase
            .from('wishlist')
            .insert({ user_id: user.id, property_id: property.id });

        if (error) {
            console.error("Error adding to wishlist:", error);
            // Revert on error
            setWishlist((prev) => prev.filter(item => item.id !== property.id));
        }
    };

    const removeFromWishlist = async (propertyId) => {
        if (!user) return;

        // Optimistic update
        const previousWishlist = [...wishlist];
        setWishlist((prev) => prev.filter(item => item.id !== propertyId));

        const { error } = await supabase
            .from('wishlist')
            .delete()
            .match({ user_id: user.id, property_id: propertyId });

        if (error) {
            console.error("Error removing from wishlist:", error);
            // Revert on error
            setWishlist(previousWishlist);
        }
    };

    const isInWishlist = (propertyId) => {
        return wishlist.some(item => item.id === propertyId);
    };

    const toggleWishlist = (property) => {
        if (isInWishlist(property.id)) {
            removeFromWishlist(property.id);
        } else {
            addToWishlist(property);
        }
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}
