import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
    isConnected: boolean;
}

export const Header = ({ isConnected }: HeaderProps) => {
    return (
        <header className="h-14 border-b border-white/5 flex items-center px-4 justify-between bg-black/50 backdrop-blur-xl z-10 sticky top-0">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="hover:text-neutral-300 cursor-pointer transition-colors">Engineering</span>
                <span>/</span>
                <span className="text-neutral-200 font-medium flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px]">
                        #
                    </span>
                    Q1 Roadmap
                </span>

                {/* Connection Status Badge */}
                <StatusBadge isConnected={isConnected} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {/* Search Input */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-900 border border-white/5 text-xs text-neutral-400 hover:border-white/10 hover:text-neutral-300 cursor-pointer transition-all group w-48">
                    <Search className="h-3 w-3 group-hover:text-white transition-colors" />
                    <span>Search...</span>
                    <kbd className="hidden lg:inline-flex h-4 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-neutral-500 opacity-100 ml-auto group-hover:text-neutral-300">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>

                {/* User Stack */}
                <div className="flex -space-x-2">
                    <Avatar gradient="from-orange-400 to-pink-500" />
                    <Avatar gradient="from-blue-400 to-cyan-500" />
                </div>

                <button className="h-7 w-7 rounded-sm bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
                    <Plus className="h-4 w-4" />
                </button>
            </div>
        </header>
    );
};

const StatusBadge = ({ isConnected }: { isConnected: boolean }) => {
    return (
        <div className={cn(
            "ml-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wide transition-all duration-500",
            isConnected
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse"
        )}>
            <div className={cn("w-1.5 h-1.5 rounded-full", isConnected ? "bg-emerald-400" : "bg-rose-400")} />
            {isConnected ? "CONNECTED" : "RECONNECTING"}
        </div>
    )
}

const Avatar = ({ gradient }: { gradient: string }) => (
    <div className={cn("h-7 w-7 rounded-full border-2 border-black bg-gradient-to-br ring-1 ring-white/10", gradient)} />
)
