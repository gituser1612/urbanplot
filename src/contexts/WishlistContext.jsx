import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function useWishlist() {
    return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('urbanplot_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to load wishlist:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('urbanplot_wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error("Failed to save wishlist:", error);
        }
    }, [wishlist]);

    const addToWishlist = (property) => {
        setWishlist((prev) => {
            if (prev.some(item => item.id === property.id)) return prev;
            return [...prev, property];
        });
    };

    const removeFromWishlist = (propertyId) => {
        setWishlist((prev) => prev.filter(item => item.id !== propertyId));
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
