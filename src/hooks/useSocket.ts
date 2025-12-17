"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

// In production, we use the env variable. In dev, we fallback to localhost.
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export const useSocket = (documentId: string) => {
    // const [socket, setSocket] = useState<Socket | null>(null); // Removed to fix lint/perf
    const [content, setContent] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Ref to prevent "stale closure" issues in event listeners if we needed them
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // 1. Initialize Connection
        const s = io(SOCKET_URL);
        socketRef.current = s;
        // setSocket(s);

        // 2. Setup Event Listeners
        s.on("connect", () => {
            setIsConnected(true);
            // toast.success("Connected to Real-time Engine");

            // Join the specific document room
            s.emit("join-room", documentId);
        });

        s.on("disconnect", () => {
            setIsConnected(false);
            toast.error("Disconnected from Server");
        });

        s.on("document-update", (newContent: string) => {
            setContent(newContent);
            // Auto-stop generating if we were
            setIsGenerating(false);
        });

        // 3. Cleanup on Unmount
        return () => {
            s.disconnect();
        };
    }, [documentId]);

    // Function to send changes (Debounce logic could be added here)
    const sendChange = useCallback((newContent: string) => {
        // Optimistic UI Update (Immediate)
        setContent(newContent);

        // Network Update
        if (socketRef.current) {
            socketRef.current.emit("send-changes", newContent);
        }
    }, []);

    // Function to trigger AI
    const triggerAI = useCallback((prompt: string) => {
        if (socketRef.current) {
            setIsGenerating(true);
            setContent((prev) => prev + "\n\n✨ AI generating thoughts...\n");
            socketRef.current.emit("trigger-ai", prompt);
        }
    }, []);

    return {
        // socket,
        content,
        sendChange,
        isConnected,
        triggerAI,
        isGenerating
    };
};
