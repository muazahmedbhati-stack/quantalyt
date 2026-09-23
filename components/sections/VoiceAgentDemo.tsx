'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneCall, Mic, Volume2, Radio, Play, Square, Sparkles, CheckCircle2 } from 'lucide-react';

const demoScenarios = [
  {
    id: 'inbound-support',
    title: 'Inbound Customer Support',
    caller: 'Customer (Inbound)',
    agent: 'Quanta Voice (Autonomous)',
    latency: '340ms',
    transcript: [
      { speaker: 'Agent', text: 'Thank you for calling Quantalyt enterprise desk. My name is Quanta. Are you calling regarding a new AI deployment or existing client support?' },
      { speaker: 'Caller', text: 'Hi, we are a medical clinic in California looking to automate 1,200 incoming patient booking calls a week.' },
      { speaker: 'Agent', text: 'We specialize in HIPAA-compliant conversational telephony. Our voice agents integrate with EHR systems and schedule appointments in real time with zero hold time. Shall I connect you to our principal architect or send our technical overview?' },
      { speaker: 'Caller', text: 'Let’s get a technical proposal sent to my email.' },
      { speaker: 'Agent', text: 'Perfect. Confirming your email from caller ID, or please say your preferred address and our system will deliver the NDA and proposal immediately.' }
    ]
  },
  {
    id: 'outbound-sales',
    title: 'Outbound B2B Sales Qualification',
    caller: 'Prospect CEO',
    agent: 'Quanta Voice (Outbound)',
    latency: '410ms',
    transcript: [
      { speaker: 'Agent', text: 'Hi David, this is Alex from Quantalyt. I noticed your logistics platform just expanded to Texas. Quick question: are your dispatchers still manually coordinating carrier status updates?' },
      { speaker: 'Caller', text: 'Yes, it takes about 3 hours a day per dispatcher.' },
      { speaker: 'Agent', text: 'Understood. We recently automated that exact dispatch loop for a Dallas freight fleet, saving them 18 hours daily using autonomous SMS & voice sync. Would a 10-minute live demonstration this Thursday be worth exploring?' },
      { speaker: 'Caller', text: 'Actually yes, Thursday 2 PM EST works.' },
      { speaker: 'Agent', text: 'Calendar invitation dispatched for Thursday 2 PM EST. You will receive an automated SMS confirmation shortly. Have a great day David!' }
    ]
  },
  {
    id: 'booking-telephony',
    title: 'Real Estate Property Dispatch',
    caller: 'High-Intent Buyer',
    agent: 'Quanta Voice (Instant Lead)',
    latency: '290ms',
    transcript: [
      { speaker: 'Agent', text: 'Hello! You just submitted an inquiry regarding the penthouse on 5th Avenue. I am Quantalyt’s instant concierge. Are you looking to schedule a private tour this week?' },
      { speaker: 'Caller', text: 'Yes, can I view it on Saturday morning?' },
      { speaker: 'Agent', text: 'Checking the listing agent schedule... We have an exclusive private showing slot on Saturday at 11:00 AM. May I reserve that under your name?' },
      { speaker: 'Caller', text: 'Yes please, reserve Saturday 11 AM.' },
      { speaker: 'Agent', text: 'Confirmed. Gate entry code and VIP directions have been sent to your WhatsApp. Enjoy the tour!' }
    ]
  }
];

export default function VoiceAgentDemo() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleMessages, setVisibleMessages] = useState<number>(2);

  const scenario = demoScenarios[selectedScenario];

  useEffect(() => {
    setVisibleMessages(2);
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev < scenario.transcript.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [selectedScenario, isPlaying, scenario.transcript.length]);

  return (
    <section id="voice-demo" className="py-28 relative bg-[#0A0C14] overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <Radio size={13} className="text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              LIVE TELEPHONY SIMULATOR
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            AI VOICE AGENTS WITH <br />
            <span className="chrome-text">HUMAN-PARITY REALISM.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg font-sans">
            Hear and experience how Quantalyt’s autonomous voice telephony replaces offshore contact centers, answers customer calls in sub-500ms, and books qualified meetings into your CRM 24/7.
          </p>
        </div>

        {/* Interactive Simulator Shell */}
        <div className="max-w-4xl mx-auto chrome-card rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Top Bar: Scenario Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs text-white/80 uppercase">
                LATENCY BENCHMARK: <strong className="text-accent">{scenario.latency}</strong>
              </span>
            </div>

            {/* Scenario Buttons */}
            <div className="flex flex-wrap gap-2">
              {demoScenarios.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScenario(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedScenario === idx
                      ? 'bg-accent text-[#06070B] font-bold shadow-[0_0_15px_#A0B4FF]'
                      : 'bg-white/5 text-white/60 hover:text-white border border-white/5'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Call UI Visualizer */}
          <div className="my-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <PhoneCall size={26} className="animate-pulse" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg flex items-center gap-2">
                  <span>{scenario.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-400 border border-emerald-400/30">
                    LIVE CALL
                  </span>
                </div>
                <div className="text-xs font-mono text-white/40 mt-0.5">
                  Quantum Voice Pipeline • DeepSeek Cognitive Core
                </div>
              </div>
            </div>

            {/* Dynamic Waveform Simulation */}
            <div className="flex items-center gap-1.5 h-10 px-6 py-2 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="w-1.5 bg-accent rounded-full animate-wave-1" />
              <div className="w-1.5 bg-primary rounded-full animate-wave-2" />
              <div className="w-1.5 bg-emerald-400 rounded-full animate-wave-3" />
              <div className="w-1.5 bg-accent rounded-full animate-wave-4" />
              <div className="w-1.5 bg-primary rounded-full animate-wave-5" />
              <div className="w-1.5 bg-emerald-400 rounded-full animate-wave-1" />
              <div className="w-1.5 bg-accent rounded-full animate-wave-2" />
              <div className="w-1.5 bg-primary rounded-full animate-wave-4" />
            </div>
          </div>

          {/* Live Transcript Stream */}
          <div className="space-y-3.5 mb-8 min-h-[220px]">
            {scenario.transcript.slice(0, visibleMessages).map((msg, i) => {
              const isAgent = msg.speaker === 'Agent';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 text-sm ${isAgent ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
                      isAgent
                        ? 'bg-white/[0.05] border border-white/10 text-white/90 rounded-tl-sm'
                        : 'bg-primary/25 border border-primary/40 text-white rounded-tr-sm shadow-[0_0_20px_rgba(108,142,255,0.15)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono uppercase tracking-wider ${isAgent ? 'text-accent' : 'text-emerald-400'}`}>
                        {isAgent ? 'Quanta Autonomous Agent' : 'Customer'}
                      </span>
                    </div>
                    <p className="leading-relaxed font-sans">{msg.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Direct Call Action Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-white/[0.02] to-primary/20 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <span className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Phone size={20} />
              </span>
              <div>
                <div className="font-display font-semibold text-white text-sm">
                  Test our voice telephony live on your phone right now:
                </div>
                <div className="font-mono text-xs text-white/50">
                  Available 24/7 • Direct Engineering Hotline
                </div>
              </div>
            </div>

            <a
              href="tel:03397444694"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>CALL NOW: 0339 7444694</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
