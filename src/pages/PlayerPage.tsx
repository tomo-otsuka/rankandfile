import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Trophy, Calendar, BarChart3 } from 'lucide-react';
import { getPlayer, RANKINGS, Position } from '../services/mockData';

export default function PlayerPage() {
    const { playerId } = useParams();
    const player = playerId ? getPlayer(playerId) : null;

    if (!player) {
        return (
            <div className="max-w-3xl mx-auto text-center py-20">
                <h2 className="text-2xl font-bold text-muted-foreground">Player not found</h2>
                <Link to="/dashboard" className="text-primary hover:underline mt-4 inline-block">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    // Calculate consensus ranking across all seasonal rankings
    const getConsensusRank = () => {
        const seasonalRankings = RANKINGS.filter(r => r.type === 'SEASONAL');
        const ranks: number[] = [];

        seasonalRankings.forEach(ranking => {
            const positionRankings = ranking.rankings[player.position as Position];
            if (positionRankings) {
                const idx = positionRankings.indexOf(player.id);
                if (idx !== -1) ranks.push(idx + 1);
            }
        });

        if (ranks.length === 0) return null;
        return Math.round(ranks.reduce((a, b) => a + b, 0) / ranks.length);
    };

    const consensusRank = getConsensusRank();

    // Weekly scores for sparkline
    const weeklyScores = player.weeklyScores ? Object.entries(player.weeklyScores).sort(([a], [b]) => Number(a) - Number(b)) : [];
    const maxScore = weeklyScores.length > 0 ? Math.max(...weeklyScores.map(([, s]) => s)) : 0;

    // Trend calculation
    const getTrend = () => {
        if (weeklyScores.length < 2) return 'neutral';
        const recent = weeklyScores.slice(-2);
        const diff = recent[1][1] - recent[0][1];
        if (diff > 2) return 'up';
        if (diff < -2) return 'down';
        return 'neutral';
    };

    const trend = getTrend();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-8 pb-20 px-4"
        >
            {/* Back Link */}
            <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Player Header */}
            <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl p-6 border border-primary/20">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/30 text-primary">
                            {player.position}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{player.name}</h1>
                        <p className="text-lg text-muted-foreground">{player.team}</p>
                    </div>

                    {consensusRank && (
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Consensus Rank</p>
                            <p className="text-4xl font-bold text-primary">#{consensusRank}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Trend */}
                <div className="bg-card/50 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                        {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                        {trend === 'neutral' && <Minus className="w-4 h-4" />}
                        <span className="text-xs uppercase tracking-wider">Trend</span>
                    </div>
                    <p className={`text-xl font-bold ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-foreground'}`}>
                        {trend === 'up' ? 'Rising' : trend === 'down' ? 'Falling' : 'Steady'}
                    </p>
                </div>

                {/* Season Avg */}
                {player.currentSeasonAvg && (
                    <div className="bg-card/50 rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <BarChart3 className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider">Avg PPG</span>
                        </div>
                        <p className="text-xl font-bold">{player.currentSeasonAvg.toFixed(1)}</p>
                    </div>
                )}

                {/* Last Season Rank */}
                {player.lastSeasonRank && (
                    <div className="bg-card/50 rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Trophy className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-wider">Last Season</span>
                        </div>
                        <p className="text-xl font-bold">#{player.lastSeasonRank}</p>
                    </div>
                )}

                {/* Games Played */}
                <div className="bg-card/50 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">Games</span>
                    </div>
                    <p className="text-xl font-bold">{weeklyScores.length}</p>
                </div>
            </div>

            {/* Weekly Performance */}
            {weeklyScores.length > 0 && (
                <div className="bg-card/30 rounded-xl p-6 border border-white/5 space-y-4">
                    <h2 className="text-lg font-semibold">Weekly Performance</h2>

                    {/* Sparkline Bars */}
                    <div className="flex items-end gap-2 h-40">
                        {weeklyScores.map(([week, score]) => (
                            <div key={week} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group">
                                <div
                                    className="w-full bg-gradient-to-t from-primary/60 to-primary rounded-t-md transition-all relative min-h-[4px]"
                                    style={{ height: `${(score / maxScore) * 75}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {score} pts
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground font-mono">W{week}</span>
                            </div>
                        ))}
                    </div>

                </div>
            )}

            {/* No Data State */}
            {weeklyScores.length === 0 && (
                <div className="bg-card/30 rounded-xl p-8 border border-white/5 text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No performance data available yet</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">Check back after the season starts</p>
                </div>
            )}
        </motion.div>
    );
}
