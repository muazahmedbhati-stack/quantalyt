'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999999] bg-[#06070B] flex flex-col items-center justify-center select-none"
        >
          {/* Cyber ambient glow */}
          <div className="absolute w-96 h-96 rounded-full bg-primary/15 blur-[120px] pointer-events-none" />
          <div className="absolute w-72 h-72 rounded-full bg-accent/10 blur-[100px] pointer-events-none translate-y-12" />

          {/* Logo container with metallic pulsing frame */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-3xl border border-primary/40 border-dashed"
            />
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(108,142,255,0.4)]"
            >
              <Image
                src="/logo.jpg"
                alt="Quantalyt"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Brand Wordmark */}
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold tracking-[0.25em] text-white">
              QUANTA<span className="text-accent">LYT</span>
            </h2>
            <p className="font-mono text-[11px] tracking-widest text-white/40 mt-1 uppercase">
              Neural AI Systems & Enterprise Engineering
            </p>
          </div>

          {/* Progress bar container */}
          <div className="w-64 max-w-[80vw]">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 relative p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-white rounded-full shadow-[0_0_12px_#6C8EFF]"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM INITIALIZING...
              </span>
              <span>{Math.min(100, progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
