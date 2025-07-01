# ChefMind Frontend

This project is a simple admin dashboard for the imaginary ChefMind restaurant.
It uses React, Tailwind CSS, and Supabase for authentication and database access.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```

Make sure to configure the Supabase credentials in `.env`.

### Royal Mode

Set `VITE_KING_PASSWORD` in your `.env` to enable the hidden admin panel. The SQL below
creates the log table used for recording royal actions:

```sql
create table king_activity_log (
  id uuid default uuid_generate_v4() primary key,
  action text,
  timestamp timestamp default now()
);
```
