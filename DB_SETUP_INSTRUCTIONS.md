# Manual Neon Database Setup Instructions

I was unable to automatically initialize the database because the `neonctl` command requires an interactive browser login which is not supported in this environment.

Please follow these steps to connect your database:

1.  **Log in to Neon Console:**
    Go to [https://console.neon.tech](https://console.neon.tech).

2.  **Create or Select Project:**
    If you haven't already, create a project named **AgroLocal**.

3.  **Get Connection String:**
    - Navigate to the **Dashboard** or **Connection Details**.
    - Copy the **PostgreSQL Connection String**.
    - It should look like: `postgresql://neondb_owner:password@ep-xyz.region.neon.tech/neondb?sslmode=require`

4.  **Update Configuration:**
    - Open the `.env` file in your project root (`d:/agroguard/.env`).
    - Replace the placeholder `DATABASE_URL` with your copied string.

5.  **Verify:**
    - Once updated, I will be able to verify the connection and enable the PostGIS extension for you.
