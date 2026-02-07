
import fs from 'fs';

const propertyImages = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-27b88e54e69b?q=80&w=2674&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=735&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588667822941-6e3c6319859f?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=500&auto=format&fit=crop'
];

const newListed = Array.from({ length: 20 }).map((_, i) => ({
    image: propertyImages[i % 5],
    price: 1200000 + i * 50000,
    title: `Luxury Villa ${i + 1}`,
    location: 'Beverly Hills, CA',
    beds: 4 + (i % 3),
    baths: 3 + (i % 2),
    sqft: 2500 + i * 100,
    featured: i % 3 === 0,
    type: 'Villa',
    description: 'A beautiful luxury villa with modern amenities.'
}));

const nearbyProperties = Array.from({ length: 20 }).map((_, i) => ({
    image: propertyImages[(i + 2) % 5],
    price: 850000 + i * 25000,
    title: `Modern Apartment ${i + 1}`,
    location: 'West Hollywood, CA',
    beds: 2 + (i % 2),
    baths: 2,
    sqft: 1200 + i * 50,
    type: 'Apartment',
    description: 'A modern apartment close to city center.'
}));

const allProperties = [...newListed, ...nearbyProperties];
const userId = '6f54b1e4-9bd4-4a13-89a0-bbae30e0dea5'; // Existing user ID from logs

const sqlStatements = allProperties.map(p => {
    // Escape single quotes in strings
    const title = p.title.replace(/'/g, "''");
    const location = p.location.replace(/'/g, "''");
    const type = p.type.replace(/'/g, "''");
    const desc = p.description.replace(/'/g, "''");
    const imageJson = JSON.stringify([p.image]);

    return `INSERT INTO public.properties (property_name, location, price, property_type, bedrooms, bathrooms, area_sqft, description, images, user_id, status) VALUES ('${title}', '${location}', ${p.price}, '${type}', ${p.beds}, ${p.baths}, ${p.sqft}, '${desc}', '${imageJson}'::jsonb, '${userId}', 'Available');`;
}).join('\n');

const fullSql = `-- Seed data for properties
${sqlStatements}
`;

fs.writeFileSync('seed.sql', fullSql);
console.log('Generated seed.sql');
