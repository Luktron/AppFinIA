# 💰 AppFinIA - Assistente Financeiro Inteligente

Uma aplicação web moderna para gerenciar finanças, calcular investimentos e simular operações financeiras com persistência em nuvem.

## 🎯 Aplicações Incluídas

- **FinIA** - Assistente IA para análise financeira
- **FinCalc** - Calculadora financeira avançada
- **Calc. Investimentos** - Simulador de investimentos
- **Calc. Aportes** - Calculadora com aportes periódicos

## 🚀 Começar Agora

### Opção 1: Local (Rápido)

```bash
cd c:\Python_App\AppFinIA
python -m http.server 3000
# Abrir: http://localhost:3000
```

### Opção 2: Vercel + Supabase (Produção)

Veja o guia completo em [SETUP_VERCEL_SUPABASE.md](SETUP_VERCEL_SUPABASE.md)

## 📊 Arquitetura

```
Frontend (Vercel)
    ↓
Supabase PostgreSQL (Dados)
    ↓
localStorage (Fallback offline)
```

**Ver diagrama completo em [ARQUITETURA.html](ARQUITETURA.html)**

## 📁 Estrutura

```
AppFinIA/
├── index.html                          # Menu principal
├── FinIA.html                          # Assistente IA
├── fincalc.html                        # Calculadora
├── calculadora-investimentos.html      # Investimentos
├── calculadora-investimentos-aport.html # Aportes
├── supabase-client.js                  # Cliente Supabase
├── vercel.json                         # Config Vercel
├── package.json                        # Dependências
├── .env.example                        # Exemplo env
├── .gitignore                          # Git ignore
├── SETUP_VERCEL_SUPABASE.md           # Guia setup
├── ARQUITETURA.html                    # Diagrama
└── README.md                           # Este arquivo
```

## 🔧 Configuração Rápida Supabase

1. **Criar projeto**: https://app.supabase.com
2. **Copiar credenciais**:
   - URL do projeto
   - Chave ANON pública
3. **Criar tabelas**: Use scripts em SETUP_VERCEL_SUPABASE.md
4. **Salvar em .env.local**:
   ```
   SUPABASE_URL=seu_url
   SUPABASE_ANON_KEY=sua_chave
   ```

## 🌐 Deploy Vercel

1. Push para GitHub
2. Conectar em vercel.com
3. Adicionar env vars
4. Deploy! 🚀

Mais detalhes em [SETUP_VERCEL_SUPABASE.md](SETUP_VERCEL_SUPABASE.md)

## 💾 Persistência de Dados

### Modo Online (Recomendado)
- Dados salvos no Supabase PostgreSQL
- Sincronização automática
- Acessível de qualquer dispositivo

### Modo Offline
- Dados em localStorage (navegador)
- Funciona sem internet
- Dados locais apenas

## 🔐 Segurança

- ✅ Variáveis de ambiente para credenciais
- ✅ Row Level Security no Supabase
- ✅ Chave ANON para cliente
- ✅ Sem senha armazenada

## 📖 Documentação

| Documento | Descrição |
|-----------|-----------|
| [SETUP_VERCEL_SUPABASE.md](SETUP_VERCEL_SUPABASE.md) | Guia completo de setup |
| [ARQUITETURA.html](ARQUITETURA.html) | Diagrama e checklist |
| [INTEGRACAO_SUPABASE_EXEMPLO.html](INTEGRACAO_SUPABASE_EXEMPLO.html) | Exemplos de código |
| [supabase-client.js](supabase-client.js) | Cliente JS reutilizável |

## 🛠️ APIs Disponíveis

### Supabase Client

```javascript
// Inserir
await window.db.insert('tabela', { campo: valor });

// Buscar
const dados = await window.db.select('tabela', { filtro: valor });

// Atualizar
await window.db.update('tabela', id, { campo: novo_valor });

// Deletar
await window.db.delete('tabela', id);
```

## 📱 Suporte

- **Navegadores**: Chrome, Firefox, Safari, Edge (modernos)
- **Mobile**: iOS e Android (PWA support)
- **Offline**: localStorage local

## 📝 Licença

MIT - Livre para usar e modificar

## 🤝 Contribuições

Contribuições são bem-vindas! Faça um fork e envie um PR.

---

**Versão**: 1.0  
**Última atualização**: Maio 2025

**Precisa de ajuda?** Veja [SETUP_VERCEL_SUPABASE.md](SETUP_VERCEL_SUPABASE.md) ou [ARQUITETURA.html](ARQUITETURA.html)
