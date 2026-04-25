import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-6">
            Interactive Learning Portal
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-white mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          Understand The <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 relative inline-block">
            Election Process
            {/* Subtle glow underneath */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-[40px] opacity-30 -z-10"></span>
          </span>
        </motion.h1>

        <motion.p 
          className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          A highly interactive, transparent, and modern guide to how your vote counts. 
          Demystifying the system step by step.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a href="#process" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-bold uppercase text-xs text-black transition-all hover:bg-cyan-400 w-full sm:w-auto">
            <span className="flex items-center gap-2">
              Explore Timeline
              <ChevronRight className="transition-transform group-hover:translate-x-1" size={16} />
            </span>
          </a>
          
          <a href="#guide" className="group h-12 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-8 font-bold uppercase text-xs text-slate-300 transition-all hover:bg-white/10 hover:border-white/40 w-full sm:w-auto">
            Interactive Guide
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] mb-3">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-neon-cyan"
            animate={{ y: [-24, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
