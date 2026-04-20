const SUPABASE_URL = 'https://ynrbfvwrnujlkdepyzai.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE'; // IMPORTANT: In a production environment, consider fetching this from a secure backend endpoint or environment variable to avoid exposing it directly in client-side code, even though it's an 'anon' key. Ensure robust Row Level Security (RLS) is enabled and configured in Supabase.

// CRITICAL FIX #3:
// The global 'supabase' object from the CDN is used to create our client.
// We store it in a new variable 'supaClient' to avoid any conflicts.
const supaClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
