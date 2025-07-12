create table users (
  id uuid primary key references auth.users(id),
  email text unique not null,
  role text default 'worker',
  created_at timestamp with time zone default timezone('utc', now())
);

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
