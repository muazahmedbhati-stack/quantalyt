'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Zap, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success('Welcome back!');
      router.push('/admin');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_30px_rgba(108,142,255,0.4)] mx-auto mb-4">
            <Image src="/logo.jpg" alt="Quantalyt" fill className="object-cover" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-[0.2em] text-white">
            QUANTALYT
          </h1>
          <p className="text-white/40 text-xs font-mono mt-1 uppercase">Operations & CRM Portal</p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <h2 className="font-display font-semibold text-xl text-white mb-6 flex items-center gap-2">
            <Lock size={18} className="text-primary" />
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@quantalyt.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-brand text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Quantalyt Admin Panel · Secure & Encrypted
        </p>
      </div>
    </div>
  );
}
