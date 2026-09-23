'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Terminal, Cpu, ShieldCheck, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

const sprintSteps = [
  {
    step: '01',
    phase: 'DISCOVERY SPRINT',
    duration: 'DAY 1 - 3',
    title: 'Architecture & AI Feasibility Audit',
    description:
      'We conduct an in-depth audit of your data pipelines, legacy systems, and business bottlenecks. We define exact ROI targets, latency SLAs, and select optimal foundational models (DeepSeek-R1, GPT-4, Llama 3) under a strict NDA.',
    deliverable: 'Technical Specification & ROI Roadmap',
    icon: Terminal,
  },
  {
    step: '02',
    phase: 'RAPID PROTOTYPE',
    duration: 'WEEK 1 - 2',
    title: 'Neural Fine-Tuning & Sandbox Build',
    description:
      'Our team constructs the core AI agents, voice telephony logic, and web interface in rapid 48-hour iterations. You receive private staging access with daily asynchronous video demos to test functionality in real-time.',
    deliverable: 'Functional Interactive Sandbox',
    icon: Cpu,
  },
  {
    step: '03',
    phase: 'HARDENING & AUDIT',
    duration: 'WEEK 3',
    title: 'Load Testing & Enterprise Hardening',
    description:
      'We simulate real-world spikes, adversarial prompt injection tests, latency edge cases, and compliance audits (SOC-2, HIPAA-ready). We ensure sub-500ms voice response and 99.9% uptime guarantees.',
    deliverable: 'Security & Penetration Audit Report',
    icon: ShieldCheck,
  },
  {
    step: '04',
    phase: 'AUTONOMOUS LAUNCH',
    duration: 'WEEK 4+',
    title: 'Production Cutover & Neural Telemetry',
    description:
      'We orchestrate zero-downtime production deployment with 100% intellectual property transfer. We configure 24/7 autonomous monitoring dashboards, automated error self-healing, and dedicated Slack engineering support.',
    deliverable: 'Full IP & Codebase Handover',
    icon: Rocket,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 150,
    damping: 25,
  });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-28 relative bg-[#0A0C14] border-t border-white/5 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <Rocket size={13} className="text-accent" />
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
              SCROLL-LINKED SPRINT ROADMAP
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            RAPID SPRINT TO <br />
            <span className="chrome-text">PRODUCTION VELOCITY.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg font-sans">
            No bureaucratic delays or endless scoping meetings. Watch the engineering progress bar illuminate as you scroll down our battle-tested deployment sprint.
          </p>
        </div>

        {/* 4 Step Timeline with Central Scroll Laser */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Scroll-Linked Laser Line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-emerald-400 shadow-[0_0_15px_#A0B4FF]"
            />
          </div>

          {/* Steps Grid */}
          <div className="space-y-12 lg:space-y-20 relative z-10">
            {sprintSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.step}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Card Content (half width) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full lg:w-1/2 chrome-card rounded-3xl p-8 border border-white/15 hover:border-accent/40 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono tracking-widest text-accent font-bold px-2.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                        PHASE {step.step} // {step.duration}
                      </span>
                      <step.icon size={22} className="text-white/40" />
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans mb-6">
                      {step.description}
                    </p>

                    <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <CheckCircle2 size={14} className="flex-shrink-0" />
                      <span>{step.deliverable}</span>
                    </div>
                  </motion.div>

                  {/* Center Node Indicator (Desktop) */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0A0C14] border-2 border-accent/60 shadow-[0_0_20px_rgba(160,180,255,0.4)] text-accent font-mono font-bold text-sm flex-shrink-0 z-20">
                    {step.step}
                  </div>

                  {/* Empty Spacer (half width) */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(108,142,255,0.4)] group"
          >
            <span>Book 30-Min Architecture Discovery</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
