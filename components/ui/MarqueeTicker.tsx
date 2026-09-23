'use client';

import { Sparkles, Cpu, ShieldCheck, Zap, Activity } from 'lucide-react';

const serviceTags = [
  'FULL-STACK AI WEB DEVELOPMENT',
  'AUTONOMOUS AI AGENTS',
  'INBOUND & OUTBOUND VOICE AGENTS',
  'ENTERPRISE WORKFLOW AUTOMATION',
  'CUSTOM RAG CHATBOTS',
  'DEEPSEEK-R1 NEURAL INFERENCE',
  'MOBILE APP DEVELOPMENT',
  'CRM & ERP SYSTEM ARCHITECTURE',
  'SUB-SECOND PERFORMANCE',
];

const techStack = [
  'NEXT.JS 14/15',
  'REACT',
  'TYPESCRIPT',
  'PYTHON',
  'NVIDIA NIM',
  'DEEPSEEK-R1',
  'SUPABASE',
  'DOCKER',
  'N8N AUTOMATION',
  'ELEVENLABS VOICE',
  'VAPI TELEPHONY',
  'TWILIO API',
  'TAILWIND CSS',
  'POSTGRESQL',
  'OPENAI GPT-4',
];

export default function MarqueeTicker() {
  return (
    <div className="relative py-8 overflow-hidden border-y border-white/5 bg-[#06070B]/80 select-none">
      {/* Glow overlays at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#06070B] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#06070B] to-transparent z-10 pointer-events-none" />

      {/* Marquee 1: Capabilities */}
      <div className="flex overflow-hidden py-1">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {[...serviceTags, ...serviceTags].map((tag, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-xs font-mono font-semibold tracking-widest text-white/70 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#A0B4FF]" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee 2: Tech Stack (Reverse) */}
      <div className="flex overflow-hidden py-2 mt-2 border-t border-white/[0.03]">
        <div className="animate-marquee-reverse flex items-center gap-8 whitespace-nowrap">
          {[...techStack, ...techStack].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-white/40 hover:text-accent transition-colors"
            >
              <span className="text-white/20">/</span>
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
