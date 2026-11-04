-- 인권교육 특별展 시설 안내 · Supabase 초기 설정
-- Supabase 대시보드 > SQL Editor 에 전체를 붙여 넣고 Run 한 번이면 됩니다.

-- 1) 편집자 명단 (여기 등록된 이메일 계정만 수정 가능)
create table if not exists public.editors (
  email text primary key
);
alter table public.editors enable row level security;  -- 정책 없음 = 페이지에서 명단 조회 불가

create or replace function public.is_editor()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.editors where lower(email) = lower(auth.jwt() ->> 'email'));
$$;
grant execute on function public.is_editor() to anon, authenticated;

-- 2) 시설 정보 (실별 수정 내용)
create table if not exists public.rooms (
  key text primary key,              -- 예: f2-1 (2층 1번 실)
  data jsonb not null,
  updated_at timestamptz default now(),
  updated_by uuid default auth.uid()
);
alter table public.rooms enable row level security;

drop policy if exists "rooms read"   on public.rooms;
drop policy if exists "rooms insert" on public.rooms;
drop policy if exists "rooms update" on public.rooms;
drop policy if exists "rooms delete" on public.rooms;
create policy "rooms read"   on public.rooms for select to anon, authenticated using (true);
create policy "rooms insert" on public.rooms for insert to authenticated with check (public.is_editor());
create policy "rooms update" on public.rooms for update to authenticated using (public.is_editor()) with check (public.is_editor());
create policy "rooms delete" on public.rooms for delete to authenticated using (public.is_editor());

-- 실시간 반영 (다른 사람이 저장하면 열려 있는 화면도 바로 바뀜)
do $$ begin
  alter publication supabase_realtime add table public.rooms;
exception when duplicate_object then null; end $$;

-- 3) 사진 저장소 (누구나 보기, 편집자만 올리기/지우기)
insert into storage.buckets (id, name, public) values ('room-photos', 'room-photos', true)
on conflict (id) do nothing;

drop policy if exists "photos editor insert" on storage.objects;
drop policy if exists "photos editor delete" on storage.objects;
create policy "photos editor insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'room-photos' and public.is_editor());
create policy "photos editor delete" on storage.objects for delete to authenticated
  using (bucket_id = 'room-photos' and public.is_editor());

-- 4) 편집자 등록 — 공용 계정 1개 (아이디 ksgi)
--    페이지 로그인 창에 'ksgi'를 넣으면 내부적으로 ksgi@example.com 계정으로 로그인합니다.
--    계정 자체(비밀번호)는 대시보드 Authentication > Users > Add user 에서 만듭니다.
insert into public.editors (email) values
  ('ksgi@example.com')
on conflict do nothing;

-- 5) 진행상황 공유 게시판 (누구나 보기, 편집자만 쓰기)
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  body text not null default '' check (char_length(body) <= 5000),
  photos jsonb not null default '[]'::jsonb,
  pinned boolean not null default false,
  team text not null default '청년부 기획팀' check (team in ('청년부 기획팀','대외섭외','도슨트','환경미화','실내안내','주차안내','방송/기록/의료')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author uuid default auth.uid()
);
alter table public.posts enable row level security;
drop policy if exists "posts read" on public.posts;
drop policy if exists "posts insert" on public.posts;
drop policy if exists "posts update" on public.posts;
drop policy if exists "posts delete" on public.posts;
create policy "posts read"   on public.posts for select to authenticated using ((select public.is_editor()));   -- 관리자만 보기
create policy "posts insert" on public.posts for insert to authenticated with check ((select public.is_editor()));
create policy "posts update" on public.posts for update to authenticated using ((select public.is_editor())) with check ((select public.is_editor()));
create policy "posts delete" on public.posts for delete to authenticated using ((select public.is_editor()));
do $$ begin
  alter publication supabase_realtime add table public.posts;
exception when duplicate_object then null; end $$;
