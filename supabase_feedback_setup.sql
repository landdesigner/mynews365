-- MY NEWS 365: private feedback; execute in Supabase SQL Editor once.
create table if not exists public.feedback (
 id uuid primary key default gen_random_uuid(),
 kind text not null check (kind in ('관심 뉴스 주제','신문사·기관 추가','기능 개선','기타 의견')),
 nickname text not null default '' check (char_length(nickname)<=60),
 message text not null check (char_length(message) between 1 and 2000),
 created_at timestamptz not null default now()
);
alter table public.feedback enable row level security;
drop policy if exists "feedback public insert" on public.feedback;
create policy "feedback public insert" on public.feedback for insert to anon,authenticated with check (true);
drop policy if exists "feedback admin select" on public.feedback;
create policy "feedback admin select" on public.feedback for select to authenticated using (public.is_mynews_admin());
grant insert on public.feedback to anon,authenticated;
grant select on public.feedback to authenticated;
-- No update or delete policy for visitors; no public select policy.
