'use client';

import { useEffect, useState } from 'react';
import { FileText, Mail, Phone, Building } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'in_progress' | 'closed' | 'spam';
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: '#A0B4FF',
  in_progress: '#FFB800',
  closed: '#00E5A0',
  spam: '#FF3D57',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/admin/leads')
      .then((r) => r.json())
      .then((d) => { setLeads(d.leads || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: status as Lead['status'] } : l));
    toast.success('Status updated');
  };

  const filtered = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
          <FileText className="text-accent" />
          Leads Management
        </h1>
        <p className="text-white/40 text-sm mt-1">{leads.length} total leads · {leads.filter(l => l.status === 'new').length} new</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'new', 'in_progress', 'closed', 'spam'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === s ? 'bg-primary text-white' : 'glass text-white/50 hover:text-white'
            }`}
          >
            {s === 'all' ? 'All' : s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            {s !== 'all' && (
              <span className="ml-1.5 text-xs opacity-60">
                ({leads.filter(l => l.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <div key={lead.id} className="glass rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-white/40 text-xs">{formatDate(lead.created_at)}</div>
                    </div>
                    <span
                      className="ml-auto md:ml-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                      style={{ background: `${statusColors[lead.status]}20`, color: statusColors[lead.status] }}
                    >
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Mail size={14} className="text-primary" />
                      <a href={`mailto:${lead.email}`} className="hover:text-white transition-colors truncate">{lead.email}</a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Phone size={14} className="text-accent" />
                        <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors">{lead.phone}</a>
                      </div>
                    )}
                    {lead.company && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Building size={14} className="text-success" />
                        {lead.company}
                      </div>
                    )}
                    {lead.service && (
                      <div className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                        {lead.service}
                      </div>
                    )}
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed">{lead.message}</p>
                  {lead.budget && (
                    <p className="text-accent text-xs mt-2 font-medium">Budget: {lead.budget}</p>
                  )}
                </div>

                {/* Status selector */}
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-primary/40"
                >
                  <option value="new" className="bg-bg-surface">New</option>
                  <option value="in_progress" className="bg-bg-surface">In Progress</option>
                  <option value="closed" className="bg-bg-surface">Closed</option>
                  <option value="spam" className="bg-bg-surface">Spam</option>
                </select>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/30">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              No leads found. Leads will appear here when visitors fill your contact form.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
