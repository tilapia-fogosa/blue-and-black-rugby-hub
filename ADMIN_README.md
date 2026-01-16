# 🎯 Painel Administrativo - Pé Vermelho Rugby

## ✅ O que foi criado

### Página Principal Admin (`src/pages/Admin.tsx`)
- Design moderno com gradientes e animações
- Sistema de abas para navegar entre diferentes seções
- 5 abas principais: Eventos, Atletas, Galerias, Patrocinadores e História

### Componentes Admin (em `src/components/admin/`)

#### 1. **EventsAdmin.tsx**
Gerenciamento completo de eventos com:
- ✅ Listagem de todos os eventos
- ✅ Adicionar novo evento
- ✅ Editar evento existente
- ✅ Excluir evento
- ✅ Campos: título, data, hora, local, tipo, oponente, descrição
- ✅ Validação de formulário
- ✅ Feedback visual (loading, success, error)

#### 2. **AthletesAdmin.tsx**
Gerenciamento de atletas com:
- ✅ Listagem de atletas
- ✅ CRUD completo
- ✅ Switch para ativar/desativar atleta
- ✅ Campos: nome, posição, conquistas, anos, descrição, foto, status ativo
- ✅ Badge visual para status (Ativo/Inativo)

#### 3. **GalleriesAdmin.tsx**
Gerenciamento de galerias com:
- ✅ Listagem de galerias
- ✅ CRUD completo
- ✅ Seleção de categoria (Jogos, Treinos, Vitórias, etc.)
- ✅ Campos: título, categoria, descrição, imagem de capa
- ✅ Badge de categoria

#### 4. **SponsorsAdmin.tsx**
Gerenciamento de patrocinadores com:
- ✅ Listagem de patrocinadores
- ✅ CRUD completo
- ✅ Níveis de patrocínio (Principal, Premium, Apoiador)
- ✅ Campos: nome, categoria, logo, website, nível
- ✅ Badge colorido por nível

#### 5. **HistoryAdmin.tsx**
Gerenciamento da história do clube com:
- ✅ Listagem de marcos históricos
- ✅ CRUD completo
- ✅ Ordenação por ano (mais recente primeiro)
- ✅ Campos: ano, título, descrição

---

## 🔧 Funcionalidades Implementadas

### Para TODOS os componentes:

✅ **Integração completa com Supabase**
- Queries otimizadas com React Query
- Cache automático
- Invalidação de cache após mudanças

✅ **CRUD Completo**
- **Create**: Adicionar novos itens via modal
- **Read**: Listagem em tabelas responsivas
- **Update**: Editar itens existentes
- **Delete**: Remover itens com confirmação

✅ **UI/UX Premium**
- Design moderno com gradientes
- Animações suaves
- Loading states
- Feedback visual (toasts)
- Modais responsivos
- Tabelas com hover effects

✅ **Validação**
- Campos obrigatórios marcados com *
- Validação de formulário
- Mensagens de erro claras

✅ **Responsividade**
- Funciona em desktop, tablet e mobile
- Tabelas scrolláveis em telas pequenas
- Abas com ícones que se adaptam ao tamanho da tela

---

## 🚀 Como Usar

### 1. Executar as políticas de escrita no Supabase

**IMPORTANTE**: Antes de usar o painel admin, você precisa adicionar permissões de escrita no banco de dados.

1. Acesse o SQL Editor do Supabase
2. Copie e execute o conteúdo do arquivo `add-write-policies.sql`
3. Isso permitirá que o admin faça INSERT, UPDATE e DELETE

### 2. Acessar o painel

Navegue para: `http://localhost:5173/admin`

### 3. Usar as funcionalidades

#### Adicionar Item:
1. Clique no botão "Adicionar [Tipo]"
2. Preencha o formulário
3. Clique em "Salvar"

#### Editar Item:
1. Clique no ícone de lápis (Edit) na linha do item
2. Modifique os campos desejados
3. Clique em "Salvar"

#### Excluir Item:
1. Clique no ícone de lixeira (Delete)
2. Confirme a exclusão
3. O item será removido

---

## 📊 Estrutura de Dados

### Events (Eventos)
```typescript
{
  title: string;        // Título do evento *
  date: string;         // Data (YYYY-MM-DD) *
  time: string;         // Horário (HH:MM)
  location: string;     // Local *
  type: string;         // Tipo: Jogo, Treino, Final, Social *
  opponent: string;     // Oponente (opcional)
  description: string;  // Descrição (opcional)
}
```

