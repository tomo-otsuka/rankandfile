import { motion } from 'framer-motion';
import { Trophy, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LEAGUES, League } from '../../services/mockData';
import { LeaderboardList } from './LeaderboardList';
import { useLeaderboard } from '../../hooks/useLeaderboard';

interface LeagueListProps {
    // Removed onSelectLeague
}

export function LeagueList({ }: LeagueListProps) {
    // In a real app, filtering would happen based on the logged-in user context
    // For mock, we'll just show all leagues
    const myLeagues = LEAGUES;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myLeagues.map((league) => (
                <Link
                    key={league.id}
                    to={`/leagues/${league.id}`}
                    className="group"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all text-left w-full"
                    >
                        <div className={`w-16 h-16 rounded-2xl ${league.avatar} flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all`}>
                            <Trophy className="w-8 h-8 text-white" />
                        </div>

                        <div className="flex-1 space-y-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                {league.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="w-4 h-4" />
                                <span>{league.memberIds.length} Members</span>
                            </div>
                        </div>

                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}

interface LeagueDetailProps {
    league: League;
    // Removed onBack
}

export function LeagueDetail({ league }: LeagueDetailProps) {
    const { helpers } = useLeaderboard();

    // Custom helper to get rankings ONLY for league members
    const getLeagueRankings = (timeframe: 'SEASON' | 'LAST_WEEK') => {
        const globalRankings = helpers.getRankings(timeframe);
        return globalRankings.filter(r => league.memberIds.includes(r.userId));
    };

    return (
        <div className="space-y-6">
            <Link
                to="/leagues"
                className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
            >
                <ChevronRight className="w-3 h-3 rotate-180" />
                Back to Leagues
            </Link>

            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className={`w-16 h-16 rounded-2xl ${league.avatar} flex items-center justify-center shadow-2xl`}>
                    <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{league.name}</h2>
                    <p className="text-base text-muted-foreground">{league.memberIds.length} Members • Private League</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* SEASON PANEL */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary">
                            <Trophy className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">League Season</h3>
                    </div>
                    <LeaderboardList
                        items={getLeagueRankings('SEASON')}
                    />
                </div>

                {/* LAST WEEK PANEL */}
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-500">
                            <Users className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Last Week</h3>
                    </div>
                    <LeaderboardList
                        items={getLeagueRankings('LAST_WEEK')}
                    />
                </div>
            </div>
        </div>
    );
}
