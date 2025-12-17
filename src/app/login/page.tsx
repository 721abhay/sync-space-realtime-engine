"use client";

import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ArrowLeft, Github, Chrome } from "lucide-react"; // Chrome icon used for Google generic
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate Server Latency
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Success Mock
        toast.success("Welcome back, Abhay", {
            description: "Session restored securely."
        });

        // Redirect
        router.push("/dashboard");
        setIsLoading(false);
    };

    const handleSocialLogin = (provider: string) => {
        toast.info(`Connecting to ${provider}...`, {
            description: "Redirecting to OAuth provider."
        });
        setTimeout(() => router.push("/dashboard"), 1000);
    }

    return (
        <AuroraBackground showRadialGradient={false}>
            <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4">

                <Link href="/" className="absolute top-8 left-8 text-neutral-400 hover:text-white flex items-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-black text-xl">S</div>
                        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                        <p className="text-neutral-400 text-sm mt-2">Enter your credentials to access the neural network.</p>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => handleSocialLogin("GitHub")}
                            className="flex-1 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-[1.02]">
                            <Github className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={() => handleSocialLogin("Google")}
                            className="flex-1 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-[1.02]">
                            <Chrome className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black px-2 text-neutral-500">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-neutral-500">
                        Don't have an account? <Link href="/signup" className="text-white hover:underline">Sign up</Link>
                    </div>
                </div>
            </div>
        </AuroraBackground>
    );
}
