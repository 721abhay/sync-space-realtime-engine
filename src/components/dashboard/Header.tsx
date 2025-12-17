"use client";

import { Bell, Search, Wifi, WifiOff, LogOut, User, Settings as SettingsIcon, CreditCard, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface HeaderProps {
    isConnected: boolean;
    title: string;
    onSearchClick: () => void;
    onNavigate: (view: string) => void;
}

export const Header = ({ isConnected, title, onSearchClick, onNavigate }: HeaderProps) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const router = useRouter();

    return (
        <header className="h-14 border-b border-white/5 bg-neutral-900/50 backdrop-blur-md flex items-center px-4 justify-between z-40 relative">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span onClick={() => onNavigate("Home")} className="hover:text-neutral-300 transition-colors cursor-pointer">SyncSpace</span>
                <span>/</span>
                <span className="text-neutral-200 font-medium">{title}</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">

                <StatusBadge isConnected={isConnected} />

                {/* SEARCH BAR */}
                <div
                    onClick={onSearchClick}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-md text-sm text-neutral-500 hover:text-white cursor-pointer transition-colors border border-white/5 hover:border-white/10 group"
                >
                    <Search className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Search...</span>
                    <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-neutral-400 group-hover:text-white">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>

                <div className="h-4 w-[1px] bg-white/10 mx-1" />

                {/* NOTIFICATIONS */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={cn("relative p-2 transition-colors", showNotifications ? "text-white" : "text-neutral-400 hover:text-white")}
                    >
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 border border-neutral-900" />
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 top-full mt-2 w-80 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden"
                                >
                                    <div className="p-3 border-b border-white/5 flex items-center justify-between">
                                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h3>
                                        <span className="text-[10px] text-neutral-500">Mark all read</span>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        <NotificationItem
                                            initial="JD"
                                            name="John Doe"
                                            action="commented on"
                                            target="API V2 Spec"
                                            time="2m ago"
                                            onClick={() => { onNavigate("API V2"); setShowNotifications(false); }}
                                        />
                                        <NotificationItem
                                            initial="S"
                                            color="bg-purple-500"
                                            name="System"
                                            action="deployed"
                                            target="Production"
                                            time="1h ago"
                                        />
                                        <NotificationItem
                                            initial="MK"
                                            name="Mike K"
                                            action="invited you to"
                                            target="Design Team"
                                            time="3h ago"
                                            onClick={() => { onNavigate("Design"); setShowNotifications(false); }}
                                        />
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* USER MENU */}
                <div className="relative">
                    <div
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[1px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                    >
                        <div className="h-full w-full rounded-full bg-neutral-900 flex items-center justify-center text-xs font-bold text-white">
                            AB
                        </div>
                    </div>

                    <AnimatePresence>
                        {showUserMenu && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden py-1"
                                >
                                    <div className="px-4 py-3 border-b border-white/5">
                                        <p className="text-sm font-medium text-white">Abhay</p>
                                        <p className="text-xs text-neutral-500">abhay@syncspace.app</p>
                                    </div>
                                    <DropdownItem icon={User} label="Profile" onClick={() => { onNavigate("Settings"); setShowUserMenu(false); }} />
                                    <DropdownItem icon={SettingsIcon} label="Settings" onClick={() => { onNavigate("Settings"); setShowUserMenu(false); }} />
                                    <DropdownItem icon={CreditCard} label="Billing" onClick={() => { onNavigate("Settings"); setShowUserMenu(false); }} />
                                    <div className="h-px bg-white/5 my-1" />
                                    <DropdownItem icon={LogOut} label="Log Out" danger onClick={() => router.push("/login")} />
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </header>
    );
};

const StatusBadge = ({ isConnected }: { isConnected: boolean }) => {
    return (
        <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-medium transition-all duration-500",
            isConnected
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
        )}>
            {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            <span className="hidden sm:inline">{isConnected ? "Connected" : "Offline"}</span>
        </div>
    )
}

const NotificationItem = ({ initial, color, name, action, target, time, onClick }: any) => (
    <div onClick={onClick} className="p-3 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 border-b border-white/5 last:border-0">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${color || 'bg-neutral-800'}`}>
            {initial}
        </div>
        <div className="text-xs">
            <p className="text-neutral-300">
                <span className="font-semibold text-white">{name}</span> {action} <span className="text-blue-400">{target}</span>
            </p>
            <p className="text-neutral-500 mt-1">{time}</p>
        </div>
        <div className="h-2 w-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
    </div>
)

const DropdownItem = ({ icon: Icon, label, danger, onClick }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors text-left",
            danger ? "text-red-500 hover:bg-red-500/10" : "text-neutral-300 hover:bg-white/5 hover:text-white"
        )}
    >
        <Icon className="h-4 w-4" />
        {label}
    </button>
)
