-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  referrer TEXT,
  first_seen TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  page_views INTEGER DEFAULT 1,
  is_lead BOOLEAN DEFAULT FALSE
);

-- Page views table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  visited_at TIMESTAMPTZ DEFAULT NOW(),
  time_spent INTEGER
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed', 'spam')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT
);

-- Chat sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  message_count INTEGER DEFAULT 0,
  visitor_id TEXT
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('nvidia_api_key', ''),
  ('nvidia_model', 'deepseek-ai/deepseek-r1'),
  ('chatbot_system_prompt', 'You are Quanta, the AI assistant for Quantalyt — a premium AI agency. You help potential clients understand our services including Web Development, AI Agents, Automation, Custom Chatbots, CRM/ERP Systems, SEO, Social Media AI, and Video AI. Be professional, helpful, and guide users toward booking a consultation. Keep responses concise and impactful. Our contact: +92 339 7444694'),
  ('chatbot_enabled', 'true'),
  ('site_title', 'Quantalyt — AI Agency'),
  ('site_description', 'Premium AI Agency offering Web Development, AI Agents, Automation, and more for global clients.')
ON CONFLICT (key) DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_visitors_session ON visitors(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(chat_session_id);

-- RLS Policies (disable for admin access via service role)
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (used by API routes)
CREATE POLICY "Service role full access" ON visitors FOR ALL USING (true);
CREATE POLICY "Service role full access" ON page_views FOR ALL USING (true);
CREATE POLICY "Service role full access" ON leads FOR ALL USING (true);
CREATE POLICY "Service role full access" ON chat_sessions FOR ALL USING (true);
CREATE POLICY "Service role full access" ON chat_messages FOR ALL USING (true);
CREATE POLICY "Service role full access" ON settings FOR ALL USING (true);
