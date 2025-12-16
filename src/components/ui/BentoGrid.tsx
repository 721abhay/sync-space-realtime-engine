import { cn } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightCard";
import { Zap, Shield, Layers, Code2, Cpu, Globe } from "lucide-react";

export const BentoGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-4">

            {/* Large Featured Card */}
            <SpotlightCard className="col-span-1 md:col-span-2 row-span-2 min-h-[400px] p-8 flex flex-col justify-end group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />

                <div className="relative z-20">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                        <Zap className="text-white h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Real-Time Sync Engine</h3>
                    <p className="text-gray-400 max-w-md">
                        Powered by WebSockets and CRDTs. We handle conflict resolution automatically so you can focus on building.
                    </p>
                </div>
            </SpotlightCard>

            {/* Side Stack */}
            <SpotlightCard className="col-span-1 p-6 flex flex-col justify-between min-h-[200px] bg-neutral-900/50">
                <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                    <Shield className="h-4 w-4" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Enterprise Security</h3>
                    <p className="text-sm text-gray-500 mt-1">SAML, SSO, and Audit Logs built-in.</p>
                </div>
            </SpotlightCard>

            <SpotlightCard className="col-span-1 p-6 flex flex-col justify-between min-h-[200px] bg-neutral-900/50">
                <div className="h-8 w-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                    <Layers className="h-4 w-4" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Modular Architecture</h3>
                    <p className="text-sm text-gray-500 mt-1">Drag, drop, and extend endlessly.</p>
                </div>
            </SpotlightCard>

            {/* Bottom Wide Card */}
            <SpotlightCard className="col-span-1 md:col-span-3 p-8 flex items-center justify-between bg-neutral-900/50">
                <div className="flex flex-col md:flex-row gap-8 items-center w-full">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">Developer Experience First</h3>
                        <p className="text-gray-400">
                            Full TypeScript support, darker-than-black mode, and keyboard shortcuts for everything.
                        </p>
                    </div>

                    {/* Tech Stack Icons */}
                    <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <Code2 className="h-8 w-8 text-blue-400" />
                        <Cpu className="h-8 w-8 text-green-400" />
                        <Globe className="h-8 w-8 text-indigo-400" />
                    </div>
                </div>
            </SpotlightCard>

        </div>
    );
};
