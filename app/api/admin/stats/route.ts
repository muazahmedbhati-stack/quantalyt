import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [visitors, todayVisitors, leads, todayLeads, chatSessions] = await Promise.all([
      supabaseAdmin.from('visitors').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('visitors').select('id', { count: 'exact', head: true }).gte('first_seen', today.toISOString()),
      supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
      supabaseAdmin.from('chat_sessions').select('id', { count: 'exact', head: true }),
    ]);

    return NextResponse.json({
      totalVisitors: visitors.count || 0,
      todayVisitors: todayVisitors.count || 0,
      totalLeads: leads.count || 0,
      todayLeads: todayLeads.count || 0,
      totalChats: chatSessions.count || 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
