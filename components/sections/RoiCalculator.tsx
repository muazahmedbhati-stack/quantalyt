'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, TrendingUp, DollarSign, Clock, Users, Sparkles } from 'lucide-react';

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState<number>(8);
  const [manualHours, setManualHours] = useState<number>(14);
  const [hourlyRate, setHourlyRate] = useState<number>(65);

  // Calculations
  const weeklyHoursSaved = teamSize * manualHours * 0.75; // 75% automated
  const annualHoursSaved = Math.round(weeklyHoursSaved * 52);
  const annualDollarSaved = Math.round(annualHoursSaved * hourlyRate);
  const roiMultiplier = ((annualDollarSaved / 25000) * 100).toFixed(0);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-28 relative bg-[#06070B] overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[350px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-5">
            <Calculator size={13} className="text-accent" />
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              EXECUTIVE ROI ESTIMATOR
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            QUANTIFY YOUR <br />
            <span className="chrome-text">AI AUTOMATION SAVINGS.</span>
          </h2>

          <p className="text-white/60 text-base sm:text-lg font-sans">
            Calculate the exact capital and operational hours your organization can reclaim every single year by deploying Quantalyt’s autonomous workflows and AI agents.
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Control Panel (7 cols) */}
          <div className="lg:col-span-7 chrome-card rounded-3xl p-8 border border-white/15 flex flex-col justify-between">
            <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Users size={18} className="text-accent" />
              <span>Input Operational Metrics</span>
            </h3>

            <div className="space-y-8">
              {/* Slider 1: Team Size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70">
                    Team Members in Operations / Support
                  </label>
                  <span className="text-base font-mono font-bold text-accent px-3 py-0.5 rounded-lg bg-accent/10 border border-accent/20">
                    {teamSize} People
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#6C8EFF]"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                  <span>1 Person</span>
                  <span>30</span>
                  <span>60+ People</span>
                </div>
              </div>

              {/* Slider 2: Manual Hours */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70">
                    Repetitive Hours / Week per Person
                  </label>
                  <span className="text-base font-mono font-bold text-emerald-400 px-3 py-0.5 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                    {manualHours} hrs/wk
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="35"
                  value={manualHours}
                  onChange={(e) => setManualHours(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00E5A0]"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                  <span>4 hrs/wk</span>
                  <span>20 hrs</span>
                  <span>35 hrs/wk</span>
                </div>
              </div>

              {/* Slider 3: Hourly Cost */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/70">
                    Average Fully-Loaded Hourly Rate (USD)
                  </label>
                  <span className="text-base font-mono font-bold text-white px-3 py-0.5 rounded-lg bg-white/10 border border-white/20">
                    ${hourlyRate}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="150"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#A0B4FF]"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/30 mt-1">
                  <span>$25/hr</span>
                  <span>$80/hr (Avg US)</span>
                  <span>$150/hr</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-white/40 mt-8 pt-4 border-t border-white/5">
              *Model assumes 75% average autonomous resolution of manual data entry, customer phone triage, and document extraction.
            </p>
          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-8 bg-gradient-to-br from-primary/25 via-[#10121E] to-[#0A0C14] border border-primary/40 flex flex-col justify-between shadow-[0_20px_50px_rgba(108,142,255,0.2)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-accent">
                  ANNUAL IMPACT
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-400/30">
                  {roiMultiplier}% Est. ROI
                </span>
              </div>

              {/* Annual Dollar Savings */}
              <div className="mb-6">
                <div className="text-xs font-mono text-white/50 uppercase mb-1">
                  Projected Annual Capital Saved
                </div>
                <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  ${annualDollarSaved.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp size={13} />
                  Direct bottom-line margin expansion
                </div>
              </div>

              {/* Hours Saved */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-white/60 mb-1">
                  <Clock size={14} className="text-accent" />
                  <span>Annual Productive Hours Reclaimed</span>
                </div>
                <div className="font-display text-2xl font-bold text-white">
                  {annualHoursSaved.toLocaleString()} Hours / Year
                </div>
                <div className="text-[11px] font-mono text-white/40 mt-0.5">
                  Equivalent to hiring {Math.round((annualHoursSaved / 2000) * 10) / 10} full-time operations staff
                </div>
              </div>
            </div>

            {/* CTA Trigger */}
            <button
              onClick={scrollToContact}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(108,142,255,0.4)] flex items-center justify-center gap-2 group"
            >
              <span>Claim These Savings Now</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
