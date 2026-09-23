import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, budget, message, sessionId } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('leads').insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      service: service || null,
      budget: budget || null,
      message,
      session_id: sessionId || null,
      status: 'new',
    });

    if (error) throw error;

    // Mark visitor as lead
    if (sessionId) {
      await supabaseAdmin
        .from('visitors')
        .update({ is_lead: true })
        .eq('session_id', sessionId);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ leads: data });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
