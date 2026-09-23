'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

const serviceOptions = [
  'Full-Stack Web Development',
  'Cross-Platform App Development',
  'Autonomous AI Agents & Swarms',
  'Inbound/Outbound AI Voice Telephony',
  'Custom RAG Chatbot (DeepSeek/GPT-4)',
  'Enterprise Workflow Automation (n8n)',
  'Dedicated Enterprise AI Pod (Custom)',
];

const budgetOptions = [
  '$1,200 - $3,500 (Sprint MVP)',
  '$3,500 - $7,500 (Growth AI Stack)',
  'Custom Scope (Enterprise Pod)',
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: serviceOptions[0],
    budget: budgetOptions[1],
    message: '',
  });

  const copyPhone = () => {
    navigator.clipboard.writeText('03397444694');
    setCopied(true);
    toast.success('Phone number copied: 03397444694');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sessionId = typeof window !== 'undefined' ? sessionStorage.getItem('q_session') || '' : '';
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sessionId }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success('Consultation request dispatched! An architect will reach out within 4 business hours.');
      } else {
        toast.error('Network glitch. Please call us directly at 0339 7444694.');
      }
    } catch {
      toast.error('Network error. Please call us at 0339 7444694.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative bg-[#0A0C14] border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <Send size={13} className="text-accent" />
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
              INITIATE COLLABORATION
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            START YOUR <br />
            <span className="chrome-text">TECHNICAL SPRINT.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg font-sans">
            Speak directly with our senior AI engineers. No sales reps or account manager gatekeepers. We evaluate technical feasibility within 4 hours.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Phone & Rapid Contact (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Direct Phone Call Card */}
            <div className="p-8 rounded-3xl chrome-card border border-emerald-500/30 shadow-[0_15px_40px_rgba(16,185,129,0.15)] relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                  24/7 HOTLINE AVAILABLE
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Direct Call Hotline
              </h3>
              <p className="text-xs text-white/60 font-sans mb-6">
                Call our direct business line now to discuss your project scope or test our voice AI in real-time.
              </p>

              {/* Number display */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">DIRECT PHONE NUMBER</div>
                  <a
                    href="tel:03397444694"
                    className="font-mono text-xl sm:text-2xl font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    0339 7444694
                  </a>
                </div>

                <button
                  onClick={copyPhone}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Copy phone number"
                >
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:03397444694"
                  className="py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs text-center transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={14} />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/923397444694?text=Hi%20Quantalyt!%20I'm%20interested%20in%20deploying%20an%20AI%20solution."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono font-bold text-xs text-center transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Direct Channel Details */}
            <div className="p-6 rounded-3xl chrome-card border border-white/10 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">OFFICIAL EMAIL</div>
                  <a href="mailto:hello@quantalyt.com" className="text-sm font-mono text-white hover:text-accent">
                    hello@quantalyt.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">RESPONSE VELOCITY</div>
                  <div className="text-xs text-white/80 font-mono">
                    Sub-4 Hours • Mon - Sat (EST / PST Overlap)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">CONFIDENTIALITY GUARANTEE</div>
                  <div className="text-xs text-white/80 font-sans">
                    Mutual NDA signed prior to code/data inspection.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 chrome-card rounded-3xl p-8 sm:p-10 border border-white/15">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Discovery Request Received
                </h3>
                <p className="text-sm text-white/60 max-w-md mx-auto mb-6">
                  Your project specs have been sent directly to our lead AI architect. Expect our initial feasibility feedback within 4 hours.
                </p>
                <a
                  href="tel:03397444694"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white hover:border-emerald-400"
                >
                  <Phone size={14} className="text-emerald-400" />
                  Need faster response? Call: 0339 7444694
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alexander Vance"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2 block">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2 block">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2 block">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2 block">
                      Core Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D0D2B] border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors font-sans"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#10121E]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2 block">
                      Estimated Budget (USD)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D0D2B] border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors font-sans"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#10121E]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2 block">
                    Project Scope & Bottlenecks *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe what manual processes you need automated, your current tech stack, and your target launch timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-accent transition-colors font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary via-accent to-white text-slate-950 font-mono font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(108,142,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>DISPATCHING SPECS...</span>
                  ) : (
                    <>
                      <span>Submit Architecture Scope</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
