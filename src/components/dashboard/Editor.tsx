import { Zap, Eye, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

interface EditorProps {
    content: string;
    onContentChange: (newContent: string) => void;
    onTriggerAI: () => void;
    isGenerating: boolean;
}

export const Editor = ({ content, onContentChange, onTriggerAI, isGenerating }: EditorProps) => {
    const [mode, setMode] = useState<"write" | "preview">("write");

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-16 max-w-4xl mx-auto w-full">
            <div className="group relative min-h-[500px] outline-none">
                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-8 outline-none text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 tracking-tight" contentEditable suppressContentEditableWarning>
                    Project SyncSpace: Product Specs
                </h1>

                {/* Toolbar */}
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                    <button
                        onClick={() => setMode("write")}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                            mode === "write" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <PenTool className="h-3.5 w-3.5" />
                        Write
                    </button>
                    <button
                        onClick={() => setMode("preview")}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                            mode === "preview" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                    </button>
                </div>

                {/* Real-time Content Area */}
                <div className="relative min-h-[60vh]">
                    {mode === "write" ? (
                        <textarea
                            value={content}
                            onChange={(e) => onContentChange(e.target.value)}
                            placeholder="Start typing to sync with the team..."
                            className="w-full h-full min-h-[60vh] bg-transparent text-neutral-300 text-lg leading-relaxed outline-none resize-none placeholder:text-neutral-700 font-mono tracking-wide selection:bg-blue-500/30"
                            spellCheck={false}
                        />
                    ) : (
                        <div className="prose prose-invert prose-lg max-w-none min-h-[60vh] text-neutral-300">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content || "*No content yet*"}
                            </ReactMarkdown>
                        </div>
                    )}

                    {/* AI Context Menu */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button
                            onClick={onTriggerAI}
                            disabled={isGenerating}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-lg border border-white/5 backdrop-blur-md",
                                isGenerating
                                    ? "bg-purple-500/10 text-purple-300 cursor-wait border-purple-500/20"
                                    : "bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white hover:border-white/20 active:scale-95"
                            )}
                        >
                            <Zap className={cn("h-3 w-3", isGenerating ? "text-purple-400 animate-pulse" : "text-yellow-400")} />
                            {isGenerating ? "Neural Network Active..." : "Autocomplete with AI"}
                        </button>
                    </div>

                    {/* Editor Chrome/Decorations */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
                </div>

                {/* Status Bar */}
                <div className="mt-8 flex items-center justify-between text-xs font-mono text-neutral-600 border-t border-white/5 pt-4">
                    <div className="flex gap-4">
                        <span>Ln {content.split('\n').length}, Col {content.length}</span>
                        <span>{mode === "write" ? "Writing Mode" : "Reading Mode"}</span>
                        <span>UTF-8</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                        <span>All systems nominal</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
