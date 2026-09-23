'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Bot,
  PhoneCall,
  Workflow,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Full-Stack Web Development',
    tag: 'NEXT.JS 14/15 FLAGSHIP ARCHITECTURE',
    metric: '99+ Lighthouse Score',
    description:
      'We engineer ultra-fast, conversion-obsessed web platforms built on Next.js 14/15, React, and TypeScript. Designed with headless architecture, global edge CDNs, sub-second load times, and airtight technical SEO to dominate competitive search rankings.',
    features: [
      'Next.js 14/15 Server Actions & App Router',
      'Sub-Second Global Edge Load Time (Vercel / Cloudflare)',
      'Headless CMS, E-Commerce & Stripe Billing',
      '100% Core Web Vitals & Dynamic Structured Data (JSON-LD)',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js'],
    accent: '#6C8EFF',
    gradient: 'from-[#6C8EFF]/25 via-[#10121E] to-[#0A0C14]',
    icon: Code2,
  },
  {
    number: '02',
    title: 'Cross-Platform App Development',
    tag: 'FLUID 60FPS NATIVE MOBILE APPS',
    metric: 'Native-Level Speed',
    description:
      'High-performance mobile applications engineered for iOS and Android using React Native and Flutter. Features fluid gesture physics, offline synchronization, biometric encryption, and native hardware bridge integrations.',
    features: [
      'Single Codebase for Both Apple iOS & Google Android',
      'Fluid 60fps Native Gesture Physics & Micro-Interactions',
      'Real-Time Supabase / Firebase Offline Data Sync',
      'Apple In-App Purchases, Stripe Subscriptions & Biometrics',
    ],
    tech: ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin', 'Firebase'],
    accent: '#A0B4FF',
    gradient: 'from-[#A0B4FF]/25 via-[#10121E] to-[#0A0C14]',
    icon: Smartphone,
  },
  {
    number: '03',
    title: 'Custom AI Chatbots (RAG)',
    tag: 'POWERED BY NVIDIA DEEPSEEK-R1 & GPT-4',
    metric: '85% Auto-Resolution',
    description:
      'Cognitive conversational AI agents custom-trained on your enterprise knowledgebase, PDFs, API endpoints, and internal databases. Capable of zero-hallucination answers, complex customer qualification, and real-time CRM updates.',
    features: [
      'Vector Database Embeddings & Hybrid RAG Retrieval',
      'NVIDIA DeepSeek-R1 & OpenAI Multi-Model Orchestration',
      'Omnichannel Deployment: Website Widget, WhatsApp, Slack',
      'Autonomous CRM Lead Routing & Calendar Booking Sync',
    ],
    tech: ['DeepSeek-R1', 'NVIDIA NIM', 'LangChain', 'Pinecone', 'Python'],
    accent: '#8B5CF6',
    gradient: 'from-purple-500/25 via-[#10121E] to-[#0A0C14]',
    icon: Bot,
  },
  {
    number: '04',
    title: 'AI Voice Agents & Telephony',
    tag: 'HUMAN-PARITY INBOUND & OUTBOUND CALLING',
    metric: '<500ms Voice Latency',
    description:
      'Conversational AI voice agents capable of conducting natural inbound support and outbound sales discovery calls with sub-500ms response time. Replaces expensive overseas call centers with 24/7 tireless voice workers.',
    features: [
      'Sub-500ms Ultra-Low Conversational Voice Latency',
      'Inbound Clinic/Service Booking & Customer Triage',
      'Outbound B2B Lead Qualification & Warm Transfers',
      'Automated Call Recording, Transcripts & CRM Push',
    ],
    tech: ['Vapi', 'ElevenLabs', 'Retell AI', 'Twilio', 'Deepgram', 'Whisper'],
    accent: '#00E5A0',
    gradient: 'from-emerald-500/25 via-[#10121E] to-[#0A0C14]',
    icon: PhoneCall,
  },
  {
    number: '05',
    title: 'Autonomous AI Agents & Swarms',
    tag: 'COGNITIVE MULTI-STEP DIGITAL WORKERS',
    metric: '40+ hrs/wk Saved',
    description:
      'Autonomous software agents that execute multi-step knowledge work end-to-end: market research, competitor monitoring, invoice data extraction, automated code synthesis, and continuous data reconciliation.',
    features: [
      'Multi-Agent Swarm Orchestration with CrewAI & LangGraph',
      'Intelligent PDF, Financial Document & Invoice Extraction',
      'Autonomous Web Scraping & Semantic Synthesis Loops',
      'Self-Healing Logic with Automated Failover Handling',
    ],
    tech: ['CrewAI', 'LangGraph', 'Auto-GPT', 'Python', 'FastAPI', 'Docker'],
    accent: '#00F0FF',
    gradient: 'from-cyan-500/25 via-[#10121E] to-[#0A0C14]',
    icon: Cpu,
  },
  {
    number: '06',
    title: 'Enterprise Workflow Automation',
    tag: 'END-TO-END BUSINESS ORCHESTRATION',
    metric: '10x Process Velocity',
    description:
      'Comprehensive automation architecture connecting your sales, marketing, and operations stack into seamless autopilot pipelines. Zero manual copy-pasting between Salesforce, QuickBooks, HubSpot, Slack, and custom databases.',
    features: [
      'Custom n8n, Make.com & Webhook Cloud Infrastructure',
      'Automated Revenue, Billing & Stripe Billing Pipelines',
      'Enterprise Incident Alerting & Multi-Channel Escalation',
      'Full API Custom Connector Development & Maintenance',
    ],
    tech: ['n8n', 'Make.com', 'Zapier', 'PostgreSQL', 'Docker', 'Webhooks'],
    accent: '#F59E0B',
    gradient: 'from-amber-500/25 via-[#10121E] to-[#0A0C14]',
    icon: Workflow,
  },
];

