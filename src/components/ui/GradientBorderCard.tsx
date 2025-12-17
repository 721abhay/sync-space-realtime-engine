"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GradientBorderCard = ({
    children,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    return (
        <div
            className={cn(
                "relative group/card  w-full h-full overflow-hidden rounded-3xl p-[1px]",
                containerClassName
            )}
        >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover/card:opacity-100 transition duration-500" />

            {/* Animated Rotating Gradient Background */}
            <motion.div
                className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-100"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Content Container (Masks the center) */}
            <div
                className={cn(
                    "relative w-full h-full bg-slate-900 rounded-[23px] z-10 overflow-hidden backdrop-blur-3xl",
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
};
