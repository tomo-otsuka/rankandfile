import { motion } from 'framer-motion';
import { Trophy, Flame } from 'lucide-react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { PositionPills } from '../components/dashboard/LeaderboardFilters';
import { LeaderboardList } from '../components/dashboard/LeaderboardList';

export default function Dashboard() {
    const { state, actions, helpers } = useLeaderboard();

    return (
        <motion.div
            className="max-w-7xl mx-auto space-y-8 pb-20 px-4 md:px-8"
        >
            <div className="flex flex-col gap-4 pt-6 pb-2 items-center text-center">
                <div className="space-y-2 max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        Global Accuracy Leaderboard
                    </h2>
                </div>
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
