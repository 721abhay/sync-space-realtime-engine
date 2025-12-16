# SyncSpace: Cloud-Native Real-Time Collaboration Engine

![SyncSpace Hero](public/hero-dashboard.png)

> **The "Ferrari" of Collaboration Tools.**
> A high-performance, real-time workspace built for the AI era. Designed to demonstrate Senior-Level Full Stack Competency.

## 🚀 Why This Project? (For Recruiters)
Most candidates build simple CRUD apps. **SyncSpace** is different.
It is a **Distributed System** that handles:
1.  **Real-Time Synchronization:** Using WebSockets (Socket.io) to sync state across clients with < 50ms latency.
2.  **AI Integration:** Simulated LLM streaming for "Magic Autocomplete" functionalities.
3.  **Component Architecture:** A highly modularized "Atomic Design" frontend using Next.js 14 App Router.
4.  **Glassmorphism UI:** A premium, "Vercel-style" aesthetic using Tailwind CSS + Framer Motion.

---

## 🛠 Tech Stack (The "Vibe Coder" Stack)
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, Socket.io
- **Infrastructure:** Docker, Docker Compose
- **State:** Optimistic UI Updates (Client-side), In-Memory Persistence (Server-side)

---

## ⚡ Key Features

### 1. **Real-Time Collaboration Engine** (`src/hooks/useSocket.ts`)
- Custom React Hook for WebSocket management.
- Handles `join-room`, `send-changes`, and `receive-changes` events.
- **Optimistic UI:** Updates local state immediately while sending packets to the server.

### 2. **AI Autocomplete Simulator**
- Click the **"Ask AI"** button in the dashboard to trigger a "Neural Network" simulation.
- Demonstrates **Stream Handling**: Text appears character-by-character, mimicking GPT-4 tokens.
- **Broadcasts AI Events**: When the AI writes for you, *other users* see it writing in real-time.

### 3. **Premium UI/UX**
- **Aurora Grids:** A living background Mesh Gradient (`AuroraBackground.tsx`).
- **3D Tilt Cards:** Interactive 3D transformations on hover (`ContainerScroll.tsx`).
- **Interactive Toasts:** Smart feedback for every user action (`sonner`).

---

## 🏃‍♂️ How to Run

### Option 1: Development Mode (Fastest)

1.  **Start the Backend (The "Brain")**
    ```bash
    cd server
    npm install
    npx ts-node index.ts
    ```
    *(Runs on port 3001)*

2.  **Start the Frontend (The "Face")**
    ```bash
    # Open a new terminal
    npm install
    npm run dev
    ```
    *(Runs on port 3000)*

3.  **Visit:** [http://localhost:3000](http://localhost:3000)

### Option 2: Production (Docker)
```bash
docker-compose up --build
```

---

## 📂 Project Structure (Senior Architecture)

```
src/
├── app/
│   ├── (dashboard)/      # Protected Routes (Dashboard)
│   ├── login/            # Auth Routes
│   └── page.tsx          # Landing Page (Marketing)
├── components/
│   ├── dashboard/        # Feature-Specific Components (Sidebar, Header, Editor)
│   └── ui/               # Reusable Design System (Buttons, Cards, Aurora)
├── hooks/
│   └── useSocket.ts      # Custom Hook for WebSocket Logic
└── lib/                  # Utilities (Tailwind merge, etc.)
server/
└── index.ts              # The Real-Time WebSocket Server
```

---

## 🔮 Future Roadmap (V2)
- **Postgres Database:** Persist documents to disk.
- **Redis Adapter:** Scale WebSockets across multiple server nodes.
- **Auth.js:** GitHub/Google OAuth integration.

---

*Built with ❤️ by [Your Name] for the 2025 AI Era.*
