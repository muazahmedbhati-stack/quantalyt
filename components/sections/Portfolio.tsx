'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Shield, Cpu, Bot, Code2, Globe } from 'lucide-react';

const categories = ['All', 'AI Agents', 'Voice AI', 'Web Platforms', 'Automation'];

const caseStudies = [
  {
    id: 'fintech-underwriting',
    title: 'Autonomous Loan Underwriting & Risk Engine',
    client: 'Fintech Capital · San Francisco, CA',
    category: 'AI Agents',
    metric: '4.8x Faster Origination',
    roi: '$1.4M Saved Annually',
    description:
      'Engineered an autonomous multi-agent credit analysis pipeline that extracts data from bank feeds, tax filings, and credit bureaus to generate comprehensive risk memos in 90 seconds.',
    tech: ['Python', 'DeepSeek-R1', 'FastAPI', 'PostgreSQL', 'Docker'],
    tags: ['Autonomous AI', 'Fintech', 'Risk Analysis'],
  },
  {
    id: 'healthcare-telephony',
    title: 'HIPAA-Compliant Inbound Voice Booking System',
    client: 'Apex Medical Group · Austin, TX',
    category: 'Voice AI',
    metric: '94% Call Resolution',
    roi: 'Zero Patient Hold Time',
    description:
      'Deployed an intelligent voice telephony agent answering 2,500 incoming clinic calls weekly, authenticating patients, rescheduling appointments, and pushing updates to EHR systems in real time.',
    tech: ['Vapi', 'ElevenLabs', 'Twilio', 'Node.js', 'HIPAA Secure'],
    tags: ['AI Telephony', 'Voice Agent', 'Healthcare'],
  },
  {
    id: 'luxury-ecommerce',
    title: 'Next-Gen E-Commerce with Vector Neural Search',
    client: 'Vanguard Retail · New York, NY',
    category: 'Web Platforms',
    metric: '+340% Conversions',
    roi: 'Sub-200ms Load Time',
    description:
      'Architected a headless Next.js 14 flagship web platform featuring AI visual search, predictive inventory modeling, and sub-second global edge caching across 45 countries.',
    tech: ['Next.js 14', 'React', 'Tailwind', 'Stripe', 'Pinecone Vector'],
    tags: ['Web Development', 'High Performance', 'E-Commerce'],
  },
  {
    id: 'legal-rag',
    title: 'Enterprise M&A Due Diligence & Contract RAG',
    client: 'Sterling & Co. Legal · Chicago, IL',
    category: 'AI Agents',
    metric: '80 hrs/wk Saved',
    roi: '99.98% Citation Accuracy',
    description:
      'Built a private local vector intelligence platform analyzing 500-page deal agreements in minutes with highlighted clause risk ratings and automated redline suggestions.',
    tech: ['LangGraph', 'DeepSeek-R1', 'ChromaDB', 'Python', 'FastAPI'],
    tags: ['RAG Pipeline', 'Contract Review', 'Legal Tech'],
  },
  {
    id: 'real-estate-crm',
    title: 'Instant Voice Dispatch & Automated WhatsApp CRM',
    client: 'Prime Miami Luxury Brokerage · Miami, FL',
    category: 'Automation',
    metric: '5.2x Faster Lead Conversion',
    roi: '<15s Lead Outreach',
    description:
      'Connected MLS property feeds to automated WhatsApp and phone agents, calling buyers within 15 seconds of portal submission to book private agent walkthroughs.',
    tech: ['n8n', 'WhatsApp API', 'Supabase', 'Vapi Voice', 'Webhooks'],
    tags: ['Workflow Automation', 'Real Estate', 'CRM'],
  },
  {
    id: 'logistics-swarm',
    title: 'Multi-Agent Freight Logistics & Tracking Swarm',
    client: 'LoneStar Freight Carriers · Dallas, TX',
    category: 'Automation',
    metric: '10,000+ Loads Routed',
    roi: '62% Less Dispatch Overhead',
    description:
      'Orchestrated a swarm of autonomous software bots that parse broker rate confirmations, dispatch drivers via SMS, and track real-time GPS telemetry without human intervention.',
    tech: ['CrewAI', 'Python', 'Twilio SMS', 'Docker', 'PostgreSQL'],
    tags: ['Multi-Agent Swarm', 'Supply Chain', 'Automation'],
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? caseStudies
    : caseStudies.filter((c) => c.category === filter);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="py-28 relative bg-[#06070B] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <TrendingUp size={13} className="text-accent" />
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
              PROVEN BUSINESS RESULTS
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            WORK THAT GENERATES <br />
            <span className="chrome-text">MEASURABLE ALPHA.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg font-sans">
            We don’t measure success by lines of code written. We measure by hours reclaimed, revenue unblocked, and market dominance secured for our partners.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-primary to-accent text-white font-bold shadow-[0_0_20px_rgba(108,142,255,0.4)]'
                  : 'bg-white/[0.03] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl chrome-card p-8 border border-white/10 flex flex-col justify-between hover:border-accent/40 transition-all duration-500 hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Top: Location Badge + Primary Metric */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono text-white/40 truncate">
                      {item.client}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex-shrink-0">
                      {item.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 font-sans">
                    {item.description}
                  </p>

                  {/* ROI Highlight Card */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-6 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/50">MEASURED IMPACT</span>
                    <span className="text-xs font-mono font-bold text-white">{item.roi}</span>
                  </div>
                </div>

                {/* Footer Tech Stack & Trigger */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={scrollToContact}
                    className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white text-xs font-mono tracking-wider transition-colors flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Request Architecture Blueprint</span>
                    <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
