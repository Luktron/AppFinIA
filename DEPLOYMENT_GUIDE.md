# 🚀 Guia de Deploy - AppFinIA no Vercel + Supabase

## ⚠️ Importante: Chaves Comprometidas

As chaves do Supabase foram expostas no arquivo `.env.example`. **Você DEVE:**

1. Ir para [Supabase Console](https://app.supabase.com)
2. Settings → API → Regenerate Anon Key e Service Key
3. Usar as NOVAS chaves em todas as configurações

---

## 📝 Passo 1: Preparar o Repositório

```bash
# 1. Atualizar .env.example (NÃO COMMITAR)
cp .env.example .env.local

# 2. Adicionar as NOVAS credenciais do Supabase
# Edite .env.local com:
# SUPABASE_URL=sua_nova_url
# SUPABASE_ANON_KEY=sua_nova_chave_anonima

# 3. Fazer commit das mudanças (exceto .env.local)
git add -A
git commit -m "Fix: Configuração Vercel e melhorias Supabase"
git push origin main
```

---

## 🌐 Passo 2: Deploy no Vercel

### Opção A: Conectar GitHub (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Selecione seu repositório GitHub do AppFinIA
4. Clique em **"Import"**

### Opção B: Deploy via CLI

```bash
npm i -g vercel
vercel --prod
```

---

## 🔑 Passo 3: Configurar Variáveis de Ambiente

No painel do Vercel, vá para **Settings** → **Environment Variables** e adicione:

| Variável | Valor |
|----------|-------|
| `SUPABASE_URL` | `https://seu_projeto.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_...` (sua nova chave) |

---

## 🗄️ Passo 4: Criar Tabelas no Supabase

No [Supabase SQL Editor](https://app.supabase.com/project/_/sql), execute:

```sql
-- Tabela: receitas
CREATE TABLE receitas (
  id BIGSERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor DECIMAL(15,2) NOT NULL,
  mes TEXT NOT NULL,
  data DATE NOT NULL,
  categoria TEXT DEFAULT 'Salário',
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela: fixas
CREATE TABLE fixas (
  id BIGSERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor DECIMAL(15,2) NOT NULL,
  categoria TEXT DEFAULT 'Outros',
  ativo BOOLEAN DEFAULT true,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela: gastos
CREATE TABLE gastos (
  id BIGSERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor DECIMAL(15,2) NOT NULL,
  data DATE NOT NULL,
  mes TEXT NOT NULL,
  categoria TEXT NOT NULL,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela: investimentos
CREATE TABLE investimentos (
  id BIGSERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  valor_inicial DECIMAL(15,2) NOT NULL,
  valor_atual DECIMAL(15,2),
  taxa_anual DECIMAL(5,2) NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  tipo TEXT DEFAULT 'Renda Fixa',
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## ✅ Passo 5: Verificar Deploy

1. Abra sua URL do Vercel (ex: `https://appfinia-xyz.vercel.app`)
2. Você deverá ver o menu principal da AppFinIA
3. Teste a integração clicando em uma calculadora (dados devem sincronizar com Supabase)

---

## 🔍 Troubleshooting

### Erro 404 DEPLOYMENT_NOT_FOUND
- ✅ **Resolvido**: vercel.json foi corrigido com rewrites
- Teste: `vercel --prod`

### "Variáveis Supabase não configuradas"
- ✅ Verifique se as variáveis estão em **Settings → Environment Variables** no Vercel
- ✅ Faça um novo deployment: `vercel --prod`

### Dados não sincronizam
- ✅ Abra o console (F12) e verifique erros
- ✅ Confirme que as tabelas foram criadas em Supabase
- ✅ Verifique RLS (Row Level Security) está desativado ou configurado corretamente

---

## 🔐 Segurança

- ✅ **NÃO commitar** `.env.local` ou `.env`
- ✅ **Regenerar** as chaves do `.env.example` (já foram expostas)
- ✅ **Desabilitar RLS** inicialmente no Supabase (ou configurar políticas)
- ✅ **Usar chave ANON** (não service key) no frontend

---

## 📊 Monitoramento

Para monitorar seu deploy:

1. [Vercel Dashboard](https://vercel.com/dashboard)
2. [Supabase Dashboard](https://app.supabase.com)
3. Logs do Vercel: **Settings → Functions** (se houver erros na API)

---

**Pronto para deploy! 🎉**
