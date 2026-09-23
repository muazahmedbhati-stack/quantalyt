'use client';

import { useEffect, useState } from 'react';
import { Settings, Key, Bot, Save, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => { setSettings(d.settings || {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const saveSetting = async (key: string, value: string) => {
    setSaving(key);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
    toast.success('Setting saved!');
    setSaving(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
          <Settings className="text-primary" />
          Settings
        </h1>
        <p className="text-white/40 text-sm mt-1">Manage API keys, chatbot configuration, and site settings.</p>
      </div>

      <div className="space-y-8 max-w-2xl">
        {/* NVIDIA API Section */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
            <Key size={18} className="text-primary" />
            NVIDIA NIM API
          </h2>
          <p className="text-white/40 text-xs mb-5">Configure the NVIDIA NIM API for your AI chatbot powered by DeepSeek.</p>

          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">API Key</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={settings.nvidia_api_key || ''}
                    onChange={(e) => setSettings({ ...settings, nvidia_api_key: e.target.value })}
                    placeholder="nvapi-..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-primary/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button
                  onClick={() => saveSetting('nvidia_api_key', settings.nvidia_api_key || '')}
                  disabled={saving === 'nvidia_api_key'}
                  className="px-4 py-3 rounded-xl bg-gradient-brand text-white text-sm font-medium hover:opacity-90 disabled:opacity-60 flex items-center gap-2 flex-shrink-0"
                >
                  <Save size={14} />
                  {saving === 'nvidia_api_key' ? 'Saving...' : 'Save'}
                </button>
              </div>
              <p className="text-white/30 text-xs mt-2">
                Get your API key from <a href="https://build.nvidia.com" target="_blank" className="text-accent hover:underline">build.nvidia.com</a>
              </p>
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Model</label>
              <div className="flex gap-3">
                <select
                  value={settings.nvidia_model || 'deepseek-ai/deepseek-r1'}
                  onChange={(e) => setSettings({ ...settings, nvidia_model: e.target.value })}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/60"
                >
                  <option value="deepseek-ai/deepseek-r1" className="bg-bg-surface">DeepSeek R1 (Recommended)</option>
                  <option value="deepseek-ai/deepseek-r1-distill-llama-70b" className="bg-bg-surface">DeepSeek R1 Distill 70B</option>
                  <option value="nvidia/llama-3.1-nemotron-70b-instruct" className="bg-bg-surface">Nemotron 70B</option>
                  <option value="meta/llama-3.1-405b-instruct" className="bg-bg-surface">Llama 3.1 405B</option>
                </select>
                <button
                  onClick={() => saveSetting('nvidia_model', settings.nvidia_model || 'deepseek-ai/deepseek-r1')}
                  className="px-4 py-3 rounded-xl bg-gradient-brand text-white text-sm font-medium hover:opacity-90 flex-shrink-0"
                >
                  <Save size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Section */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
            <Bot size={18} className="text-accent" />
            Chatbot Configuration
          </h2>
          <p className="text-white/40 text-xs mb-5">Customize how your AI chatbot behaves and responds to visitors.</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <div className="text-white font-medium text-sm">Chatbot Enabled</div>
                <div className="text-white/40 text-xs">Toggle the chatbot on/off on your website</div>
              </div>
              <button
                onClick={() => {
                  const newVal = settings.chatbot_enabled === 'true' ? 'false' : 'true';
                  setSettings({ ...settings, chatbot_enabled: newVal });
                  saveSetting('chatbot_enabled', newVal);
                }}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  settings.chatbot_enabled !== 'false' ? 'bg-gradient-brand' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    settings.chatbot_enabled !== 'false' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1.5 block">System Prompt</label>
              <textarea
                value={settings.chatbot_system_prompt || ''}
                onChange={(e) => setSettings({ ...settings, chatbot_system_prompt: e.target.value })}
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/60 transition-colors resize-none"
                placeholder="You are Quanta, an AI assistant for Quantalyt..."
              />
              <button
                onClick={() => saveSetting('chatbot_system_prompt', settings.chatbot_system_prompt || '')}
                disabled={saving === 'chatbot_system_prompt'}
                className="mt-2 px-4 py-2 rounded-xl bg-gradient-brand text-white text-sm font-medium hover:opacity-90 disabled:opacity-60 flex items-center gap-2"
              >
                <Save size={14} />
                {saving === 'chatbot_system_prompt' ? 'Saving...' : 'Save Prompt'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
