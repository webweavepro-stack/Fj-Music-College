import { createClient } from '@supabase/supabase-js';

// User configured Supabase Credentials
const DEFAULT_URL = 'https://wfgnkatcsdaffgjrymbr.supabase.co';
const DEFAULT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZ25rYXRjc2RhZmZnanJ5bWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMjk1ODUsImV4cCI6MjEwNzgwNTU4NX0.MiTYwW9_DPVAA7rnjwgiEH7yEzC3ANxqchIMqM7-uno';

// Retrieve from environment or fallback to user-provided credentials
let rawUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  DEFAULT_URL;

// Normalize URL: Strip trailing /rest/v1/ or /rest/v1 if included
rawUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

const anonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  DEFAULT_ANON_KEY;

export const SUPABASE_URL = rawUrl;
export const SUPABASE_ANON_KEY = anonKey;

export const isSupabaseConfigured = Boolean(
  rawUrl &&
    anonKey &&
    !rawUrl.includes('your-project-id') &&
    !anonKey.includes('your-public-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(rawUrl, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Checks connection health to the configured Supabase instance
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
}> {
  if (!supabase) {
    return { connected: false, message: 'Supabase client not initialized' };
  }
  try {
    const { data, error } = await supabase.from('programmes').select('id').limit(1);
    if (error) {
      // If table doesn't exist yet, it still contacted the database
      if (error.code === '42P01') {
        return {
          connected: true,
          message:
            'Connected to Supabase! The database schema needs to be initialized by running the SQL setup script.',
        };
      }
      return { connected: false, message: error.message };
    }
    return {
      connected: true,
      message: 'Successfully connected and verified with Supabase!',
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { connected: false, message: msg };
  }
}
