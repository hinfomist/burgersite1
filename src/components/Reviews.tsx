import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data';
import { Star, Flame, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="relative w-full py-24 bg-[#080808] border-b border-white/5 overflow-hidden">
      
      {/* Decorative backing spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6B00]/4 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-[#FF6B00]" />
            <span className="font-heading text-xs tracking-[0.2em] text-[#FFC857] font-black uppercase">CONNOISSEUR FEEDBACK</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tighter uppercase font-black">
            GLOWING <span className="text-[#FF6B00]">COMMENDATIONS</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#FF6B00] mx-auto mt-4" />
        </div>

        {/* Testimonial Active Display Card */}
        <div className="relative min-h-[300px] flex flex-col justify-center items-center text-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0e0e0e] border border-white/10 rounded-[2px] p-8 sm:p-12 shadow-2xl relative w-full flex flex-col items-center justify-center"
            >
              {/* Massive stylized quotation icon */}
              <Quote className="absolute top-6 left-8 text-white/5 w-16 h-16 pointer-events-none" />
              
              {/* Star Rating Render */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-[#FFC857] text-[#FFC857] filter drop-shadow-[0_0_4px_rgba(255,200,87,0.3)]" 
                  />
                ))}
              </div>

              {/* Review Text comment */}
              <p className="font-sans text-sm sm:text-lg text-white leading-relaxed font-light italic mb-8 max-w-2xl px-2">
                "{review.text}"
              </p>

              {/* Author name & title */}
              <div className="text-center">
                <span className="font-heading text-xl sm:text-2xl text-[#FF6B00] tracking-tighter uppercase block font-black">
                  {review.name}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#B8B8B8] uppercase block mt-1">
                  {review.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial slider controllers */}
          <div className="flex items-center gap-5 mt-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-[2px] border border-white/10 bg-[#121212]/30 hover:border-[#FF6B00] text-[#B8B8B8] hover:text-[#FF6B00] transition-colors duration-300 flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-[1px] transition-all duration-300 cursor-pointer ${
                    index === i 
                      ? 'bg-[#FF6B00] w-6' 
                      : 'bg-white/10 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-[2px] border border-white/10 bg-[#121212]/30 hover:border-[#FF6B00] text-[#B8B8B8] hover:text-[#FF6B00] transition-colors duration-300 flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
