"use client";

import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { HeroDashboard } from "@/components/landing/HeroDashboard";
import { motion } from "framer-motion";
import { ArrowRight, Github, Zap, Shield, Layers } from "lucide-react";

export default function Home() {
  return (
    <AuroraBackground>
      <div className="relative z-10 w-full overflow-hidden">

        {/* Floating Nav */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl">
            <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center font-bold">S</div>
            <div className="flex items-center gap-6 px-4 text-sm font-medium text-white/50">
              <span className="hover:text-white transition-colors cursor-pointer">Manifesto</span>
              <span className="hover:text-white transition-colors cursor-pointer">Protocol</span>
              <span className="hover:text-white transition-colors cursor-pointer">Engine</span>
            </div>
            <button className="h-8 px-4 rounded-full bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
              Join Beta
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <ContainerScroll
          titleComponent={
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-8xl font-bold text-white mb-8">
                  The future of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                    Collective Intelligence
                  </span>
                </h1>
              </motion.div>

              <div className="flex justify-center mb-10">
                <TextGenerateEffect
                  words="We are not building a document editor. We are building a neural network for your team's thoughts. Zero latency. Zero friction. Infinite scale."
                  className="text-lg md:text-xl text-neutral-300 max-w-2xl"
                />
              </div>
            </>
          }
        >
          <HeroDashboard />
        </ContainerScroll>

        {/* Bento Grid (Re-used but with enhanced context) */}
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">

            {/* Card 1 */}
            <div className="col-span-1 lg:col-span-2 row-span-2 p-8 rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm hover:border-white/20 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <Zap className="w-24 h-24 text-neutral-800 group-hover:text-white/10 transition-colors rotate-12" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Warp Speed Sync</h3>
              <p className="text-neutral-400">
                Utilizing CRDTs and Edge Compute to synchronize state faster than the speed of human perception.
              </p>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* Card 2 */}
            <div className="col-span-1 p-8 rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm hover:border-white/20 transition-all group">
              <Shield className="w-8 h-8 text-neutral-400 mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-bold text-white">Zero Trust</h3>
              <p className="text-sm text-neutral-500 mt-2">End-to-end encrypted by default.</p>
            </div>

            {/* Card 3 */}
            <div className="col-span-1 p-8 rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm hover:border-white/20 transition-all group">
              <Layers className="w-8 h-8 text-neutral-400 mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-bold text-white">Neural Search</h3>
              <p className="text-sm text-neutral-500 mt-2">Find ideas, not just keywords.</p>
            </div>

            {/* Card 4 - Wide */}
            <div className="col-span-1 lg:col-span-2 p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20 backdrop-blur-sm border-l-4 border-l-violet-500">
              <h3 className="text-xl font-bold text-white mb-2">Designed for Flow State</h3>
              <p className="text-neutral-400">
                No menus. No distractions. Just you and the signal.
              </p>
            </div>

          </div>
        </section>

      </div>
    </AuroraBackground>
  );
}
