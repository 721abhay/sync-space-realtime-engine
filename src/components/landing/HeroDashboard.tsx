"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const HeroDashboard = () => {
    return (
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8 mt-12 perspective-1000">
            <motion.div
                initial={{ rotateX: 20, opacity: 0, scale: 0.9 }}
                animate={{ rotateX: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative rounded-xl border border-white/10 bg-gray-950/80 shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-white/10"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* App Header / Toolbar */}
                <div className="flex items-center gap-4 border-b border-white/5 bg-white/5 px-4 py-3">
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-6 w-px bg-white/10" />

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80">
                        <span>SyncSpace</span>
                        <span>/</span>
                        <span className="text-foreground">Engineering</span>
                        <span>/</span>
                        <span>Q4 Roadmap</span>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                        {/* Fake Avatars */}
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-6 w-6 rounded-full border border-black bg-gradient-to-br from-indigo-500 to-purple-500" />
                            ))}
                        </div>
                        <span className="text-xs text-green-400 font-mono">● Connected</span>
                    </div>
                </div>

                {/* App Content */}
                <div className="grid grid-cols-[240px_1fr] h-[400px]">
                    {/* Sidebar */}
                    <div className="border-r border-white/5 bg-black/20 p-4 space-y-4">
                        <div className="space-y-1">
                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Workspace</div>
                            {['General', 'Engineering', 'Design', 'Marketing'].map((item, i) => (
                                <div key={item} className={`p-2 rounded-md text-sm ${i === 1 ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-white/5'}`}>
                                    # {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Canvas / Editor */}
                    <div className="p-8 relative">
                        {/* Simulated Content */}
                        <h1 className="text-3xl font-bold mb-6">Q4 Product Roadmap</h1>

                        <div className="space-y-4 max-w-2xl">
                            <div className="h-4 w-3/4 rounded bg-white/10" />
                            <div className="h-4 w-full rounded bg-white/10" />
                            <div className="h-4 w-5/6 rounded bg-white/10" />
                        </div>

                        {/* Simulated Dynamic Elements (Cards) */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-sm font-medium mb-1">Backend V2 Migration</div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[70%] bg-blue-500" />
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/50 transition-colors">
                                <div className="text-sm font-medium mb-1">Mobile App Beta</div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[30%] bg-purple-500" />
                                </div>
                            </div>
                        </div>

                        {/* Simulated User Cursors */}
                        <FakeCursor x={100} y={150} name="Alex (Product)" color="#EC4899" />
                        <FakeCursor x={400} y={300} name="Sam (Eng)" color="#3B82F6" />
                    </div>
                </div>

                {/* Glow Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
        </div>
    );
};

const FakeCursor = ({ x, y, name, color }: { x: number, y: number, name: string, color: string }) => {
    return (
        <motion.div
            className="absolute pointer-events-none z-20"
            animate={{
                x: [x, x + 50, x - 20, x],
                y: [y, y - 30, y + 20, y]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill={color} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="ml-4 mt-2 px-2 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap" style={{ backgroundColor: color }}>
                {name}
            </div>
        </motion.div>
    )
}
