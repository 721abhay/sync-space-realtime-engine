"use client";

import {
    ChevronDown,
    Clock,
    Hash,
    Home,
    Inbox,
    MoreHorizontal,
    Settings,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
    return (
        <aside className="w-[260px] h-full border-r border-white/10 bg-neutral-900/50 flex flex-col hidden md:flex backdrop-blur-md">
            {/* User Switcher */}
            <div
                onClick={() => toast.success("Team Settings", { description: "Switched to Abhay's Team" })}
                className="h-14 flex items-center px-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors gap-3"
            >
                <div className="h-6 w-6 rounded bg-gradient-to-tr from-blue-500 to-purple-500 flex-shrink-0 shadow-lg shadow-blue-900/20" />
                <span className="text-sm font-medium truncate text-neutral-200">Abhay's Team</span>
                <ChevronDown className="h-4 w-4 ml-auto text-neutral-500" />
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-8">

                {/* Main Navigation */}
                <div className="space-y-1">
                    <NavItem icon={Home} label="Home" active={activeTab === "Home"} onClick={() => onTabChange("Home")} />
                    <NavItem icon={Inbox} label="Inbox" badge="4" active={activeTab === "Inbox"} onClick={() => onTabChange("Inbox")} />
                    <NavItem icon={Clock} label="My Issues" active={activeTab === "My Issues"} onClick={() => onTabChange("My Issues")} />
                </div>

                {/* Teams / Projects */}
                <div className="space-y-1">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase px-2 mb-2 tracking-wider">Favorites</div>
                    <NavItem icon={Hash} label="Frontend Core" active={activeTab === "Frontend Core"} onClick={() => onTabChange("Frontend Core")} />
                    <NavItem icon={Hash} label="Design System" active={activeTab === "Design System"} onClick={() => onTabChange("Design System")} />
                    <NavItem icon={Hash} label="API V2" active={activeTab === "API V2"} onClick={() => onTabChange("API V2")} />
                </div>

                <div className="space-y-1">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase px-2 mb-2 tracking-wider">Your Teams</div>
                    <TeamItem initial="E" label="Engineering" color="purple" onClick={() => onTabChange("Engineering")} />
                    <TeamItem initial="D" label="Design" color="green" onClick={() => onTabChange("Design")} />
                    <TeamItem initial="M" label="Marketing" color="orange" onClick={() => onTabChange("Marketing")} />
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-white/5 space-y-1">
                <NavItem icon={Settings} label="Settings" active={activeTab === "Settings"} onClick={() => onTabChange("Settings")} />
                <NavItem icon={User} label="Invite Members" active={activeTab === "Invite Members"} onClick={() => onTabChange("Invite Members")} />
            </div>

        </aside>
    );
};

const NavItem = ({ icon: Icon, label, active, badge, onClick }: { icon: any, label: string, active?: boolean, badge?: string, onClick?: () => void }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer group select-none",
                active ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-white/5 active:scale-95"
            )}>
            <Icon className={cn("h-4 w-4 transition-colors", active ? "text-blue-400" : "text-neutral-500 group-hover:text-neutral-300")} />
            <span>{label}</span>
            {badge && (
                <span className="ml-auto bg-white/10 text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center text-neutral-300 group-hover:bg-white/20 transition-colors">
                    {badge}
                </span>
            )}
        </div>
    )
}

const TeamItem = ({ initial, label, color, onClick }: { initial: string, label: string, color: string, onClick?: () => void }) => {
    const colorMap: Record<string, string> = {
        purple: "bg-purple-500/20 text-purple-400",
        green: "bg-green-500/20 text-green-400",
        orange: "bg-orange-500/20 text-orange-400",
    };

    return (
        <div
            onClick={onClick}
            className="flex items-center gap-2 px-2 py-1.5 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer group transition-all active:scale-95 select-none">
            <span className={cn("w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold", colorMap[color])}>
                {initial}
            </span>
            <span>{label}</span>
            <MoreHorizontal className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    )
}
