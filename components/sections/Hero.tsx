'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  Phone,
  Bot,
  Zap,
  ShieldCheck,
  Globe,
  Radio,
  Sparkles,
  Terminal,
} from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const cardScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.12]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const cardRotateZ = useTransform(scrollYProgress, [0, 1], [0, -6]);

  // 3D Card mouse tilt physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    damping: 20,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVoiceDemo = () => {
    document.getElementById('voice-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#06070B] cyber-grid [perspective:1200px]"
    >
      {/* Dynamic ambient cyber glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Kinetic Copy & CTAs (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Enterprise Client Beacon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-[11px] font-mono tracking-widest text-white/80 uppercase">
                ACCEPTING Q3/Q4 ENTERPRISE CLIENTS • USA & GLOBAL
              </span>
            </motion.div>

            {/* Kinetic Headline with Chrome Shimmer */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              ENGINEERING <br />
              <span className="chrome-text">AUTONOMOUS AI</span> <br />
              <span className="text-white">& HIGH-VELOCITY WEB.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/60 max-w-xl mb-8 leading-relaxed font-sans">
              Quantalyt designs and ships high-ticket AI agents, voice telephony automation, and custom web platforms for founders and US enterprises ready to automate operations and 10x market velocity.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm tracking-wide shadow-[0_0_35px_rgba(108,142,255,0.4)] hover:shadow-[0_0_50px_rgba(108,142,255,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Initiate Project Scope</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="tel:03397444694"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white font-mono text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Phone size={15} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>Call Direct: 0339 7444694</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">150+</div>
                <div className="text-[11px] font-mono text-white/40 uppercase mt-0.5">Systems Shipped</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-accent tracking-tight">&lt;500ms</div>
                <div className="text-[11px] font-mono text-white/40 uppercase mt-0.5">AI Voice Latency</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">99.8%</div>
                <div className="text-[11px] font-mono text-white/40 uppercase mt-0.5">SLA Uptime</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Chrome Hologram & Telemetry with Scroll Reactivity (5 Cols) */}
          <motion.div
            style={{ scale: cardScale, rotateX: cardRotateX, rotateZ: cardRotateZ }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Perspective Card Container */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md aspect-[4/5] [perspective:1000px] cursor-pointer"
            >
              <motion.div
                style={{
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  transformStyle: 'preserve-3d',
                }}
                className="w-full h-full rounded-3xl chrome-card p-6 flex flex-col justify-between relative overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              >
                {/* Specular light sweep */}
                <div className="absolute inset-0 specular-shine pointer-events-none" />

                {/* Card Header Telemetry */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono tracking-wider text-white/70">
                      QUANTALYT // CORE v2.4
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-accent/80 px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    DEEPSEEK-R1 READY
                  </span>
                </div>

                {/* Centerpiece: Real 3D Chrome Emblem Display */}
                <div className="relative my-auto flex flex-col items-center justify-center py-6">
                  {/* Rotating orbital rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-56 h-56 rounded-full border border-primary/20 border-dashed pointer-events-none"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-64 h-64 rounded-full border border-accent/15 border-dotted pointer-events-none"
                  />

                  {/* Chrome Logo with 3D Depth */}
                  <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-white/30 shadow-[0_0_60px_rgba(108,142,255,0.4)] [transform:translateZ(40px)]">
                    <Image
                      src="/logo.jpg"
                      alt="Quantalyt 3D Chrome Logo"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="text-center mt-5 [transform:translateZ(30px)]">
                    <h3 className="font-display text-xl font-bold tracking-[0.2em] text-white">
                      QUANTALYT
                    </h3>
                    <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase mt-1">
                      Autonomous Intelligence Unit
                    </p>
                  </div>
                </div>

                {/* Card Footer Telemetry Data Widgets */}
                <div className="grid grid-cols-2 gap-3 relative z-10 pt-4 border-t border-white/10 [transform:translateZ(25px)]">
                  {/* Live Voice AI Widget */}
                  <div
                    onClick={scrollToVoiceDemo}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-white/50">VOICE ENGINE</span>
                      <Radio size={11} className="text-emerald-400 animate-pulse" />
                    </div>
                    {/* Mini Waveform */}
                    <div className="flex items-center gap-1 h-3.5">
                      <div className="w-1 bg-accent rounded-full animate-wave-1" />
                      <div className="w-1 bg-primary rounded-full animate-wave-2" />
                      <div className="w-1 bg-emerald-400 rounded-full animate-wave-3" />
                      <div className="w-1 bg-accent rounded-full animate-wave-4" />
                      <div className="w-1 bg-primary rounded-full animate-wave-5" />
                    </div>
                  </div>

                  {/* US Sync Widget */}
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-white/50">US PIPELINE</span>
                      <Globe size={11} className="text-primary" />
                    </div>
                    <div className="text-xs font-mono font-semibold text-white/90">
                      EST / PST SYNC
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
