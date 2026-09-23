'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Send, Bot, User, Minimize2, Maximize2, Sparkles, Phone } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export default function ChatWidget({ forceOpen, onClose }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Greetings! I'm **Quanta**, the autonomous cognitive assistant for **Quantalyt**.\n\nI can answer questions about our **Full-Stack Web Development, Autonomous AI Agents, AI Voice Telephony, and DeepSeek-R1 integrations**.\n\nHow can our engineering team assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    }
  }, [forceOpen]);

  // Listen for global custom event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener('open-quantalyt-chat', handleOpen);
    return () => window.removeEventListener('open-quantalyt-chat', handleOpen);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      },
    ]);

    try {
      const history = messages
        .filter((m) => m.content)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: userMessage.content }],
          sessionId,
        }),
      });

      if (!res.ok) throw new Error('Chat error');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  fullContent += parsed.text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId ? { ...m, content: fullContent } : m
                    )
                  );
                } else if (parsed.error) {
                  fullContent =
                    'Our engineers are standing by. Feel free to call us directly at **0339 7444694** or leave your inquiry in the contact section.';
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId ? { ...m, content: fullContent } : m
                    )
                  );
                }
              } catch {}
            }
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  'I am currently experiencing network latency. You can speak directly with our team at **0339 7444694** or via WhatsApp!',
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  const closeChat = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Trigger floating button (hidden when open) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-[0_0_30px_rgba(108,142,255,0.6)] hover:scale-110 transition-transform ${
          isOpen ? 'hidden' : 'flex'
        }`}
        aria-label="Open AI Assistant"
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-accent" />
        <Bot size={24} className="text-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0A0C14]" />
      </motion.button>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-32px)] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/20 bg-[#0D0E1A]"
          >
            {/* Header with Chrome Logo */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary/30 via-[#141728] to-accent/20 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(108,142,255,0.4)]">
                  <Image
                    src="/logo.jpg"
                    alt="Quantalyt Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                    <span>Quanta Neural AI</span>
                    <Sparkles size={13} className="text-accent" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/50">
                      NVIDIA DeepSeek-R1 • Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-white/60">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Minimize"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={closeChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Messages Scroll Area */}
                  <div
                    className="h-80 overflow-y-auto p-4 space-y-3 font-sans text-xs"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: '#6C8EFF #0D0E1A' }}
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${
                          msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs ${
                            msg.role === 'user'
                              ? 'bg-primary/40 text-white'
                              : 'bg-white/10 text-accent border border-white/10'
                          }`}
                        >
                          {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                        </div>

                        <div
                          className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-primary text-white rounded-tr-sm'
                              : 'bg-white/[0.04] text-white/85 border border-white/10 rounded-tl-sm'
                          }`}
                        >
                          {msg.content === '' && msg.role === 'assistant' ? (
                            <div className="flex items-center gap-1 py-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                                style={{ animationDelay: '150ms' }}
                              />
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                                style={{ animationDelay: '300ms' }}
                              />
                            </div>
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggestion Chips */}
                  {messages.length <= 2 && (
                    <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                      {[
                        'What services do you offer?',
                        'How much is a Voice Agent?',
                        'Can you build for US clients?',
                        'Call: 0339 7444694',
                      ].map((chip) => (
                        <button
                          key={chip}
                          onClick={() => sendMessage(chip)}
                          className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10 transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input Row */}
                  <div className="p-3 border-t border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-2 bg-white/[0.04] rounded-2xl px-3.5 py-2.5 border border-white/10 focus-within:border-accent transition-colors">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Inquire with Quanta..."
                        className="flex-1 bg-transparent text-white text-xs outline-none placeholder-white/30 font-sans"
                        disabled={isLoading}
                      />
                      <button
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || isLoading}
                        className="w-7 h-7 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white disabled:opacity-30 hover:opacity-90 transition-opacity flex-shrink-0"
                      >
                        <Send size={12} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-white/30 mt-2 px-1">
                      <span>Powered by NVIDIA DeepSeek</span>
                      <a href="tel:03397444694" className="hover:text-emerald-400 text-white/50">
                        Hotline: 0339 7444694
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
