const SUPABASE_URL = 'https://ynrbfvwrnujlkdepyzai.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucmJmdndybnVqbGtkZXB5emFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODQ1MzYsImV4cCI6MjA3NDg2MDUzNn0.FgCliv6gFdPXY3oKURnK2gRbTLD7XuDgviw-NGXHF98';

// CRITICAL FIX #3:
// The global 'supabase' object from the CDN is used to create our client.
// We store it in a new variable 'supaClient' to avoid any conflicts.
const supaClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
