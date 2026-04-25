import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative font-display text-4xl font-bold md:text-6xl">
        <span className="text-white">SYS</span>
        <span className="text-neon-cyan">INIT</span>
        
        <motion.div 
          className="absolute -right-8 top-0 h-2 w-2 rounded-full bg-neon-blue"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>

      <div className="mt-8 h-px w-64 md:w-96 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(0,243,255,0.8)]"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>
      <div className="mt-4 font-mono text-xs text-white/50 tracking-widest uppercase">
        Loading Assets {progress}%
      </div>
    </motion.div>
  );
}
