'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'AI Voice Demo', href: '#voice-demo' },
  { label: 'ROI Calculator', href: '#calculator' },
  { label: 'Case Studies', href: '#portfolio' },
  { label: 'Process', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#0A0C14]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo with 3D Chrome Emblem */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(108,142,255,0.4)] group-hover:scale-105 group-hover:border-accent transition-all duration-300">
            <Image
              src="/logo.jpg"
              alt="Quantalyt Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-[0.2em] text-white group-hover:text-accent transition-colors leading-none">
              QUANTALYT
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase mt-0.5">
              AI Systems Lab
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-xs font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors duration-200 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA & Direct Dial Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Direct Phone Dial with live pulse */}
          <a
            href="tel:03397444694"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-xs text-white/80 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] group-hover:text-emerald-400 transition-colors">
              +92 339 7444694
            </span>
          </a>

          {/* Consultation Button */}
          <button
            onClick={() => scrollTo('#contact')}
            className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white overflow-hidden group shadow-[0_0_25px_rgba(108,142,255,0.35)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-105" />
            <span className="relative flex items-center gap-1.5 z-10">
              <span>Book Strategy Call</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A0C14]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm font-medium tracking-wide text-white/80 hover:text-accent transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="tel:03397444694"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs"
                >
                  <Phone size={14} className="text-emerald-400" />
                  Call: +92 339 7444694
                </a>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-xs text-center"
                >
                  Book Discovery Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
