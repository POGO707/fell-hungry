import React from 'react';
import { IMAGES } from '../types';
import { MapPin, ShoppingBag } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="The Hungry Hive"
          className="w-full h-full object-cover"
          onError={(e) => {
             (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop';
          }}
        />
        {/* Darker overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-white space-y-8 pt-16">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight tracking-tight drop-shadow-xl">
          Comfort Food, <br/>
          <span className="text-primary">Served Fast & Fresh</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Juicy burgers, flavour-packed momos, crispy fried chicken and hearty shawarmas — pocket-friendly and made to hit the spot every time.
        </p>
        
        <div className="flex flex-col items-center gap-4">
            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <a 
                href="#menu"
                className="bg-primary hover:bg-accent text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2 min-w-[200px]"
            >
                <ShoppingBag size={20} /> Order Online
            </a>
            <a 
                href="https://www.google.com/maps/dir/?api=1&destination=P+N+Das+College+Shantinagar+Palta+Barrackpore"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-3.5 px-8 rounded-full transition-all flex items-center justify-center gap-2 min-w-[200px]"
            >
                <MapPin size={20} /> Directions to Store
            </a>
            </div>

            {/* Delivery Partners */}
            <div className="flex flex-wrap justify-center items-center gap-3 mt-4 text-sm font-medium">
                <span className="text-gray-300 mr-2 uppercase tracking-wider text-xs">Also available on</span>
                <a 
                    href="https://www.zomato.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#CB202D] hover:bg-[#b01b27] text-white py-2 px-4 rounded-lg shadow-md transition-transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                    <span className="font-extrabold italic">zomato</span>
                </a>
                <a 
                    href="https://www.swiggy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FC8019] hover:bg-[#e36e10] text-white py-2 px-4 rounded-lg shadow-md transition-transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                    <span className="font-extrabold">Swiggy</span>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;