import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://ndslyfcrhmiwjuvtncub.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kc2x5ZmNyaG1pd2p1dnRuY3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwMTU1NzIsImV4cCI6MjAwMDU5MTU3Mn0.dqAhaB3tRT7F8XDsQyQrDhP_kXT-MLlPxeRScNae9uM',
);

export default supabase;
