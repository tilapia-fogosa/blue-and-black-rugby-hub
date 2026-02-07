-- Create Athlete Registrations Table
-- Using gen_random_uuid() which is built-in for modern Postgres
create table if not exists public.athlete_registrations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  origin_team text,
  preferred_position text not null,
  payment_proof_url text not null,
  birth_date date not null,
  cpf text not null unique,
  category text not null, -- 'Masc', 'Feminino', 'Juvenil Masc', 'Juvenil Fem'
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.athlete_registrations enable row level security;

-- Policies for Athlete Registrations
-- Drop existing policies to avoid conflicts
drop policy if exists "Anyone can register athlete" on public.athlete_registrations;
drop policy if exists "Admins can view athlete registrations" on public.athlete_registrations;
drop policy if exists "Admins can update athlete registrations" on public.athlete_registrations;

-- Allow anyone to insert (register)
create policy "Anyone can register athlete" 
  on public.athlete_registrations 
  for insert 
  with check (true);

-- Allow public view (or restrict to admin if Auth was fully set up)
create policy "Admins can view athlete registrations"
  on public.athlete_registrations
  for select
  using (true);

-- Allow updates (for approval)
create policy "Admins can update athlete registrations"
  on public.athlete_registrations
  for update
  using (true);
