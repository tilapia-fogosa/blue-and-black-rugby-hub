-- NUCLEAR RESET: Limpa e recria a tabela com permissões totais para teste
-- Execute isso no SQL Editor do Supabase

-- 1. Remover tudo para começar do zero
drop table if exists public.athlete_registrations;

-- 2. Criar a tabela novamente
create table public.athlete_registrations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  origin_team text,
  preferred_position text not null,
  payment_proof_url text not null,
  birth_date date not null,
  cpf text not null unique,
  category text not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- 3. DESATIVAR RLS temporariamente para garantir que o erro não seja segurança
alter table public.athlete_registrations disable row level security;

-- 4. Garantir permissões básicas de banco de dados
grant all on table public.athlete_registrations to anon;
grant all on table public.athlete_registrations to authenticated;
grant all on table public.athlete_registrations to service_role;

-- 5. Se desejar reativar o RLS depois de testar que funciona:
-- alter table public.athlete_registrations enable row level security;
-- create policy "Public Insert" on public.athlete_registrations for insert with check (true);
-- create policy "Public Select" on public.athlete_registrations for select using (true);
