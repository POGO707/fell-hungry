import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { IMAGES } from '../types';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-2">
             <img src={IMAGES.logo} alt="The Hungry Hive Logo" className="h-10 w-10 rounded-full object-cover border border-gray-700" />
             <h4 className="text-2xl font-display font-bold text-white">The Hungry Hive</h4>
          </div>
          <p className="text-sm">Fast • Fresh • Full of Flavour</p>
          <p className="text-xs mt-4">© {currentYear} The Hungry Hive — Shantinagar, Palta</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors"><Facebook /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram /></a>
          </div>
          <div className="flex space-x-6 text-sm">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;