'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Smartphone,
  Bot,
  PhoneCall,
  Workflow,
  Sparkles,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

const qyvoraServices = [
  {
    id: 'web-dev',
    title: 'Web Development',
    subtitle: 'High-Performance Web Platforms & Full-Stack Systems',
    description:
      'Full-stack platforms engineered for scale, responsiveness, and sub-second load times. We build production-ready web apps with Next.js 14/15, React, TypeScript, Node.js, and headless CMS architectures designed to maximize user conversions.',
    deliverables: [
      'Next.js 14/15 & React Architecture',
      'Sub-Second Global Edge Performance',
      'Headless CMS & E-Commerce Integration',
      '100% Technical SEO & Core Web Vitals',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'Node.js'],
    metric: '99+ Lighthouse Score',
    icon: Code2,
    gradient: 'from-[#6C8EFF]/20 via-[#10121E] to-[#0A0C14]',
    tag: 'Flagship Engineering',
  },
  {
    id: 'app-dev',
    title: 'App Development',
    subtitle: 'Mobile & Cross-Platform iOS / Android Applications',
    description:
      'Cross-platform mobile applications delivering native-level 60fps performance. Built using React Native and Flutter with real-time offline sync, push notifications, bio-metric security, and seamless app store distribution.',
    deliverables: [
      'iOS & Android Cross-Platform Deployment',
      'Fluid 60fps Animations & Native Bridges',
      'Real-Time Database Sync & Offline Storage',
      'In-App Subscriptions & Payment Gateways',
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    metric: 'Native-Level Speed',
    icon: Smartphone,
    gradient: 'from-[#A0B4FF]/20 via-[#10121E] to-[#0A0C14]',
    tag: 'Mobile First',
  },
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    subtitle: 'Enterprise RAG & Conversational Knowledge Engines',
    description:
      'Intelligent conversational AI trained specifically on your company documents, APIs, and product catalog. Powered by NVIDIA DeepSeek-R1 and GPT-4 with zero hallucinations and autonomous CRM lead capture.',
    deliverables: [
      'Custom Vector Search & RAG Architecture',
      'NVIDIA DeepSeek-R1 & GPT-4 Inference',
      'Omnichannel: Web, WhatsApp, Slack, Zendesk',
      'Autonomous Lead Qualification & CRM Sync',
    ],
    tech: ['DeepSeek-R1', 'NVIDIA NIM', 'LangChain', 'Pinecone', 'OpenAI'],
    metric: '85% Auto-Resolution',
    icon: Bot,
    gradient: 'from-purple-500/20 via-[#10121E] to-[#0A0C14]',
    tag: 'DeepSeek Powered',
  },
  {
    id: 'ai-voice-agents',
    title: 'AI Voice Agents',
    subtitle: 'Autonomous Telephony & Voice Call Automation',
    description:
      'Human-parity AI voice agents capable of conducting natural inbound customer support and outbound sales discovery calls with sub-500ms conversational latency. Replaces expensive offshore call centers.',
    deliverables: [
      'Sub-500ms Conversational Response Time',
      'Inbound Support & Outbound Sales Telephony',
      'Live Call Transfers & Cal.com Scheduling',
      'Automated CRM Call Summaries & Transcripts',
    ],
    tech: ['ElevenLabs', 'Vapi', 'Retell AI', 'Twilio', 'Deepgram', 'Whisper'],
    metric: '<500ms Voice Latency',
    icon: PhoneCall,
    gradient: 'from-emerald-500/20 via-[#10121E] to-[#0A0C14]',
    tag: 'Telephony Automation',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    subtitle: 'Autonomous Multi-Step Workflows & Cognitive Workers',
    description:
      'Self-directed autonomous AI agents that handle complex multi-step knowledge work: web research, market intelligence, PDF extraction, invoice processing, code generation, and automated competitor monitoring 24/7.',
    deliverables: [
      'Multi-Agent Swarm & CrewAI Workflows',
      'Document & Financial Data Extraction',
      'Autonomous Web Scraping & Synthesis',
      'Self-Correcting Execution Loops',
    ],
    tech: ['CrewAI', 'Auto-GPT', 'LangGraph', 'Python', 'Docker', 'FastAPI'],
    metric: '40+ hrs/wk Saved',
    icon: Cpu,
    gradient: 'from-cyan-500/20 via-[#10121E] to-[#0A0C14]',
    tag: 'Autonomous AI',
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    subtitle: 'End-to-End Enterprise Systems & Workflow Pipelines',
    description:
      'Comprehensive business automation connecting your entire enterprise tech stack (HubSpot, Salesforce, Stripe, Slack, QuickBooks, Notion) into flawless, hands-free pipelines eliminating human error.',
    deliverables: [
      'n8n & Custom Webhook Architecture',
      'Automated Invoicing & Revenue Pipelines',
      'Customer Onboarding & Lead Routing',
      'Enterprise API Integration & Monitoring',
    ],
    tech: ['n8n', 'Make.com', 'Zapier', 'PostgreSQL', 'Docker', 'REST APIs'],
    metric: '10x Process Velocity',
    icon: Workflow,
    gradient: 'from-amber-500/20 via-[#10121E] to-[#0A0C14]',
    tag: 'Enterprise Workflow',
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-28 relative bg-[#06070B] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <Sparkles size={13} className="text-accent" />
            <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
              CORE CAPABILITIES
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            ENTERPRISE SERVICES <br />
            <span className="chrome-text">ENGINEERED TO OUTPACE.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed font-sans">
            The identical battle-tested capabilities pioneered at Qyvora — elevated with next-gen autonomous architecture, sub-second latency, and Silicon Valley-grade code quality.
          </p>
        </div>

        {/* Services Grid (2 Columns, 3 Rows) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qyvoraServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-3xl chrome-card p-8 flex flex-col justify-between overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(108,142,255,0.15)]"
            >
              {/* Dynamic top gradient bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`}
              />

              <div>
                {/* Top Row: Icon + Metric Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 p-3 rounded-2xl bg-white/[0.05] border border-white/15 text-accent group-hover:scale-110 group-hover:border-accent/50 transition-all duration-300 shadow-[0_0_20px_rgba(108,142,255,0.2)]">
                    <service.icon size={26} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                    {service.metric}
                  </span>
                </div>

                {/* Service Tag */}
                <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
                  {service.tag}
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-white/40 mb-4">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>

                {/* Deliverables Bullet List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                      <CheckCircle2 size={13} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Tech Stack Pills + CTA Trigger */}
              <div className="pt-4 border-t border-white/10 mt-auto">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.tech.map((t) => (
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
                  className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-gradient-to-r hover:from-primary hover:to-accent text-white/80 hover:text-white text-xs font-semibold tracking-wide border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>Deploy {service.title}</span>
                  <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Banner: Custom Systems */}
        <div className="mt-16 p-8 rounded-3xl chrome-card border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-1 block">
              ENTERPRISE CUSTOM ARCHITECTURE
            </span>
            <h4 className="font-display text-2xl font-bold text-white mb-1">
              Need a bespoke proprietary AI model or multi-agent ecosystem?
            </h4>
            <p className="text-sm text-white/60">
              We design custom enterprise solutions under strict bilateral NDAs with full IP code ownership transfer.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 flex-shrink-0">
            <a
              href="tel:03397444694"
              className="px-5 py-3 rounded-full bg-white/5 border border-white/15 text-white text-xs font-mono hover:border-accent transition-colors"
            >
              Call Architect: 0339 7444694
            </a>
            <button
              onClick={scrollToContact}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold shadow-[0_0_20px_rgba(108,142,255,0.4)]"
            >
              Request Custom Proposal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
