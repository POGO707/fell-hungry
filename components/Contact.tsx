import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-20 bg-gray-900 text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <h2 className="text-3xl font-display font-bold">Visit Us</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Address</h3>
                  <p className="text-gray-400">
                    Near P N Das College, beside Mallick Pharmacy,<br/>
                    Shantinagar, Palta, Barrackpore,<br/>
                    Jafarpur, West Bengal — 743122
                  </p>
                  <a href="https://maps.google.com" target="_blank" className="text-primary text-sm mt-2 inline-block hover:underline">Get Directions</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Hours</h3>
                  <p className="text-gray-400">Open Daily<br/>Closes at 10 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-gray-400">082407 13903</p>
                </div>
              </div>

              <div className="pt-4">
                <a
                    href="https://wa.me/918240713903"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-bold transition-colors w-full justify-center"
                >
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Map & Form */}
          <div className="lg:w-2/3 flex flex-col gap-8">
            {/* Embedded Map */}
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-gray-800">
              <iframe
                title="The Hungry Hive Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.4245648580556!2d88.3745!3d22.7752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ2JzMwLjciTiA4OMKwMjInMjguMiJF!5e0!3m2!1sen!2sin!4v1625123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            {/* Quick Contact Form */}
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Send a Message</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        required
                        className="bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:border-primary w-full"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        required
                        className="bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:border-primary w-full"
                         value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                </div>
                <textarea 
                    placeholder="Your Message" 
                    rows={3}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:border-primary w-full mb-4"
                     value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                ></textarea>
                <button 
                    type="submit" 
                    className="bg-primary hover:bg-accent text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 w-full md:w-auto"
                >
                    {submitted ? 'Sent!' : <><Send size={18} /> Send Message</>}
                </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;