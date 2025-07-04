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

 codex/build-smart-alerts-system-in-chefmind
create table dismissed_alerts (
  id uuid default uuid_generate_v4() primary key,
  message text,
=======
create table daily_tasks (
  id uuid default uuid_generate_v4() primary key,
  task text,
  shift text,
  status text default 'pending',
  staff_id uuid references staff(id),
 main
  created_at timestamp default now()
);

create table shifts_schedule (
  id uuid default uuid_generate_v4() primary key,
  staff_id uuid references staff(id),
  day text,
  shift text,
  created_at timestamp default now()
);
