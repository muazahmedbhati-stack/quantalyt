'use client';

import { useEffect, useState } from 'react';
import { Users, FileText, MessageSquare, TrendingUp, Eye, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalVisitors: number;
  todayVisitors: number;
  totalLeads: number;
  todayLeads: number;
  totalChats: number;
}

function StatCard({ title, value, sub, icon: Icon, color, href }: {
  title: string; value: number; sub: string;
  icon: React.ElementType; color: string; href?: string;
}) {
  const content = (
    <div
      className="glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
      style={{ borderColor: `${color}30` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon size={22} style={{ color }} />
        </div>
        {href && <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />}
      </div>
      <div className="font-display text-4xl font-bold text-white mb-1">{value.toLocaleString()}</div>
      <div className="text-white/60 text-sm font-medium">{title}</div>
      <div className="text-white/30 text-xs mt-1">{sub}</div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalVisitors: 0, todayVisitors: 0, totalLeads: 0, todayLeads: 0, totalChats: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening with Quantalyt.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Visitors"
          value={stats.totalVisitors}
          sub={`+${stats.todayVisitors} today`}
          icon={Eye}
          color="#6C8EFF"
          href="/admin/crm"
        />
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          sub={`+${stats.todayLeads} today`}
          icon={FileText}
          color="#A0B4FF"
          href="/admin/leads"
        />
        <StatCard
          title="Chat Sessions"
          value={stats.totalChats}
          sub="AI conversations"
          icon={MessageSquare}
          color="#00E5A0"
          href="/admin/chat-logs"
        />
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Quick Actions
          </h3>
          <div className="space-y-2">
            {[
              { label: 'View All Visitors', href: '/admin/crm' },
              { label: 'Manage Leads', href: '/admin/leads' },
              { label: 'Review Chat Logs', href: '/admin/chat-logs' },
              { label: 'API & Settings', href: '/admin/settings' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <span className="text-white/70 group-hover:text-white text-sm">{item.label}</span>
                <ArrowUpRight size={14} className="text-white/20 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Users size={18} className="text-accent" />
            System Status
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Website', status: 'Online', color: '#00E5A0' },
              { label: 'AI Chatbot', status: 'Active', color: '#00E5A0' },
              { label: 'Visitor Tracking', status: 'Running', color: '#00E5A0' },
              { label: 'Lead Capture', status: 'Active', color: '#00E5A0' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-white/60 text-sm">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: item.color }} />
                  <span className="text-xs" style={{ color: item.color }}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
