import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    
    // We try to make it smooth by tracking position without setState delays
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white hidden sm:block mix-blend-difference"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      {/* Large glowing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-blue bg-neon-blue/10 sm:block blur-[1px]"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'var(--color-neon-purple)' : 'var(--color-neon-blue)',
          backgroundColor: isHovering ? 'rgba(176, 38, 255, 0.1)' : 'rgba(0, 243, 255, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }}
      />
    </>
  );
}
