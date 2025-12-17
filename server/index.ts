import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { createClient } from "redis";
import fs from "fs";
import path from "path";

const app = express();

// --- SECURITY LAYER (Row 9: Security) ---
// 1. Security Headers (Manual Logic to avoid dependencies like Helmet)
app.use((req, res, next) => {
    res.set("X-Content-Type-Options", "nosniff");
    res.set("X-Frame-Options", "DENY");
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.set("X-XSS-Protection", "1; mode=block");
    next();
});

// 2. Rate Limiting (Token Bucket Simulation)
const ipMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

app.use((req, res, next) => {
    const ip = req.ip || "unknown";
    const now = Date.now();

    let record = ipMap.get(ip);
    if (!record || now > record.resetTime) {
        record = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
        ipMap.set(ip, record);
    }

    record.count++;
    if (record.count > MAX_REQUESTS) {
        res.status(429).json({ error: "Too many requests" });
        return;
    }
    next();
});

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

// Health Check Endpoint (For AWS Load Balancer)
app.get("/ping", (req, res) => {
    res.send("pong");
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// --- INFRASTRUCTURE LAYER: REDIS + FALLBACK ---
let useRedis = false;
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', () => {
    // console.log('Redis/Docker not running, falling back to File System');
    useRedis = false;
});
redisClient.on('connect', () => {
    console.log('🚀 Connected to Redis (Cache Layer)');
    useRedis = true;
});

(async () => {
    try {
        await redisClient.connect();
    } catch {
        console.log("⚠️ Redis connection failed. Using database.json fallback.");
        useRedis = false;
    }
})();

const DOCUMENT_KEY = "demo-doc-1";
const DB_PATH = path.join(__dirname, "database.json");

// --- PERSISTENCE LOGIC ---
async function saveDocument(content: string) {
    if (useRedis) {
        try {
            await redisClient.set(DOCUMENT_KEY, content);
        } catch (e) {
            console.error("Redis Save Error:", e);
        }
    } else {
        // Fallback
        try {
            fs.writeFileSync(DB_PATH, JSON.stringify({ content }));
        } catch (e) { console.error(e); }
    }
}

async function getDocument() {
    if (useRedis) {
        try {
            const data = await redisClient.get(DOCUMENT_KEY);
            if (data) return data;
        } catch (e) {
            console.error("Redis Get Error:", e);
        }
    } else {
        // Fallback
        if (fs.existsSync(DB_PATH)) {
            try {
                return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")).content;
            } catch { }
        }
    }

    // Default content
    return `
# SyncSpace Architecture 🚀

## 1. Overview
SyncSpace is a real-time collaboration collaboration engine designed for high-performance engineering teams.

## 2. Infrastructure (System Design)
- **Database**: PostgreSQL (Data Vault)
- **Cache**: Redis - ${useRedis ? "CONNECTED ✅" : "OFFLINE (Using File Fallback) ⚠️"}
- **Backend**: Node.js + Socket.io
- **Security**: Rate-Lmited & Headers Secured 🔒

## 3. Status
- [x] Real-time Sync: ACTIVE
`;
}

io.on("connection", async (socket) => {
    console.log("User Connected:", socket.id);

    // 1. Fetch State from Redis/File
    const currentContent = await getDocument();
    socket.emit("document-update", currentContent);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    });

    socket.on("send-changes", async (newContent) => {
        // 2. Broadcast to peers (Optimistic)
        socket.broadcast.emit("document-update", newContent);

        // 3. Persist to Redis/File (Async)
        await saveDocument(newContent);
    });

    // AI Simulation
    socket.on("trigger-ai", () => {
        const aiResponse = `\n\n## AI Analysis\nRedis is effectively handling the state management, reducing database load by 95%.\nRecommended Action: Scale Redis Cluster for global sharding.`;

        let currentIndex = 0;

        const streamInterval = setInterval(async () => {
            if (currentIndex < aiResponse.length) {
                // We need to fetch latest because user might be typing
                const latest = await getDocument();
                const updated = latest + aiResponse[currentIndex];

                io.emit("document-update", updated);
                await saveDocument(updated);

                currentIndex++;
            } else {
                clearInterval(streamInterval);
            }
        }, 30);
    });
});

server.listen(3001, () => {
    console.log("🚀 Server running on port 3001");
    console.log("🔒 Security Layer Active: Headers + Rate Limiting");
});
