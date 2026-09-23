'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Sprint MVP',
    badge: 'RAPID PROTOTYPE',
    price: '$1,200',
    unit: '/ fixed scope',
    timeline: '10-Day Turnaround',
    description: 'Perfect for startups and businesses wanting to validate an AI agent or high-performance web MVP with extreme speed.',
    features: [
      'Next.js 14/15 High-Velocity Web Platform',
      '1 Custom AI Agent or RAG Knowledge Chatbot',
      'DeepSeek-R1 / GPT-4 API Integration',
      'Lead Capture & Supabase CRM Connection',
      '100% Codebase & IP Ownership Handover',
      '14 Days Dedicated Post-Launch Support',
    ],
    cta: 'Launch Sprint MVP',
    highlight: false,
  },
  {
    name: 'Growth AI Stack',
    badge: 'MOST POPULAR',
    price: '$3,500',
    unit: '/ fixed scope',
    timeline: '3-Week Deployment',
    description: 'Full-scale automated infrastructure for companies ready to eliminate manual workflows and deploy AI voice agents.',
    features: [
      'Everything in Sprint MVP',
      'Inbound & Outbound AI Voice Agent Telephony',
      'Sub-500ms Conversational Latency Pipeline',
      'Multi-Agent Autonomous Workflow Swarm (n8n)',
      'Enterprise CRM & Slack Real-Time Integration',
      'Adversarial Security & Prompt Hardening',
      '30 Days Dedicated Slack Engineering Support',
      'Weekly Sprint Demos & Architecture Calls',
    ],
    cta: 'Deploy Growth AI Stack',
    highlight: true,
  },
  {
    name: 'Enterprise Pod',
    badge: 'DEDICATED UNIT',
    price: 'Custom',
    unit: '/ tailored scope',
    timeline: 'Dedicated Pod',
    description: 'A dedicated pod of senior AI architects and full-stack engineers building and maintaining your proprietary AI ecosystem.',
    features: [
      'Everything in Growth AI Stack',
      'Dedicated Senior AI Architects (EST / PST Synced)',
      'Proprietary Model Fine-Tuning (DeepSeek / Llama)',
      'Multi-Tenant SaaS / ERP Custom Architecture',
      'Strict Bilateral NDA & Enterprise Compliance',
      'Sub-Second Voice & Web Global CDN',
      'Guaranteed 99.9% Production SLA Support',
      'Unlimited Revisions & Continuous Iteration',
    ],
    cta: 'Request Enterprise Scope',
    highlight: false,
  },
];

export default function Pricing() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-28 relative bg-[#06070B] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <Zap size={13} className="text-accent" />
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
              TRANSPARENT VALUE
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            INVESTMENT IN <br />
            <span className="chrome-text">MEASURABLE SCALE.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg font-sans">
            Clear, fixed-scope engineering packages with zero hidden markups. 100% IP ownership transferred upon project delivery.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1.5 ${
                tier.highlight
                  ? 'bg-gradient-to-b from-primary/30 via-[#10121E] to-[#0A0C14] border-2 border-accent/50 shadow-[0_25px_60px_rgba(108,142,255,0.25)]'
                  : 'chrome-card border border-white/10'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono tracking-widest uppercase text-accent font-semibold px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                  {tier.badge}
                </span>
                <span className="text-xs font-mono text-white/40">{tier.timeline}</span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-xs text-white/60 mb-6 font-sans leading-relaxed">{tier.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/10">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-xs font-mono text-white/40">{tier.unit}</span>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-sans">
                      <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3.5 rounded-2xl text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
                  tier.highlight
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_25px_rgba(108,142,255,0.5)] hover:scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote Hotline */}
        <div className="mt-14 text-center">
          <p className="text-xs font-mono text-white/50 mb-3">
            HAVE CUSTOM ENTERPRISE REQUIREMENTS OR NEED IMMEDIATE ASSISTANCE?
          </p>
          <a
            href="tel:03397444694"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white font-mono text-xs transition-all text-emerald-400"
          >
            <Phone size={13} />
            <span>Direct Line: +92 339 7444694 (24/7 Hotline)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
