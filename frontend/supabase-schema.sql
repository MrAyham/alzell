create table users (
  id uuid primary key references auth.users(id),
  email text unique not null,
  role text default 'worker',
  created_at timestamp with time zone default timezone('utc', now())
);

insert into public.users (id, email, role)
select id, email, 'king'
from auth.users
where email = 'h.b.k.ayhm@gmail.com'
on conflict (email) do update set role = 'king';
-- policies will limit insert/select/update based on role value

create table staff (
  id uuid default uuid_generate_v4() primary key,
  name text,
  role text,
  shift text,
  status text default 'Active',
  created_at timestamp default now()
);

create table daily_reports (
  id uuid default uuid_generate_v4() primary key,
  date date not null,
  shift text not null,
  staff_id uuid references staff(id),
  notes text,
  issues text,
  created_at timestamp default now()
);

 codex/create-and-link-offers-page
create table dismissed_alerts (
  id uuid default uuid_generate_v4() primary key,
  message text,
  created_at timestamp default now()
);

=======
 codex/build-inventory-management-page
=======
create table dismissed_alerts (
  id uuid default uuid_generate_v4() primary key,
  message text
);

 main
 main
create table daily_tasks (
  id uuid default uuid_generate_v4() primary key,
  task text,
  shift text,
  status text default 'pending',
  staff_id uuid references staff(id),
  created_at timestamp default now()
);

create table shifts_schedule (
  id uuid default uuid_generate_v4() primary key,
  staff_id uuid references staff(id),
  day text,
  shift text,
  created_at timestamp default now()
);

 codex/create-orders-and-order_items-tables-in-supabase
-- codex/create-orders-tables
create table orders (
  id uuid default uuid_generate_v4() primary key,
  order_number serial,
  staff_id uuid references staff(id),
  shift text,
  status text,
  notes text,
  created_at timestamp default now()
);

create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id),
  menu_item_id uuid references menu_items(id),
  quantity integer default 1,
  special_request text
=======
 codex/add-upsell-center-page
create table upsell_items (
  id uuid default uuid_generate_v4() primary key,
  title text,
  description text,
  price float,
  image_url text,
  available boolean default true,
  created_at timestamp default now()
);

create table daily_notes (
  id uuid default uuid_generate_v4() primary key,
  note text,
  date date,
=======
 codex/create-and-link-offers-page
create table offers (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  discount_percent integer,
  valid_from date,
  valid_to date,
  is_active boolean default true,
=======
create table inventory (
  id uuid default uuid_generate_v4() primary key,
  item_name text not null,
  quantity integer not null,
  unit text,
  low_stock_alert boolean default false,
 main
 main
  created_at timestamp default now()
 main
);

-- Enable row level security for users table
alter table users enable row level security;

create policy "Allow insert for authenticated users"
on users for insert
to authenticated
using (auth.uid() = id);

-- Prevent assigning the king role to new signups
create policy "Disallow king signups" on users
  for insert with check (
    new.role <> 'King' or auth.uid() = '00000000-0000-0000-0000-000000000001'
  );

-- Log unauthorized attempts to modify the king role
create table king_security_log (
  id uuid default uuid_generate_v4() primary key,
  attempted_by uuid,
  action text,
  created_at timestamp default now()
);

create or replace function log_king_mod() returns trigger as $$
begin
  if new.role = 'King' and auth.uid() <> '00000000-0000-0000-0000-000000000001' then
    insert into king_security_log(attempted_by, action)
      values (auth.uid(), tg_op);
    raise exception 'Unauthorized attempt to modify king role';
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger protect_king_role
before insert or update on users
for each row execute function log_king_mod();

create or replace function prevent_multiple_kings()
returns trigger as $$
begin
  if (new.role = 'king') and (
    exists (
      select 1 from public.users
      where role = 'king' and email != new.email
    )
  ) then
    raise exception 'Only one king is allowed.';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists only_one_king on public.users;

create trigger only_one_king
before insert or update on public.users
for each row execute procedure prevent_multiple_kings();
