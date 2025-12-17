"use client";

import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { HeroDashboard } from "@/components/landing/HeroDashboard";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Layers } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <AuroraBackground>
      <div className="relative z-10 w-full overflow-hidden">

        {/* Floating Nav */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl ring-1 ring-white/5">
            <Link href="/" className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center font-bold font-mono tracking-tighter cursor-pointer">S</Link>
            <div className="hidden md:flex items-center gap-6 px-4 text-sm font-medium text-white/60">
              <Link href="#manifesto" className="hover:text-white transition-colors cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">Manifesto</Link>
              <Link href="#protocol" className="hover:text-white transition-colors cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">Protocol</Link>
              <Link href="#engine" className="hover:text-white transition-colors cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]">Engine</Link>
            </div>
            <Link href="/login">
              <button className="h-8 px-4 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all border border-white/5">
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <ButtonWrapper>
                Join Beta
              </ButtonWrapper>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <ContainerScroll
          titleComponent={
            <>
              <motion.div
                id="manifesto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute inset-0 blur-3xl bg-purple-500/20 rounded-full" />
                <h1 className="relative text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight">
                  The future of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-pulse">
                    Collective Intelligence
                  </span>
                </h1>
              </motion.div>

              <div className="flex justify-center mb-10 px-4">
                <TextGenerateEffect
                  words="We are not building a document editor. We are building a neural network for your team's thoughts. Zero latency. Zero friction. Infinite scale."
                  className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed text-shadow-sm"
                />
              </div>

              <div className="flex justify-center gap-4 mb-16">
                <Link href="/dashboard">
                  <ShimmerButton className="shadow-2xl shadow-purple-500/20">
                    Launch App <ArrowRight className="w-4 h-4 ml-2" />
                  </ShimmerButton>
                </Link>
              </div>
            </>
          }
        >
          <HeroDashboard />
        </ContainerScroll>

        {/* Bento Grid */}
        <section id="engine" className="max-w-7xl mx-auto px-4 pb-32 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">

            {/* Card 1: Warp Speed */}
            <div className="col-span-1 lg:col-span-2 row-span-2 relative group cursor-pointer">
              <SpotlightCard className="h-full p-8" spotlightColor="rgba(139, 92, 246, 0.2)">
                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <Zap className="w-32 h-32 text-neutral-800 group-hover:text-purple-500/20 transition-all rotate-12 group-hover:rotate-0 duration-500 bg-blend-overlay" />
                </div>
                <div className="relative z-10 flex flex-col justify-end h-full">
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">Warp Speed Sync</h3>
                  <p className="text-neutral-400 max-w-sm group-hover:text-neutral-200 transition-colors">
                    Utilizing CRDTs and Edge Compute to synchronize state faster than the speed of human perception.
                  </p>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              </SpotlightCard>
            </div>

            {/* Card 2: Zero Trust */}
            <div id="protocol" className="col-span-1 relative group cursor-pointer">
              <SpotlightCard className="h-full p-8 flex flex-col justify-between" spotlightColor="rgba(16, 185, 129, 0.2)">
                <Shield className="w-10 h-10 text-neutral-500 group-hover:text-emerald-400 transition-colors duration-300" />
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-100 transition-colors">Zero Trust</h3>
                  <p className="text-sm text-neutral-500 mt-2">End-to-end encrypted by default.</p>
                </div>
              </SpotlightCard>
            </div>

            {/* Card 3: Neural Search */}
            <div className="col-span-1 relative group cursor-pointer">
              <SpotlightCard className="h-full p-8 flex flex-col justify-between" spotlightColor="rgba(236, 72, 153, 0.2)">
                <Layers className="w-10 h-10 text-neutral-500 group-hover:text-pink-400 transition-colors duration-300" />
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-pink-100 transition-colors">Neural Search</h3>
                  <p className="text-sm text-neutral-500 mt-2">Find ideas, not just keywords.</p>
                </div>
              </SpotlightCard>
            </div>

            {/* Card 4: Flow State (Holographic Border) */}
            <div className="col-span-1 lg:col-span-2 h-full">
              <GradientBorderCard className="flex flex-col justify-center p-8 bg-neutral-900/90" containerClassName="h-full">
                <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">Designed for Flow State</h3>
                <p className="text-neutral-400">
                  No menus. No distractions. Just you and the signal.
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500/50 animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50 animate-pulse delay-75" />
                  <div className="h-2 w-2 rounded-full bg-green-500/50 animate-pulse delay-150" />
                </div>
              </GradientBorderCard>
            </div>

          </div>
        </section>

      </div>
    </AuroraBackground>
  );
}

// Utility wrapper for non-interactive buttons in nav to just use standard styling
const ButtonWrapper = ({ children }: { children: React.ReactNode }) => (
  <button className="h-8 px-4 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
    {children}
  </button>
)
