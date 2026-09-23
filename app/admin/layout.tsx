'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, Users, MessageSquare, Settings,
  LogOut, Zap, FileText, ChevronRight, Menu, X
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/crm', icon: Users, label: 'CRM & Visitors' },
  { href: '/admin/leads', icon: FileText, label: 'Leads' },
  { href: '/admin/chat-logs', icon: MessageSquare, label: 'Chat Logs' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

function AdminInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === '/admin/login') return <>{children}</>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg-surface border-r border-white/5 flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(108,142,255,0.4)]">
              <Image src="/logo.jpg" alt="Quantalyt" fill className="object-cover" />
            </div>
            <span className="font-display font-bold tracking-widest text-white text-sm">
              QUANTALYT
            </span>
          </div>
          <p className="text-white/30 text-[10px] font-mono mt-1 uppercase">Operations & CRM Desk</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  {item.label}
                </div>
                {active && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <div>
              <div className="text-white text-xs font-medium">{session.user?.name}</div>
              <div className="text-white/30 text-[10px]">{session.user?.email}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/50 hover:text-danger hover:bg-danger/10 transition-all text-sm"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-bg/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-white/40 text-xs">Live</span>
          </div>
        </div>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminInner>{children}</AdminInner>
      <Toaster position="top-right" toastOptions={{ style: { background: '#10121E', color: '#F0F0FF', border: '1px solid rgba(108, 63, 232, 0.3)' } }} />
    </SessionProvider>
  );
}
