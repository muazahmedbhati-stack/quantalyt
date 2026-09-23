'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const trailSpringConfig = { damping: 35, stiffness: 100 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailXSpring = useSpring(trailX, trailSpringConfig);
  const trailYSpring = useSpring(trailY, trailSpringConfig);

  const isHovering = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      trailX.set(e.clientX - 20);
      trailY.set(e.clientY - 20);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        isHovering.current = true;
        cursorRef.current?.classList.add('scale-150', 'opacity-50');
      }
    };

    const handleMouseOut = () => {
      isHovering.current = false;
      cursorRef.current?.classList.remove('scale-150', 'opacity-50');
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[99999] mix-blend-difference transition-transform duration-150"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[99998] border border-primary/60"
        style={{ x: trailXSpring, y: trailYSpring }}
      />
    </>
  );
}
