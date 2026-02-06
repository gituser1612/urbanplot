/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                luxury: {
                    charcoal: '#1a1a1a', // Keep standard charcoal for generic use if needed, or remove.
                    gold: '#d4a574', // Updated LUXE gold
                    cream: '#faf8f5', // Updated LUXE cream
                    ivory: '#faf8f5',
                    taupe: '#d9cdb9', // Updated LUXE beige/taupe

                    // LUXE Deep Teal Theme
                    'teal-deep': '#0d3d3d',
                    'teal-rich': '#1a5555',
                    'gold-hover': '#e6b87d',
                    'gold-light': '#c9a869',
                    'glass': 'rgba(255, 255, 255, 0.08)',
                    'shadow-tint': 'rgba(13, 61, 61, 0.6)',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Questrial"', '"Montserrat"', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
