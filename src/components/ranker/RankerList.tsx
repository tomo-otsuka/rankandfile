import { useState } from 'react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { GripVertical, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Player } from '../../services/mockData';
import { RankingType } from '../../hooks/useRanker';
import { useInitialAnimation } from '../../hooks/useInitialAnimation';
import { PlayerHistoryPanel } from './PlayerHistoryPanel';

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

    const handlePlayerClick = (playerId: string, e: React.MouseEvent) => {
        // Don't expand if clicking the drag handle
        if ((e.target as HTMLElement).closest('.drag-handle')) return;
        setExpandedPlayerId(prev => prev === playerId ? null : playerId);
    };

    return (
        <div className="glass-morphism-premium rounded-2xl overflow-hidden p-2">
            <Reorder.Group
                axis="y"
                values={items}
                onReorder={handleReorder}
                className="space-y-1"
            >
                <AnimatePresence>
                    {items.map((item, index) => {
                        const isExpanded = expandedPlayerId === item.id;

                        return (
                            <Reorder.Item
                                key={item.id}
                                value={item}
                                dragListener={!isViewMode}
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
                                    !isViewMode && "hover:bg-white/10",
                                    isExpanded && "bg-white/[0.07] border-primary/20"
                                )}
                            >
                                {/* Main Row */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full bg-white/5 font-mono text-xs font-bold text-primary/60 ring-1 ring-primary/20">
                                        {index + 1}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-bold text-white group-hover:text-primary transition-colors truncate italic uppercase tracking-tighter">{item.name}</h3>
                                            <span className="text-[10px] font-mono font-medium text-white/30 uppercase tracking-widest flex-shrink-0">{item.team}</span>
                                        </div>
                                    </div>

                                    {/* Expand indicator */}
                                    <div className={cn(
                                        "p-1 text-white/20 transition-all duration-200",
                                        isExpanded ? "text-primary rotate-180" : "group-hover:text-white/40"
                                    )}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>

                                    {!isViewMode && (
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