### Athletes (Atletas)
```typescript
{
  name: string;         // Nome *
  position: string;     // Posição *
  achievements: string; // Conquistas
  years: string;        // Anos (ex: 2010-2024)
  description: string;  // Descrição
  photo_url: string;    // URL da foto
  active: boolean;      // Status ativo/inativo
}
```

### Galleries (Galerias)
```typescript
{
  title: string;        // Título *
  category: string;     // Categoria *
  description: string;  // Descrição
  cover_image_url: string; // URL da capa
}
```

### Sponsors (Patrocinadores)
```typescript
{
  name: string;         // Nome *
  category: string;     // Categoria *
  tier: string;         // Nível: Principal, Premium, Apoiador
  logo_url: string;     // URL do logo
  website_url: string;  // URL do website
}
```

### History (História)
```typescript
{
  year: string;         // Ano *
  title: string;        // Título *
  description: string;  // Descrição *
}
```

---

## 🎨 Design System

### Cores Principais:
- **Rugby Blue Primary**: `#1e3a8a` (azul principal)
- **Rugby Blue Dark**: `#0f172a` (azul escuro)
- **Rugby Red**: `#dc2626` (vermelho)
- **Rugby Cream**: `#fef3c7` (creme)

### Componentes UI:
- Shadcn/ui components
- Tailwind CSS
- Lucide Icons

---

## 🔒 Segurança

### Políticas RLS (Row Level Security):
- ✅ Leitura pública habilitada
- ✅ Escrita pública habilitada (via `add-write-policies.sql`)

**Nota**: Em produção, você deve:
1. Implementar autenticação
2. Restringir políticas de escrita apenas para usuários autenticados
3. Adicionar roles (admin, editor, etc.)

---

## 📝 Próximos Passos (Sugestões)

1. **Autenticação**
   - Adicionar login/logout
   - Proteger rota /admin
   - Implementar roles de usuário

2. **Upload de Imagens**
   - Integrar Supabase Storage
   - Upload direto de fotos de atletas
   - Upload de logos de patrocinadores
   - Upload de imagens para galerias

3. **Gerenciamento de Imagens de Galeria**
   - Criar componente para adicionar imagens a uma galeria
   - Relacionar imagens com galerias (gallery_images table)

4. **Filtros e Busca**
   - Adicionar campo de busca em cada tabela
   - Filtros por categoria, tipo, status, etc.

5. **Paginação**
   - Implementar paginação para tabelas grandes
   - Limitar resultados por página

6. **Validações Avançadas**
   - Validação de URLs
   - Validação de datas
   - Máscaras de input

7. **Bulk Actions**
   - Seleção múltipla
   - Exclusão em massa
   - Ativação/desativação em massa

---

## 🐛 Troubleshooting

### Erro: "permission denied for table"
**Solução**: Execute o arquivo `add-write-policies.sql` no Supabase

### Erro: "Failed to fetch"
**Solução**: Verifique se o `.env.local` está configurado corretamente

### Dados não aparecem
**Solução**: Verifique se executou o `seed.sql` para popular dados iniciais

### Modal não abre
**Solução**: Verifique se todos os componentes Shadcn/ui estão instalados

---

## 📦 Arquivos Criados

```
src/
├── pages/
│   └── Admin.tsx                    # Página principal do admin
└── components/
    └── admin/
        ├── EventsAdmin.tsx          # Gerenciamento de eventos
        ├── AthletesAdmin.tsx        # Gerenciamento de atletas
        ├── GalleriesAdmin.tsx       # Gerenciamento de galerias
        ├── SponsorsAdmin.tsx        # Gerenciamento de patrocinadores
        └── HistoryAdmin.tsx         # Gerenciamento de história

add-write-policies.sql               # SQL para habilitar escrita
ADMIN_README.md                      # Este arquivo
```

---

## ✨ Recursos Visuais

- 🎨 Gradientes modernos
- 🌈 Badges coloridos por categoria/status
- 💫 Animações suaves
- 📱 Totalmente responsivo
- ⚡ Loading states
- 🔔 Notificações toast
- 🎯 Ícones intuitivos

---

**Desenvolvido com ❤️ para Pé Vermelho Rugby**
