import React from 'react';
import { IMAGES } from '../types';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
               <img 
                src={IMAGES.store} 
                alt="The Hungry Hive Storefront" 
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxMEOSL9udhfV-2D6dU-tYIkiZw4d7xQqYjKc8aaGEO9z0XL63kHhfqOxog9lh92GMjanFdiL5hadTUdX6mZxoilU-UOlyXH0wTy_bk25XM2v2k_y19CzSyeWrAYVhJUikEi-eB=s680-w680-h510-rw';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">Since 2024</p>
                <p className="text-sm opacity-90">Serving Shantinagar</p>
              </div>
            </div>
            {/* Decorative pattern dot */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-2">
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">
              We believe comfort food should be quick, tasty and affordable.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Hungry Hive is a neighbourhood favourite near P N Das College in Shantinagar, Palta. We focus on freshness without compromising on speed or price.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every order is made with care: juicy burgers with our signature sauces, hot momos with zesty dips, crispy fried chicken, refreshing chilled drinks and healthier picks using homemade mayonnaise.
            </p>
            <p className="text-gray-600 font-medium italic border-l-4 border-primary pl-4">
              "Whether you’re rushing between classes or craving a satisfying snack — we’ve got your hunger covered."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;