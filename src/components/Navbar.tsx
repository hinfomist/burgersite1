import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ShoppingCart, Menu, X, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentView: 'restaurant' | 'admin';
  setView: (view: 'restaurant' | 'admin') => void;
  onOrderClick: () => void;
}

export default function Navbar({ currentView, setView, onOrderClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      setView('restaurant');
      // wait a tiny bit for render
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-4 shadow-lg shadow-[#000]/50'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo left */}
        <div 
          onClick={() => { setView('restaurant'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="relative">
            <Flame className="w-8 h-8 text-[#FF6B00] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 filter drop-shadow-[0_0_8px_#FF6B00]" />
            <div className="absolute inset-0 bg-[#FF6B00] opacity-30 blur-md rounded-full scale-70 group-hover:scale-100 transition-all duration-300"></div>
          </div>
          <span className="font-heading text-2xl tracking-tighter text-white uppercase font-black">
            CHARRED<span className="text-[#FF6B00]">.</span>
          </span>
        </div>

        {/* Menu Center (Desktop) */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => scrollToSection('home')}
            className="text-xs font-sans tracking-widest text-[#B8B8B8] hover:text-[#FF6B00] transition-colors duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B00] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="text-xs font-sans tracking-widest text-[#B8B8B8] hover:text-[#FF6B00] transition-colors duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B00] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-xs font-sans tracking-widest text-[#B8B8B8] hover:text-[#FF6B00] transition-colors duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B00] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="text-xs font-sans tracking-widest text-[#B8B8B8] hover:text-[#FF6B00] transition-colors duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6B00] hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            Reviews
          </button>
          {currentView === 'admin' && (
            <button
              onClick={() => setView('restaurant')}
              className="text-[10px] font-mono font-bold tracking-widest text-[#FFC857] flex items-center gap-1.5 px-3 py-1 bg-[#FFC857]/10 rounded-[2px] border border-[#FFC857]/20 hover:bg-[#FFC857]/25 duration-300"
            >
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" /> EXIT ADMIN
            </button>
          )}
        </div>

        {/* Order Now CTA Right (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {currentView !== 'admin' && (
            <button
              onClick={onOrderClick}
              className="relative overflow-hidden group px-6 py-2.5 rounded-[2px] bg-[#FF6B00] text-white font-sans text-xs tracking-widest font-extrabold uppercase cursor-pointer hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Order Now <ShoppingCart className="w-3.5 h-3.5" />
              </span>
              <div className="absolute top-0 left-0 w-full h-full bg-[#E05300] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
            </button>
          )}
        </div>

        {/* Mobile Hamburger menu */}
        <div className="flex md:hidden items-center gap-3">
          {currentView === 'admin' && (
            <button
              onClick={() => setView('restaurant')}
              className="px-2 py-1 bg-[#FFC857]/10 rounded-[2px] border border-[#FFC857]/20 text-[10px] text-[#FFC857] font-mono"
            >
              EXIT ADMIN
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#FF6B00] transition-colors focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Glassmorphism backdrop) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#080808]/95 backdrop-blur-3xl border-b border-[#FF6B00]/10 flex flex-col px-6 py-8 gap-6 shadow-2xl z-40 md:hidden"
          >
            <button
              onClick={() => scrollToSection('home')}
              className="text-left py-2 font-heading text-lg tracking-wider text-[#B8B8B8] hover:text-[#FF6B00] duration-250 uppercase border-b border-white/5 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-left py-2 font-heading text-lg tracking-wider text-[#B8B8B8] hover:text-[#FF6B00] duration-250 uppercase border-b border-white/5 cursor-pointer"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 font-heading text-lg tracking-wider text-[#B8B8B8] hover:text-[#FF6B00] duration-250 uppercase border-b border-white/5 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-left py-2 font-heading text-lg tracking-wider text-[#B8B8B8] hover:text-[#FF6B00] duration-250 uppercase border-b border-white/5 cursor-pointer"
            >
              Reviews
            </button>
            
            <button
              onClick={() => { setMobileMenuOpen(false); onOrderClick(); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[2px] bg-[#FF6B00] text-white font-sans text-xs tracking-widest font-extrabold uppercase mt-4"
            >
              Order Now <ShoppingCart className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
