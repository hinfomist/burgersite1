import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Route, Award, Heart } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <Sparkles className="w-8 h-8 text-[#FF6B00]" />,
      title: 'Fresh Ingredients',
      desc: 'Sourced daily from organic family-owned farms. Completely natural, free from preservatives and artificial flavoring.'
    },
    {
      icon: <Route className="w-8 h-8 text-[#FFC857]" />,
      title: 'Fast & Hot Delivery',
      desc: 'Shipped inside sealed premium temperature-controlled carriers to guarantee steakhouse freshness right at your door.'
    },
    {
      icon: <Award className="w-8 h-8 text-[#FF6B00]" />,
      title: 'Premium Taste',
      desc: 'Curated by Michelin-recognized culinary artists pairing authentic dry-aged cuts with gold-infused glazes.'
    },
    {
      icon: <Heart className="w-8 h-8 text-[#FFC857]" />,
      title: 'Customer Favorite',
      desc: 'Voted the #1 luxury burger experience. Renowned for consistent quality, rich wood-carbon char, and flawless taste.'
    }
  ];

  return (
    <section id="about" className="relative w-full py-24 bg-[#080808] border-b border-white/5 overflow-hidden">
      
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#FF6B00]/3 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#FFC857]/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-heading text-xs tracking-[0.2em] text-[#FFC857] font-black uppercase">THE CHARRED STANDARD</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tighter uppercase mt-3 font-black">
            WHY CONNOISSEURS <span className="text-[#FF6B00]">CHOOSE US</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#FF6B00] mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative h-full rounded-[2px] bg-[#0e0e0e] border border-white/10 p-6 hover:border-[#FF6B00]/40 hover:shadow-[0_15px_30px_-10px_rgba(255,107,0,0.15)] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Backing hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon layout block */}
              <div className="relative w-16 h-16 rounded-[2px] bg-white/2 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#FF6B00]/10 group-hover:border-[#FF6B00]/20 transition-colors duration-300">
                <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {card.icon}
                </div>
              </div>

              {/* Card headers */}
              <h3 className="font-heading text-xl text-white tracking-tighter uppercase mb-3 group-hover:text-[#FF6B00] transition-colors duration-300 font-extrabold">
                {card.title}
              </h3>

              {/* Body */}
              <p className="font-sans text-xs text-[#B8B8B8] leading-relaxed font-light">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
