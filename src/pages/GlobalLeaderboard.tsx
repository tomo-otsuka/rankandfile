import { motion } from 'framer-motion';
import { Trophy, Flame, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { PositionPills } from '../components/dashboard/LeaderboardFilters';
import { LeaderboardList } from '../components/dashboard/LeaderboardList';

export default function GlobalLeaderboard() {
    const { state, actions, helpers } = useLeaderboard();

    return (
        <motion.div
            className="max-w-7xl mx-auto space-y-8 pb-20 px-4 md:px-8"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-10 pb-2">
                <div className="space-y-2">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                        Global <span className="text-primary/80">Leaderboard</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        The ultimate destination for proven accuracy. Compare your rank against the best in the business.
                    </p>
                </div>

                <Link
                    to="/compare"
                    className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/20 transition-all group shrink-0"
                >
                    <div className="p-2 rounded-xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-black uppercase tracking-widest text-primary/60">Tooling</div>
                        <div className="text-sm font-bold text-white uppercase tracking-tight italic">Compare vs Consensus</div>
                    </div>
                </Link>
            </div>

            {/* Global Position Filter */}
            <div className="flex flex-col items-center gap-4 sticky top-20 z-40 py-4 bg-transparent backdrop-blur-xl md:backdrop-blur-none md:static md:bg-transparent -mx-4 md:mx-0">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Filter by Position</span>
                <PositionPills positionFilter={state.positionFilter} setPositionFilter={actions.setPositionFilter} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* SEASON PANEL */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                            <Trophy className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Season Accuracy</h3>
                    </div>
                    <LeaderboardList
                        key={`season-${state.positionFilter}`}
                        items={helpers.getRankings('SEASON')}
                    />
                </div>

                {/* LAST WEEK PANEL */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-500">
                            <Flame className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Last Week</h3>
                    </div>
                    <LeaderboardList
                        key={`week-${state.positionFilter}`}
                        items={helpers.getRankings('LAST_WEEK')}
                    />
                </div>
            </div>
        </motion.div>
    );
}
