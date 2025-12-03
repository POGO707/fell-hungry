import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight, X } from 'lucide-react';

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "New Arrival: Spicy Tandoori Momos!",
    excerpt: "The wait is over! Experience the perfect blend of smoky tandoori spices and juicy fillings.",
    content: "We are excited to announce the latest addition to our menu: Tandoori Momos! Marinated in a secret blend of yogurt and spices, roasted to perfection, and served with our signature mint chutney. Come try them out this weekend for a special introductory price.",
    date: "Oct 12, 2024",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1974&auto=format&fit=crop",
    author: "Kitchen Team"
  },
  {
    id: 2,
    title: "Weekend Special: Buy 2 Burgers, Get 1 Free",
    excerpt: "Make your weekend tastier with our limited-time offer on all chicken burgers.",
    content: "This Friday through Sunday, grab your friends and head to The Hungry Hive. When you order any two burgers from our Chicken Classics range, you get a third one absolutely free! Perfect for group hangouts after college.",
    date: "Oct 05, 2024",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop",
    author: "Manager"
  },
  {
    id: 3,
    title: "Why Our Homemade Mayo is a Game Changer",
    excerpt: "Healthier, tastier, and preservative-free. Learn why we make our own mayo.",
    content: "Did you know store-bought mayonnaise is often loaded with preservatives? At The Hungry Hive, we whip up our mayonnaise fresh every morning. We use high-quality oil and fresh eggs to ensure a creamy texture that is not just tastier but also better for you.",
    date: "Sep 28, 2024",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=2592&auto=format&fit=crop",
    author: "Chef"
  }
];

const Blog: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-secondary mb-4">Latest News & Offers</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Stay updated with our latest menu additions and special promotions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                <button 
                    onClick={() => setSelectedPost(post)}
                    className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto"
                >
                    Read More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      {selectedPost && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPost(null)}></div>
             <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl">
                 <button 
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                 >
                     <X size={20} />
                 </button>
                 <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover" />
                 <div className="p-8">
                     <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {selectedPost.date}</span>
                        <span className="flex items-center gap-1"><User size={14} /> {selectedPost.author}</span>
                     </div>
                     <h2 className="text-3xl font-display font-bold text-secondary mb-6">{selectedPost.title}</h2>
                     <div className="prose text-gray-700 leading-relaxed whitespace-pre-line">
                         {selectedPost.content}
                     </div>
                     <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
                         <button className="bg-[#3b5998] text-white px-4 py-2 rounded text-sm font-bold">Share on Facebook</button>
                         <button className="bg-[#25D366] text-white px-4 py-2 rounded text-sm font-bold">Share on WhatsApp</button>
                     </div>
                 </div>
             </div>
         </div>
      )}
    </section>
  );
};

export default Blog;