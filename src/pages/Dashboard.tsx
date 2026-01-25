import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Medal } from 'lucide-react';
import { RANKINGS, USERS, getPlayer } from '../services/mockData';

export default function Dashboard() {
    const [positionFilter, setPositionFilter] = useState<'ALL' | 'WR' | 'RB' | 'QB'>('ALL');

    const filteredRankings = RANKINGS.filter(
        (r) => positionFilter === 'ALL' || r.position === positionFilter
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
                    <p className="text-muted-foreground">Top performing files by reputation score.</p>
                </div>

                <div className="flex bg-secondary/50 p-1 rounded-lg backdrop-blur-sm self-start">
                    {['ALL', 'QB', 'RB', 'WR'].map((pos) => (
                        <button
                            key={pos}
                            onClick={() => setPositionFilter(pos as any)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${positionFilter === pos
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {pos}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredRankings.map((ranking, index) => {
                    const user = USERS.find((u) => u.id === ranking.userId);
                    const topPlayer = ranking.playerIds.length > 0 ? getPlayer(ranking.playerIds[0]) : null;

                    return (
                        <div
                            key={ranking.id}
                            className="group relative flex items-center justify-between p-6 rounded-xl border border-white/5 bg-card/30 backdrop-blur-sm hover:border-white/10 hover:bg-card/50 transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <div className="flex items-center justify-center w-8 font-mono text-xl font-bold text-muted-foreground">
                                    {index + 1}
                                </div>

                                <div className={`w-12 h-12 rounded-full ${user?.avatar} flex items-center justify-center text-white font-bold text-lg`}>
                                    {user?.username.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        {ranking.title}
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground font-medium">
                                            {ranking.position}
                                        </span>
                                    </h3>
                                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                                        <span>@{user?.username}</span>
                                        <span>•</span>
                                        <span className="flex items-center text-green-400">
                                            <Medal className="w-3 h-3 mr-1" /> Score: {user?.reputation}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center gap-8 text-sm">
                                <div className="text-right">
                                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Top Pick</p>
                                    <p className="font-medium">{topPlayer?.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Updated</p>
                                    <p className="font-medium">{new Date(ranking.lastUpdated).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <Link
                                to={`/file/${ranking.id}`} // We'll implement File View later
                                className="absolute inset-0 z-10"
                            >
                                <span className="sr-only">View File</span>
                            </Link>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                                <ArrowUpRight className="text-muted-foreground w-5 h-5" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
