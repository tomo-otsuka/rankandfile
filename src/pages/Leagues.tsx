import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeagueList, LeagueDetail } from '../components/dashboard/LeagueComponents';
import { League } from '../services/mockData';

export default function Leagues() {
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

    return (
        <motion.div
            className="max-w-7xl mx-auto space-y-8 pb-20 px-4 md:px-8"
        >
            {!selectedLeague && (
                <div className="flex flex-col gap-6 pt-10 pb-4 items-center text-center">
                    <div className="space-y-4 max-w-3xl">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                            My Leagues
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Compete with your friends and rivals. <br className="hidden md:block" />
                            Private leaderboards for your fantasy communities.
                        </p>
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {selectedLeague ? (
                    <motion.div
                        key="league-detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <LeagueDetail league={selectedLeague} onBack={() => setSelectedLeague(null)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="leagues-list"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <LeagueList onSelectLeague={setSelectedLeague} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
