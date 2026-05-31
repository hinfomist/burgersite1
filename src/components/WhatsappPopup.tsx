import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { CheckCircle2, MessageSquare, X, DollarSign, ShieldCheck } from 'lucide-react';

interface WhatsappPopupProps {
  product: Product | null;
  adminPhone: string;
  onClose: () => void;
}

export default function WhatsappPopup({ product, adminPhone, onClose }: WhatsappPopupProps) {
  if (!product) return null;

  useEffect(() => {
    // Generate text template
    const messageText = `Hello,

I would like to place an order.

Product:
${product.name}

Price:
$${product.price.toFixed(2)}

Please confirm availability, delivery details and Cash on Delivery process.

Thank you.`;

    // Strip out non-numeric characters for wa.me API format
    const cleanedPhone = adminPhone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(messageText)}`;
    
    // Automatically open WhatsApp in new tab
    const timer = setTimeout(() => {
       window.open(whatsappUrl, '_blank');
    }, 1500);

    return () => clearTimeout(timer);
  }, [product, adminPhone]);

  return (
    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center p-4">
      {/* Dark frosted overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Success Modal Container */}
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        className="relative bg-[#0d0d0d] border border-[#FF6B00]/40 rounded-[2px] p-8 max-w-md w-full shadow-[0_0_50px_rgba(255,107,0,0.3)] text-center overflow-hidden z-10"
      >
        {/* Subtle fire accent header */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#FFC857]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#B8B8B8] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Checkmark icon with pulsing waves */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-[#FF6B00]/10 rounded-full border border-[#FF6B00]/30">
          <CheckCircle2 className="w-10 h-10 text-[#FF6B00] filter drop-shadow-[0_0_8px_#FF6B00]" />
          <div className="absolute inset-0 rounded-full border border-[#FF6B00]/20 animate-ping z-0 scale-90" />
        </div>

        {/* Narrative titles */}
        <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-tighter mb-2 font-black">
          ORDER <span className="text-[#FF6B00]">CREATED!</span>
        </h3>
        <p className="font-sans text-xs text-[#B8B8B8] tracking-widest uppercase mb-6 font-semibold">
          Your reservation is being prepared
        </p>

        {/* Order Details box */}
        <div className="bg-[#121212]/55 rounded-[2px] p-5 border border-white/10 text-left mb-6">
          <div className="flex items-center gap-3.5 mb-3 border-b border-white/5 pb-3">
            <img 
              src={product.image} 
              alt={product.name} 
              referrerPolicy="no-referrer"
              className="w-12 h-12 object-contain bg-white/2 rounded-[1px] p-1"
            />
            <div>
              <span className="font-heading text-lg text-white font-extrabold leading-none block uppercase tracking-tighter">
                {product.name}
              </span>
              <span className="text-xs font-heading tracking-wider text-[#FFC857] block mt-1">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
          
          {/* Status notes indicators */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[11px] text-[#B8B8B8] font-sans">
              <DollarSign className="w-3.5 h-3.5 text-[#FF6B00]" /> 
              <span>Payment: <strong className="text-white">Cash on Delivery Available</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#B8B8B8] font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC857]" />
              <span>Priority dispatch sealed container</span>
            </div>
          </div>
        </div>

        {/* Action text */}
        <p className="font-sans text-xs sm:text-sm text-[#B8B8B8] leading-relaxed mb-8">
          Please check WhatsApp to continue delivery and payment process.<br/>
          We are opening your chat automatically in a moment...
        </p>

        {/* Direct Button */}
        <button
          onClick={() => {
            const messageText = `Hello,

I would like to place an order.

Product:
${product.name}

Price:
$${product.price.toFixed(2)}

Please confirm availability, delivery details and Cash on Delivery process.

Thank you.`;
            const cleanedPhone = adminPhone.replace(/\D/g, '');
            window.open(`https://wa.me/${cleanedPhone}?text=${encodeURIComponent(messageText)}`, '_blank');
          }}
          className="w-full py-4 rounded-[2px] bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:shadow-[0_0_25px_rgba(255,107,0,0.5)] text-white font-sans text-xs tracking-widest font-black uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.01]"
        >
          <MessageSquare className="w-4 h-4 fill-white" /> Continue on WhatsApp
        </button>

      </motion.div>
    </div>
  );
}
