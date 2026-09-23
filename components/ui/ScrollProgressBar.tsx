'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none bg-transparent">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-full bg-gradient-to-r from-primary via-accent to-emerald-400 shadow-[0_0_15px_#6C8EFF]"
      />
    </div>
  );
}
