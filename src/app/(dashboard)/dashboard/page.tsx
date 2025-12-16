"use client";

import React from "react";
import { useSocket } from "@/hooks/useSocket";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Editor } from "@/components/dashboard/Editor";

export default function DashboardPage() {
    const { content, sendChange, isConnected, triggerAI, isGenerating } = useSocket("demo-doc-1");

    return (
        <div className="flex h-screen w-full bg-black text-white selection:bg-purple-500/30">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 bg-neutral-950 relative">
                <Header isConnected={isConnected} />

                <Editor
                    content={content}
                    onContentChange={sendChange}
                    onTriggerAI={() => triggerAI("Generate System Architecture")}
                    isGenerating={isGenerating}
                />
            </main>
        </div>
    );
}
