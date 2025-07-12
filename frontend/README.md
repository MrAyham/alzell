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
each task along with the assigned staff member, shift and status. Admin users can
add new tasks or delete them, while other staff may only update the status of
their own tasks.

