import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Sparkles, MessageSquare } from 'lucide-react';

export function HeroVisual() {
    return (
        <div className="relative w-full max-w-[500px] aspect-[4/3] mx-auto md:mx-0 perspective-1000">
            {/* Background decorative elements */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/20 rounded-[2rem] blur-3xl"
            />

            {/* Main Card - "The Receipt" */}
            <motion.div
                initial={{ rotateX: 10, rotateY: -10, y: 50, opacity: 0 }}
                animate={{ rotateX: 0, rotateY: 0, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                className="absolute inset-0 bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justifying-between w-full border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-white text-lg">Top 50 QBs</div>
                            <div className="text-xs text-muted-foreground">Ranked by @ball_knower</div>
                        </div>
                    </div>
                </div>

                {/* List Items */}
                <div className="space-y-2 flex-1 overflow-hidden relative">
                    {[
                        { name: "Patrick Mahomes", team: "KC", change: "+2" },
                        { name: "Josh Allen", team: "BUF", change: "0" },
                        { name: "Lamar Jackson", team: "BAL", change: "-1" },
                        { name: "Jalen Hurts", team: "PHI", change: "+4" },
                        { name: "Joe Burrow", team: "CIN", change: "-2" },
                    ].map((player, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5"
                        >
                            <div className="flex items-center gap-3">
                                <span className={`font-mono font-bold w-6 text-center ${i < 3 ? 'text-primary' : 'text-muted-foreground'}`}>#{i + 1}</span>
                                <span className="text-white font-medium text-sm">{player.name}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-muted-foreground">{player.team}</span>
                            </div>
                            {player.change !== "0" && (
                                <div className={`flex items-center text-xs font-bold ${player.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {player.change.startsWith('+') ? <TrendingUp className="w-3 h-3 mr-1" /> : null}
                                    {player.change}
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {/* Fade out mask to imply depth */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card/90 to-transparent pointer-events-none" />
                </div>

                {/* Footer Interaction */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-muted-foreground text-sm">
                    <div className="flex gap-4">
                        <span className="flex items-center hover:text-white transition-colors cursor-pointer"><MessageSquare className="w-4 h-4 mr-1.5" /> 24</span>
                        <span className="flex items-center hover:text-white transition-colors cursor-pointer"><Sparkles className="w-4 h-4 mr-1.5" /> 89%</span>
                    </div>
                    <div className="text-xs font-mono opacity-50">#RANK-8X92</div>
                </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 top-10 bg-primary/90 text-white p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/20 z-10"
            >
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span className="font-bold text-sm">Perfect Prediction!</span>
                </div>
            </motion.div>
        </div>
    );
}
