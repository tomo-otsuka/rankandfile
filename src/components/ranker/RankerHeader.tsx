import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Position } from '../../hooks/useRanker';

interface RankerHeaderProps {
    isViewMode: boolean;
    viewTitle: string;
    position: Position;
    saveStatus: 'IDLE' | 'SAVING' | 'SAVED';
}

export function RankerHeader({ isViewMode, viewTitle, position, saveStatus }: RankerHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <h2 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent italic uppercase">
                    {isViewMode ? viewTitle : 'Rankings'}
                </h2>
                <div className="flex items-center gap-3">
                    <p className="text-muted-foreground font-medium flex items-center gap-2 italic">
                        <span className="w-8 h-[2px] bg-primary/30" />
                        {isViewMode ? `Viewing top ${position}s` : `Lock in your top ${position}s.`}
                    </p>
                    {!isViewMode && (
                        <AnimatePresence mode="wait">
                            {saveStatus === 'SAVING' ? (
                                <motion.span
                                    key="saving"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary/60 italic"
                                >
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                    Saving...
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="saved"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/20 italic"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                                    Changes Saved
                                </motion.span>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}
