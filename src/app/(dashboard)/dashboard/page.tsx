"use client";

import React, { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Editor } from "@/components/dashboard/Editor";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { motion } from "framer-motion";
import {
    Inbox,
    AlertCircle,
    Hash,
    Users,
    Settings,
    Code2,
    Palette,
    Database,
    ToggleLeft,
    Monitor
} from "lucide-react";

export default function DashboardPage() {
    const { content, sendChange, isConnected, triggerAI, isGenerating } = useSocket("demo-doc-1");
    const [currentView, setCurrentView] = useState("Home");
    const [showCommandPalette, setShowCommandPalette] = useState(false);

    return (
        <div className="flex h-screen w-full bg-black text-white selection:bg-purple-500/30">
            <CommandPalette
                isOpen={showCommandPalette}
                onClose={() => setShowCommandPalette(false)}
                onNavigate={(view) => { setCurrentView(view); setShowCommandPalette(false); }}
            />

            <Sidebar activeTab={currentView} onTabChange={setCurrentView} />

            <main className="flex-1 flex flex-col min-w-0 bg-neutral-950 relative">
                <Header
                    isConnected={isConnected}
                    title={currentView}
                    onSearchClick={() => setShowCommandPalette(true)}
                    onNavigate={setCurrentView}
                />

                {/* --- 1. HOME (Real-Time Editor) --- */}
                {currentView === "Home" && (
                    <Editor
                        content={content}
                        onContentChange={sendChange}
                        onTriggerAI={() => triggerAI("Generate System Architecture")}
                        isGenerating={isGenerating}
                    />
                )}

                {/* --- 2. INBOX --- */}
                {currentView === "Inbox" && (
                    <PlaceholderState
                        icon={Inbox}
                        title="Inbox Zero"
                        description="You have cleared all your notifications. Go enjoy a coffee."
                    />
                )}

                {/* --- 3. ISSUES --- */}
                {currentView === "My Issues" && (
                    <PlaceholderState
                        icon={AlertCircle}
                        title="No Active Issues"
                        description="You are currently not assigned to any critical bugs."
                    />
                )}

                {/* --- 4. PROJECTS (Frontend Core, API V2, Design System) --- */}
                {["Frontend Core", "API V2", "Design System"].includes(currentView) && (
                    <ProjectView title={currentView} />
                )}

                {/* --- 5. TEAMS (Engineering, Design, Marketing) --- */}
                {["Engineering", "Design", "Marketing"].includes(currentView) && (
                    <TeamView title={currentView} />
                )}

                {/* --- 6. SETTINGS --- */}
                {currentView === "Settings" && (
                    <SettingsView />
                )}

                {/* --- 7. INVITE MEMBERS --- */}
                {currentView === "Invite Members" && (
                    <PlaceholderState
                        icon={Users}
                        title="Invite your Team"
                        description="Share this link: syncspace.app/team/invite/k92-a82"
                    />
                )}
                {/* --- 8. FALLBACK (If view not found) --- */}
                {!["Home", "Inbox", "My Issues", "Frontend Core", "API V2", "Design System", "Engineering", "Design", "Marketing", "Settings", "Invite Members"].includes(currentView) && (
                    <PlaceholderState
                        icon={AlertCircle}
                        title="View Not Found"
                        description={`The view "${currentView}" does not exist yet.`}
                    />
                )}
            </main>
        </div>
    );
}

// --- Sub-Components for Different Views ---

const PlaceholderState = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 animate-in fade-in duration-500">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-full bg-neutral-900/50 mb-4 border border-white/5"
        >
            <Icon className="h-12 w-12 text-neutral-600" />
        </motion.div>
        <h2 className="text-xl font-medium text-neutral-300">{title}</h2>
        <p className="mt-2 text-sm max-w-xs text-center">{description}</p>
    </div>
);

const ProjectView = ({ title }: { title: string }) => {
    return (
        <div className="flex-1 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Project Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                        {title.includes("Design") ? <Palette /> : title.includes("API") ? <Database /> : <Code2 />}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <p className="text-neutral-400 text-sm">Maintained by Engineering • Updated 2h ago</p>
                    </div>
                </div>

                {/* Simulated Tasks */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Active Sprints</h3>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-neutral-900/50 border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="text-neutral-300 font-medium">Refactor Component_{i} for better performance</span>
                            </div>
                            <div className="flex -space-x-2">
                                <div className="h-6 w-6 rounded-full bg-purple-500 border border-black" />
                                <div className="h-6 w-6 rounded-full bg-blue-500 border border-black" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const TeamView = ({ title }: { title: string }) => {
    return (
        <div className="flex-1 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">{title} Team</h2>
                    <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-neutral-200">
                        Add Member
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="p-4 rounded-xl border border-white/5 bg-neutral-900/30 flex items-center gap-4 hover:bg-neutral-900/50 transition-colors">
                            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${i % 2 === 0 ? 'from-purple-500 to-indigo-500' : 'from-orange-500 to-red-500'}`} />
                            <div>
                                <div className="text-sm font-medium text-white">Member {i}</div>
                                <div className="text-xs text-neutral-500">{title} Engineer</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const SettingsView = () => {
    return (
        <div className="flex-1 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-2xl mx-auto space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">Workspace Settings</h2>

                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-white/5">
                        <div className="flex items-center gap-4">
                            <Monitor className="text-neutral-400" />
                            <div>
                                <div className="text-white font-medium">Dark Mode</div>
                                <div className="text-xs text-neutral-500">Always active in SyncSpace</div>
                            </div>
                        </div>
                        <ToggleLeft className="text-purple-500 h-8 w-8 cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-white/5">
                        <div className="flex items-center gap-4">
                            <Users className="text-neutral-400" />
                            <div>
                                <div className="text-white font-medium">Public Access</div>
                                <div className="text-xs text-neutral-500">Allow visitors to view documents</div>
                            </div>
                        </div>
                        <ToggleLeft className="text-neutral-600 h-8 w-8 cursor-pointer hover:text-purple-500 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    )
}
