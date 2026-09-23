'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

const sentence =
  'We do not merely build websites. We architect high-velocity autonomous intelligence and enterprise digital infrastructure that eliminates thousands of manual operational hours, accelerates execution velocity, and unlocks an unfair competitive moat for our global partners.';

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: any;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ['#4A5568', '#FFFFFF']);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <span className="relative inline-block mr-2.5 sm:mr-4 my-1">
      <motion.span
        style={{ opacity, color, y }}
        className="inline-block transition-colors duration-150 font-display font-bold tracking-tight select-none"
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function TextScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = sentence.split(' ');

  return (
    <section
      ref={containerRef}
      className="py-32 sm:py-44 relative bg-[#06070B] overflow-hidden border-t border-white/5"
    >
      {/* Dynamic ambient orb moving with scroll */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Telemetry Tag */}
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold">
              ENGINEERING MANIFESTO // SCROLL TO ILLUMINATE
            </span>
          </div>

          {/* Scrubbing Text */}
          <div className="text-2xl sm:text-4xl lg:text-5xl leading-[1.3] text-left">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word
                  key={i}
                  word={word}
                  range={[start, end]}
                  progress={scrollYProgress}
                />
              );
            })}
          </div>

          {/* Metrics Pill Row underneath that fades in */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.7, 0.95], [0, 1]),
              y: useTransform(scrollYProgress, [0.7, 0.95], [20, 0]),
            }}
            className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                100% PRODUCTION READY
              </span>
              <span className="text-xs font-mono text-white/50">
                Next.js 14/15 • DeepSeek-R1 • Telephony
              </span>
            </div>

            <div className="font-mono text-xs text-white/40">
              Quantalyt Intelligence Core v2.4
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
