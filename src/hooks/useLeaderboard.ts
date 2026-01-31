import { useState, useCallback } from 'react';
import { RANKINGS, LeaderboardEntry } from '../services/mockData';
import { Position, RankingType } from './useRanker';

export type DashboardTimeframe = 'LAST_WEEK' | 'SEASON' | 'LAST_SEASON';

export function useLeaderboard() {
    const [positionFilter, setPositionFilter] = useState<Position | 'ALL'>('ALL');

    const getRankings = useCallback((timeframe: DashboardTimeframe): LeaderboardEntry[] => {
        const type: RankingType = timeframe === 'LAST_WEEK' ? 'WEEKLY' : 'SEASONAL';

        // Filter by timeframe type first
        const eligibleRankings = RANKINGS.filter(r => r.type === type);

        if (positionFilter === 'ALL') {
            // Aggregate by User ID
            const userScores: Record<string, { totalScore: number; count: number }> = {};

            eligibleRankings.forEach(r => {
                if (!userScores[r.userId]) {
                    userScores[r.userId] = { totalScore: 0, count: 0 };
                }
                userScores[r.userId].totalScore += r.score;
                userScores[r.userId].count += 1;
            });

            const aggregated = Object.entries(userScores).map(([userId, stats]) => ({
                id: userId,
                userId: userId,
                score: Math.round(stats.totalScore / stats.count),
                rankingId: undefined
            }));

            return aggregated.sort((a, b) => b.score - a.score);
        } else {
            // Filter by specific position and map to LeaderboardEntry
            return eligibleRankings
                .filter(r => r.position === positionFilter)
                .map(r => ({
                    id: r.id,
                    userId: r.userId,
                    score: r.score,
                    position: r.position,
                    rankingId: r.id
                }))
                .sort((a, b) => b.score - a.score);
        }
    }, [positionFilter]);

    return {
        state: {
            positionFilter,
        },
        actions: {
            setPositionFilter,
        },
        helpers: {
            getRankings
        }
    };
}
