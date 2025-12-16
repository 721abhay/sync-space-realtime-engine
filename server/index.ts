import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for dev simplicity
        methods: ["GET", "POST"],
    },
});

// Store document state in memory (In production, use Redis)
const documentState: Record<string, string> = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins a document room
    socket.on("join-document", (documentId: string) => {
        socket.join(documentId);
        console.log(`User ${socket.id} joined doc: ${documentId}`);

        // Send existing state to the new user
        const currentState = documentState[documentId] || "";
        socket.emit("load-document", currentState);
    });

    // User types something (broadcast to others)
    socket.on("send-changes", ({ documentId, delta }: { documentId: string; delta: any }) => {
        // In a real CRDT app, we'd merge the delta. Here, we blindly broadcast.
        // However, to keep it simple for the MVP, we might just engage in full text replacement updates or delta forwarding.
        socket.to(documentId).emit("receive-changes", delta);
    });

    // Save document state
    socket.on("save-document", ({ documentId, data }: { documentId: string; data: string }) => {
        documentState[documentId] = data;
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = 3001; // Run on 3001 to avoid conflict with Next.js (3000)
server.listen(PORT, () => {
    console.log(`🚀 WebSocket Server running on http://localhost:${PORT}`);
});
