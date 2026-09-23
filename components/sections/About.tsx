'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { Shield, Globe, Cpu, Award } from 'lucide-react';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', icon: Award },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Shield },
  { value: 30, suffix: '+', label: 'AI Solutions Built', icon: Cpu },
  { value: 15, suffix: '+', label: 'Countries Served', icon: Globe },
];

const values = [
  {
    title: 'AI-First Approach',
    desc: 'Every solution we build leverages the latest AI to give you an unfair competitive advantage.',
    icon: '🤖',
  },
  {
    title: 'Results-Obsessed',
    desc: 'We measure success by your ROI, not by hours billed. Your growth is our north star.',
    icon: '🎯',
  },
  {
    title: 'Global Standard',
    desc: 'US-grade quality with enterprise-level attention to detail, delivered to clients worldwide.',
    icon: '🌍',
  },
  {
    title: 'Always Evolving',
    desc: 'We stay ahead of the AI curve so you always have access to the most powerful tools available.',
    icon: '⚡',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6">
              <span className="gradient-text font-medium">About Quantalyt</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">We&apos;re Not Just an Agency</span>
              <br />
              <span className="gradient-text">We&apos;re Your AI Team</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Quantalyt is a next-generation AI agency built for ambitious businesses that want to 
              move faster, work smarter, and grow harder. We combine cutting-edge AI technology 
              with deep business strategy to build solutions that create real, measurable impact.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Based in Pakistan with a global client base spanning the USA, UK, Europe, and beyond — 
              we bring US-grade quality and enterprise-level expertise to every project we take on.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="font-semibold text-white text-sm mb-1">{v.title}</div>
                  <div className="text-white/40 text-xs leading-relaxed">{v.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="glass rounded-2xl p-6 text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={20} className="text-white" />
                </div>
                <div className="font-display text-4xl font-bold gradient-text mb-1">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      delay={0.5 + i * 0.2}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
