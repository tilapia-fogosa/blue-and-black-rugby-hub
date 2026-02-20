-- Run this script in your Supabase SQL Editor to allow public read access for the relatorios page

-- Drop the policy if it already exists to avoid errors
drop policy if exists "Permitir leitura publica de cadastros aprovados" on public.athlete_registrations;

-- Create policy to allow ANYONE to read athlete registrations, BUT ONLY if they are approved
create policy "Permitir leitura publica de cadastros aprovados"
on public.athlete_registrations
for select
to public
using (status = 'approved');
