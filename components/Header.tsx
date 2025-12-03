import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Phone, Clock, MapPin, ShoppingBag } from 'lucide-react';
import { IMAGES } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'News', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out transform ${
        isMounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      {/* Top Info Bar (Hidden on mobile scroll) */}
      <div className={`hidden md:flex justify-between items-center container mx-auto px-4 mb-2 text-sm transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100 text-white'}`}>
        <div className="flex space-x-6 animate-fadeIn">
          <span className="flex items-center gap-1"><MapPin size={14} /> Shantinagar, Palta</span>
          <span className="flex items-center gap-1"><Clock size={14} /> Open till 10 PM</span>
        </div>
        <div>
          <a href="tel:08240713903" className="flex items-center gap-1 hover:text-primary transition-colors animate-fadeIn">
            <Phone size={14} /> 082407 13903
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group relative">
          <div className="relative overflow-hidden rounded-full border-2 border-white/50 shadow-md group-hover:border-primary transition-colors">
            <img 
              src={IMAGES.logo} 
              alt="The Hungry Hive Logo" 
              className="h-12 w-12 object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          </div>
          <span className={`text-2xl font-bold font-display tracking-tight transition-colors duration-300 ${isScrolled ? 'text-secondary' : 'text-white'}`}>
            The Hungry <span className="text-primary group-hover:animate-pulse">Hive</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`relative font-medium text-sm uppercase tracking-wide transition-colors group ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-100 hover:text-white'}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button
            onClick={onOpenCart}
            className="bg-primary hover:bg-accent text-white px-5 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center gap-2 active:scale-95"
          >
            <ShoppingBag size={16} className="animate-bounce" />
            <span>Order</span>
            {cartCount > 0 && (
              <span className="bg-white text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={onOpenCart}
                className="relative text-primary focus:outline-none transform transition-transform active:scale-95"
            >
                 <ShoppingBag size={28} color={isScrolled ? '#F59E0B' : 'white'} />
                 {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
            </button>
            
            <button
              className="text-primary focus:outline-none transform transition-transform active:scale-95"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} color={isScrolled ? '#1F2937' : 'white'} /> : <MenuIcon size={28} color={isScrolled ? '#1F2937' : 'white'} />}
            </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden pt-20`}>
        <div className="flex flex-col items-center space-y-6 text-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={toggleMenu}
              className="font-medium text-gray-800 hover:text-primary relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button
             onClick={() => {
                 onOpenCart();
                 toggleMenu();
             }}
             className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md flex items-center gap-2 active:scale-95 transition-transform"
          >
            <ShoppingBag size={20} /> View Cart ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;