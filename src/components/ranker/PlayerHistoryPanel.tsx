import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Calendar, Trophy, BarChart3, Zap } from 'lucide-react';
import { Player } from '../../services/mockData';
import { RankingType } from '../../hooks/useRanker';

interface PlayerHistoryPanelProps {
    player: Player;
    currentWeek: number;
    rankingType: RankingType;
}

// Mini sparkline component with controlled animation
function Sparkline({ scores, currentWeek, shouldAnimate }: { scores: Record<number, number>; currentWeek: number; shouldAnimate: boolean }) {
    const weeks = Array.from({ length: 5 }, (_, i) => i + 1).filter(w => w <= currentWeek);
    const values = weeks.map(w => scores[w] ?? 0);
    const max = Math.max(...values, 1);
    const min = Math.min(...values);
    const range = max - min || 1;

    return (
        <div className="flex items-end gap-0.5 h-8">
            {values.map((val, i) => {
                const height = ((val - min) / range) * 100;
                const isLatest = i === values.length - 1;
                return (
                    <motion.div
                        key={i}
                        initial={shouldAnimate ? { height: 0 } : false}
                        animate={{ height: `${Math.max(height, 10)}%` }}
                        transition={shouldAnimate ? { delay: i * 0.04, duration: 0.25, ease: 'easeOut' } : { duration: 0 }}
                        className={`w-1.5 rounded-full ${isLatest
                                ? 'bg-gradient-to-t from-primary to-primary/60'
                                : 'bg-white/20'
                            }`}
                        title={`Week ${weeks[i]}: ${val.toFixed(1)} pts`}
                    />
                );
            })}
        </div>
    );
}

// Animated stat card with controlled entrance
function StatCard({
    icon: Icon,
    label,
    value,
    suffix,
    highlight,
    delay,
    trend,
    shouldAnimate
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    suffix?: string;
    highlight?: boolean;
    delay?: number;
    trend?: 'up' | 'down' | 'stable' | null;
    shouldAnimate: boolean;
}) {
    return (
        <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 10, scale: 0.95 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={shouldAnimate ? { delay: delay ?? 0, duration: 0.2, ease: 'easeOut' } : { duration: 0 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
            className={`relative overflow-hidden rounded-xl p-3 border transition-colors cursor-default ${highlight
                    ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 shadow-lg shadow-primary/10'
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]'
                }`}
        >
            {/* Subtle glow for highlighted cards */}
            {highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
            )}

            <div className="relative">
                <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest mb-1.5">
                    <Icon className={`w-3 h-3 ${highlight ? 'text-primary' : ''}`} />
                    <span>{label}</span>
                    {trend && (
                        <span className={`ml-auto ${trend === 'up' ? 'text-green-400' :
                                trend === 'down' ? 'text-red-400' :
                                    'text-white/30'
                            }`}>
                            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
                            {trend === 'stable' && <Minus className="w-3 h-3" />}
                        </span>
                    )}
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className={`text-xl font-bold ${highlight ? 'text-primary' : 'text-white'}`}>
                        {value}
                    </span>
                    {suffix && (
                        <span className="text-xs text-white/40">{suffix}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function PlayerHistoryPanel({ player, currentWeek, rankingType }: PlayerHistoryPanelProps) {
    const { weeklyScores, lastSeasonRank, currentSeasonAvg } = player;

    // Track if this is the first mount - only animate on initial expand
    const hasAnimatedRef = useRef(false);
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        // After first render, disable entrance animations
        if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            // Small delay to ensure animations complete before disabling
            const timer = setTimeout(() => setShouldAnimate(false), 400);
            return () => clearTimeout(timer);
        }
    }, []);

    // Calculate last week's score (only if not week 1)
    const lastWeekScore = currentWeek > 1 ? weeklyScores?.[currentWeek - 1] : undefined;
    const twoWeeksAgoScore = currentWeek > 2 ? weeklyScores?.[currentWeek - 2] : undefined;

    // Calculate trend
    const getTrend = () => {
        if (lastWeekScore === undefined || twoWeeksAgoScore === undefined) return null;
        const diff = lastWeekScore - twoWeeksAgoScore;
        if (diff > 2) return 'up';
        if (diff < -2) return 'down';
        return 'stable';
    };

    const trend = getTrend();
    const hasAnyData = lastSeasonRank !== undefined || currentSeasonAvg !== undefined || lastWeekScore !== undefined;

    // Show weekly stats only for weekly rankings and not week 1
    const showLastWeek = rankingType === 'WEEKLY' && currentWeek > 1 && lastWeekScore !== undefined;
    const showSparkline = weeklyScores && Object.keys(weeklyScores).length > 1 && currentWeek > 1;

    // Is this a top performer?
    const isTopPerformer = lastSeasonRank !== undefined && lastSeasonRank <= 3;

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
        >
            <div className="pt-4 mt-4 border-t border-white/10">
                {!hasAnyData ? (
                    <motion.div
                        initial={shouldAnimate ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        className="text-center py-6 text-white/30 text-sm italic flex flex-col items-center gap-2"
                    >
                        <Zap className="w-5 h-5 text-white/20" />
                        <span>No historical data available yet</span>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {/* Sparkline row */}
                        {showSparkline && (
                            <motion.div
                                initial={shouldAnimate ? { opacity: 0, x: -10 } : false}
                                animate={{ opacity: 1, x: 0 }}
                                transition={shouldAnimate ? { delay: 0.05 } : { duration: 0 }}
                                className="flex items-center gap-3 px-1"
                            >
                                <span className="text-[10px] text-white/40 uppercase tracking-widest">Trend</span>
                                <Sparkline scores={weeklyScores} currentWeek={currentWeek} shouldAnimate={shouldAnimate} />
                                <span className="text-[10px] text-white/30 ml-auto">Last 5 weeks</span>
                            </motion.div>
                        )}

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {/* Last Week Performance */}
                            {showLastWeek && (
                                <StatCard
                                    icon={Calendar}
                                    label={`Week ${currentWeek - 1}`}
                                    value={lastWeekScore.toFixed(1)}
                                    suffix="pts"
                                    trend={trend}
                                    delay={0.05}
                                    shouldAnimate={shouldAnimate}
                                />
                            )}

                            {/* Season Average */}
                            {currentSeasonAvg !== undefined && (
                                <StatCard
                                    icon={BarChart3}
                                    label="Season Avg"
                                    value={currentSeasonAvg.toFixed(1)}
                                    suffix="ppg"
                                    highlight={currentSeasonAvg >= 20}
                                    delay={0.1}
                                    shouldAnimate={shouldAnimate}
                                />
                            )}

                            {/* Last Season Rank */}
                            {lastSeasonRank !== undefined && (
                                <StatCard
                                    icon={Trophy}
                                    label="Last Season"
                                    value={`#${lastSeasonRank}`}
                                    suffix={player.position}
                                    highlight={isTopPerformer}
                                    delay={0.15}
                                    shouldAnimate={shouldAnimate}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
