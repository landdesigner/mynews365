-- MY NEWS 365 / Supabase SQL Editor: run once
create extension if not exists pgcrypto;
create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, is_admin boolean not null default false);
create table if not exists public.user_preferences (user_id uuid primary key references auth.users(id) on delete cascade, topics jsonb not null default '[]'::jsonb, favorites jsonb not null default '[]'::jsonb, updated_at timestamptz not null default now());
create table if not exists public.comments (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null, name text not null check(char_length(name) between 1 and 24), category text not null check(category in ('관심 뉴스 추천','신문사·기관 추가','기능 개선','자유 의견')), message text not null check(char_length(message) between 1 and 500), status text not null default 'pending' check(status in ('pending','approved','rejected')), created_at timestamptz not null default now());
create index if not exists comments_status_date_idx on public.comments(status,created_at desc);
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.comments enable row level security;
-- Restrict profile visibility to the owner; public cannot edit admin flag.
drop policy if exists "profile own read" on public.profiles;
create policy "profile own read" on public.profiles for select to authenticated using (id=auth.uid());
drop policy if exists "prefs own read" on public.user_preferences;
create policy "prefs own read" on public.user_preferences for select to authenticated using(user_id=auth.uid());
drop policy if exists "prefs own insert" on public.user_preferences;
create policy "prefs own insert" on public.user_preferences for insert to authenticated with check(user_id=auth.uid());
drop policy if exists "prefs own update" on public.user_preferences;
create policy "prefs own update" on public.user_preferences for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
-- Anonymous submissions are pending only. No public read of unapproved comments.
drop policy if exists "comment public submit" on public.comments;
create policy "comment public submit" on public.comments for insert to anon,authenticated with check(status='pending' and (user_id is null or user_id=auth.uid()));
-- Security definer helper avoids recursive profiles RLS; never editable from browser.
create or replace function public.is_mynews_admin() returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.profiles where id=auth.uid() and is_admin=true)$$;
revoke all on function public.is_mynews_admin() from public;
grant execute on function public.is_mynews_admin() to authenticated;
drop policy if exists "comment admin read" on public.comments;
create policy "comment admin read" on public.comments for select to authenticated using(public.is_mynews_admin());
drop policy if exists "comment admin update" on public.comments;
create policy "comment admin update" on public.comments for update to authenticated using(public.is_mynews_admin()) with check(public.is_mynews_admin());
create or replace view public.public_comments with (security_invoker=true) as select id,name,category,message,created_at from public.comments where status='approved';
-- A view with security_invoker needs a SELECT policy on comments for approved entries.
drop policy if exists "comment approved read" on public.comments;
create policy "comment approved read" on public.comments for select to anon,authenticated using(status='approved');
grant select on public.public_comments to anon,authenticated;
grant select,insert,update on public.comments to anon,authenticated;
grant select on public.profiles to authenticated;
grant select,insert,update on public.user_preferences to authenticated;
-- AFTER you sign in once, replace email and run this statement manually in SQL Editor:
-- insert into public.profiles(id,is_admin) select id,true from auth.users where email='YOUR_ADMIN_EMAIL@example.com' on conflict(id) do update set is_admin=true;
