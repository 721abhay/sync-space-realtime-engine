"use client";

import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API Call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.success("Account Created", {
            description: "Welcome to SyncSpace. Your workspace is ready."
        });

        router.push("/dashboard");
        setIsLoading(false);
    };

    return (
        <AuroraBackground showRadialGradient={false}>
            <div className="relative z-10 w-full min-h-screen flex">

                {/* Left Side: Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 relative bg-black/80 backdrop-blur-md">
                    <Link href="/" className="absolute top-8 left-8 text-neutral-400 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>

                    <div className="max-w-md w-full mx-auto">
                        <h1 className="text-4xl font-bold text-white mb-2">Create your account</h1>
                        <p className="text-neutral-400 mb-8">Join the thousands of teams shipping faster.</p>

                        <form onSubmit={handleSignup} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-400 mb-1 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-400 mb-1 ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1 ml-1">Work Email</label>
                                <input
                                    type="email"
                                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-400 mb-1 ml-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : "Get Started"}
                            </button>
                        </form>

                        <p className="mt-6 text-xs text-neutral-500">
                            By signing up, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>

                {/* Right Side: Hero Image / Testimonial */}
                <div className="hidden lg:flex w-1/2 bg-neutral-900 relative overflow-hidden items-center justify-center p-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black z-0" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100 mix-blend-overlay"></div>

                    <div className="relative z-10 max-w-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
                        >
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                ))}
                            </div>
                            <p className="text-xl text-neutral-200 font-medium leading-relaxed">
                                "SyncSpace is the only tool that actually keeps up with my thought process. The real-time engine is indistinguishable from magic."
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-emerald-400" />
                                <div>
                                    <div className="text-white font-bold">Alex Chen</div>
                                    <div className="text-sm text-neutral-400">Staff Engineer @ Vercel</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </AuroraBackground>
    );
}
