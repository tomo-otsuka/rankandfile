import { useState, useMemo } from 'react';
import { Users, TrendingUp, TrendingDown, ArrowLeft, Info, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RANKINGS, USERS, getPlayer, Position } from '../services/mockData';
import { PositionPills } from '../components/dashboard/LeaderboardFilters';
import { cn } from '../lib/utils';

export default function Compare() {
    const [selectedPosition, setSelectedPosition] = useState<Position>('WR');
    const [selectedRivalId, setSelectedRivalId] = useState<string>('CONSENSUS');

    // Mock "Consensus" Ranking: Average of all researchers
    const consensusRanking = useMemo(() => {
        const rankingsWithPos = RANKINGS.filter(r => r.rankings[selectedPosition]);
        if (rankingsWithPos.length === 0) return null;
        const expert = RANKINGS.find(r => r.userId === 'u1' && r.type === 'SEASONAL');
        return expert || rankingsWithPos[0];
    }, [selectedPosition]);

    // Mock "Me" (using local storage if available, otherwise default)
    const myRanking = useMemo(() => {
        const key = `rankings-${selectedPosition}-SEASONAL`;
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                const items = JSON.parse(saved);
                return {
                    id: 'my-ranking',
                    userId: 'me',
                    type: 'SEASONAL',
                    rankings: { [selectedPosition]: items.map((p: any) => p.id) },
                    lastUpdated: new Date().toISOString()
                } as any;
            } catch (e) {
                return RANKINGS[0];
            }
        }
        return RANKINGS[0];
    }, [selectedPosition]);

    const rivalRanking = useMemo(() => {
        if (selectedRivalId === 'CONSENSUS') return consensusRanking;
        return RANKINGS.find(r => r.id === selectedRivalId);
    }, [selectedRivalId, consensusRanking]);

    const myPlayerIds = myRanking?.rankings[selectedPosition] || [];
    // Ensure we handle the case where reality might have fewer/more players correctly in a real app
    // For now we just grab the IDs from the active rival
    const rivalPlayerIds = rivalRanking?.rankings[selectedPosition] || [];

    const getRank = (playerId: string, list: string[]) => {
        const idx = list.indexOf(playerId);
        return idx === -1 ? null : idx;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto space-y-8 pb-32"
        >
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8">
                <div className="space-y-2">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-2"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Back to Global
                    </Link>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                        The <span className="text-primary/80">Compare</span> Tool
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Identify your biggest outliers. See where your expertise deviates from the crowd or the pros.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-1">Selected Position</span>
                    <PositionPills
                        positionFilter={selectedPosition}
                        setPositionFilter={(pos) => setSelectedPosition(pos === 'ALL' ? 'WR' : pos)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* SETTINGS / SELECTOR PANEL */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                    <div className="glass-morphism-premium rounded-3xl border border-white/10 p-6 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                <Users className="w-3 h-3" /> Compare Against
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <button
                                    onClick={() => setSelectedRivalId('CONSENSUS')}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                                        selectedRivalId === 'CONSENSUS'
                                            ? "bg-primary/20 border-primary/40 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                                            : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/10"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold transition-colors",
                                            selectedRivalId === 'CONSENSUS' ? "bg-primary text-white" : "bg-white/5 text-white/20"
                                        )}>
                                            <Trophy className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-sm">Consensus Benchmark</div>
                                            <div className="text-xs opacity-60">High-accuracy baseline</div>
                                        </div>
                                    </div>
                                    {selectedRivalId === 'CONSENSUS' && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                                </button>

                                {RANKINGS.filter(r => r.id !== myRanking?.id && r.userId !== 'u1').slice(0, 3).map(r => {
                                    const user = USERS.find(u => u.id === r.userId);
                                    const isSelected = selectedRivalId === r.id;
                                    return (
                                        <button
                                            key={r.id}
                                            onClick={() => setSelectedRivalId(r.id)}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                                                isSelected
                                                    ? "bg-primary/20 border-primary/40 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                                                    : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/10"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors",
                                                    isSelected ? "bg-primary text-white" : "bg-white/5 text-white/20"
                                                )}>
                                                    {user?.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-sm">@{user?.username}</div>
                                                    <div className="text-xs opacity-60">Accuracy Rank: #{RANKINGS.indexOf(r) + 1}</div>
                                                </div>
                                            </div>
                                            {isSelected && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex gap-3 italic">
                            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-[11px] leading-relaxed text-muted-foreground">
                                Differences are shown relative to your rival. A <span className="text-green-400 font-bold">+5</span> means you are significantly higher on this player.
                            </p>
                        </div>
                    </div>
                </div>

                {/* MAIN COMPARISON VIEW */}
                <div className="lg:col-span-8">
                    <div className="glass-morphism-premium rounded-[2.5rem] border border-white/10 overflow-hidden bg-black/40">
                        {/* Comparison Header Table */}
                        <div className="grid grid-cols-12 gap-0 border-b border-white/10 bg-white/[0.02]">
                            <div className="col-span-7 p-6 border-r border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20">ME</div>
                                    <div>
                                        <h4 className="font-black text-white italic uppercase tracking-tighter">My Rankings</h4>
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{selectedPosition} • SEASONAL</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-5 p-6 bg-white/[0.01]">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white font-black text-xs shadow-lg">
                                        VS
                                    </div>
                                    <div>
                                        <h4 className="font-black italic uppercase tracking-tighter text-white">
                                            Rival List
                                        </h4>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            {selectedRivalId === 'CONSENSUS' ? 'Consensus Baseline' :
                                                `@${USERS.find(u => u.id === rivalRanking?.userId)?.username}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comparison Rows */}
                        <div className="p-3">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="space-y-1"
                            >
                                {myPlayerIds.length > 0 ? (
                                    myPlayerIds.map((playerId: string, index: number) => {
                                        const player = getPlayer(playerId);
                                        const rivalRank = getRank(playerId, rivalPlayerIds);

                                        // A positive diff means I rank them higher (lower numeric index)
                                        // index 0 vs rivalRank 5 = diff 5 (I am +5 higher)
                                        const diff = rivalRank === null ? null : rivalRank - index;

                                        return (
                                            <motion.div
                                                key={playerId}
                                                variants={itemVariants}
                                                className="grid grid-cols-12 gap-2 group hover:bg-white/[0.04] transition-all duration-300 rounded-2xl p-2 border border-transparent hover:border-white/5 items-center"
                                            >
                                                {/* Player Info (7 cols) */}
                                                <div className="col-span-7 flex items-center gap-4 min-w-0">
                                                    <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-xl bg-white/5 font-mono text-[10px] font-black text-muted-foreground group-hover:text-primary transition-colors border border-white/5">
                                                        {index + 1}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-bold text-white uppercase tracking-tighter italic group-hover:text-primary transition-colors truncate">
                                                            {player?.name}
                                                        </div>
                                                        <div className="text-[9px] font-black tracking-widest text-muted-foreground/60 uppercase">
                                                            {player?.team} • {player?.position}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Diff / Deviation (5 cols) */}
                                                <div className="col-span-5 flex items-center justify-end gap-3 px-2">
                                                    <AnimatePresence mode="wait">
                                                        {diff !== null && rivalRank !== null ? (
                                                            <div className="flex items-center gap-4">
                                                                {/* Rival Rank Small Pill */}
                                                                <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-muted-foreground/40">
                                                                    <span>#</span>{rivalRank + 1}
                                                                </div>

                                                                {/* Delta Indicator */}
                                                                <div className={cn(
                                                                    "min-w-[4rem] text-right flex items-center justify-end gap-1.5",
                                                                    diff === 0 ? "text-muted-foreground opacity-20" :
                                                                        diff > 0 ? "text-green-400" : "text-red-400"
                                                                )}>
                                                                    {diff !== 0 && (
                                                                        <span className="font-mono text-xs font-black">
                                                                            {diff > 0 ? `+${diff}` : diff}
                                                                        </span>
                                                                    )}
                                                                    {diff === 0 ? (
                                                                        <div className="w-4 h-0.5 bg-white/10 rounded-full" />
                                                                    ) : diff > 0 ? (
                                                                        <TrendingUp className="w-4 h-4" />
                                                                    ) : (
                                                                        <TrendingDown className="w-4 h-4" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="text-[10px] font-bold text-muted-foreground/20 italic uppercase tracking-widest">
                                                                Not Ranked
                                                            </div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                ) : (
                                    <div className="py-32 text-center text-muted-foreground italic">
                                        No rankings found for this position.
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

