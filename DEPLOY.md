# 🚀 SyncSpace Deployment Guide

This guide describes how to deploy SyncSpace to production.

## 1. The Architecture
SyncSpace is split into two parts:
1.  **Frontend (Next.js):** Hosted on **Vercel**.
2.  **Backend (Node.js):** Hosted on **Railway** or **Render** (Node.js Service).

Because Vercel is "Serverless", it cannot host long-running WebSocket servers. We must deploy them separately.

## 2. Deploying the Backend (Socket Server)
*(Recommended Service: Railway.app)*

1.  Push this code to GitHub.
2.  Go to Railway.app -> New Project -> Deploy from GitHub Repo.
3.  Select the `sync-space` repo.
4.  **Important:** Configure the **Root Directory** settings:
    - Root Directory: `/server`
    - Build Command: `npm install && npm run build` (or `tsc`)
    - Start Command: `npm start`
5.  Variables:
    - Add `REDIS_URL` if you want a real cache (Railway provides a Redis plugin).
    - If no Redis is provided, it will fallback to File System (which is flaky on cloud, but works for demos).
6.  Once deployed, copy the **Public URL** (e.g., `https://syncspace-backend.up.railway.app`).

## 3. Deploying the Frontend (Next.js)
*(Recommended Service: Vercel)*

1.  Go to Vercel -> Add New -> Project.
2.  Import `sync-space` from GitHub.
3.  **Environment Variables:**
    - Name: `NEXT_PUBLIC_SOCKET_URL` 
    - Value: `The URL from Step 2` (e.g., `https://syncspace-backend.up.railway.app`)
4.  Click **Deploy**.

## 4. Local Docker (Hybrid Mode)
To run everything locally with "Production Grade" infrastructure:
```bash
docker-compose up --build
```
This spins up Postgres, Redis, Backend, and Frontend on your laptop.
