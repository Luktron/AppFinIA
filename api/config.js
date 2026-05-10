export default function handler(request, response) {
  // Tenta carregar de diferentes fontes de variáveis de ambiente
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseAnonKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Variáveis Supabase não configuradas:', {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey
    });
    return response.status(500).json({
      error: 'Variáveis de ambiente Supabase não configuradas no Vercel.',
      details: 'Configure SUPABASE_URL e SUPABASE_ANON_KEY no painel do Vercel.'
    });
  }

  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Cache-Control', 'no-cache');
  response.status(200).json({
    supabaseUrl,
    supabaseAnonKey
  });
}
