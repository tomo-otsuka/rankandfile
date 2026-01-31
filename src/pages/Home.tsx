import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Lock, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroVisual } from '../components/home/HeroVisual';

export default function Home() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
    };

    return (
        <motion.div
            variants={container}
            animate="show"
            className="flex flex-col items-center justify-center space-y-20 md:space-y-32 pb-20 overflow-hidden"
        >
            {/* HERO SECTION */}
            <section className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-10 md:pt-20 px-4">
                <motion.div variants={item} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-pulse">
                        <Sparkles className="w-4 h-4" />
                        <span className="uppercase tracking-wider">The Standard for Accuracy</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                        PREDICTIONS, <br />
                        <span className="bg-gradient-to-br from-white via-primary/50 to-primary bg-clip-text text-transparent italic pr-2">
                            VALIDATED.
                        </span>
                    </h1>

                    <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                        Go beyond the debate.
                        <span className="text-white font-bold"> Track your accuracy. Measure your expertise. </span>
                        Build a verified track record that speaks for itself.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            to="/rank"
                            className="relative group inline-flex items-center justify-center rounded-xl bg-primary text-white font-black h-14 px-8 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        >
                            <span className="z-10 uppercase tracking-widest flex items-center gap-2">
                                Start Ranking <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Link>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md font-bold h-14 px-8 hover:bg-white/10 transition-all duration-200 text-white uppercase tracking-widest"
                        >
                            View Leaderboard
                        </Link>
                    </div>
                </motion.div>

                <motion.div variants={item} className="relative w-full flex justify-center lg:justify-end z-0">
                    <HeroVisual />
                </motion.div>
            </section>

            {/* FEATURES / HOW IT WORKS */}
            <motion.section variants={item} className="w-full max-w-6xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">BUILD YOUR RECORD</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A transparent platform for proving predictive ability.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
                            title: "Define Your Stance",
                            desc: "Create comprehensive rankings. Go deep and rank the entire field, not just the obvious starters."
                        },
                        {
                            icon: <Lock className="w-8 h-8 text-pink-400" />,
                            title: "Commit to the Call",
                            desc: "Lock in your predictions. Timestamped and immutable, creating a verifiable history of your takes."
                        },
                        {
                            icon: <CheckCircle2 className="w-8 h-8 text-green-400" />,
                            title: "Validate Your Skill",
                            desc: "Let the results determine your reputation. Rise up the global leaderboard based on data, not opinions."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 overflow-hidden hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                            <div className="absolute top-0 right-0 p-3 opacity-10 font-black text-6xl select-none group-hover:opacity-20 transition-opacity">
                                {i + 1}
                            </div>
                            <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    );
}

