export default function handler(request, response) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response.status(500).json({
      error: 'Supabase environment variables are not configured on Vercel.'
    });
  }

  response.setHeader('Content-Type', 'application/json');
  response.status(200).json({
    supabaseUrl,
    supabaseAnonKey
  });
}
