
# 🚀 Vercel Deployment Guide

To deploy this fullstack application, we recommend a **Hybrid Deployment Strategy**:

1.  **Frontend** → Vercel (Running Next.js)
2.  **Backend** → Railway / Render / VPS (Running Node.js + BullMQ Worker)
3.  **Database** → Neon / Supabase (Postgres) + Upstash (Redis)

---

## 1️⃣ Deploy Frontend to Vercel

1.  Push your code to **GitHub**.
2.  Go to **[Vercel Dashboard](https://vercel.com)** → Add New Project.
3.  Import your GitHub repository.
4.  Set the **Root Directory** to `frontend`.
5.  Add Environment Variable:
    *   `NEXT_PUBLIC_API_URL`: `https://your-backend-url.com/api` (You will get this after deploying backend)
6.  Click **Deploy**.

---

## 2️⃣ Deploy Backend (Recommended: Railway)

Because the backend uses **BullMQ (Redis Workers)**, it requires a persistent server process and cannot run on Vercel's serverless functions efficiently.

### Using Railway (Easiest)
1.  Sign up at **[Railway.app](https://railway.app)**.
2.  Create a **New Project** → **Deploy from GitHub Repo**.
3.  Set the **Root Directory** to `backend`.
4.  Add a **PostgreSQL** service (via Railway dashboard).
5.  Add a **Redis** service (via Railway dashboard).
6.  Configure Environment Variables in the Backend Service:
    *   `PORT`: `5000` (Railway sets this automatically usually)
    *   `DATABASE_URL`: `postgresql://...` (Link to the Postgres service)
    *   `REDIS_URL`: `redis://...` (Link to the Redis service)
    *   `JWT_SECRET`: `your-secure-secret`
    *   `NODE_ENV`: `production`
7.  Deploy!
8.  Copy the provided **Backend URL** (e.g., `https://tiktok-backend.up.railway.app`) and update your Vercel `NEXT_PUBLIC_API_URL`.

---

## 3️⃣ Alternative: Render.com

Similar to Railway:
1.  Create a **Web Service** for the `backend`.
    *   Build Command: `npm install && npm run build`
    *   Start Command: `npm start`
2.  Create a **PostgreSQL** database.
3.  Create a **Redis** instance.
4.  Link them via Environment Variables.

---

## ⚠️ Important Notes

*   **Allowed Origins (CORS)**:
    Make sure your backend allows requests from your Vercel domain. Update `backend/src/index.ts` if needed, or simply allow all origins (`*`) during initial testing.
    Currently, `cors()` allows all by default unless configured otherwise.

*   **Database Migrations**:
    The backend automatically attempts to run migrations on startup (`src/index.ts` calls `migrate()`). Ensure the database user has permissions to create tables.

*   **Workers**:
    The `worker` process runs inside the main `index.ts` (`setupWorker()`). This means a single instance handles both API requests and Background Jobs. For high scale, you would separate them, but for this MVP, it works perfectly on a single Standard Dyno/Service.
