import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ShoppingCart, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedMenuProps {
  products: Product[];
  onOrderProduct: (product: Product) => void;
}

export default function FeaturedMenu({ products, onOrderProduct }: FeaturedMenuProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Signature', 'Elite', 'Poultry', 'Vegetarian'];

  const filteredProducts = activeCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.75;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="menu" className="relative w-full py-24 bg-[#080808] border-b border-white/5 overflow-hidden">
      
      {/* Absolute faint decorative glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#FF6B00]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#FFC857]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-[#FF6B00]" />
              <span className="font-heading text-xs tracking-[0.2em] text-[#FFC857] font-black uppercase">HOT SELECTION</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tighter uppercase font-black">
              FEATURED <span className="text-[#FF6B00]">GASTRONOMY</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#FF6B00] mt-3" />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-[2px] border border-white/10 hover:border-[#FF6B00] bg-[#121212] hover:bg-[#121212]/30 text-[#B8B8B8] hover:text-[#FF6B00] transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-[2px] border border-white/10 hover:border-[#FF6B00] bg-[#121212] hover:bg-[#121212]/30 text-[#B8B8B8] hover:text-[#FF6B00] transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-[2px] text-xs font-sans tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF6B00] border-[#FF6B00] text-white font-black'
                  : 'bg-transparent border-white/10 text-[#B8B8B8] hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Card Slider */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-[300px] sm:w-[350px] shrink-0 snap-start group"
            >
              {/* Card Container */}
              <div 
                className="h-full flex flex-col justify-between bg-[#0e0e0e] border border-white/10 rounded-[2px] p-6 hover:border-[#FF6B00]/40 hover:shadow-[0_10px_30px_-10px_rgba(255,107,0,0.2)] transform group-hover:-translate-y-2 transition-all duration-500 ease-out relative overflow-hidden"
              >
                {/* Background soft radial glow on hover */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF6B00]/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Category badge */}
                  <span className="inline-block px-3 py-1 bg-[#FFC857]/5 border border-[#FFC857]/15 rounded-[2px] text-[9px] font-mono tracking-widest text-[#FFC857] uppercase mb-4">
                    {product.category}
                  </span>

                  {/* Burger Image block with dynamic glow */}
                  <div className="relative w-full aspect-square rounded-[2px] overflow-hidden mb-6 bg-gradient-to-b from-white/2 to-transparent p-4 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-108 group-hover:rotate-3 transition-transform duration-500"
                    />
                    {/* Golden luxury glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B00]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Culinary name */}
                  <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-tighter uppercase leading-tight group-hover:text-[#FF6B00] transition-colors duration-300 font-extrabold">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <p className="font-heading text-[#FFC857] text-2xl mt-1 tracking-tighter font-black">
                    ${product.price.toFixed(2)}
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs text-[#B8B8B8] leading-relaxed mt-4 font-light">
                    {product.description}
                  </p>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => onOrderProduct(product)}
                  className="w-full mt-8 py-3.5 rounded-[2px] bg-[#141414] hover:bg-[#FF6B00] text-white hover:text-black font-sans text-xs tracking-widest font-black uppercase transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:border-[#FF6B00] cursor-pointer"
                >
                  Order <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="w-full py-16 text-center text-[#B8B8B8] font-sans text-sm">
              No products found in this category. Custom products can be added in the Admin Panel!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
