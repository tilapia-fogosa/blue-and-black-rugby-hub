# Guia de Configuração do Banco de Dados Supabase

## Opção 1: Usar o SQL Editor do Supabase (Recomendado)

### Passo 1: Acessar o SQL Editor
1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. No menu lateral, clique em **SQL Editor**

### Passo 2: Criar as Tabelas
1. Clique em **New Query**
2. Copie todo o conteúdo do arquivo `schema.sql` (localizado na raiz do projeto)
3. Cole no editor SQL
4. Clique em **Run** ou pressione `Ctrl+Enter`

### Passo 3: Inserir Dados Iniciais
1. Clique em **New Query** novamente
2. Copie todo o conteúdo do arquivo `seed.sql`
3. Cole no editor SQL
4. Clique em **Run** ou pressione `Ctrl+Enter`

### Passo 4: Verificar
1. No menu lateral, clique em **Table Editor**
2. Você deve ver as seguintes tabelas:
   - `events`
   - `galleries`
   - `gallery_images`
   - `athletes`
   - `sponsors`
   - `history`

---

## Opção 2: Usar o Supabase CLI

### Passo 1: Instalar o Supabase CLI
```bash
npm install -g supabase
```

### Passo 2: Login no Supabase
```bash
supabase login
```

### Passo 3: Linkar o Projeto
```bash
supabase link --project-ref zkwwnztulyydgdplsgpy
```

### Passo 4: Executar as Migrações
```bash
supabase db push
```

---

## Opção 3: Usar o Script Node.js (Requer conexão estável)

Se você tiver problemas de conexão, pode ser necessário:

1. Verificar se seu firewall não está bloqueando a conexão
2. Tentar de uma rede diferente
3. Verificar se a senha está correta

Execute:
```bash
node setup-database.js
```

---

## Estrutura das Tabelas Criadas

### 📅 Events (Eventos)
- Armazena jogos, treinos, finais e eventos sociais
- Campos: título, data, hora, local, tipo, oponente, descrição

### 🖼️ Galleries (Galerias)
- Coleções de fotos organizadas por categoria
- Categorias: Jogos, Treinos, Vitórias, Equipe, Eventos, Troféus

### 🏞️ Gallery Images (Imagens das Galerias)
- Imagens individuais vinculadas às galerias

### 🏉 Athletes (Atletas)
- Perfis dos jogadores
- Campos: nome, posição, conquistas, anos, descrição, foto

### 🤝 Sponsors (Patrocinadores)
- Informações dos patrocinadores
- Tiers: Principal, Premium, Apoiador

### 📜 History (História)
- Linha do tempo do clube
- Marcos históricos importantes

---

## Segurança (RLS - Row Level Security)

Todas as tabelas têm **Row Level Security** habilitado com políticas de leitura pública.
Isso significa que qualquer pessoa pode ler os dados, mas apenas usuários autenticados podem modificá-los.

Para adicionar políticas de escrita (INSERT, UPDATE, DELETE), você precisará criar políticas adicionais no SQL Editor.

---

## Próximos Passos

Após criar as tabelas:

1. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   VITE_SUPABASE_URL=https://zkwwnztulyydgdplsgpy.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
   ```

2. A anon key pode ser encontrada em:
   - Dashboard → Settings → API → Project API keys → `anon` `public`

3. Teste a conexão rodando o projeto:
   ```bash
   npm run dev
   ```
