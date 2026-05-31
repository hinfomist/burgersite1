import React from 'react';
import { Flame, Landmark, Mail, Phone, Calendar, Clock, Instagram, Facebook, Twitter, MessageSquare } from 'lucide-react';

interface FooterProps {
  whatsappNumber: string;
  setView: (view: 'restaurant' | 'admin') => void;
}

export default function Footer({ whatsappNumber, setView }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#050505] pt-20 pb-8 text-[#B8B8B8] font-sans border-t border-white/5 overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FF6B00]/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFC857]/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1: Logo & About block */}
        <div className="flex flex-col text-left">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group mb-6 inline-self-start"
          >
            <Flame className="w-7 h-7 text-[#FF6B00] filter drop-shadow-[0_0_6px_#FF6B00]" />
            <span className="font-heading text-2xl tracking-tighter text-white uppercase font-black">
              Charred<span className="text-[#FF6B00]">.</span>
            </span>
          </div>
          <p className="text-xs text-[#B8B8B8] leading-relaxed mb-6 font-light">
            Crafting michelin-class dry-aged Wagyu burger gastronomies over open white-oak hearth embers. Unconditional luxury taste, forged from elemental fires.
          </p>
          
          {/* Social Media links */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 rounded-[2px] border border-white/10 hover:border-[#FF6B00] bg-white/2 hover:bg-white/5 hover:text-[#FF6B00] transition-colors duration-300 flex items-center justify-center cursor-pointer">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-[2px] border border-white/10 hover:border-[#FFC857] bg-white/2 hover:bg-white/5 hover:text-[#FFC857] transition-colors duration-300 flex items-center justify-center cursor-pointer">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-[2px] border border-white/10 hover:border-[#FF6B00] bg-white/2 hover:bg-white/5 hover:text-[#FF6B00] transition-colors duration-300 flex items-center justify-center cursor-pointer">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Navigation Links */}
        <div className="flex flex-col text-left">
          <h4 className="font-heading text-lg tracking-tighter text-white uppercase mb-6 font-black">
            Gourmet Journeys
          </h4>
          <ul className="space-y-3.5 text-xs">
            <li>
              <button 
                onClick={() => handleScrollTo('home')}
                className="hover:text-[#FF6B00] transition-colors duration-300 cursor-pointer"
              >
                Return to Top
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollTo('menu')}
                className="hover:text-[#FFC857] transition-colors duration-300 cursor-pointer"
              >
                Explore Gastronomies
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollTo('about')}
                className="hover:text-[#FF6B00] transition-colors duration-300 cursor-pointer"
              >
                The Charred Standard
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollTo('reviews')}
                className="hover:text-[#FFC857] transition-colors duration-300 cursor-pointer"
              >
                Epicurean Critiques
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Whatsapp direct */}
        <div className="flex flex-col text-left">
          <h4 className="font-heading text-lg tracking-tighter text-white uppercase mb-6 font-black">
            Immediate Dispatch
          </h4>
          <ul className="space-y-4 text-xs">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>{whatsappNumber}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#FFC857] shrink-0" />
              <span>concierge@charredburgers.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Landmark className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>48 Sovereign Plaza, Suite Luxury</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Hours & Hidden admin handle */}
        <div className="flex flex-col text-left">
          <h4 className="font-heading text-lg tracking-tighter text-white uppercase mb-6 font-black">
            Elemental Hours
          </h4>
          <div className="flex flex-col gap-4 text-xs font-light">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#FFC857] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">TUESDAY - SUNDAY</span>
                <span className="text-[10px] text-[#B8B8B8] mt-1 block">12:00 PM - 11:30 PM PM</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">MONDAY RETREAT</span>
                <span className="text-[10px] text-[#B8B8B8] mt-1 block">Salt age chambers maintenance</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Luxury Bottom Row & Hidden backdoor Admin Link */}
      <div className="relative max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-wider">
        <span>
          © {currentYear} CHARRED. CO. ALL UNCONDITIONAL RIGHTS RESERVED.
        </span>

        <div className="flex items-center gap-6">
          <span className="hover:text-white transition-colors duration-300 cursor-pointer">
            PRIVACY
          </span>
          <span className="hover:text-white transition-colors duration-300 cursor-pointer">
            LEGAL
          </span>
          
          {/* Secret Hidden Doorbell for Admin login panel */}
          <button
            onClick={() => {
              setView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-white/10 hover:text-[#FF6B00] transition-colors duration-500 font-mono text-[9px] uppercase font-bold flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none"
            title="Sovereign Control Backdoor"
          >
            ● ACCESS GATEWAY
          </button>
        </div>
      </div>

    </footer>
  );
}
