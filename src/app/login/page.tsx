"use client";

import Link from "next/link";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";
import { ArrowLeft, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
                    <p className="text-gray-400 text-sm">Sign in to continue to your workspace.</p>
                </div>

                <div className="space-y-4">
                    <button className="w-full h-12 rounded-lg bg-white text-black font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                        <Github className="h-5 w-5" />
                        Continue with GitHub
                    </button>
                    <button className="w-full h-12 rounded-lg border border-white/10 bg-transparent text-white font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                        <div className="h-5 w-5 flex items-center justify-center font-bold text-lg">G</div>
                        Continue with Google
                    </button>
                </div>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-black px-2 text-gray-500">Or continue with email</span>
                    </div>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
                        />
                    </div>
                    <button className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm hover:opacity-90 transition-opacity">
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-gray-500">
                    Don't have an account? <Link href="/signup" className="text-white hover:underline">Sign up</Link>
                </p>
            </motion.div>
        </div>
    );
}
