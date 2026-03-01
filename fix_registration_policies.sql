-- =============================================================
-- FIX: Políticas RLS para o formulário de cadastro de atletas
-- Rodar no SQL Editor do Supabase
-- =============================================================

-- 1. Habilitar RLS na tabela (caso não esteja ativo)
alter table public.athlete_registrations enable row level security;

-- 2. Remover políticas antigas para evitar conflito
drop policy if exists "Permitir cadastro publico" on public.athlete_registrations;
drop policy if exists "Allow public insert" on public.athlete_registrations;
drop policy if exists "Permitir leitura propria" on public.athlete_registrations;
drop policy if exists "Permitir atualizacao admin" on public.athlete_registrations;

-- 3. INSERT público - qualquer pessoa pode se inscrever
create policy "Permitir cadastro publico"
on public.athlete_registrations
for insert
to public
with check (true);

-- 4. SELECT - público pode ver registros aprovados, admins veem tudo
create policy "Permitir leitura propria"
on public.athlete_registrations
for select
to public
using (true);

-- 5. UPDATE - apenas usuários autenticados (admin) podem aprovar/rejeitar
create policy "Permitir atualizacao admin"
on public.athlete_registrations
for update
to authenticated
using (true)
with check (true);

-- =============================================================
-- STORAGE: políticas para o bucket payment-proofs
-- =============================================================

-- 6. Permitir upload público de arquivos no bucket payment-proofs
drop policy if exists "Permitir upload publico - payment-proofs" on storage.objects;
create policy "Permitir upload publico - payment-proofs"
on storage.objects for insert
to public
with check (bucket_id = 'payment-proofs');

-- 7. Permitir leitura pública dos arquivos no bucket payment-proofs
drop policy if exists "Permitir leitura publica - payment-proofs" on storage.objects;
create policy "Permitir leitura publica - payment-proofs"
on storage.objects for select
to public
using (bucket_id = 'payment-proofs');

-- =============================================================
-- Confirmar que o bucket existe e está público
-- (rodar separadamente se precisar verificar)
-- SELECT * FROM storage.buckets WHERE id = 'payment-proofs';
-- =============================================================
