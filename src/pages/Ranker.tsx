import { motion } from 'framer-motion';
import { useRanker } from '../hooks/useRanker';
import { RankerHeader } from '../components/ranker/RankerHeader';
import { RankerControls } from '../components/ranker/RankerControls';
import { RankerList } from '../components/ranker/RankerList';

export default function Ranker() {
    const { state, actions } = useRanker();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto space-y-8"
        >

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <RankerHeader
                    isViewMode={state.isViewMode}
                    viewTitle={state.viewTitle}
                    position={state.position}
                    saveStatus={state.saveStatus}
                />

                <RankerControls
                    position={state.position}
                    setPosition={actions.setPosition}
                    rankingType={state.rankingType}
                    setRankingType={actions.setRankingType}
                    week={state.week}
                    setWeek={actions.setWeek}
                />
            </div>

            <RankerList
                items={state.items}
                handleReorder={actions.handleReorder}
                isViewMode={state.isViewMode}
                currentWeek={state.week}
                rankingType={state.rankingType}
            />
        </motion.div>
    );
}
