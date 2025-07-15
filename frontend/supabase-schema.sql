create table roles (
  id serial primary key,
  name text not null unique
);

create table users (
  id uuid primary key references auth.users(id),
  email text,
  role_id integer references roles(id)
);

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

create table dismissed_alerts (
  id uuid default uuid_generate_v4() primary key,
  message text,
  created_at timestamp default now()
);

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
);

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
  date date
);

create table offers (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  discount_percent integer,
  valid_from date,
  valid_to date,
  is_active boolean default true
);

create table inventory (
  id uuid default uuid_generate_v4() primary key,
  item_name text not null,
  quantity integer not null,
  unit text,
  low_stock_alert boolean default false,
  created_at timestamp default now()
);

alter table users enable row level security;

create policy "Allow insert for authenticated users"
on users for insert
to authenticated
using (auth.uid() = id);

create policy "Allow access to own user record"
on users for select
using (auth.uid() = id);
