import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, PenLine, X, Send } from 'lucide-react';
import { Testimonial } from '../types';

const DEFAULT_REVIEWS: Testimonial[] = [
  {
    id: 1,
    name: "Debjyoti B.",
    text: "Food quality is so good — also pocket friendly.",
    rating: 5
  },
  {
    id: 2,
    name: "Srija T.",
    text: "Chicken cheese zinger was just wow — KFC-like taste at a budget price.",
    rating: 5
  },
  {
    id: 3,
    name: "Sumukta D.",
    text: "Homemade mayonnaise is fit-friendly — menu is health-conscious & tasty.",
    rating: 5
  },
  {
    id: 4,
    name: "Aniket R.",
    text: "The fried chicken is crispy perfection! Better than big chains.",
    rating: 5
  },
  {
    id: 5,
    name: "Moumita S.",
    text: "Ordered via WhatsApp, service was super quick and food was hot.",
    rating: 4
  },
  {
    id: 6,
    name: "Rohan G.",
    text: "My daily evening snack spot. Love the lemon iced drink.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(DEFAULT_REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
  const [formError, setFormError] = useState('');

  // Load reviews from LocalStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('hungryHiveReviews');
    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);
        // Merge saved reviews with default ones (or just use saved if you prefer pure persistence)
        // Here we combine them, ensuring no duplicates by ID if defaults were part of it, 
        // but since defaults have low IDs and user reviews will use Date.now(), it's fine.
        // For this implementation, we'll initialize with saved reviews if they exist, 
        // OR fallback to defaults if LS is empty. 
        // To keep defaults visible + new ones:
        setReviews([...parsed]);
      } catch (e) {
        console.error("Failed to parse reviews", e);
      }
    } else {
        // If no local storage, set defaults and save them so future edits work on top
        localStorage.setItem('hungryHiveReviews', JSON.stringify(DEFAULT_REVIEWS));
    }
  }, []);

  // Save reviews to LocalStorage whenever they change
  useEffect(() => {
    if (reviews.length > 0) {
        localStorage.setItem('hungryHiveReviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
      const maxIndex = Math.max(0, reviews.length - itemsPerPage);
      if (currentIndex > maxIndex) {
          setCurrentIndex(maxIndex);
      }
  }, [itemsPerPage, currentIndex, reviews.length]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, reviews.length - itemsPerPage);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, reviews.length - itemsPerPage);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };
  
  // Auto slide
  useEffect(() => {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
  }, [itemsPerPage, currentIndex, reviews.length]);

  const handleSubmitReview = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newReview.name.trim() || !newReview.text.trim()) {
          setFormError('Please fill in all fields.');
          return;
      }
      
      const reviewToAdd: Testimonial = {
          id: Date.now(), // Unique ID
          name: newReview.name,
          text: newReview.text,
          rating: newReview.rating
      };

      const updatedReviews = [reviewToAdd, ...reviews];
      setReviews(updatedReviews);
      
      // Reset and close
      setNewReview({ name: '', text: '', rating: 5 });
      setFormError('');
      setIsModalOpen(false);
      setCurrentIndex(0); // Jump to start to see new review
  };

  return (
    <section className="py-20 bg-primary/10 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-2">
             <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={24} className="fill-current text-primary" stroke="none" />)}
             </div>
          </div>
          <h2 className="text-4xl font-display font-bold text-secondary">
             {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)} Rating
          </h2>
          <p className="text-gray-600">Based on {reviews.length} Reviews</p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 inline-flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-transform hover:-translate-y-1 shadow-lg"
          >
            <PenLine size={16} /> Write a Review
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
            {/* Arrows */}
            {reviews.length > itemsPerPage && (
                <>
                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 z-20 bg-white p-3 rounded-full shadow-lg text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Previous review"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 z-20 bg-white p-3 rounded-full shadow-lg text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Next review"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Viewport */}
            <div className="overflow-hidden py-4 -mx-4 px-4"> 
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                >
                    {reviews.map((review) => (
                        <div 
                            key={review.id} 
                            className="flex-shrink-0 px-4"
                            style={{ width: `${100 / itemsPerPage}%` }}
                        >
                            <div className="bg-white p-8 rounded-2xl shadow-xl relative h-full flex flex-col justify-between transform transition-transform hover:-translate-y-1 duration-300">
                                <div>
                                    <div className="absolute -top-4 left-8 bg-primary text-white p-2 rounded-full shadow-lg">
                                        <Quote size={20} />
                                    </div>
                                    <p className="text-gray-600 mb-6 pt-4 italic text-lg leading-relaxed">"{review.text}"</p>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                    <span className="font-bold text-secondary text-lg truncate max-w-[60%]">{review.name}</span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={16} 
                                                fill={i < review.rating ? "currentColor" : "none"} 
                                                className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Dots */}
            {reviews.length > itemsPerPage && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: Math.ceil(reviews.length - itemsPerPage + 1) }).slice(0, 5).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>

        <div className="mt-12 text-center">
             <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-accent underline underline-offset-4">
                 Read More Reviews on Google
             </a>
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsModalOpen(false)}
              ></div>
              
              <div className="bg-white rounded-2xl w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-display font-bold text-xl text-secondary">Write a Review</h3>
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                          <X size={24} />
                      </button>
                  </div>
                  
                  <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
                      {formError && (
                          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100">
                              {formError}
                          </div>
                      )}
                      
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                          <input 
                              type="text" 
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors"
                              placeholder="John Doe"
                              value={newReview.name}
                              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                          />
                      </div>
                      
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Rating</label>
                          <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                      key={star}
                                      type="button"
                                      onClick={() => setNewReview({...newReview, rating: star})}
                                      className="focus:outline-none transform transition-transform active:scale-95 hover:scale-110"
                                  >
                                      <Star 
                                        size={32} 
                                        fill={star <= newReview.rating ? "#F59E0B" : "none"}
                                        className={star <= newReview.rating ? "text-primary" : "text-gray-300"}
                                      />
                                  </button>
                              ))}
                          </div>
                      </div>
                      
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Your Review</label>
                          <textarea 
                              rows={4}
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors resize-none"
                              placeholder="The food was amazing..."
                              value={newReview.text}
                              onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                          ></textarea>
                      </div>
                      
                      <button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-accent text-white font-bold py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                      >
                          <Send size={18} /> Submit Review
                      </button>
                  </form>
              </div>
          </div>
      )}
    </section>
  );
};

export default Testimonials;