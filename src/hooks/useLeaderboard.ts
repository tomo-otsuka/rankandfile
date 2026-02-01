import { useState, useCallback } from 'react';
import { RANKINGS, LeaderboardEntry, Position } from '../services/mockData';

export type DashboardTimeframe = 'LAST_WEEK' | 'SEASON' | 'LAST_SEASON';

export function useLeaderboard() {
    const [positionFilter, setPositionFilter] = useState<Position | 'ALL'>('ALL');

    const getRankings = useCallback((timeframe: DashboardTimeframe): LeaderboardEntry[] => {
        const type = timeframe === 'LAST_WEEK' ? 'WEEKLY' : 'SEASONAL';

        // Filter by timeframe type first
        const eligibleRankings = RANKINGS.filter(r => r.type === type);

        if (positionFilter === 'ALL') {
            // Aggregate by User ID across all positions
            const userScores: Record<string, { totalScore: number; count: number; firstRankingId: string }> = {};

            eligibleRankings.forEach(r => {
                // Sum up all position scores for this ranking
                Object.values(r.scores).forEach(score => {
                    if (!userScores[r.userId]) {
                        userScores[r.userId] = { totalScore: 0, count: 0, firstRankingId: r.id };
                    }
                    userScores[r.userId].totalScore += score;
                    userScores[r.userId].count += 1;
                });
            });

            const aggregated = Object.entries(userScores).map(([userId, stats]) => ({
                id: userId,
                userId: userId,
                score: Math.round(stats.totalScore / stats.count),
                rankingId: stats.firstRankingId
            }));

            return aggregated.sort((a, b) => b.score - a.score);
        } else {
            // Filter by specific position - get rankings that have this position
            const entries: LeaderboardEntry[] = [];

            eligibleRankings.forEach(r => {
                const posScore = r.scores[positionFilter];
                if (posScore !== undefined) {
                    entries.push({
                        id: `${r.id}-${positionFilter}`,
                        userId: r.userId,
                        score: posScore,
                        position: positionFilter,
                        rankingId: r.id
                    });
                }
            });

            return entries.sort((a, b) => b.score - a.score);
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
