'use client';

import { useEffect, useState } from 'react';
import { Users, Monitor, Smartphone, Globe, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Visitor {
  id: string;
  session_id: string;
  ip_address: string;
  country: string;
  city: string;
  device_type: string;
  browser: string;
  os: string;
  referrer: string;
  first_seen: string;
  last_seen: string;
  page_views: number;
  is_lead: boolean;
}

export default function CRMPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('/api/admin/visitors')
      .then((r) => r.json())
      .then((d) => { setVisitors(d.visitors || []); setTotal(d.total || 0); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
          <Users className="text-primary" />
          CRM — Visitors
        </h1>
        <p className="text-white/40 text-sm mt-1">{total} total visitors tracked</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Session', 'IP Address', 'Device', 'Browser / OS', 'Referrer', 'Pages', 'First Seen', 'Lead'].map((h) => (
                    <th key={h} className="text-left text-white/40 text-xs font-medium px-4 py-3 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {visitors.map((v) => (
                  <tr key={v.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-white/60 text-xs font-mono">{v.session_id.substring(0, 12)}...</td>
                    <td className="px-4 py-3 text-white/70 text-sm">{v.ip_address || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-white/60 text-xs">
                        {v.device_type === 'mobile' ? <Smartphone size={14} /> : <Monitor size={14} />}
                        {v.device_type || 'desktop'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/60 text-xs">{v.browser} / {v.os}</td>
                    <td className="px-4 py-3 text-white/50 text-xs max-w-[150px] truncate">{v.referrer || 'Direct'}</td>
                    <td className="px-4 py-3">
                      <span className="text-accent font-semibold text-sm">{v.page_views}</span>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-xs">{formatDate(v.first_seen)}</td>
                    <td className="px-4 py-3">
                      {v.is_lead ? (
                        <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs">Lead</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/30 text-xs">Visitor</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visitors.length === 0 && (
              <div className="text-center py-16 text-white/30">
                <Globe size={40} className="mx-auto mb-3 opacity-30" />
                No visitors tracked yet. Visitors will appear here once your site is visited.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
