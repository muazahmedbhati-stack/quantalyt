import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { streamNvidiaChat } from '@/lib/nvidia';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    // Get settings from Supabase
    const { data: settings } = await supabaseAdmin
      .from('settings')
      .select('key, value')
      .in('key', ['nvidia_api_key', 'nvidia_model', 'chatbot_system_prompt', 'chatbot_enabled']);

    const settingsMap = Object.fromEntries(
      (settings || []).map((s: { key: string; value: string }) => [s.key, s.value])
    );

    if (settingsMap.chatbot_enabled === 'false') {
      return NextResponse.json({ error: 'Chatbot is currently disabled.' }, { status: 503 });
    }

    const apiKey = settingsMap.nvidia_api_key || process.env.NVIDIA_API_KEY || '';
    const model = settingsMap.nvidia_model || process.env.NVIDIA_MODEL || 'deepseek-ai/deepseek-r1';
    const systemPrompt = settingsMap.chatbot_system_prompt ||
      "You are Quanta, the AI assistant for Quantalyt — a premium AI agency. Help clients with our services: Web Development, AI Agents, Automation, Custom Chatbots, CRM/ERP, SEO, Social Media AI, and Video AI. Be professional and concise. Contact: +92 339 7444694";

    if (!apiKey) {
      // Return fallback response if no API key
      const fallbackStream = new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          const msg = "I'm Quanta, your Quantalyt AI assistant! Our team would love to help you. Please reach us at +92 339 7444694 or email hello@quantalyt.com for immediate assistance!";
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: msg })}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });
      return new Response(fallbackStream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
      });
    }

    // Save chat session to DB
    if (sessionId) {
      try {
        const { data: existingSession } = await supabaseAdmin
          .from('chat_sessions')
          .select('id')
          .eq('session_id', sessionId)
          .single();

        let chatSessionId: string;

        if (!existingSession) {
          const { data: newSession } = await supabaseAdmin
            .from('chat_sessions')
            .insert({ session_id: sessionId, message_count: messages.length })
            .select('id')
            .single();
          chatSessionId = newSession?.id;
        } else {
          chatSessionId = existingSession.id;
          await supabaseAdmin
            .from('chat_sessions')
            .update({ message_count: messages.length })
            .eq('id', chatSessionId);
        }

        // Save user message
        const lastUserMsg = messages[messages.length - 1];
        if (lastUserMsg?.role === 'user' && chatSessionId) {
          await supabaseAdmin.from('chat_messages').insert({
            chat_session_id: chatSessionId,
            role: 'user',
            content: lastUserMsg.content,
          });
        }
      } catch {}
    }

    const stream = await streamNvidiaChat(apiKey, model, messages, systemPrompt);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
