import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side usage
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export type Database = {
  public: {
    Tables: {
      visitors: {
        Row: {
          id: string;
          session_id: string;
          ip_address: string | null;
          country: string | null;
          city: string | null;
          device_type: string | null;
          browser: string | null;
          os: string | null;
          referrer: string | null;
          first_seen: string;
          last_seen: string;
          page_views: number;
          is_lead: boolean;
        };
      };
      page_views: {
        Row: {
          id: string;
          session_id: string;
          page_path: string;
          visited_at: string;
          time_spent: number | null;
        };
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          service: string | null;
          budget: string | null;
          message: string;
          status: 'new' | 'in_progress' | 'closed' | 'spam';
          created_at: string;
          session_id: string | null;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          session_id: string;
          started_at: string;
          message_count: number;
          visitor_id: string | null;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          chat_session_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: string;
        };
      };
      settings: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
      };
    };
  };
};
