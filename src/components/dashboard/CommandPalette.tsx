"use client";

import { useEffect, useState } from "react";
import { Search, File, Settings, CreditCard, User, Users, LogOut, Code, Hash, LucideIcon } from "lucide-react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (view: string) => void;
}

export const CommandPalette = ({ isOpen, onClose, onNavigate }: CommandPaletteProps) => {

    // Toggle on Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                if (isOpen) onClose();
                else onClose(); // This logic relies on parent toggling, but for now we just handle preventing default
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-4 border-b border-white/5">
                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-white" />
                            <input
                                autoFocus
                                placeholder="Type a command or search..."
                                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-500 text-white"
                            />
                        </div>

                        <div className="py-2 px-2 max-h-[300px] overflow-y-auto">
                            <div className="text-xs font-bold text-neutral-500 px-2 py-2">Suggestions</div>

                            <CommandItem icon={File} label="Go to Home" onClick={() => onNavigate("Home")} />
                            <CommandItem icon={Hash} label="Go to Inbox" onClick={() => onNavigate("Inbox")} />
                            <CommandItem icon={Code} label="Open API V2" onClick={() => onNavigate("API V2")} />

                            <div className="text-xs font-bold text-neutral-500 px-2 py-2 mt-2">Settings</div>
                            <CommandItem icon={User} label="Profile" onClick={() => onNavigate("Settings")} />
                            <CommandItem icon={CreditCard} label="Billing" onClick={() => onNavigate("Settings")} />
                            <CommandItem icon={Users} label="Invite Team" onClick={() => onNavigate("Invite Members")} />
                            <CommandItem icon={Settings} label="Settings" onClick={() => onNavigate("Settings")} />

                            <div className="h-px bg-white/5 my-2" />
                            <CommandItem icon={LogOut} label="Log Out" shortcut="⇧⌘Q" onClick={() => window.location.href = "/login"} danger />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const CommandItem = ({ icon: Icon, label, shortcut, onClick, danger }: { icon: LucideIcon, label: string, shortcut?: string, onClick?: () => void, danger?: boolean }) => (
    <div
        onClick={() => { onClick?.(); }}
        className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer group transition-colors ${danger ? 'hover:bg-red-500/10 hover:text-red-400 text-red-500' : 'hover:bg-white/10 text-neutral-400 hover:text-white'}`}
    >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
        {shortcut && <span className="ml-auto text-xs text-neutral-600 group-hover:text-neutral-400">{shortcut}</span>}
    </div>
)
