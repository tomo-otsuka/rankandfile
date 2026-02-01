import { useState, useMemo } from 'react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { GripVertical, ChevronDown, CheckCircle2, TrendingUp, TrendingDown, Crown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Player, getWeeklyReality } from '../../services/mockData';
import { RankingType } from '../../hooks/useRanker';
import { useInitialAnimation } from '../../hooks/useInitialAnimation';
import { PlayerHistoryPanel } from './PlayerHistoryPanel';

// Mocking "Now" as Week 2, so Week 1 is in the past
const MOCK_CURRENT_WEEK = 2;

interface RankerListProps {
    items: Player[];
    handleReorder: (items: Player[]) => void;
    isViewMode: boolean;
    currentWeek: number;
    rankingType: RankingType;
}

export function RankerList({ items, handleReorder, isViewMode, currentWeek, rankingType }: RankerListProps) {
    const [expandedPlayerId, setExpandedPlayerId] = useState<string | null>(null);
    const shouldAnimate = useInitialAnimation(600);

    // Determine if we are viewing a past week's results
    // Results are available if it's a Weekly ranking and the week is in the past
    const isResultsMode = rankingType === 'WEEKLY' && currentWeek < MOCK_CURRENT_WEEK;

    // In results mode, drag is disabled (read-only final results)
    const isDragDisabled = isViewMode || isResultsMode;

    const weeklyRealityIds = useMemo(() => {
        if (!isResultsMode || items.length === 0) return [];
        return getWeeklyReality(items[0].position, currentWeek);
    }, [isResultsMode, items, currentWeek]);

    const handlePlayerClick = (playerId: string, e: React.MouseEvent) => {
        // Don't expand if clicking the drag handle
        if ((e.target as HTMLElement).closest('.drag-handle')) return;
        setExpandedPlayerId(prev => prev === playerId ? null : playerId);
    };

    return (
        <div className="glass-morphism-premium rounded-2xl overflow-hidden p-2">

            {/* Results Header */}
            {isResultsMode && (
                <div className="flex items-center gap-2 px-4 py-3 mb-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold text-sm uppercase tracking-wider">Results Finalized • Week {currentWeek}</span>
                </div>
            )}

            <Reorder.Group
                axis="y"
                values={items}
                onReorder={handleReorder}
                className="space-y-1"
            >
                <AnimatePresence>
                    {items.map((item, index) => {
                        const isExpanded = expandedPlayerId === item.id;

                        // Result Calculations
                        const actualScore = isResultsMode ? item.weeklyScores?.[currentWeek] : null;
                        const actualRank = isResultsMode ? weeklyRealityIds.indexOf(item.id) : -1;
                        const showResult = isResultsMode && actualScore !== undefined && actualRank !== -1;

                        // Diff: My Rank (index) vs Actual Rank (actualRank)
                        // If I ranked #1 (index 0) and they were #5 (actual 4). Error is 4.
                        // If I ranked #5 (index 4) and they were #1 (actual 0). Error is 4.
                        let rankDiff = 0;
                        if (showResult) {
                            rankDiff = (index) - (actualRank); // Negative means I ranked them 'Higher' (better) than they were? No.
                            // index=0 (me), actual=4. diff = -4. I was "Over" confident?
                            // Let's use standard: Actual Rank - My Rank
                            // actual=4 (#5), me=0 (#1). diff = 4. 
                            // actual=0 (#1), me=4 (#5). diff = -4.
                        }
                        // Let's just show absolute error or "Actual Rank #X"

                        return (
                            <Reorder.Item
                                key={item.id}
                                value={item}
                                dragListener={!isDragDisabled}
                                initial={shouldAnimate ? { opacity: 0, scale: 0.95 } : false}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={shouldAnimate ? { delay: index * 0.03, duration: 0.2 } : { duration: 0.15 }}
                                whileDrag={{
                                    scale: 1.03,
                                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                                    backgroundColor: "rgba(255,255,255,0.08)"
                                }}
                                onClick={(e) => handlePlayerClick(item.id, e)}
                                className={cn(
                                    "relative flex flex-col py-2 px-3 rounded-xl bg-white/5 border border-white/5 transition-colors select-none group cursor-pointer",
                                    !isDragDisabled && "hover:bg-white/10",
                                    isExpanded && "bg-white/[0.07] border-primary/20"
                                )}
                            >
                                {/* Main Row */}
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full font-mono text-xs font-bold ring-1 transition-colors",
                                        isResultsMode
                                            ? "bg-white/5 text-muted-foreground ring-white/10" // Muted rank number in results mode
                                            : "bg-white/5 text-primary/60 ring-primary/20"
                                    )}>
                                        {index + 1}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-bold text-white group-hover:text-primary transition-colors truncate italic uppercase tracking-tighter">{item.name}</h3>
                                            <span className="text-[10px] font-mono font-medium text-white/30 uppercase tracking-widest flex-shrink-0">{item.team}</span>
                                        </div>
                                    </div>

                                    {/* RESULTS COLUMNS */}
                                    {showResult && (
                                        <div className="flex items-center gap-4 mr-2">
                                            <div className="text-right hidden sm:block">
                                                <div className="text-[10px] uppercase text-muted-foreground/50 font-black tracking-wider">Points</div>
                                                <div className="text-sm font-mono font-bold text-white">{actualScore?.toFixed(1)}</div>
                                            </div>
                                            <div className="text-right min-w-[3rem]">
                                                <div className="text-[10px] uppercase text-muted-foreground/50 font-black tracking-wider">Actual</div>
                                                <div className="flex items-center justify-end gap-1">
                                                    {actualRank === 0 && <Crown className="w-3 h-3 text-yellow-500" />}
                                                    <span className={cn(
                                                        "text-sm font-bold",
                                                        actualRank === 0 ? "text-yellow-500" : "text-muted-foreground"
                                                    )}>#{actualRank + 1}</span>
                                                </div>
                                            </div>
                                            {/* Diff Column */}
                                            <div className="text-right min-w-[3rem]">
                                                <div className="text-[10px] uppercase text-muted-foreground/50 font-black tracking-wider">Diff</div>
                                                <div className={cn(
                                                    "flex items-center justify-end gap-1 text-sm font-bold",
                                                    rankDiff === 0 ? "text-muted-foreground/40" :
                                                        // Note: We want green to be 'accurate' (close to 0), but often 'green' means 'player did better than expected'.
                                                        // Let's stick to strict accuracy: Red for big misses? 
                                                        // Or: 
                                                        // Positive Diff (I ranked 5, Actual 1) -> I was too low. Player beat my rank. Green?
                                                        // Negative Diff (I ranked 1, Actual 5) -> I was too high. Player failed me. Red.
                                                        (actualRank - index) < 0 ? "text-green-400" : "text-red-400"
                                                )}>
                                                    {rankDiff !== 0 && (
                                                        <>
                                                            <span>{Math.abs(rankDiff)}</span>
                                                            {(actualRank - index) < 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                        </>
                                                    )}
                                                    {rankDiff === 0 && <span className="opacity-40">-</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Expand indicator */}
                                    <div className={cn(
                                        "p-1 text-white/20 transition-all duration-200",
                                        isExpanded ? "text-primary rotate-180" : "group-hover:text-white/40"
                                    )}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>

                                    {!isDragDisabled && (
                                        <div className="drag-handle p-2 text-white/20 group-hover:text-white/60 transition-colors cursor-grab active:cursor-grabbing">
                                            <GripVertical className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>

                                {/* Expandable History Panel */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <PlayerHistoryPanel
                                            player={item}
                                            currentWeek={currentWeek}
                                            rankingType={rankingType}
                                        />
                                    )}
                                </AnimatePresence>
                            </Reorder.Item>
                        );
                    })}
                </AnimatePresence>
            </Reorder.Group>

            {items.length === 0 && (
                <div className="text-center py-20 text-muted-foreground italic">
                    No players found for this position in mock data.
                </div>
            )}
        </div>
    );
}
