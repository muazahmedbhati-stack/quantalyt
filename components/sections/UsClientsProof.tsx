'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Clock, FileCode, MessageSquare, Zap, Lock, Globe, PhoneCall } from 'lucide-react';

const enterprisePillars = [
  {
    icon: Clock,
    title: 'EST / PST Timezone Synchronized',
    description:
      'We operate with dedicated US business hour overlap (Eastern & Pacific), ensuring real-time daily syncs, zero latency communication, and instant incident response.',
    badge: 'Real-Time Sync',
  },
  {
    icon: Lock,
    title: 'Strict Bilateral NDA & Enterprise Security',
    description:
      'Every engagement is guarded by ironclad non-disclosure agreements, end-to-end data encryption, and zero data leakage to public AI training datasets.',
    badge: 'Confidentiality First',
  },
  {
    icon: FileCode,
    title: '100% Intellectual Property Transfer',
    description:
      'You own all code, repositories, fine-tuned weights, API keys, and deployment infrastructure outright. No vendor lock-in. No licensing royalties.',
    badge: 'Total Ownership',
  },
  {
    icon: MessageSquare,
    title: 'Direct Slack / WhatsApp War-Room',
    description:
      'No ticketing queue or middleman account managers. You speak directly with our principal AI engineers via dedicated Slack or WhatsApp channels.',
    badge: 'Direct Engineering',
  },
];

export default function UsClientsProof() {
  return (
    <section className="py-24 relative bg-[#0A0C14] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <Globe size={13} className="text-accent" />
            <span className="text-[11px] font-mono tracking-widest text-white/80 uppercase">
              GLOBAL ENTERPRISE STANDARD
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            BUILT FOR US CLIENTS. <br />
            <span className="chrome-text">ENGINEERED FOR SCALE.</span>
          </h2>

          <p className="text-white/60 text-base leading-relaxed font-sans">
            Working with an international AI studio shouldn’t mean compromised communication or slow iteration. We match Silicon Valley engineering rigor with 24/7 velocity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {enterprisePillars.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl chrome-card border border-white/10 flex flex-col justify-between hover:border-accent/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-accent">
                    <p.icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{p.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-sans">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
