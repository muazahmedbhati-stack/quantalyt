'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'James Mitchell',
    role: 'CEO, TechForward Inc.',
    location: 'New York, USA',
    avatar: 'JM',
    rating: 5,
    text: 'Quantalyt completely transformed how our business operates. The AI automation they built saved us 60 hours a week and the custom CRM they delivered is a masterpiece. Absolute pros.',
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, GrowthLab',
    location: 'San Francisco, USA',
    avatar: 'SC',
    rating: 5,
    text: 'I was skeptical about AI agencies but Quantalyt proved me wrong. Their chatbot solution handles 90% of our customer queries and the website they built consistently ranks #1 for our target keywords.',
  },
  {
    name: 'David Okonkwo',
    role: 'Director, MedConnect',
    location: 'London, UK',
    avatar: 'DO',
    rating: 5,
    text: 'The team delivered a healthcare automation system that completely eliminated manual appointment booking. Patient satisfaction went up 40% and our admin costs dropped by 70%. Incredible work.',
  },
  {
    name: 'Maria Rodriguez',
    role: 'CMO, ScaleUp Digital',
    location: 'Miami, USA',
    avatar: 'MR',
    rating: 5,
    text: "Quantalyt's social media AI has been game-changing. We went from posting 3x/week to 21x/week with better quality content, and our engagement tripled in the first month. 10/10 would recommend.",
  },
  {
    name: 'Robert Walsh',
    role: 'CTO, FinanceFlow',
    location: 'Chicago, USA',
    avatar: 'RW',
    rating: 5,
    text: 'We needed a complex multi-tenant SaaS platform with AI features. Quantalyt delivered ahead of schedule, under budget, and with zero bugs. Their technical excellence is unmatched.',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="section-padding bg-bg-surface/30">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6">
            <Star size={14} className="text-accent" fill="currentColor" />
            <span className="gradient-text font-medium">Client Success Stories</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Trusted by </span>
            <span className="gradient-text">Leaders</span>
          </h2>
        </motion.div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-8 md:p-12 relative"
            >
              <Quote className="absolute top-6 left-6 text-primary/20" size={60} />

              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>

              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 relative z-10">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center font-bold text-white">
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonials[current].name}</div>
                  <div className="text-white/40 text-sm">{testimonials[current].role} · {testimonials[current].location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2 bg-gradient-brand' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
