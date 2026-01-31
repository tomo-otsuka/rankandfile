import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { PLAYERS, Player, RANKINGS } from '../services/mockData';

export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DST';
export type RankingType = 'SEASONAL' | 'WEEKLY';

export interface RankerState {
    position: Position;
    rankingType: RankingType;
    week: number;
    items: Player[];
    viewTitle: string;
    saveStatus: 'IDLE' | 'SAVING' | 'SAVED';
    isViewMode: boolean;
}

export interface RankerActions {
    setPosition: (pos: Position) => void;
    setRankingType: (type: RankingType) => void;
    setWeek: (week: number) => void;
    handleReorder: (newItems: Player[]) => void;
}

export function useRanker() {
    const { rankId } = useParams();
    const isViewMode = !!rankId;

    // Default Edit Mode Initial Values
    const defaultPos: Position = 'WR';
    const defaultType: RankingType = 'SEASONAL';
    const defaultWeek = 1;

    // State
    const [position, setPosition] = useState<Position>(defaultPos);
    const [rankingType, setRankingType] = useState<RankingType>(defaultType);
    const [week, setWeek] = useState<number>(defaultWeek);
    const [items, setItems] = useState<Player[]>([]);
    const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED'>('SAVED');
    const [viewTitle, setViewTitle] = useState<string>('');

    // Load Data
    useEffect(() => {
        if (isViewMode) {
            // VIEW MODE: Load from global rankings
            const ranking = RANKINGS.find(r => r.id === rankId);
            if (ranking) {
                setPosition(ranking.position);
                setRankingType(ranking.type);
                setViewTitle(ranking.title);

                // Map player IDs back to full player objects
                const rankedPlayers = ranking.playerIds
                    .map(id => PLAYERS.find(p => p.id === id))
                    .filter((p): p is Player => !!p);

                setItems(rankedPlayers);
            }
        } else {
            // EDIT MODE: Load from local storage or default
            // We are NOT using useLocalStorage hook for the main items state 
            // because the key changes dynamically based on position/type/week.
            // Instead we explicitly load/save in effects.
            const key = rankingType === 'SEASONAL'
                ? `rankings-${position}-SEASONAL`
                : `rankings-${position}-WEEK-${week}`;

            const saved = localStorage.getItem(key);

            if (saved) {
                setItems(JSON.parse(saved));
            } else {
                const playersForPosition = PLAYERS.filter(p => p.position === position);
                setItems(playersForPosition);
            }
            // Clear view title in edit mode
            setViewTitle('');
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
            isViewMode
        },
        actions: {
            setPosition,
            setRankingType,
            setWeek,
            handleReorder
        }
    };
}
