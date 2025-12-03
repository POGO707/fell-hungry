import React, { useState } from 'react';
import { MenuItem, IMAGES } from '../types';
import { Plus, Search, FileText } from 'lucide-react';

interface MenuProps {
    onAddToCart: (item: MenuItem) => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'b1',
    category: 'Burgers',
    name: 'Chicken Cheese Zinger',
    description: 'Crowd favourite, crispy + creamy',
    price: 130,
    image: IMAGES.burger
  },
  {
    id: 'b2',
    category: 'Burgers',
    name: 'Classic Chicken Burger',
    description: 'Simple yet delicious',
    price: 90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop'
  },
  {
    id: 'b3',
    category: 'Burgers',
    name: 'Veggie Delight',
    description: 'Light, flavourful and filling',
    price: 70,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop'
  },
  {
    id: 'm1',
    category: 'Momos',
    name: 'Steamed Momos (6pcs)',
    description: 'Soft & juicy',
    price: 80,
    image: IMAGES.momo
  },
  {
    id: 'm2',
    category: 'Momos',
    name: 'Fried Momos (6pcs)',
    description: 'Golden crunch, spicy dips',
    price: 90,
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'm3',
    category: 'Momos',
    name: 'Tandoori Momos (6pcs)',
    description: 'Fiery flavour hit',
    price: 110,
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 's1',
    category: 'Shawarma & Rolls',
    name: 'Chicken Shawarma Wrap',
    description: 'Loaded & melt-in-mouth',
    price: 100,
    image: IMAGES.shawarma
  },
  {
    id: 's2',
    category: 'Shawarma & Rolls',
    name: 'Paneer Shawarma',
    description: 'Vegetarian favourite',
    price: 90,
    image: 'https://images.unsplash.com/photo-1626804475297-411f7c16d2eb?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'f1',
    category: 'Fried Chicken & Snacks',
    name: 'Crunchy Fried Chicken (2pcs)',
    description: 'Crave-worthy crisp',
    price: 150,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'f2',
    category: 'Fried Chicken & Snacks',
    name: 'Loaded Nachos',
    description: 'Perfect for sharing',
    price: 120,
    image: 'https://images.unsplash.com/photo-1513456852971-30cfa382c916?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'd1',
    category: 'Drinks',
    name: 'Lemon Iced Drink',
    description: 'Zesty refreshment',
    price: 50,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1887&auto=format&fit=crop'
  },
  {
    id: 'd2',
    category: 'Drinks',
    name: 'Cold Coffee',
    description: 'Creamy caffeine kick',
    price: 80,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?q=80&w=1887&auto=format&fit=crop'
  }
];

const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on search query
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get categories from filtered items so empty categories don't show
  const categories = Array.from(new Set(filteredItems.map(item => item.category)));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-display font-bold text-secondary mb-4">Our Menu</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore our range of pocket-friendly comfort foods. Order online now!</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search for burgers, momos..."
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm text-gray-700 bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        {filteredItems.length === 0 ? (
             <div className="text-center text-gray-500 py-10">
                <p className="text-lg">No items found matching "{searchQuery}".</p>
                <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-primary font-bold hover:underline"
                >
                    Clear Search
                </button>
            </div>
        ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {categories.map((category) => (
                    <div key={category} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">{category}</h3>
                    <div className="space-y-6 flex-grow">
                        {filteredItems.filter(item => item.category === category).map((item) => (
                        <div key={item.id} className="flex gap-4 items-start group">
                            {/* Image */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden shadow-sm">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://source.unsplash.com/random/100x100?food';
                                    }}
                                />
                            </div>
                            
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-secondary leading-tight">{item.name}</h4>
                                    <span className="font-bold text-primary whitespace-nowrap ml-2">₹{item.price}</span>
                                </div>
                                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{item.description}</p>
                                <button 
                                    onClick={() => onAddToCart(item)}
                                    className="text-xs font-bold bg-white border border-primary text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                                >
                                    <Plus size={12} /> Add
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>

                {/* View Full Menu Button */}
                <div className="flex justify-center">
                    <a 
                        href="https://wa.me/c/918240713903" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-secondary hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2"
                    >
                        <FileText size={20} /> View Full Menu (PDF)
                    </a>
                </div>
            </>
        )}
      </div>
    </section>
  );
};

export default Menu;