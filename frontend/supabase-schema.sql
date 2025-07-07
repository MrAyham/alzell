create table staff (
  id uuid default uuid_generate_v4() primary key,
  name text,
  role text,
  shift text,
  status text,
  created_at timestamp default now()
);

create table daily_reports (
  id uuid default uuid_generate_v4() primary key,
  date date,
  shift text,
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

create table offers (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  discount_percent integer,
  valid_from date,
  valid_to date,
  is_active boolean default true,
  created_at timestamp default now()
);
