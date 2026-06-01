import React from 'react';
import { motion } from 'motion/react';
import { Flame, Star, Disc, Play } from 'lucide-react';

interface ShowcaseProps {
  secondaryVideoUrl: string;
}

export default function SellersShowcase({ secondaryVideoUrl }: ShowcaseProps) {
  // Elements that float around
  const ingredients = [
    { name: '🔥 Fire Embers', size: 'text-sm', x: '10%', y: '15%', delay: 0, duration: 8 },
    { name: '🧄 Wild Garlic', size: 'text-xs', x: '80%', y: '20%', delay: 1.5, duration: 10 },
    { name: '🧅 Onion Rings', size: 'text-sm', x: '75%', y: '75%', delay: 0.5, duration: 9 },
    { name: '🌶️ Chili Peppers', size: 'text-xs', x: '15%', y: '70%', delay: 2, duration: 11 },
    { name: '🌿 Fresh Herbs', size: 'text-sm', x: '5%', y: '45%', delay: 1, duration: 12 },
    { name: '🍃 Coriander', size: 'text-xs', x: '85%', y: '48%', delay: 2.5, duration: 7 }
  ];

  return (
    <section className="relative w-full py-28 bg-[#080808] border-b border-white/5 overflow-hidden">

      {/* Floating ingredients backing layers */}
      {ingredients.map((ing, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none select-none px-4 py-2 rounded-full border border-white/5 bg-[#121212]/40 backdrop-blur-md text-white font-mono ${ing.size} font-semibold tracking-wider flex items-center gap-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] z-10`}
          style={{ left: ing.x, top: ing.y }}
          animate={{
            y: [0, -25, 10, -5, 0],
            x: [0, 15, -10, 5, 0],
            rotate: [1, 15, -10, 5, 1],
          }}
          transition={{
            duration: ing.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: ing.delay,
            ease: 'easeInOut'
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-ping" />
          {ing.name}
        </motion.div>
      ))}

      {/* Extreme luxury central glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B00]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-20">

        {/* Left Column: Visual Storytelling Text */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">

          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-[#FF6B00] animate-pulse" />
            <span className="font-heading text-xs tracking-[0.2em] text-[#FFC857] font-black uppercase">CINEMATIC RETREAT</span>
          </div>

          <h2 className="font-hero text-4xl sm:text-6xl text-white leading-[0.85] uppercase tracking-tighter mb-8 font-black pr-8 sm:pr-0">
            HEIRLOOM QUALITY.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFC857]">
              UNCONDITIONAL UMAMI.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#B8B8B8] leading-relaxed mb-6 font-light">
            We source our dry-aged beef cuts exclusively from hand-selected certified heritage organic farms. Each cut spends 28 days curing inside our proprietary Himalayan salt aging chamber, intensifying the meat's native rich marbling.
          </p>

          <p className="font-sans text-sm sm:text-base text-[#B8B8B8] leading-relaxed mb-8 font-light">
            When your order is placed, our head chef hand-shapes each patty and sears it directly over open white-oak hickory coals. Graced by gold leaf glazes and signature white truffle aioli, it is served rare, crisp, and pure.
          </p>

          {/* Quick Stats list */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
            <div className="flex flex-col">
              <span className="font-heading text-2.5xl text-[#FF6B00] font-black flex items-center gap-1 tracking-tighter">28<span className="text-xs text-[#FFC857] font-black">DAYS</span></span>
              <span className="text-[9px] font-mono tracking-widest text-[#B8B8B8] uppercase mt-1">Dry-Aged Chamber</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-6">
              <span className="font-heading text-2.5xl text-white font-black flex items-center gap-1 tracking-tighter">100%<span className="text-xs text-[#FF6B00] font-black">WAGYU</span></span>
              <span className="text-[9px] font-mono tracking-widest text-[#B8B8B8] uppercase mt-1">Certified Cuts</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-6">
              <span className="font-heading text-2.5xl text-[#FFC857] font-black flex items-center gap-1 tracking-tighter">850°<span className="text-xs text-white font-black">F</span></span>
              <span className="text-[9px] font-mono tracking-widest text-[#B8B8B8] uppercase mt-1">Hearth Sear</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Commercial video screen window */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-lg aspect-video rounded-[2px] p-[3px] bg-gradient-to-r from-[#FF6B00]/50 to-[#FFC857]/50 shadow-[0_20px_50px_rgba(255,107,0,0.15)] group overflow-hidden">

            {/* Ambient background element */}
            <div className="absolute inset-x-0 -bottom-10 h-32 bg-gradient-to-t from-[#FF6B00]/40 to-transparent blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Golden frame reflection highlights */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 via-transparent to-white/10 pointer-events-none z-10 rounded-[2px]" />

            {/* Cinematic video screen wrapper */}
            <div className="relative w-full h-full rounded-[2px] overflow-hidden bg-[#0a0a0a]">
              <video
                key={secondaryVideoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.02]"
              >
                <source src={secondaryVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Status indicator badge - Anti-AI slop but beautiful restaurant status */}
              <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-[2px] border border-white/10 flex items-center gap-2 z-25 pointer-events-none shadow-md">
                <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase">CINEMATIC PREVIEW</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
