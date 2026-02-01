import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Position, RankingType } from '../../hooks/useRanker';

interface RankerControlsProps {
    position: Position;
    setPosition: (pos: Position) => void;
    rankingType: RankingType;
    setRankingType: (type: RankingType) => void;
    week: number;
    setWeek: (week: number) => void;
    isViewMode?: boolean;
    availablePositions?: Position[];
}

export function RankerControls({
    position,
    setPosition,
    rankingType,
    setRankingType,
    week,
    setWeek,
    isViewMode = false,
    availablePositions = ['QB', 'RB', 'WR', 'TE', 'K', 'DST']
}: RankerControlsProps) {
    return (
        <div className="flex flex-col items-end gap-3">
            <div className="flex bg-secondary/50 p-1 rounded-xl backdrop-blur-sm overflow-x-auto max-w-full scrollbar-hide border border-white/5">
                <div className="flex items-center gap-4 px-1">
                    <div className="flex p-0.5 rounded-lg">
                        {(['QB', 'RB', 'WR', 'TE', 'K', 'DST'] as Position[]).map((pos) => {
                            const isAvailable = availablePositions.includes(pos);

                            return (
                                <button
                                    key={pos}
                                    onClick={() => isAvailable && setPosition(pos)}
                                    disabled={!isAvailable}
                                    className={cn(
                                        "px-4 py-1.5 rounded-md text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap",
                                        position === pos
                                            ? "bg-background text-foreground shadow-sm"
                                            : isAvailable
                                                ? "text-muted-foreground hover:text-foreground"
                                                : "text-muted-foreground/20 cursor-not-allowed"
                                    )}
                                >
                                    {pos}
                                </button>
                            );
                        })}
                    </div>

                    {!isViewMode && (
                        <>
                            <div className="w-[1px] h-4 bg-white/10" />

                            <div className="flex p-0.5 rounded-lg">
                                {[
                                    { id: 'SEASONAL', label: 'Seasonal' },
                                    { id: 'WEEKLY', label: 'Weekly' }
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setRankingType(type.id as RankingType)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-md text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap",
                                            rankingType === type.id
                                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                : "text-primary/40 hover:text-primary"
                                        )}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Week Selector - Only shown when WEEKLY */}
            <AnimatePresence>
                {rankingType === 'WEEKLY' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex bg-white/5 p-1 rounded-lg backdrop-blur-sm overflow-x-auto max-w-[300px] md:max-w-[400px] scrollbar-hide border border-white/5"
                    >
                        <div className="flex gap-1">
                            {Array.from({ length: 18 }, (_, i) => i + 1).map((w) => (
                                <button
                                    key={w}
                                    onClick={() => setWeek(w)}
                                    className={cn(
                                        "min-w-[32px] h-8 rounded-md text-[10px] font-black flex items-center justify-center transition-all",
                                        week === w
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "text-white/40 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {w}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
