// This is the correct way to initialize Supabase for a public, browser-based website.
// It uses your exact URL and your public ANON key.

const SUPABASE_URL = 'https://ynrbfvwrnujlkdepyzai.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucmJmdndybnVqbGtkZXB5emFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyODQ1MzYsImV4cCI6MjA3NDg2MDUzNn0.FgCliv6gFdPXY3oKURnK2gRbTLD7XuDgviw-NGXHF98';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
