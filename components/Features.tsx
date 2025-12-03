import React from 'react';
import { Star, Zap, Wallet } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Star className="text-primary w-8 h-8" />,
      title: "5.0 ★★★★★ Rating",
      desc: "Loved by 66+ happy customers"
    },
    {
      icon: <Zap className="text-primary w-8 h-8" />,
      title: "Freshly Prepared",
      desc: "Flavour first, every time"
    },
    {
      icon: <Wallet className="text-primary w-8 h-8" />,
      title: "Pocket Friendly",
      desc: "₹1–200 per person"
    }
  ];

  return (
    <div className="bg-white py-12 border-b border-gray-100 relative z-20 -mt-10 mx-4 md:mx-auto max-w-5xl rounded-xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="bg-orange-50 p-4 rounded-full">
              {feature.icon}
            </div>
            <h3 className="font-bold text-lg text-secondary">{feature.title}</h3>
            <p className="text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;