function StackingCard({
  service,
  index,
  total,
}: {
  service: typeof services[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const topOffset = 100 + index * 24;

  return (
    <div
      ref={cardRef}
      style={{ top: `${topOffset}px` }}
      className="sticky mb-16 last:mb-0 w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`rounded-3xl p-8 sm:p-12 chrome-card border border-white/15 bg-gradient-to-br ${service.gradient} shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden transition-all duration-300`}
      >
        {/* Specular accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: service.accent }}
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Number, Title, Description (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Top row: Number + Tag */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/10 text-white">
                  {service.number} / 06
                </span>
                <span className="text-[11px] font-mono tracking-widest text-white/50 uppercase">
                  {service.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans mb-8">
                {service.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                TECHNOLOGY ECOSYSTEM
              </div>
              <div className="flex flex-wrap gap-2">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] text-white/70 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Deliverables & Metric (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <service.icon size={24} style={{ color: service.accent }} />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-white/40 uppercase">BENCHMARK</div>
                  <div className="font-mono font-bold text-sm text-emerald-400">
                    {service.metric}
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-accent uppercase tracking-wider mb-3">
                CORE DELIVERABLES
              </div>

              <div className="space-y-2.5 mb-6">
                {service.features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/80 font-sans">
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: service.accent }}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct CTA */}
            <a
              href="#contact"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest font-semibold text-center transition-all flex items-center justify-center gap-1.5 group/btn"
            >
              <span>Deploy {service.title}</span>
              <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesStack() {
  return (
    <section id="services" className="py-28 relative bg-[#06070B] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <Sparkles size={13} className="text-accent" />
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
              SCROLL-STACKED CAPABILITIES
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            CORE CAPABILITIES <br />
            <span className="chrome-text">STACKED FOR SCALE.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed font-sans">
            Scroll down to explore each specialized engineering vertical. Every card stacks dynamically, delivering full transparency into our architecture and deliverables.
          </p>
        </div>

        {/* Sticky Stacked Cards Container */}
        <div className="relative max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <StackingCard
              key={service.number}
              service={service}
              index={idx}
              total={services.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
