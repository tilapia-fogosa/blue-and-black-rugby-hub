-- Create Championship Registrations Table
create table if not exists public.championship_registrations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  city text not null,
  position text not null, -- 1 to 15
  payment_proof_url text,
  status text default 'pending', -- 'pending', 'approved', 'cancelled'
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.championship_registrations enable row level security;

-- Policies for Registration
-- Everyone can insert (register)
create policy "Anyone can register" 
  on public.championship_registrations 
  for insert 
  with check (true);

-- Only admins/service_role can select (view registrations)
-- For development simplicity without auth, we might need a public read or rely on dashboard
-- Ideally: create policy "Admins can view registrations" on ... using (auth.role() = 'service_role');
-- But for this project's current state (public read mostly):
create policy "Public view for admin dashboard"
  on public.championship_registrations
  for select
  using (true);

-- Only admins can update (approve status)
create policy "Public update for admin dashboard"
  on public.championship_registrations
  for update
  using (true);

-- Storage Bucket for Payment Proofs
-- Note: You need to create a bucket named 'payment-proofs' in the Storage section of Supabase Dashboard.
-- We can try to script policy creation assuming the bucket exists or will be created.

-- Policy to allow public upload to 'payment-proofs' bucket
-- (This usually requires running in the Storage SQL Editor or policies on storage.objects)
-- create policy "Public Upload" on storage.objects for insert with check ( bucket_id = 'payment-proofs' );
-- create policy "Public Read" on storage.objects for select using ( bucket_id = 'payment-proofs' );
