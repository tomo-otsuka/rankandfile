import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PLAYERS, Player, getRanking, getUser, Position } from '../services/mockData';

export type { Position } from '../services/mockData';
export type RankingType = 'SEASONAL' | 'WEEKLY';

export interface RankerState {
    position: Position;
    rankingType: RankingType;
    week: number;
    items: Player[];
    viewTitle: string;
    saveStatus: 'IDLE' | 'SAVING' | 'SAVED';
    isViewMode: boolean;
    availablePositions: Position[];
}

export interface RankerActions {
    setPosition: (pos: Position) => void;
    setRankingType: (type: RankingType) => void;
    setWeek: (week: number) => void;
    handleReorder: (newItems: Player[]) => void;
}

export function useRanker() {
    const { rankId } = useParams();
    const [searchParams] = useSearchParams();
    const isViewMode = !!rankId;

    // Default Edit Mode Initial Values
    const defaultPos: Position = 'WR';
    const defaultType: RankingType = 'SEASONAL';
    const defaultWeek = 1;

    // Initial Position from URL if present
    const initPos = (searchParams.get('pos') as Position) || defaultPos;

    // Initial Week from URL if present
    const urlWeek = searchParams.get('week');
    const initWeek = urlWeek ? parseInt(urlWeek) : defaultWeek;

    // Initial Type from URL if present, or implied by week
    const urlType = searchParams.get('type') as RankingType;
    const initType: RankingType = urlType || (urlWeek ? 'WEEKLY' : defaultType);

    // State
    const [position, setPosition] = useState<Position>(initPos);
    const [rankingType, setRankingType] = useState<RankingType>(initType);
    const [week, setWeek] = useState<number>(initWeek);
    const [items, setItems] = useState<Player[]>([]);
    const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED'>('SAVED');
    const [viewTitle, setViewTitle] = useState<string>('');
    const [availablePositions, setAvailablePositions] = useState<Position[]>(['QB', 'RB', 'WR', 'TE', 'K', 'DST']);

    // Sync position with search params when navigating between rankings
    useEffect(() => {
        const urlPos = searchParams.get('pos') as Position;
        if (urlPos && isViewMode) {
            setPosition(urlPos);
        }
    }, [rankId, searchParams, isViewMode]);

    // Load Data
    useEffect(() => {
        if (isViewMode && rankId) {
            // VIEW MODE: Load from global rankings
            const ranking = getRanking(rankId);
            if (ranking) {
                // Find first position that has rankings in this file
                const avail = Object.keys(ranking.rankings) as Position[];
                setAvailablePositions(avail);

                // Initialize position ONLY if current position state is NOT available in this file
                if (!ranking.rankings[position]) {
                    const firstPos = avail[0] || 'WR';
                    setPosition(firstPos);
                    // Return early as the state update will trigger this effect again
                    return;
                }

                // Sync UI state with the ranking file metadata
                setRankingType(ranking.type);
                if (ranking.week) setWeek(ranking.week);

                // Generate view title from user's ranking
                const user = getUser(ranking.userId);
                const username = user ? user.username : 'User';
                const isOverall = availablePositions.length > 2;
                const typeStr = ranking.type === 'WEEKLY' ? 'Week ' + (ranking.week || 1) : 'Season';

                if (isOverall) {
                    setViewTitle(`${username}'s ${typeStr} Rankings`);
                } else {
                    const positionsStr = avail.join('/');
                    setViewTitle(`${username}'s ${typeStr} ${positionsStr} Rankings`);
                }

                // Map player IDs for the CURRENT selected position
                const playerIds = ranking.rankings[position] || [];
                const rankedPlayers = playerIds
                    .map(id => PLAYERS.find(p => p.id === id))
                    .filter((p): p is Player => !!p);

                setItems(rankedPlayers);
            }
        } else {
            // EDIT MODE: Load from local storage or default
            const key = rankingType === 'SEASONAL'
                ? `rankings-${position}-SEASONAL`
                : `rankings-${position}-WEEK-${week}`;

            const saved = localStorage.getItem(key);

            if (saved) {
                const savedItems: Player[] = JSON.parse(saved);
                // Hydrate with latest mock data to ensure historical stats are present
                const hydratedItems = savedItems.map(savedPlayer => {
                    const latestPlayer = PLAYERS.find(p => p.id === savedPlayer.id);
                    return latestPlayer || savedPlayer;
                });
                setItems(hydratedItems);
            } else {
                const playersForPosition = PLAYERS.filter(p => p.position === position);
                setItems(playersForPosition);
            }
            // Clear view title in edit mode
            setViewTitle('');
            setAvailablePositions(['QB', 'RB', 'WR', 'TE', 'K', 'DST']);
            setSaveStatus('SAVED');
        }
    }, [position, rankingType, week, rankId, isViewMode]);

    const handleReorder = useCallback((newItems: Player[]) => {
        if (isViewMode) return; // Disable reordering in view mode

        setItems(newItems);
        setSaveStatus('SAVING');

        const key = rankingType === 'SEASONAL'
            ? `rankings-${position}-SEASONAL`
            : `rankings-${position}-WEEK-${week}`;

        localStorage.setItem(key, JSON.stringify(newItems));

        // Simulate network delay for effect
        setTimeout(() => setSaveStatus('SAVED'), 600);
    }, [isViewMode, position, rankingType, week]);

    return {
        state: {
            position,
            rankingType,
            week,
            items,
            viewTitle,
            saveStatus,
            isViewMode,
            availablePositions
        },
        actions: {
            setPosition,
            setRankingType,
            setWeek,
            handleReorder
        }
    };
}
