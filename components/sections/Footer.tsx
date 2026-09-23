'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUpRight, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

const serviceLinks = [
  'Web Development',
  'App Development',
  'AI Chatbots',
  'AI Voice Agents',
  'Autonomous AI Agents',
  'Enterprise Automation',
];

const companyLinks = [
  { label: 'Case Studies', href: '#portfolio' },
  { label: 'Voice AI Demo', href: '#voice-demo' },
  { label: 'ROI Calculator', href: '#calculator' },
  { label: 'Engineering Process', href: '#how-it-works' },
  { label: 'Pricing Models', href: '#pricing' },
  { label: 'Direct Consultation', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050609] border-t border-white/10 text-white overflow-hidden">
      {/* Top Banner: Direct Hotline */}
      <div className="bg-gradient-to-r from-primary/20 via-[#10121E] to-accent/20 border-b border-white/5 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
              DIRECT ENGINEERING HOTLINE • 24/7 OPEN
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Ready to automate your operations and 10x velocity?
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:03397444694"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
            >
              <Phone size={14} />
              <span>Call Direct: 0339 7444694</span>
            </a>

            <button
              onClick={() => scrollTo('#contact')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs border border-white/10 transition-colors"
            >
              Request Scoping Call
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_25px_rgba(108,142,255,0.4)]">
                <Image
                  src="/logo.jpg"
                  alt="Quantalyt Chrome Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-[0.2em] text-white block">
                  QUANTALYT
                </span>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  AI Systems & Full-Stack Lab
                </span>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed max-w-sm mb-6 font-sans">
              High-ticket AI engineering studio architecting autonomous agents, voice telephony automation, and ultra-high-velocity web platforms for US enterprises and global founders.
            </p>

            <div className="space-y-2.5 font-mono text-xs text-white/70">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-400" />
                <a href="tel:03397444694" className="hover:text-emerald-400 transition-colors">
                  +92 339 7444694 (Voice & WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-accent" />
                <a href="mailto:hello@quantalyt.com" className="hover:text-accent transition-colors">
                  hello@quantalyt.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <MapPin size={13} />
                <span>Global Delivery • EST & PST Synchronization</span>
              </div>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-white/60">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-white/60">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Assistance Col */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Direct Hotline</span>
            </h4>
            <div className="space-y-3">
              <a
                href="tel:03397444694"
                className="block p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors"
              >
                <div className="text-[10px] font-mono text-white/40 uppercase">PHONE & VOICE AI</div>
                <div className="text-xs font-mono font-bold text-white hover:text-emerald-400 mt-0.5">
                  0339 7444694
                </div>
              </a>

              <a
                href="https://wa.me/923397444694?text=Hi%20Quantalyt!%20I'm%20interested%20in%20an%20AI%20solution."
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors text-white"
              >
                <div className="text-[10px] font-mono text-[#25D366] uppercase">WHATSAPP CHAT</div>
                <div className="text-xs font-mono font-semibold mt-0.5">
                  Instant Response 24/7
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>
            © {new Date().getFullYear()} QUANTALYT LABS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
            <span className="text-accent font-bold">DeepSeek-R1</span>
            <span>& Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
