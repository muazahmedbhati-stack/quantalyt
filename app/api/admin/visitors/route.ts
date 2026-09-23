import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 50;
  const offset = (page - 1) * limit;

  try {
    const { data, error, count } = await supabaseAdmin
      .from('visitors')
      .select('*', { count: 'exact' })
      .order('last_seen', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return NextResponse.json({ visitors: data, total: count });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 });
  }
}
