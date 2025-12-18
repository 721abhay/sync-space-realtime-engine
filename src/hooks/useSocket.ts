"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

// In production, we use the env variable. In dev, we fallback to localhost.
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

// Simple debounce utility to avoid spamming the socket
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export const useSocket = (documentId: string) => {
    // const [socket, setSocket] = useState<Socket | null>(null); // Removed to fix lint/perf
    const [content, setContent] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [userCount, setUserCount] = useState(1);
    const debouncedSendRef = useRef<((content: string) => void) | null>(null);

    // Ref to prevent "stale closure" issues in event listeners if we needed them
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // 1. Initialize Connection
        const s = io(SOCKET_URL);
        socketRef.current = s;
        // setSocket(s);

        // Initialize Debouncer
        debouncedSendRef.current = debounce((c: string) => {
            if (socketRef.current) {
                socketRef.current.emit("send-changes", c);
            }
        }, 300);

        // 2. Setup Event Listeners
        s.on("connect", () => {
            setIsConnected(true);
            s.emit("join-room", documentId);
        });

        s.on("disconnect", () => {
            setIsConnected(false);
            toast.error("Disconnected from Server");
        });

        s.on("document-update", (newContent: string) => {
            setContent(newContent);
            setIsGenerating(false);
        });

        s.on("user-count", (count: number) => {
            setUserCount(count);
        });

        // 3. Cleanup on Unmount
        return () => {
            s.disconnect();
        };
    }, [documentId]);

    // Function to send changes
    const sendChange = useCallback((newContent: string) => {
        // Optimistic UI Update (Immediate)
        setContent(newContent);

        // Network Update (Debounced)
        if (debouncedSendRef.current) {
            debouncedSendRef.current(newContent);
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
        isGenerating,
        userCount
    };
};
