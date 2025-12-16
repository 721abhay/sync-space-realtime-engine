"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (documentId: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [content, setContent] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const s = io("http://localhost:3001");
        setSocket(s);

        s.emit("join-document", documentId);

        s.on("load-document", (documentContent) => {
            setContent(documentContent);
        });

        s.on("receive-changes", (newContent) => {
            setContent(newContent);
        });

        return () => {
            s.disconnect();
        };
    }, [documentId]);

    const sendChange = (newContent: string) => {
        setContent(newContent);
        if (socket) {
            socket.emit("send-changes", { documentId, delta: newContent });
            socket.emit("save-document", { documentId, data: newContent });
        }
    };

    // The Magic AI Function
    const triggerAI = async (prompt: string) => {
        setIsGenerating(true);

        // Simulate an AI thinking delay
        await new Promise(r => setTimeout(r, 800));

        const aiResponse = `\n\n[AI GENERATED]: Based on your request "${prompt}", here is a suggested technical spec:\n\n1. Use a Microservices Architecture for scalability.\n2. Implement Redis Caching to reduce database load by 40%.\n3. Secure all endpoints with OAuth2 and JWT rotation.\n\nLet me know if you need more details!`;

        let currentText = content;
        const responseChars = aiResponse.split("");

        // Simulate "Streaming" effect character by character
        for (const char of responseChars) {
            await new Promise(r => setTimeout(r, 15)); // Fast typing speed
            currentText += char;
            setContent(currentText);
            // Broadcast the AI writing to others too!
            if (socket) socket.emit("send-changes", { documentId, delta: currentText });
        }

        setIsGenerating(false);
    };

    return { content, sendChange, isConnected: !!socket, triggerAI, isGenerating };
};
