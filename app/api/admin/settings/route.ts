import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data } = await supabaseAdmin.from('settings').select('*');
  const settingsMap = Object.fromEntries((data || []).map((s: { key: string; value: string }) => [s.key, s.value]));
  // Mask API key
  if (settingsMap.nvidia_api_key) {
    settingsMap.nvidia_api_key = settingsMap.nvidia_api_key.replace(/(?<=.{8}).(?=.{4})/g, '*');
  }
  return NextResponse.json({ settings: settingsMap });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { key, value } = await req.json();
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 });

  await supabaseAdmin
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
