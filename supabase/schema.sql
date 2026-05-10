-- Supabase schema for AppFinIA
-- Execute este script no editor SQL do Supabase ou via CLI.

CREATE TABLE IF NOT EXISTS receitas (
  id BIGSERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor NUMERIC(15,2) NOT NULL,
  mes TEXT NOT NULL,
  data DATE NOT NULL,
  categoria TEXT DEFAULT 'Salário',
  semana INTEGER,
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS receitas_user_id_idx ON receitas(user_id);
CREATE INDEX IF NOT EXISTS receitas_mes_idx ON receitas(mes);

CREATE TABLE IF NOT EXISTS fixas (
  id BIGSERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor NUMERIC(15,2) NOT NULL,
  categoria TEXT DEFAULT 'Outros',
  ativo BOOLEAN DEFAULT true,
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS fixas_user_id_idx ON fixas(user_id);

CREATE TABLE IF NOT EXISTS gastos (
  id BIGSERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor NUMERIC(15,2) NOT NULL,
  data DATE NOT NULL,
  mes TEXT NOT NULL,
  semana INTEGER NOT NULL DEFAULT 0,
  categoria TEXT DEFAULT 'Outros',
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS gastos_user_id_idx ON gastos(user_id);
CREATE INDEX IF NOT EXISTS gastos_mes_idx ON gastos(mes);
CREATE INDEX IF NOT EXISTS gastos_data_idx ON gastos(data);

CREATE TABLE IF NOT EXISTS investimentos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  valor_inicial NUMERIC(15,2) NOT NULL,
  valor_atual NUMERIC(15,2),
  taxa_anual NUMERIC(5,2) NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  tipo TEXT DEFAULT 'Renda Fixa',
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS investimentos_user_id_idx ON investimentos(user_id);
