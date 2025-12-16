"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const TextGenerateEffect = ({
    words,
    className,
}: {
    words: string;
    className?: string;
}) => {
    const controls = useAnimation();
    let wordsArray = words.split(" ");

    useEffect(() => {
        controls.start((i) => ({
            opacity: 1,
            filter: "blur(0px)",
            transition: { delay: i * 0.1, duration: 1 },
        }));
    }, [controls]);

    const renderWords = () => {
        return (
            <motion.div className="opacity-0">
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            custom={idx}
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={controls}
                            className="opacity-0 dark:text-white text-black inline-block mr-2"
                        >
                            {word}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={className}>
            <div className="mt-4">
                <div className=" dark:text-white text-black leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
