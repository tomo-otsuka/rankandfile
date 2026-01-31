import { motion } from 'framer-motion';
import { Position } from '../../hooks/useRanker';
import { DashboardTimeframe } from '../../hooks/useLeaderboard';
import { cn } from '../../lib/utils';

// --- Timeframe Tabs (The "Panel" Switcher) ---
interface TimeframeTabsProps {
    timeframe: DashboardTimeframe;
    setTimeframe: (tf: DashboardTimeframe) => void;
}

export function TimeframeTabs({ timeframe, setTimeframe }: TimeframeTabsProps) {
    const tabs = [
        { id: 'SEASON', label: 'Season' },
        { id: 'LAST_WEEK', label: 'Last Week' },
        { id: 'LAST_SEASON', label: 'All Time' }
    ] as const;

    return (
        <div className="flex justify-center">
            <div className="inline-flex bg-white/5 p-1 rounded-full backdrop-blur-md border border-white/10 relative">
                {tabs.map((tab) => {
                    const isActive = timeframe === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setTimeframe(tab.id as DashboardTimeframe)}
                            className={cn(
                                "relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTimeframeTab"
                                    className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// --- Position Pills (The Sub-Filter) ---
interface PositionPillsProps {
    positionFilter: Position | 'ALL';
    setPositionFilter: (pos: Position | 'ALL') => void;
}

export function PositionPills({ positionFilter, setPositionFilter }: PositionPillsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {(['ALL', 'QB', 'RB', 'WR', 'TE', 'K', 'DST'] as const).map((pos) => (
                <button
                    key={pos}
                    onClick={() => setPositionFilter(pos)}
                    className={cn(
                        "px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all duration-200 border border-transparent",
                        positionFilter === pos
                            ? 'bg-primary/20 text-primary border-primary/20'
                            : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'
                    )}
                >
                    {pos}
                </button>
            ))}
        </div>
    );
}

// Deprecated default for backward compatibility if needed, but we will update Dashboard.tsx
export function LeaderboardFilters(props: TimeframeTabsProps & PositionPillsProps) {
    return (
        <div className="flex flex-col gap-4">
            <TimeframeTabs timeframe={props.timeframe} setTimeframe={props.setTimeframe} />
            <PositionPills positionFilter={props.positionFilter} setPositionFilter={props.setPositionFilter} />
        </div>
    );
}
