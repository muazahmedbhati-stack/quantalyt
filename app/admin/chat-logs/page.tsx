'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Bot, User, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ChatSession {
  id: string;
  session_id: string;
  started_at: string;
  message_count: number;
  chat_messages: ChatMessage[];
}

export default function ChatLogsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/chat-logs')
      .then((r) => r.json())
      .then((d) => { setSessions(d.sessions || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
          <MessageSquare className="text-success" />
          Chat Logs
        </h1>
        <p className="text-white/40 text-sm mt-1">{sessions.length} chat sessions recorded</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === session.id ? null : session.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-white/2 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                    <MessageSquare size={18} className="text-success" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium text-sm">Session {session.session_id.substring(0, 10)}...</div>
                    <div className="text-white/40 text-xs">{formatDate(session.started_at)} · {session.message_count} messages</div>
                  </div>
                </div>
                {expanded === session.id ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
              </button>

              {expanded === session.id && (
                <div className="border-t border-white/5 p-4 space-y-3 max-h-96 overflow-y-auto">
                  {(session.chat_messages || []).map((msg) => (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user' ? 'bg-primary/30' : 'bg-accent/20'
                      }`}>
                        {msg.role === 'user' ? <User size={14} className="text-primary" /> : <Bot size={14} className="text-accent" />}
                      </div>
                      <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${
                        msg.role === 'user' ? 'bg-primary/20 text-white' : 'bg-white/5 text-white/80'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {(!session.chat_messages || session.chat_messages.length === 0) && (
                    <p className="text-white/30 text-sm text-center py-4">No messages recorded for this session.</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-16 text-white/30">
              <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
              No chat sessions yet. They will appear here when visitors use the chatbot.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
