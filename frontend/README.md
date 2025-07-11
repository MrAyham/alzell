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

### Daily Tasks

Use the **Tasks** link in the sidebar to manage daily tasks. The table shows
each task along with the assigned staff member, shift and status. The king can
add new tasks or delete them, while other staff may only update the status of
their own tasks.

### Royal Mode

Set `VITE_KING_PASSWORD` in your `.env` to enable the hidden admin panel.
The email which receives the `king` role can be configured via
`VITE_KING_EMAIL` (or `NEXT_PUBLIC_KING_EMAIL`). You can assign the role on
Supabase by running:

```bash
npm run assign-king
```

Make sure `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and the king email are set
as environment variables when running the script.

The SQL below creates the log table used for recording royal actions:

```sql
create table king_activity_log (
  id uuid default uuid_generate_v4() primary key,
  action text,
  timestamp timestamp default now()
);
```
