import { motion } from 'framer-motion';
import {
    Users,
    Globe,
    ArrowRight,
    TrendingUp,
    Trophy,
    ChevronRight,
    Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-10 pb-20 px-4 md:px-8 pt-8"
        >
            {/* Welcome Section */}
            <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                    Dashboard
                </h1>
                <p className="text-muted-foreground font-medium">
                    Welcome back, <span className="text-primary font-bold">@ChiefRanker</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* HERO CARD: ACTION (Rank Now) */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary/10 via-purple-900/10 to-transparent">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-8 h-full flex flex-col justify-between min-h-[280px]">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Live Now
                            </div>
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-2">
                                    Week 2 Rankings
                                </h2>
                                <p className="text-muted-foreground max-w-md text-lg">
                                    The submission window is open. Lock in your predictions before kickoff to climb the leaderboard.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/rank"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 w-fit mt-8 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                        >
                            Start Ranking
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>

                {/* RESULTS CARD */}
                <motion.div variants={itemVariants} className="col-span-1 relative group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors">
                    <div className="p-8 h-full flex flex-col">
                        <div className="flex items-start justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-black shadow-lg shadow-orange-500/20">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Week 1 Recap</span>
                        </div>

                        <div className="mt-auto space-y-6">
                            <div>
                                <div className="text-5xl font-black text-white tracking-tighter">
                                    92<span className="text-2xl text-muted-foreground font-bold">%</span>
                                </div>
                                <div className="text-sm font-bold text-green-400 uppercase tracking-widest flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> Result Accuracy
                                </div>
                            </div>

                            <Link
                                to="/rank?week=1"
                                className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/btn"
                            >
                                <span className="font-bold text-sm text-white">View Full Report</span>
                                <ChevronRight className="w-4 h-4 text-white/50 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* GLOBAL LEADERBOARD CTA */}
                <motion.div variants={itemVariants} className="col-span-1 relative group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors">
                    <div className="p-8 h-full flex flex-col">
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Global Leaderboard</h3>
                            <p className="text-sm text-muted-foreground mt-2">See where you rank against thousands of other rankers.</p>
                        </div>

                        <div className="mt-auto">
                            <Link
                                to="/leaderboard"
                                className="group/link flex items-center gap-3 text-blue-400 font-bold uppercase tracking-wider text-sm hover:text-blue-300 transition-colors"
                            >
                                View Global Ranks
                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Decorative BG element */}
                        <Globe className="absolute -bottom-8 -right-8 w-40 h-40 text-blue-500/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                </motion.div>

                {/* LEAGUES CTA */}
                <motion.div variants={itemVariants} className="col-span-1 relative group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors">
                    <div className="p-8 h-full flex flex-col">
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">My Leagues</h3>
                            <p className="text-sm text-muted-foreground mt-2">Manage your private pools and check league standings.</p>
                        </div>

                        <div className="mt-auto">
                            <Link
                                to="/leagues"
                                className="group/link flex items-center gap-3 text-emerald-400 font-bold uppercase tracking-wider text-sm hover:text-emerald-300 transition-colors"
                            >
                                Go to Leagues
                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Decorative BG element */}
                        <Users className="absolute -bottom-8 -right-8 w-40 h-40 text-emerald-500/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                </motion.div>

                {/* COMPARE CTA */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1 relative group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors">
                    <div className="p-8 h-full flex flex-col">
                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Compare Tool</h3>
                            <p className="text-sm text-muted-foreground mt-2">Analyze your mock drafts against the consensus.</p>
                        </div>

                        <div className="mt-auto">
                            <Link
                                to="/compare"
                                className="group/link flex items-center gap-3 text-pink-400 font-bold uppercase tracking-wider text-sm hover:text-pink-300 transition-colors"
                            >
                                Start Comparing
                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}
