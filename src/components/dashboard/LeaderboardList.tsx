import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { LeaderboardEntry, USERS } from '../../services/mockData';

interface LeaderboardListProps {
    items: LeaderboardEntry[];
}

export function LeaderboardList({ items }: LeaderboardListProps) {
    return (
        <div className="grid gap-4">
            {items.map((entry, index) => {
                const user = USERS.find((u) => u.id === entry.userId);
                const rank = index + 1;

                // Visual logic for Top 3
                const isGold = rank === 1;
                const isSilver = rank === 2;
                const isBronze = rank === 3;

                let rankColor = "text-white/40";
                if (isGold) rankColor = "text-yellow-400";
                if (isSilver) rankColor = "text-slate-300";
                if (isBronze) rankColor = "text-orange-400";

                const linkContent = (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.25,
                            delay: index * 0.04
                        }}
                        className="relative bg-white/[0.02] border border-white/5 p-5 md:p-6 rounded-2xl flex items-center justify-between transition-colors duration-200 hover:bg-white/[0.04] hover:border-white/10 overflow-hidden"
                    >
                        <div className="flex items-center gap-6 min-w-0">
                            <div className={`flex flex-col items-center justify-center w-12 text-xl font-bold shrink-0 ${rankColor}`}>
                                #{rank}
                            </div>

                            <div className="flex items-center gap-4 min-w-0">
                                <div className={`w-12 h-12 rounded-full ${user?.avatar} flex items-center justify-center text-white font-bold text-lg ring-2 ring-white/5 shadow-inner shrink-0`}>
                                    {user?.username.charAt(0).toUpperCase()}
                                </div>

                                <div className="space-y-0.5 min-w-0">
                                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2 truncate pr-4">
                                        @{user?.username}
                                        {isGold && <Trophy className="w-3 h-3 text-yellow-400 shrink-0" />}
                                        {entry.position && (
                                            <span className="text-[10px] font-bold bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground ml-1 align-middle">
                                                {entry.position}
                                            </span>
                                        )}
                                    </h3>
                                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                                        <span className="font-medium">Accuracy:</span>
                                        <span className="text-white font-mono">{entry.score}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-12">
                            <div className="pl-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                <ArrowUpRight className="text-primary w-6 h-6" />
                            </div>
                        </div>
                    </motion.div>
                );

                if (entry.rankingId) {
                    const linkPath = entry.position
                        ? `/rank/${entry.rankingId}?pos=${entry.position}`
                        : `/rank/${entry.rankingId}`;

                    return (
                        <Link to={linkPath} key={entry.id} className="block group min-w-0">
                            {linkContent}
                        </Link>
                    );
                }

                return (
                    <div key={entry.id} className="block group min-w-0 cursor-default">
                        {linkContent}
                    </div>
                );
            })}
        </div>
    );
}
