// ── Configuração do Supabase ──
// Copie suas credenciais do Supabase dashboard

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL ||
                     localStorage.getItem('SUPABASE_URL') ||
                     prompt('Cole a URL do Supabase:');

const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY ||
                          localStorage.getItem('SUPABASE_ANON_KEY') ||
                          prompt('Cole a chave ANON do Supabase:');

// Para desenvolvimento local, você pode salvar no localStorage:
if (SUPABASE_URL) localStorage.setItem('SUPABASE_URL', SUPABASE_URL);
if (SUPABASE_ANON_KEY) localStorage.setItem('SUPABASE_ANON_KEY', SUPABASE_ANON_KEY);

// ── Cliente Supabase ──
class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.headers = {
      'Authorization': `Bearer ${key}`,
      'apikey': key,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };
  }

  async insert(table, data) {
    const response = await fetch(`${this.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Erro ao inserir: ${response.statusText}`);
    return await response.json();
  }

  async select(table, filters = {}) {
    let url = `${this.url}/rest/v1/${table}`;
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      params.append('select', '*');
      if (value) params.append(`${key}`, `eq.${value}`);
    });

    if (params.toString()) url += `?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers
    });
    if (!response.ok) throw new Error(`Erro ao buscar: ${response.statusText}`);
    return await response.json();
  }

  async update(table, id, data) {
    const response = await fetch(`${this.url}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Erro ao atualizar: ${response.statusText}`);
    return await response.json();
  }

  async delete(table, id) {
    const response = await fetch(`${this.url}/rest/v1/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: this.headers
    });
    if (!response.ok) throw new Error(`Erro ao deletar: ${response.statusText}`);
    return true;
  }
}

// Exportar para uso global
window.SupabaseClient = SupabaseClient;
window.db = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
