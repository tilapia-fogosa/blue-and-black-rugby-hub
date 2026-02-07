-- FIX PARA STORAGE (Comprovantes)
-- Execute isso no SQL Editor do Supabase

-- 1. Garantir que o bucket existe (caso não tenha criado pelo painel)
-- Nota: se der erro de "already exists", pode ignorar esta parte.
insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', true)
on conflict (id) do nothing;

-- 2. Remover políticas antigas de storage para evitar duplicidade
drop policy if exists "Public Upload" on storage.objects;
drop policy if exists "Public Read" on storage.objects;

-- 3. Criar política para permitir UPLOAD (INSERT) anônimo no bucket específico
create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'payment-proofs' );

-- 4. Criar política para permitir LEITURA (SELECT) anônimo no bucket específico
create policy "Public Read"
on storage.objects for select
using ( bucket_id = 'payment-proofs' );

-- 5. Se o erro persistir, tente liberar acesso TOTAL ao storage para esse bucket (apenas para teste)
-- drop policy if exists "Give all access" on storage.objects;
-- create policy "Give all access" on storage.objects for all using ( bucket_id = 'payment-proofs' );
