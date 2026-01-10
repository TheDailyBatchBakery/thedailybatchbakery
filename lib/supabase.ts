import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Server-side Supabase client (uses service role key for admin operations)
export function createServerClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase credentials not configured. Using placeholder client.');
    // Return a placeholder client that will fail gracefully
    return createClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseServiceKey || 'placeholder-key',
      {
        auth: {
          persistSession: false,
        },
      }
    );
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  });
}

// Client-side Supabase client (uses anon key)
export function createClientClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not configured. Using placeholder client.');
    return createClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'placeholder-key'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

