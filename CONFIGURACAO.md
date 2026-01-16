# 🔧 Guia de Configuração do Projeto

## ✅ Status da Integração com Supabase

### O que já está pronto:

✅ **Cliente Supabase configurado** (`src/integrations/supabase/client.ts`)
✅ **Types TypeScript definidos** (`src/integrations/supabase/types.ts`)
✅ **Componentes usando Supabase**:
  - `Events.tsx` - Busca eventos do banco
  - `Athletes.tsx` - Busca atletas ativos
  - `Gallery.tsx` - Busca galerias e imagens
  - `History.tsx` - Busca marcos históricos
  - `Sponsors.tsx` - Busca patrocinadores

✅ **React Query integrado** para cache e gerenciamento de estado
✅ **Schema SQL pronto** (`schema.sql`)
✅ **Dados iniciais prontos** (`seed.sql`)

---

## ⚠️ O que falta fazer:

### 1. Criar as tabelas no Supabase

**Opção A: SQL Editor (Recomendado)**
1. Acesse: https://supabase.com/dashboard/project/zkwwnztulyydgdplsgpy/sql/new
2. Faça login
3. Cole o conteúdo de `schema.sql` e execute
4. Cole o conteúdo de `seed.sql` e execute

**Opção B: Supabase CLI**
```bash
npm install -g supabase
supabase login
supabase link --project-ref zkwwnztulyydgdplsgpy
supabase db push
```

### 2. Configurar variáveis de ambiente

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env.local
   ```

2. **Obtenha a Anon Key:**
   - Acesse: https://supabase.com/dashboard/project/zkwwnztulyydgdplsgpy/settings/api
   - Copie a chave `anon` `public`

3. **Edite o arquivo `.env.local`:**
   ```env
   VITE_SUPABASE_URL=https://zkwwnztulyydgdplsgpy.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
   ```

### 3. Reiniciar o servidor de desenvolvimento

```bash
npm run dev
```

---

## 📊 Estrutura das Tabelas

### Events (Eventos)
```typescript
{
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string;
  type: string; // 'Jogo', 'Treino', 'Final', 'Social'
  opponent: string | null;
  description: string | null;
  created_at: string;
}
```

### Athletes (Atletas)
```typescript
{
  id: string;
  name: string;
  position: string;
  achievements: string | null;
  years: string | null;
  description: string | null;
  photo_url: string | null;
  active: boolean;
  created_at: string;
}
```

### Galleries (Galerias)
```typescript
{
  id: string;
  title: string;
  description: string | null;
  event_id: string | null;
  category: string; // 'Jogos', 'Treinos', 'Vitórias', etc.
  cover_image_url: string | null;
  created_at: string;
}
```

### Gallery Images (Imagens)
```typescript
{
  id: string;
  gallery_id: string;
  image_url: string;
  alt_text: string | null;
  created_at: string;
}
```

### Sponsors (Patrocinadores)
```typescript
{
  id: string;
  name: string;
  category: string;
  logo_url: string | null;
  website_url: string | null;
  tier: string | null; // 'Principal', 'Premium', 'Apoiador'
  created_at: string;
}
```

### History (História)
```typescript
{
  id: string;
  year: string;
  title: string;
  description: string;
  created_at: string;
}
```

---

## 🔒 Segurança (RLS)

Todas as tabelas têm **Row Level Security** habilitado com:
- ✅ Leitura pública (qualquer um pode ver)
- ❌ Escrita restrita (apenas autenticados podem modificar)

Para adicionar políticas de escrita, você precisará criar políticas adicionais no SQL Editor.

---

## 🧪 Testando a Conexão

Após configurar tudo, você pode testar executando:

```bash
npm run dev
```

O site deve carregar e buscar dados do Supabase. Se houver erros:
1. Verifique o console do navegador (F12)
2. Confirme que as variáveis de ambiente estão corretas
3. Verifique se as tabelas foram criadas no Supabase

---

## 📝 Próximos Passos

Depois que tudo estiver funcionando:

1. **Adicionar autenticação** (se necessário)
2. **Configurar Storage** para upload de imagens
3. **Adicionar políticas de escrita** para permitir CRUD
4. **Implementar formulários** para gerenciar dados
5. **Deploy** para produção

---

## 🆘 Problemas Comuns

### Erro: "supabaseUrl and supabaseKey are required"
- Verifique se o arquivo `.env.local` existe
- Confirme que as variáveis começam com `VITE_`
- Reinicie o servidor de desenvolvimento

### Erro: "Failed to fetch"
- Verifique se as tabelas foram criadas no Supabase
- Confirme que a URL do projeto está correta
- Verifique as políticas RLS

### Dados não aparecem
- Verifique se executou o `seed.sql`
- Confirme que as políticas RLS permitem leitura pública
- Verifique o console do navegador para erros
