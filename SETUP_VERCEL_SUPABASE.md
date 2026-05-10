# 🚀 AppFinIA - Setup Vercel + Supabase

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta no [Supabase](https://supabase.com)
- Git instalado

## 🔧 Configuração do Supabase

### 1. Criar um Projeto Supabase

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Clique em **New Project**
3. Preencha:
   - **Name**: `appfinia` (ou seu nome preferido)
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a região mais próxima (ex: `sa-east-1` para São Paulo)
4. Clique em **Create new project** e aguarde (~2 minutos)

### 2. Obter as Credenciais

Após criar o projeto:
1. Vá para **Settings** > **API**
2. Copie:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_KEY` (manter privado!)

### 3. Criar as Tabelas

No console do Supabase, execute os seguintes SQL:

#### Tabela: receitas
```sql
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

CREATE INDEX receitas_user_id_idx ON receitas(user_id);
CREATE INDEX receitas_mes_idx ON receitas(mes);
```

#### Tabela: fixas
```sql
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

CREATE INDEX fixas_user_id_idx ON fixas(user_id);
```

#### Tabela: gastos
```sql
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

CREATE INDEX gastos_user_id_idx ON gastos(user_id);
CREATE INDEX gastos_mes_idx ON gastos(mes);
```

#### Tabela: investimentos
```sql
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

CREATE INDEX investimentos_user_id_idx ON investimentos(user_id);
```

### 4. Ativar Row Level Security (Segurança)

Para cada tabela, clique em **RLS** e ative-o. Adicione uma política:

```sql
-- Para receitas
CREATE POLICY "Users can access own data" ON receitas
FOR ALL USING (user_id = auth.uid());

-- Repita para fixas, gastos, investimentos
```

## 🌐 Deploy no Vercel

### 1. Preparar o Repositório Git

```bash
cd c:\Python_App\AppFinIA
git init
git add .
git commit -m "Initial commit: AppFinIA with Supabase integration"
```

### 2. Push para GitHub

1. Crie um repositório no [GitHub](https://github.com/new)
2. Execute:
```bash
git remote add origin https://github.com/seu-usuario/appfinia.git
git branch -M main
git push -u origin main
```

### 3. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Add New** > **Project**
3. Selecione seu repositório `appfinia`
4. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL` = sua URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` = sua chave ANON
5. Clique em **Deploy**

## 📱 Usar a Aplicação

### Com Supabase (Recomendado - Persistência na Nuvem)

1. Modifique seus arquivos HTML para usar `supabase-client.js`:

```html
<script src="supabase-client.js"></script>
```

2. Para inserir dados:

```javascript
// Exemplo: Adicionar uma receita
await window.db.insert('receitas', {
  descricao: 'Salário',
  valor: 5000,
  mes: '2025-05',
  data: '2025-05-10',
  categoria: 'Salário',
  user_id: 'seu-user-id' // Opcional, se implementar autenticação
});
```

3. Para buscar dados:

```javascript
const receitas = await window.db.select('receitas');
console.log(receitas);
```

### Local (Sem Supabase)

Use `localStorage` conforme implementado nos arquivos HTML originais.

## 🔐 Segurança

⚠️ **IMPORTANTE**: Nunca commite suas credenciais!

1. Crie um arquivo `.env.local` (não versionado):
```bash
VITE_SUPABASE_URL=seu_url
VITE_SUPABASE_ANON_KEY=sua_chave
```

2. Em Vercel, configure as variáveis no painel de **Settings** > **Environment Variables**

## 📊 Monitoramento

- **Logs Vercel**: https://vercel.com/dashboard/[seu-projeto]/logs
- **Métricas Supabase**: https://app.supabase.com/project/[seu-projeto]/reports
- **Database**: https://app.supabase.com/project/[seu-projeto]/editor

## 🚨 Troubleshooting

### CORS error
Se receber erro de CORS, vá para Supabase **Settings** > **API** > **CORS** e adicione seu domínio Vercel.

### Dados não salvam
1. Verifique se as credenciais estão corretas
2. Checa se as tabelas existem no Supabase
3. Verifique o console do navegador (F12) para erros

### Tabelas vazias
Execute os SQL de criação de tabelas no SQL Editor do Supabase.

## 🎯 Próximos Passos

1. ✅ Deploy básico funcionando
2. 📝 Implementar autenticação (auth do Supabase)
3. 🔔 Adicionar notificações
4. 📲 Melhorar UX mobile
5. 📊 Dashboard com gráficos

---

**Versão**: 1.0  
**Última atualização**: 2025-05-10
