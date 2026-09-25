import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { parseUserAgent } from '@/lib/tracking';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, pagePath } = await req.json();
    if (!sessionId) return NextResponse.json({ ok: true });

    const userAgent = req.headers.get('user-agent') || '';
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') || 'Unknown';
    const referrer = req.headers.get('referer') || '';

    const { browser, os, deviceType } = parseUserAgent(userAgent);

    // Upsert visitor
    const { data: existing } = await supabaseAdmin
      .from('visitors')
      .select('id, page_views')
      .eq('session_id', sessionId)
      .single();

    if (existing) {
      await supabaseAdmin
        .from('visitors')
        .update({ last_seen: new Date().toISOString(), page_views: existing.page_views + 1 })
        .eq('session_id', sessionId);
    } else {
      await supabaseAdmin.from('visitors').insert({
        session_id: sessionId,
        ip_address: ip,
        browser,
        os,
        device_type: deviceType,
        referrer,
      });
    }

    // Record page view
    await supabaseAdmin.from('page_views').insert({
      session_id: sessionId,
      page_path: pagePath,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: true });
  }
}
