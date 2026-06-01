import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Flame, ArrowRight } from 'lucide-react';

interface HeroProps {
  videoUrl: string;
  onOrderClick: () => void;
  onViewMenuClick: () => void;
}

export default function Hero({ videoUrl, onOrderClick, onViewMenuClick }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // HTML5 Canvas Fire Embers / Particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const maxParticles = 60;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 4 + 1.5;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = -(Math.random() * 2 + 1);
        this.opacity = Math.random() * 0.7 + 0.3;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        // Warm fiery ember colors: Fiery Orange (#FF6B00), Rich Gold (#FFC857), Crimson Red
        const r = Math.random();
        if (r < 0.6) {
          this.color = `rgba(255, 107, 0, ${this.opacity})`; // #FF6B00
        } else if (r < 0.9) {
          this.color = `rgba(255, 200, 87, ${this.opacity})`; // #FFC857
        } else {
          this.color = `rgba(230, 40, 10, ${this.opacity})`;
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;

        // Slight drift
        this.speedX += Math.sin(this.y / 30) * 0.02;

        if (this.y < -10 || this.opacity <= 0) {
          this.x = Math.random() * width;
          this.y = height + 10;
          this.size = Math.random() * 4 + 1.5;
          this.speedX = Math.random() * 1.5 - 0.75;
          this.speedY = -(Math.random() * 2 + 1);
          this.opacity = Math.random() * 0.7 + 0.3;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        // Add particle glow
        c.shadowBlur = this.size * 2.5;
        c.shadowColor = 'rgba(255, 107, 0, 0.8)';
        c.fill();
        c.restore();
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#080808] pt-24">

      {/* Cinematic Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          key={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
          style={{ transform: 'scale(1.02)' }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* HTML5 Fire Ember Canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Grid container */}
      <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 z-20 pointer-events-none">

        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left pointer-events-auto">
          {/* Flame element */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-10 h-[1px] bg-[#FF6B00]" />
            <span className="font-heading text-xs tracking-[0.2em] text-[#FFC857] flex items-center gap-2 font-black select-none uppercase">
              <Flame className="w-4 h-4 text-[#FF6B00] animate-pulse" /> The Ultimate Craft
            </span>
          </motion.div>

          {/* Large Anton Headline with staggered reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-hero text-7xl sm:text-8xl xl:text-[7rem] text-white uppercase leading-[0.8] tracking-tighter select-none mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-black"
          >
            FLAME<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FFA200] to-[#FFC857] filter drop-shadow-[0_0_15px_rgba(255,107,0,0.3)]">
              KISSED
            </span><br />
            BURGER.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-sm sm:text-base text-[#B8B8B8] max-w-lg mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-light"
          >
            Indulge in our dry-aged premium Wagyu beef patties, hand-forged with gold-infused glazes, smoked oak hickory char, and house-made culinary truffles. Taste the exquisite ritual of pure fire.
          </motion.p>

          {/* CTA buttons + Mobile Ticker side by side on mobile, buttons only on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col gap-4"
          >
            {/* On mobile: buttons left, ticker right. On md+: buttons stacked normally */}
            <div className="flex flex-row gap-3 md:gap-5 items-stretch">

              {/* Buttons column — always shown */}
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-5 flex-shrink-0">
                <button
                  onClick={onOrderClick}
                  className="px-5 md:px-8 py-3 md:py-4 rounded-[2px] bg-[#FF6B00] hover:bg-[#E05300] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] text-white font-sans text-[10px] md:text-xs tracking-widest font-black uppercase transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] cursor-pointer"
                >
                  Order Premium Direct <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </button>

                <button
                  onClick={onViewMenuClick}
                  className="px-5 md:px-8 py-3 md:py-4 rounded-[2px] border-2 border-white hover:border-[#FF6B00] bg-black/40 hover:bg-black/60 backdrop-blur-md text-white font-sans text-[10px] md:text-xs tracking-widest font-black uppercase transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] cursor-pointer group"
                >
                  Explore Menu <Play className="w-3 h-3 md:w-3.5 md:h-3.5 text-white group-hover:text-[#FFC857] transition-colors" />
                </button>
              </div>

              {/* Mobile-only inline 2x2 ticker — hidden on md+ */}
              <div className="flex md:hidden flex-1 grid grid-cols-2 gap-[1px] bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-[2px] overflow-hidden">
                <div className="flex flex-col items-center justify-center py-2 px-1 bg-[#080808]/90">
                  <span className="font-heading text-[11px] text-[#FF6B00] font-black tracking-tight leading-tight text-center">100% WAGYU</span>
                  <span className="text-[8px] font-mono tracking-wider text-[#B8B8B8] uppercase text-center leading-tight mt-0.5">Dry-Aged Cuts</span>
                </div>
                <div className="flex flex-col items-center justify-center py-2 px-1 bg-[#080808]/90">
                  <span className="font-heading text-[11px] text-[#FFC857] font-black tracking-tight leading-tight text-center">OAK SMOKED</span>
                  <span className="text-[8px] font-mono tracking-wider text-[#B8B8B8] uppercase text-center leading-tight mt-0.5">Charcoal Hearth</span>
                </div>
                <div className="flex flex-col items-center justify-center py-2 px-1 bg-[#080808]/90">
                  <span className="font-heading text-[11px] text-white font-black tracking-tight leading-tight text-center">EXPEDITE</span>
                  <span className="text-[8px] font-mono tracking-wider text-[#B8B8B8] uppercase text-center leading-tight mt-0.5">Hot &amp; Sealed</span>
                </div>
                <div className="flex flex-col items-center justify-center py-2 px-1 bg-[#080808]/90">
                  <span className="font-heading text-[11px] text-[#FF6B00] font-black tracking-tight leading-tight text-center">GOLD GLAZED</span>
                  <span className="text-[8px] font-mono tracking-wider text-[#B8B8B8] uppercase text-center leading-tight mt-0.5">Infused Honey</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Right Side - Empty for video visibility on desktop */}
        <div className="lg:col-span-5 hidden lg:block" />
      </div>

      {/* Desktop-only bottom ticker bar — hidden on mobile (md:block) */}
      <div className="relative mt-auto left-0 w-full bg-[#080808]/90 border-t border-[#FF6B00]/20 py-5 z-20 pointer-events-none overflow-hidden hidden md:block">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-0 text-center">

          {/* Stat 1 */}
          <div className="flex flex-col">
            <span className="font-heading text-xl text-[#FF6B00] font-black tracking-tighter">100% WAGYU</span>
            <span className="text-[10px] font-mono tracking-widest text-[#B8B8B8] uppercase">Premium Dry-Aged Cuts</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col border-l border-white/10">
            <span className="font-heading text-xl text-[#FFC857] font-black tracking-tighter">OAK SMOKED</span>
            <span className="text-[10px] font-mono tracking-widest text-[#B8B8B8] uppercase">Authentic Charcoal Hearth</span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col border-l border-white/10">
            <span className="font-heading text-xl text-white font-black tracking-tighter">EXPEDITE COURIER</span>
            <span className="text-[10px] font-mono tracking-widest text-[#B8B8B8] uppercase">Delivered Hot &amp; Sealed</span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col border-l border-white/10">
            <span className="font-heading text-xl text-[#FF6B00] font-black tracking-tighter">GOLD GLAZED</span>
            <span className="text-[10px] font-mono tracking-widest text-[#B8B8B8] uppercase">Signature Infused Honey</span>
          </div>

        </div>
      </div>

    </section>
  );
}