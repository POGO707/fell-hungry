import React, { useState } from 'react';
import { X } from 'lucide-react';
import { IMAGES } from '../types';

const galleryImages = [
    { src: IMAGES.store, alt: 'The Hungry Hive Storefront' },
    { src: IMAGES.burger, alt: 'Delicious Burger' },
    { src: IMAGES.momo, alt: 'Steamed Momos' },
    { src: IMAGES.shawarma, alt: 'Chicken Shawarma' },
    { src: IMAGES.hero, alt: 'Special Dish' },
    { src: "https://lh3.googleusercontent.com/proxy/-K6hCo6D-ng_IBNKC5rCzWbCHZP6fNqgf6HbY9RdPWiriXes7fyabFWBVX3D9rBQYG6Vyn-EuFMKX7tCaKfjHjkKAvP0QozInZiP9SrxhlLgFqW-rnnIV-_tyGEv147ivbIsqnHJOCQKqBHb18z80n-Zs_xJ_T8=s680-w680-h510-rw", alt: 'Tasty Snacks' },
    { src: "https://lh3.googleusercontent.com/proxy/OyjQWDEl_t48suR08Wj0YBFkqrieGv5RtRZEccXC56cCwsrSp8b5vRAw_kD5LZeILsAtG0DdoEPfJBV0y9lelmZCqklWd2QbKHmVL5voSEbozT4MV54vYmhPe79-2EaVUvyneloFxq8X-jyo9TNn07ebosHgwQc=s680-w680-h510-rw", alt: 'Fresh Food' },
];

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-display font-bold text-center mb-10 text-secondary">
                    Food & Store Gallery
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((img, index) => (
                        <div 
                            key={index} 
                            className={`relative overflow-hidden rounded-lg cursor-pointer group h-64 ${index === 0 ? 'md:col-span-2 md:row-span-2 h-auto min-h-[300px]' : ''}`}
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <img 
                                src={img.src} 
                                alt={img.alt} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://source.unsplash.com/random/800x600?food,restaurant&sig=${index}`;
                                }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={40} />
                    </button>
                    <img 
                        src={selectedImage} 
                        alt="Gallery Large" 
                        className="max-h-[90vh] max-w-[95vw] object-contain rounded-md shadow-2xl"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
            )}
        </section>
    );
};

export default Gallery;