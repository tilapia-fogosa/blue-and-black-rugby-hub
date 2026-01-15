-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Events Table
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  date date not null,
  time time without time zone,
  location text not null,
  type text not null, -- 'Jogo', 'Treino', 'Final', 'Social', etc.
  opponent text,
  description text,
  created_at timestamptz default now()
);

-- Galleries Table
create table public.galleries (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  event_id uuid references public.events(id),
  category text not null, -- 'Jogos', 'Treinos', 'Vitórias', 'Equipe', 'Eventos', 'Troféus'
  cover_image_url text,
  created_at timestamptz default now()
);

-- Gallery Images Table
create table public.gallery_images (
  id uuid default uuid_generate_v4() primary key,
  gallery_id uuid references public.galleries(id) on delete cascade not null,
  image_url text not null,
  alt_text text,
  created_at timestamptz default now()
);

-- Athletes Table
create table public.athletes (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  position text not null,
  achievements text,
  years text,
  description text,
  photo_url text,
  active boolean default true,
  created_at timestamptz default now()
);

-- Sponsors Table
create table public.sponsors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text not null,
  logo_url text,
  website_url text,
  tier text, -- 'Principal', 'Premium', 'Apoiador'
  created_at timestamptz default now()
);

-- History Table
create table public.history (
  id uuid default uuid_generate_v4() primary key,
  year text not null,
  title text not null,
  description text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.events enable row level security;
alter table public.galleries enable row level security;
alter table public.gallery_images enable row level security;
alter table public.athletes enable row level security;
alter table public.sponsors enable row level security;
alter table public.history enable row level security;

-- Create policies (Public read access)
create policy "Public events are viewable by everyone" on public.events for select using (true);
create policy "Public galleries are viewable by everyone" on public.galleries for select using (true);
create policy "Public gallery images are viewable by everyone" on public.gallery_images for select using (true);
create policy "Public athletes are viewable by everyone" on public.athletes for select using (true);
create policy "Public sponsors are viewable by everyone" on public.sponsors for select using (true);
create policy "Public history is viewable by everyone" on public.history for select using (true);
