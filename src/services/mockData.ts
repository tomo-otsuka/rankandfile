export interface Player {
    id: string;
    name: string;
    position: 'WR' | 'RB' | 'QB' | 'TE';
    team: string;
}

export interface User {
    id: string;
    username: string;
    avatar: string; // url or gradient
    reputation: number; // 0-100 Ball Knower Score
}

export interface RankingFile {
    id: string;
    userId: string;
    position: 'WR' | 'RB' | 'QB' | 'TE';
    playerIds: string[]; // Ordered list
    lastUpdated: string;
    title: string;
}

// Mock Database
export const PLAYERS: Player[] = [
    { id: '1', name: 'Elite RB 1', position: 'RB', team: 'STARS' },
    { id: '2', name: 'Speedy WR 1', position: 'WR', team: 'STARS' },
    { id: '3', name: 'Reliable WR 2', position: 'WR', team: 'METEORS' },
    { id: '4', name: 'Agile WR 3', position: 'WR', team: 'METEORS' },
    { id: '5', name: 'Strong WR 4', position: 'WR', team: 'COMETS' },
    { id: '6', name: 'Power RB 2', position: 'RB', team: 'COMETS' },
    { id: '7', name: 'Route WR 5', position: 'WR', team: 'BLUE' },
    { id: '8', name: 'Junior RB 3', position: 'RB', team: 'BLUE' },
    { id: '9', name: 'Veteran WR 6', position: 'WR', team: 'RED' },
    { id: '10', name: 'Rookie WR 7', position: 'WR', team: 'RED' },
    { id: '11', name: 'Speed RB 4', position: 'RB', team: 'GOLD' },
    { id: '12', name: 'Physical RB 5', position: 'RB', team: 'GOLD' },
    { id: '13', name: 'Flash WR 8', position: 'WR', team: 'NEON' },
    { id: '14', name: 'Scat RB 6', position: 'RB', team: 'NEON' },
    { id: '15', name: 'Goal RB 7', position: 'RB', team: 'ICE' },
    { id: '16', name: 'Talent WR 9', position: 'WR', team: 'ICE' },
    { id: '17', name: 'Smooth WR 10', position: 'WR', team: 'HEAT' },
    { id: '18', name: 'Deep WR 11', position: 'WR', team: 'HEAT' },
    { id: '19', name: 'Sway RB 8', position: 'RB', team: 'GHOSTS' },
    { id: '20', name: 'Shift RB 9', position: 'RB', team: 'GHOSTS' },
    { id: '21', name: 'Cannon QB 1', position: 'QB', team: 'STARS' },
    { id: '22', name: 'Clutch QB 2', position: 'QB', team: 'METEORS' },
    { id: '23', name: 'Dual QB 3', position: 'QB', team: 'COMETS' },
    { id: '24', name: 'Leader QB 4', position: 'QB', team: 'BLUE' },
    { id: '25', name: 'Wonder QB 5', position: 'QB', team: 'RED' },
];

export const USERS: User[] = [
    { id: 'u1', username: 'fantasy_guru', avatar: 'bg-red-500', reputation: 92 },
    { id: 'u2', username: 'ball_knower_99', avatar: 'bg-blue-500', reputation: 88 },
    { id: 'u3', username: 'casual_fan', avatar: 'bg-green-500', reputation: 45 },
    { id: 'u4', username: 'stats_nerd', avatar: 'bg-purple-500', reputation: 76 },
];

export const RANKINGS: RankingFile[] = [
    {
        id: 'f1',
        userId: 'u1',
        position: 'WR',
        title: 'Top 50 WRs (PPR)',
        lastUpdated: '2025-08-20T10:00:00Z',
        playerIds: ['4', '2', '3', '5', '7', '9', '10', '13', '16', '17'], // Sample order
    },
    {
        id: 'f2',
        userId: 'u2',
        position: 'WR',
        title: 'My WR Rankings',
        lastUpdated: '2025-08-21T14:30:00Z',
        playerIds: ['2', '4', '5', '3', '7', '9', '13', '10', '16', '18'], // Different order
    },
    {
        id: 'f3',
        userId: 'u1',
        position: 'RB',
        title: 'RB Bellcows',
        lastUpdated: '2025-08-20T10:05:00Z',
        playerIds: ['1', '6', '8', '11', '12', '14', '15', '19'],
    }
];

// Helpers
export const getPlayer = (id: string) => PLAYERS.find(p => p.id === id);
export const getUser = (id: string) => USERS.find(u => u.id === id);
