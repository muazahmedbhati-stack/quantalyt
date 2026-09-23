'use client';

import { motion } from 'framer-motion';
import { Phone, MessageSquare, Bot, Sparkles } from 'lucide-react';

interface QuickActionBarProps {
  onOpenChat: () => void;
}

export default function QuickActionBar({ onOpenChat }: QuickActionBarProps) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]"
    >
      <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-full bg-[#0D0E1A]/85 backdrop-blur-2xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
        {/* Direct Phone Dial */}
        <a
          href="tel:03397444694"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-white font-mono text-xs transition-all group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <Phone size={13} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-semibold">Call: 0339 7444694</span>
          <span className="sm:hidden font-semibold">Call Now</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/923397444694?text=Hi%20Quantalyt!%20I'm%20interested%20in%20an%20AI%20solution."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-white font-mono text-xs transition-all"
        >
          <MessageSquare size={13} className="text-[#25D366]" />
          <span className="hidden sm:inline font-semibold">WhatsApp</span>
        </a>

        {/* Chat Here / Quanta AI */}
        <button
          onClick={onOpenChat}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-mono text-xs shadow-[0_0_20px_rgba(108,142,255,0.4)] transition-all font-semibold"
        >
          <Bot size={14} className="text-white" />
          <span>Chat Here</span>
        </button>
      </div>
    </motion.div>
  );
}
