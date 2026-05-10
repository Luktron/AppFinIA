// ── Configuração do Supabase ──
// O cliente tenta ler variáveis locais, depois do servidor Vercel, e por fim pede manualmente.

function getBrowserSupabaseConfig() {
  return {
    url: window.SUPABASE_URL || localStorage.getItem('SUPABASE_URL') || null,
    anonKey: window.SUPABASE_ANON_KEY || localStorage.getItem('SUPABASE_ANON_KEY') || null
  };
}

async function fetchServerSupabaseConfig() {
  try {
    const response = await fetch('/api/config', {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
      console.warn(`API retornou status ${response.status}`);
      return null;
    }
    const data = await response.json();
    if (data.supabaseUrl && data.supabaseAnonKey) {
      return {
        url: data.supabaseUrl,
        anonKey: data.supabaseAnonKey
      };
    }
  } catch (error) {
    console.warn('Não foi possível carregar config Supabase do servidor:', error.message);
  }
  return null;
}

function saveSupabaseConfig(url, anonKey) {
  if (url) localStorage.setItem('SUPABASE_URL', url);
  if (anonKey) localStorage.setItem('SUPABASE_ANON_KEY', anonKey);
}

class SupabaseClient {
  constructor(url, key) {
    this.url = url || null;
    this.key = key || null;
  }

  async ensureConfig() {
    if (this.url && this.key) return;

    const browserConfig = getBrowserSupabaseConfig();
    if (browserConfig.url && browserConfig.anonKey) {
      this.url = browserConfig.url;
      this.key = browserConfig.anonKey;
      return;
    }

    const serverConfig = await fetchServerSupabaseConfig();
    if (serverConfig) {
      this.url = serverConfig.url;
      this.key = serverConfig.anonKey;
      saveSupabaseConfig(this.url, this.key);
      return;
    }

    const promptUrl = prompt('Cole a URL do Supabase:');
    const promptKey = prompt('Cole a chave ANON do Supabase:');
    if (!promptUrl || !promptKey) {
      throw new Error('Supabase config não fornecida. Verifique as variáveis de ambiente ou configure localmente.');
    }

    this.url = promptUrl;
    this.key = promptKey;
    saveSupabaseConfig(this.url, this.key);
  }

  get headers() {
    if (!this.key) throw new Error('Supabase ANON key não disponível.');
    return {
      'Authorization': `Bearer ${this.key}`,
      apikey: this.key,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    };
  }

  async insert(table, data) {
    await this.ensureConfig();
    const response = await fetch(`${this.url}/rest/v1/${table}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Erro ao inserir: ${response.statusText}`);
    return await response.json();
  }

  async select(table, filters = {}) {
    await this.ensureConfig();
    let url = `${this.url}/rest/v1/${table}`;
    const params = new URLSearchParams({ select: '*' });

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, `eq.${value}`);
      }
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
    await this.ensureConfig();
    const response = await fetch(`${this.url}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Erro ao atualizar: ${response.statusText}`);
    return await response.json();
  }

  async delete(table, id) {
    await this.ensureConfig();
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
window.db = new SupabaseClient();
