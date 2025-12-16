"use client";

import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { ArrowLeft, Github, Stars } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black text-white">
            <BackgroundGrid />

            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden relative z-10 shadow-2xl"
            >
                {/* Left Side - Form */}
                <div className="p-8 md:p-12 relative z-10">
                    <div className="mb-8">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mb-4">
                            <Stars className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Create an account</h1>
                        <p className="text-gray-400 text-sm">Join thousands of developers shipping faster.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-400 ml-1">First name</label>
                                <input className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-400 ml-1">Last name</label>
                                <input className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 ml-1">Email</label>
                            <input type="email" className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 ml-1">Password</label>
                            <input type="password" className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm" />
                        </div>

                        <button className="w-full h-12 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors mt-4">
                            Create Account
                        </button>
                    </div>
                </div>

                {/* Right Side - Decor */}
                <div className="hidden md:block relative bg-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30"></div>

                    <div className="relative h-full flex flex-col justify-end p-12">
                        <blockquote className="text-lg font-medium leading-relaxed mb-4">
                            "SyncSpace transformed how our engineering team collaborates. It's the speed of Notepad with the power of Jira."
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white/20"></div>
                            <div className="text-xs">
                                <div className="font-bold">Sarah Chen</div>
                                <div className="text-white/60">CTO at TechFlow</div>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
