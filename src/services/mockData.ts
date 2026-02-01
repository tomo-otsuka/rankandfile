export interface Player {
    id: string;
    name: string;
    position: 'WR' | 'RB' | 'QB' | 'TE' | 'K' | 'DST';
    team: string;
    // Historical performance data
    weeklyScores?: Record<number, number>; // week number -> fantasy points
    lastSeasonRank?: number; // Final rank in position group last season
    currentSeasonAvg?: number; // Average fantasy points this season
}

export interface League {
    id: string;
    name: string;
    avatar: string;
    memberIds: string[];
}

export interface User {
    id: string;
    username: string;
    avatar: string; // url or gradient
    reputation: number; // Overall Ball Knower Score
    reputationLastWeek: number;
    reputationSeason: number;
    reputationLastSeason: number;
    leagueIds?: string[];
}

export type Position = 'WR' | 'RB' | 'QB' | 'TE' | 'K' | 'DST';

export interface RankingFile {
    id: string;
    userId: string;
    type: 'SEASONAL' | 'WEEKLY';
    week?: number; // Only for WEEKLY type
    rankings: Partial<Record<Position, string[]>>; // Position -> ordered player IDs
    scores: Partial<Record<Position, number>>; // Position -> accuracy score
    lastUpdated: string;
}

export interface LeaderboardEntry {
    id: string;
    userId: string;
    score: number;
    position?: Position;
    rankingId?: string;
}

// Mock Database
export const PLAYERS: Player[] = [
    // RBs - with historical data
    { id: '1', name: 'Elite Johnson', position: 'RB', team: 'STARS', weeklyScores: { 1: 28.5, 2: 22.1, 3: 31.2, 4: 18.7, 5: 25.4 }, lastSeasonRank: 2, currentSeasonAvg: 25.2 },
    { id: '6', name: 'Power Davis', position: 'RB', team: 'COMETS', weeklyScores: { 1: 19.3, 2: 24.8, 3: 15.2, 4: 22.6, 5: 20.1 }, lastSeasonRank: 5, currentSeasonAvg: 20.4 },
    { id: '8', name: 'Junior Jones', position: 'RB', team: 'BLUE', weeklyScores: { 1: 12.4, 2: 18.9, 3: 21.5, 4: 14.2, 5: 16.8 }, lastSeasonRank: 12, currentSeasonAvg: 16.8 },
    { id: '11', name: 'Speed Wilson', position: 'RB', team: 'GOLD', weeklyScores: { 1: 15.6, 2: 21.3, 3: 19.8, 4: 23.4, 5: 18.2 }, lastSeasonRank: 8, currentSeasonAvg: 19.7 },
    { id: '12', name: 'Physical Miller', position: 'RB', team: 'GOLD', weeklyScores: { 1: 14.2, 2: 16.5, 3: 18.9, 4: 12.1, 5: 15.7 }, lastSeasonRank: 11, currentSeasonAvg: 15.5 },
    { id: '14', name: 'Scat Taylor', position: 'RB', team: 'NEON', weeklyScores: { 1: 10.5, 2: 14.2, 3: 8.9, 4: 15.6, 5: 12.3 }, lastSeasonRank: 15, currentSeasonAvg: 12.3 },
    { id: '15', name: 'Goal Harris', position: 'RB', team: 'ICE', weeklyScores: { 1: 18.2, 2: 5.6, 3: 14.8, 4: 22.1, 5: 13.4 }, lastSeasonRank: 9, currentSeasonAvg: 14.8 },
    { id: '19', name: 'Sway Robinson', position: 'RB', team: 'GHOSTS', weeklyScores: { 1: 8.9, 2: 11.2, 3: 9.5, 4: 10.8, 5: 12.1 }, lastSeasonRank: 18, currentSeasonAvg: 10.5 },
    { id: '20', name: 'Shift Cook', position: 'RB', team: 'GHOSTS', weeklyScores: { 1: 7.5, 2: 9.8, 3: 6.2, 4: 12.5, 5: 8.9 }, lastSeasonRank: 22, currentSeasonAvg: 9.0 },
    { id: '34', name: 'Rookie Walker', position: 'RB', team: 'METEORS', weeklyScores: { 1: 15.6, 2: 18.2, 3: 22.5, 4: 19.8, 5: 24.1 }, currentSeasonAvg: 20.0 }, // Breakout rookie
    { id: '35', name: 'Vet Henry', position: 'RB', team: 'RED', weeklyScores: { 1: 16.5, 2: 15.2, 3: 18.9, 4: 14.1, 5: 17.6 }, lastSeasonRank: 7, currentSeasonAvg: 16.5 },
    { id: '36', name: 'Workhorse Barkley', position: 'RB', team: 'STEEL', weeklyScores: { 1: 21.3, 2: 19.8, 3: 23.5, 4: 20.1, 5: 22.7 }, lastSeasonRank: 4, currentSeasonAvg: 21.5 },
    { id: '37', name: 'Committee Pierce', position: 'RB', team: 'BOOM', weeklyScores: { 1: 9.8, 2: 5.4, 3: 11.2, 4: 8.7, 5: 7.5 }, lastSeasonRank: 25, currentSeasonAvg: 8.5 },
    { id: '38', name: 'Pass Montgomery', position: 'RB', team: 'PURPLE', weeklyScores: { 1: 12.5, 2: 8.9, 3: 14.5, 4: 9.2, 5: 11.8 }, lastSeasonRank: 14, currentSeasonAvg: 11.4 },
    { id: '39', name: 'Goal Chubb', position: 'RB', team: 'STARS', weeklyScores: { 1: 5.6, 2: 18.2, 3: 4.5, 4: 12.8, 5: 6.2 }, lastSeasonRank: 19, currentSeasonAvg: 9.5 },
    { id: '138', name: 'Backup Sanders', position: 'RB', team: 'NYG', weeklyScores: { 1: 2.5, 2: 4.8, 3: 3.2, 4: 5.6, 5: 12.1 }, lastSeasonRank: 45, currentSeasonAvg: 5.6 },
    { id: '139', name: 'Speed Mostert', position: 'RB', team: 'MIA', weeklyScores: { 1: 14.2, 2: 8.5, 3: 12.1, 4: 6.5, 5: 9.8 }, lastSeasonRank: 32, currentSeasonAvg: 10.2 },
    { id: '140', name: 'Power Jacobs', position: 'RB', team: 'BAL', weeklyScores: { 1: 11.5, 2: 13.2, 3: 10.8, 4: 12.4, 5: 11.9 }, lastSeasonRank: 28, currentSeasonAvg: 12.0 },
    { id: '141', name: 'Rookie Gibbs', position: 'RB', team: 'SEA', weeklyScores: { 1: 0, 2: 5.2, 3: 8.5, 4: 12.8, 5: 15.4 }, currentSeasonAvg: 8.4 },
    { id: '142', name: 'Vet Kamara', position: 'RB', team: 'NO', weeklyScores: { 1: 8.5, 2: 7.2, 3: 6.5, 4: 5.8, 5: 4.2 }, lastSeasonRank: 21, currentSeasonAvg: 6.4 },

    // WRs - with historical data
    { id: '2', name: 'Speedy Hill', position: 'WR', team: 'STARS', weeklyScores: { 1: 24.2, 2: 19.8, 3: 28.5, 4: 22.1, 5: 26.3 }, lastSeasonRank: 1, currentSeasonAvg: 24.2 },
    { id: '3', name: 'Reliable Adams', position: 'WR', team: 'METEORS', weeklyScores: { 1: 18.5, 2: 21.2, 3: 17.8, 4: 19.4, 5: 20.6 }, lastSeasonRank: 4, currentSeasonAvg: 19.5 },
    { id: '4', name: 'Agile Jefferson', position: 'WR', team: 'METEORS', weeklyScores: { 1: 22.8, 2: 25.1, 3: 19.3, 4: 27.6, 5: 23.9 }, lastSeasonRank: 3, currentSeasonAvg: 23.7 },
    { id: '5', name: 'Strong Chase', position: 'WR', team: 'COMETS', weeklyScores: { 1: 16.4, 2: 18.9, 3: 21.2, 4: 15.7, 5: 19.1 }, lastSeasonRank: 6, currentSeasonAvg: 18.3 },
    { id: '7', name: 'Route Kupp', position: 'WR', team: 'BLUE', weeklyScores: { 1: 20.1, 2: 17.5, 3: 22.8, 4: 18.9, 5: 21.4 }, lastSeasonRank: 7, currentSeasonAvg: 20.1 },
    { id: '9', name: 'Veteran Diggs', position: 'WR', team: 'RED', weeklyScores: { 1: 12.5, 2: 15.6, 3: 18.9, 4: 11.2, 5: 14.5 }, lastSeasonRank: 8, currentSeasonAvg: 16.8 },
    { id: '10', name: 'Rookie Lamb', position: 'WR', team: 'RED', weeklyScores: { 1: 8.5, 2: 7.2, 3: 14.5, 4: 9.8, 5: 12.1 }, currentSeasonAvg: 10.4 }, // Rookie history
    { id: '13', name: 'Flash Wilson', position: 'WR', team: 'NEON', weeklyScores: { 1: 32.1, 2: 8.5, 3: 28.9, 4: 6.2, 5: 35.4 }, lastSeasonRank: 12, currentSeasonAvg: 22.2 },
    { id: '16', name: 'Talent Brown', position: 'WR', team: 'ICE', weeklyScores: { 1: 14.5, 2: 12.8, 3: 16.5, 4: 13.9, 5: 15.2 }, lastSeasonRank: 15, currentSeasonAvg: 14.5 },
    { id: '17', name: 'Smooth St. Brown', position: 'WR', team: 'HEAT', weeklyScores: { 1: 15.8, 2: 17.2, 3: 14.9, 4: 16.5, 5: 18.1 }, lastSeasonRank: 11, currentSeasonAvg: 15.8 },
    { id: '18', name: 'Deep Olave', position: 'WR', team: 'HEAT', weeklyScores: { 1: 8.2, 2: 25.6, 3: 12.4, 4: 31.2, 5: 15.8 }, lastSeasonRank: 18, currentSeasonAvg: 18.6 },
    { id: '40', name: 'Slot Waddle', position: 'WR', team: 'STEEL', weeklyScores: { 1: 13.9, 2: 11.5, 3: 15.2, 4: 12.8, 5: 14.6 }, lastSeasonRank: 14, currentSeasonAvg: 13.9 },
    { id: '41', name: 'Possession Higgins', position: 'WR', team: 'BOOM', weeklyScores: { 1: 10.5, 2: 12.8, 3: 11.2, 4: 13.5, 5: 12.1 }, lastSeasonRank: 16, currentSeasonAvg: 12.0 },
    { id: '42', name: 'Deep Metcalf', position: 'WR', team: 'PURPLE', weeklyScores: { 1: 6.5, 2: 22.1, 3: 5.2, 4: 18.9, 5: 7.8 }, lastSeasonRank: 22, currentSeasonAvg: 12.1 },
    { id: '43', name: 'Rookie Pickens', position: 'WR', team: 'GOLD', weeklyScores: { 1: 9.8, 2: 11.5, 3: 14.2, 4: 16.8, 5: 19.5 }, currentSeasonAvg: 14.3 },
    { id: '44', name: 'Vet Evans', position: 'WR', team: 'BLUE', weeklyScores: { 1: 16.2, 2: 14.8, 3: 15.5, 4: 13.2, 5: 14.1 }, lastSeasonRank: 9, currentSeasonAvg: 16.2 },
    { id: '45', name: 'Star Deebo', position: 'WR', team: 'COMETS', weeklyScores: { 1: 17.9, 2: 21.5, 3: 16.8, 4: 19.2, 5: 18.5 }, lastSeasonRank: 5, currentSeasonAvg: 17.9 },
    { id: '46', name: 'Slot Cooper', position: 'WR', team: 'NEON', weeklyScores: { 1: 11.5, 2: 13.2, 3: 12.8, 4: 14.5, 5: 13.1 }, lastSeasonRank: 20, currentSeasonAvg: 13.0 },
    { id: '47', name: 'Big Pittman', position: 'WR', team: 'ICE', weeklyScores: { 1: 14.1, 2: 9.8, 3: 15.6, 4: 12.5, 5: 11.2 }, lastSeasonRank: 13, currentSeasonAvg: 14.1 },
    { id: '48', name: 'Fast Moore', position: 'WR', team: 'STARS', weeklyScores: { 1: 18.9, 2: 15.2, 3: 21.5, 4: 17.8, 5: 19.6 }, lastSeasonRank: 10, currentSeasonAvg: 18.6 },
    { id: '143', name: 'Hands Lockett', position: 'WR', team: 'MIA', weeklyScores: { 1: 12.5, 2: 11.2, 3: 10.8, 4: 13.5, 5: 12.9 }, lastSeasonRank: 28, currentSeasonAvg: 12.1 },
    { id: '144', name: 'Speed McLaurin', position: 'WR', team: 'BUF', weeklyScores: { 1: 15.8, 2: 18.9, 3: 16.5, 4: 21.2, 5: 17.5 }, lastSeasonRank: 19, currentSeasonAvg: 17.9 },
    { id: '145', name: 'Route Smith', position: 'WR', team: 'CIN', weeklyScores: { 1: 14.2, 2: 15.8, 3: 13.5, 4: 16.2, 5: 14.9 }, lastSeasonRank: 24, currentSeasonAvg: 14.9 },
    { id: '146', name: 'Rookie Flowers', position: 'WR', team: 'LAR', weeklyScores: { 1: 5.2, 2: 8.9, 3: 12.5, 4: 14.8, 5: 16.2 }, currentSeasonAvg: 11.5 },
    { id: '147', name: 'Vet McClaurin', position: 'WR', team: 'MIN', weeklyScores: { 1: 18.5, 2: 16.2, 3: 19.8, 4: 15.5, 5: 17.2 }, lastSeasonRank: 17, currentSeasonAvg: 17.4 },
    { id: '148', name: 'Slot Keenan', position: 'WR', team: 'IND', weeklyScores: { 1: 9.8, 2: 11.2, 3: 10.5, 4: 8.9, 5: 12.4 }, lastSeasonRank: 35, currentSeasonAvg: 10.5 },
    { id: '149', name: 'Deep Watson', position: 'WR', team: 'GB', weeklyScores: { 1: 22.1, 2: 4.5, 3: 25.8, 4: 5.2, 5: 18.9 }, lastSeasonRank: 32, currentSeasonAvg: 15.3 },
    { id: '150', name: 'Big London', position: 'WR', team: 'ATL', weeklyScores: { 1: 13.5, 2: 12.1, 3: 14.8, 4: 11.5, 5: 13.2 }, lastSeasonRank: 29, currentSeasonAvg: 13.0 },
    { id: '151', name: 'Fast Godwin', position: 'WR', team: 'TB', weeklyScores: { 1: 16.8, 2: 19.2, 3: 15.5, 4: 18.1, 5: 17.5 }, lastSeasonRank: 21, currentSeasonAvg: 17.4 },
    { id: '152', name: 'Possession Aiyuk', position: 'WR', team: 'CAR', weeklyScores: { 1: 11.2, 2: 10.5, 3: 12.8, 4: 11.9, 5: 10.2 }, lastSeasonRank: 42, currentSeasonAvg: 11.3 },

    // QBs
    { id: '21', name: 'Cannon Mahomes', position: 'QB', team: 'STARS', weeklyScores: { 1: 28.4, 2: 24.1, 3: 31.5, 4: 26.8, 5: 29.2 }, lastSeasonRank: 1, currentSeasonAvg: 28.0 },
    { id: '22', name: 'Clutch Allen', position: 'QB', team: 'METEORS', weeklyScores: { 1: 22.5, 2: 25.8, 3: 21.2, 4: 27.1, 5: 24.6 }, lastSeasonRank: 3, currentSeasonAvg: 24.2 },
    { id: '23', name: 'Dual Hurts', position: 'QB', team: 'COMETS', weeklyScores: { 1: 26.1, 2: 29.5, 3: 24.8, 4: 28.2, 5: 27.4 }, lastSeasonRank: 2, currentSeasonAvg: 27.2 },
    { id: '24', name: 'Leader Burrow', position: 'QB', team: 'BLUE', weeklyScores: { 1: 18.5, 2: 21.2, 3: 19.8, 4: 22.5, 5: 20.9 }, lastSeasonRank: 5, currentSeasonAvg: 21.5 },
    { id: '25', name: 'Wonder Jackson', position: 'QB', team: 'RED', weeklyScores: { 1: 20.8, 2: 23.5, 3: 22.1, 4: 21.8, 5: 25.6 }, lastSeasonRank: 4, currentSeasonAvg: 22.8 },
    { id: '49', name: 'Vet Rodgers', position: 'QB', team: 'GOLD', weeklyScores: { 1: 15.6, 2: 18.2, 3: 16.5, 4: 17.8, 5: 19.1 }, lastSeasonRank: 7, currentSeasonAvg: 17.4 },
    { id: '50', name: 'Rookie Stroud', position: 'QB', team: 'NEON', weeklyScores: { 1: 14.2, 2: 12.8, 3: 18.5, 4: 22.1, 5: 24.5 }, currentSeasonAvg: 18.4 },
    { id: '51', name: 'Mobile Fields', position: 'QB', team: 'ICE', weeklyScores: { 1: 19.8, 2: 15.2, 3: 25.8, 4: 14.5, 5: 23.6 }, lastSeasonRank: 8, currentSeasonAvg: 19.8 },
    { id: '52', name: 'Pocket Herbert', position: 'QB', team: 'HEAT', weeklyScores: { 1: 20.5, 2: 18.9, 3: 21.2, 4: 19.8, 5: 22.1 }, lastSeasonRank: 6, currentSeasonAvg: 20.5 },
    { id: '53', name: 'System Purdy', position: 'QB', team: 'GHOSTS', weeklyScores: { 1: 16.5, 2: 14.8, 3: 15.2, 4: 16.9, 5: 15.5 }, lastSeasonRank: 10, currentSeasonAvg: 15.8 },
    { id: '153', name: 'Backup Tagovailoa', position: 'QB', team: 'NYJ', weeklyScores: { 1: 12.5, 2: 10.8, 3: 13.5, 4: 9.8, 5: 11.2 }, lastSeasonRank: 25, currentSeasonAvg: 11.5 },
    { id: '154', name: 'Bridge Goff', position: 'QB', team: 'DEN', weeklyScores: { 1: 13.8, 2: 15.2, 3: 12.9, 4: 14.5, 5: 13.6 }, lastSeasonRank: 28, currentSeasonAvg: 14.0 },
    { id: '155', name: 'Rookie Richardson', position: 'QB', team: 'LV', weeklyScores: { 1: 8.5, 2: 10.2, 3: 14.5, 4: 16.8, 5: 12.1 }, currentSeasonAvg: 12.4 },
    { id: '156', name: 'Vet Cousins', position: 'QB', team: 'ATL', weeklyScores: { 1: 17.5, 2: 19.2, 3: 16.8, 4: 18.5, 5: 15.2 }, lastSeasonRank: 12, currentSeasonAvg: 17.4 },
    { id: '157', name: 'Mobile Lawrence', position: 'QB', team: 'WSH', weeklyScores: { 1: 18.2, 2: 24.5, 3: 12.8, 4: 15.6, 5: 21.2 }, lastSeasonRank: 15, currentSeasonAvg: 18.4 },

    // TEs - with historical data
    { id: '26', name: 'Beast Kelce', position: 'TE', team: 'STARS', weeklyScores: { 1: 18.5, 2: 15.2, 3: 22.1, 4: 19.8, 5: 16.4 }, lastSeasonRank: 1, currentSeasonAvg: 18.4 },
    { id: '27', name: 'Project Andrews', position: 'TE', team: 'METEORS', weeklyScores: { 1: 8.2, 2: 12.5, 3: 15.8, 4: 10.1, 5: 14.2 }, lastSeasonRank: 6, currentSeasonAvg: 12.2 },
    { id: '28', name: 'Safety Hockenson', position: 'TE', team: 'GOLD', weeklyScores: { 1: 14.1, 2: 16.8, 3: 12.5, 4: 18.2, 5: 15.6 }, lastSeasonRank: 2, currentSeasonAvg: 15.4 },
    { id: '54', name: 'Block Kittle', position: 'TE', team: 'BLUE', weeklyScores: { 1: 8.5, 2: 9.2, 3: 9.8, 4: 10.1, 5: 9.4 }, lastSeasonRank: 8, currentSeasonAvg: 9.5 },
    { id: '55', name: 'Hands Goedert', position: 'TE', team: 'RED', weeklyScores: { 1: 11.2, 2: 14.5, 3: 9.8, 4: 13.1, 5: 12.4 }, lastSeasonRank: 4, currentSeasonAvg: 12.2 },
    { id: '56', name: 'Vert Pitts', position: 'TE', team: 'NEON', weeklyScores: { 1: 10.5, 2: 13.2, 3: 11.8, 4: 12.1, 5: 11.4 }, lastSeasonRank: 5, currentSeasonAvg: 11.8 },
    { id: '57', name: 'Rookie Mayer', position: 'TE', team: 'ICE', weeklyScores: { 1: 6.5, 2: 8.9, 3: 12.5, 4: 9.8, 5: 14.2 }, currentSeasonAvg: 10.4 },
    { id: '58', name: 'Vet Waller', position: 'TE', team: 'HEAT', weeklyScores: { 1: 12.5, 2: 14.2, 3: 13.5, 4: 12.9, 5: 14.5 }, lastSeasonRank: 3, currentSeasonAvg: 13.5 },
    { id: '59', name: 'Redzone Freiermuth', position: 'TE', team: 'GHOSTS', weeklyScores: { 1: 14.5, 2: 3.2, 3: 12.8, 4: 4.5, 5: 9.8 }, lastSeasonRank: 7, currentSeasonAvg: 8.9 },
    { id: '60', name: 'Move Njoku', position: 'TE', team: 'STEEL', weeklyScores: { 1: 7.5, 2: 9.8, 3: 8.5, 4: 9.2, 5: 10.1 }, lastSeasonRank: 9, currentSeasonAvg: 9.0 },
    { id: '158', name: 'Reliable McBride', position: 'TE', team: 'ARI', weeklyScores: { 1: 9.8, 2: 10.5, 3: 11.2, 4: 9.5, 5: 10.8 }, lastSeasonRank: 12, currentSeasonAvg: 10.4 },
    { id: '159', name: 'Catch LaPorta', position: 'TE', team: 'DET', weeklyScores: { 1: 13.5, 2: 14.8, 3: 11.2, 4: 12.5, 5: 13.9 }, lastSeasonRank: 10, currentSeasonAvg: 13.2 },
    { id: '160', name: 'Block Ferguson', position: 'TE', team: 'CLE', weeklyScores: { 1: 5.2, 2: 4.8, 3: 6.5, 4: 5.9, 5: 4.2 }, lastSeasonRank: 25, currentSeasonAvg: 5.3 },
    { id: '161', name: 'Rookie Kincaid', position: 'TE', team: 'TEN', weeklyScores: { 1: 2.5, 2: 5.8, 3: 8.9, 4: 11.2, 5: 9.5 }, currentSeasonAvg: 7.6 },
    { id: '162', name: 'Vet Engram', position: 'TE', team: 'HOU', weeklyScores: { 1: 8.5, 2: 9.2, 3: 8.9, 4: 7.5, 5: 8.1 }, lastSeasonRank: 18, currentSeasonAvg: 8.4 },

    // K - with historical data
    { id: '29', name: 'Leg Tucker', position: 'K', team: 'NEON', weeklyScores: { 1: 12.0, 2: 8.0, 3: 15.0, 4: 10.0, 5: 11.0 }, lastSeasonRank: 2, currentSeasonAvg: 11.2 },
    { id: '30', name: 'Clutch Butker', position: 'K', team: 'ICE', weeklyScores: { 1: 9.0, 2: 14.0, 3: 7.0, 4: 12.0, 5: 10.0 }, lastSeasonRank: 4, currentSeasonAvg: 10.4 },
    { id: '61', name: 'Auto Koo', position: 'K', team: 'STARS', weeklyScores: { 1: 11.0, 2: 13.0, 3: 10.0, 4: 14.0, 5: 12.0 }, lastSeasonRank: 1, currentSeasonAvg: 12.0 },
    { id: '62', name: 'Long McPherson', position: 'K', team: 'METEORS', weeklyScores: { 1: 10.0, 2: 9.0, 3: 11.0, 4: 8.0, 5: 10.5 }, lastSeasonRank: 5, currentSeasonAvg: 9.8 },
    { id: '63', name: 'Vet Myers', position: 'K', team: 'COMETS', weeklyScores: { 1: 9.0, 2: 11.0, 3: 10.0, 4: 12.0, 5: 10.5 }, lastSeasonRank: 3, currentSeasonAvg: 10.5 },
    { id: '64', name: 'Rookie Moody', position: 'K', team: 'BLUE', weeklyScores: { 1: 8.0, 2: 7.0, 3: 9.0, 4: 11.0, 5: 10.0 }, currentSeasonAvg: 9.0 },
    { id: '65', name: 'Dome Bass', position: 'K', team: 'RED', weeklyScores: { 1: 10.0, 2: 8.0, 3: 11.0, 4: 9.0, 5: 8.2 }, lastSeasonRank: 6, currentSeasonAvg: 9.2 },
    { id: '66', name: 'Snow Folk', position: 'K', team: 'GOLD', weeklyScores: { 1: 7.0, 2: 8.0, 3: 6.0, 4: 10.0, 5: 9.0 }, lastSeasonRank: 8, currentSeasonAvg: 8.0 },
    { id: '67', name: 'Accurate Pineiro', position: 'K', team: 'HEAT', weeklyScores: { 1: 10.0, 2: 11.0, 3: 9.0, 4: 13.0, 5: 10.0 }, lastSeasonRank: 7, currentSeasonAvg: 10.6 },
    { id: '68', name: 'Power Zuerlein', position: 'K', team: 'GHOSTS', weeklyScores: { 1: 9.0, 2: 12.0, 3: 8.0, 4: 11.0, 5: 9.0 }, lastSeasonRank: 10, currentSeasonAvg: 9.8 },
    { id: '163', name: 'Leg Elliott', position: 'K', team: 'PHI', weeklyScores: { 1: 12.0, 2: 10.0, 3: 11.0, 4: 9.0, 5: 10.5 }, lastSeasonRank: 12, currentSeasonAvg: 10.5 },
    { id: '164', name: 'Clutch Dicker', position: 'K', team: 'KC', weeklyScores: { 1: 11.0, 2: 13.0, 3: 10.0, 4: 12.0, 5: 11.5 }, lastSeasonRank: 9, currentSeasonAvg: 11.5 },

    // DST - with historical data
    { id: '31', name: 'Steel Curtain', position: 'DST', team: 'STEEL', weeklyScores: { 1: 14.0, 2: 8.0, 3: 18.0, 4: 6.0, 5: 12.0 }, lastSeasonRank: 1, currentSeasonAvg: 11.6 },
    { id: '32', name: 'Legion of Boom', position: 'DST', team: 'BOOM', weeklyScores: { 1: 10.0, 2: 16.0, 3: 5.0, 4: 14.0, 5: 9.0 }, lastSeasonRank: 3, currentSeasonAvg: 10.8 },
    { id: '33', name: 'Purple People', position: 'DST', team: 'PURPLE', weeklyScores: { 1: 8.0, 2: 12.0, 3: 15.0, 4: 7.0, 5: 11.0 }, lastSeasonRank: 4, currentSeasonAvg: 10.6 },
    { id: '69', name: 'Monsters', position: 'DST', team: 'CHI', weeklyScores: { 1: 16.0, 2: 4.0, 3: 12.0, 4: 10.0, 5: 8.0 }, lastSeasonRank: 2, currentSeasonAvg: 10.0 },
    { id: '70', name: 'No Fly Zone', position: 'DST', team: 'DEN', weeklyScores: { 1: 9.0, 2: 6.0, 3: 14.0, 4: 10.0, 5: 8.5 }, lastSeasonRank: 5, currentSeasonAvg: 9.5 },
    { id: '71', name: 'Sacksonville', position: 'DST', team: 'JAX', weeklyScores: { 1: 8.0, 2: 12.0, 3: 10.0, 4: 6.0, 5: 9.0 }, lastSeasonRank: 6, currentSeasonAvg: 9.0 },
    { id: '72', name: 'Doomsday', position: 'DST', team: 'DAL', weeklyScores: { 1: 12.0, 2: 5.0, 3: 8.0, 4: 14.0, 5: 7.0 }, lastSeasonRank: 8, currentSeasonAvg: 9.2 },
    { id: '73', name: 'Big Blue', position: 'DST', team: 'NYG', weeklyScores: { 1: 6.0, 2: 10.0, 3: 12.0, 4: 8.0, 5: 9.2 }, lastSeasonRank: 7, currentSeasonAvg: 9.0 },
    { id: '74', name: 'Fearsome', position: 'DST', team: 'LAR', weeklyScores: { 1: 9.0, 2: 8.0, 3: 6.0, 4: 12.0, 5: 7.0 }, lastSeasonRank: 9, currentSeasonAvg: 8.4 },
    { id: '75', name: 'Killer B', position: 'DST', team: 'BAL', weeklyScores: { 1: 11.0, 2: 9.0, 3: 14.0, 4: 8.0, 5: 10.0 }, lastSeasonRank: 10, currentSeasonAvg: 10.4 },
    { id: '165', name: 'Empire', position: 'DST', team: 'SF', weeklyScores: { 1: 14.0, 2: 8.0, 3: 12.0, 4: 10.0, 5: 11.0 }, lastSeasonRank: 11, currentSeasonAvg: 11.0 },
    { id: '166', name: 'Pats', position: 'DST', team: 'NE', weeklyScores: { 1: 12.0, 2: 10.0, 3: 9.0, 4: 13.0, 5: 8.0 }, lastSeasonRank: 12, currentSeasonAvg: 10.4 },
];

export const USERS: User[] = [
    {
        id: 'u1',
        username: 'fantasy_guru',
        avatar: 'bg-red-500',
        reputation: 92,
        reputationLastWeek: 85,
        reputationSeason: 94,
        reputationLastSeason: 88,
        leagueIds: ['l1', 'l2']
    },
    {
        id: 'u2',
        username: 'ball_knower_99',
        avatar: 'bg-blue-500',
        reputation: 88,
        reputationLastWeek: 95,
        reputationSeason: 82,
        reputationLastSeason: 91,
        leagueIds: ['l1']
    },
    {
        id: 'u3',
        username: 'casual_fan',
        avatar: 'bg-green-500',
        reputation: 45,
        reputationLastWeek: 30,
        reputationSeason: 48,
        reputationLastSeason: 52,
        leagueIds: ['l2']
    },
    {
        id: 'u4',
        username: 'stats_nerd',
        avatar: 'bg-purple-500',
        reputation: 76,
        reputationLastWeek: 70,
        reputationSeason: 78,
        reputationLastSeason: 82,
        leagueIds: ['l1']
    },
    {
        id: 'u5',
        username: 'draft_king_77',
        avatar: 'bg-amber-500',
        reputation: 88,
        reputationLastWeek: 90,
        reputationSeason: 85,
        reputationLastSeason: 89,
    },
    {
        id: 'u6',
        username: 'waiver_wizard',
        avatar: 'bg-teal-500',
        reputation: 91,
        reputationLastWeek: 94,
        reputationSeason: 89,
        reputationLastSeason: 90,
    },
    {
        id: 'u7',
        username: 'auto_pick_andy',
        avatar: 'bg-gray-500',
        reputation: 62,
        reputationLastWeek: 55,
        reputationSeason: 65,
        reputationLastSeason: 60,
    },
    {
        id: 'u8',
        username: 'touchdown_tommy',
        avatar: 'bg-indigo-500',
        reputation: 84,
        reputationLastWeek: 82,
        reputationSeason: 83,
        reputationLastSeason: 85,
    },
    {
        id: 'u9',
        username: 'sack_guru',
        avatar: 'bg-rose-500',
        reputation: 79,
        reputationLastWeek: 75,
        reputationSeason: 80,
        reputationLastSeason: 78,
    },
    {
        id: 'u10',
        username: 'kicker_whisperer',
        avatar: 'bg-lime-500',
        reputation: 85,
        reputationLastWeek: 88,
        reputationSeason: 84,
        reputationLastSeason: 82,
    },
    {
        id: 'u11',
        username: 'zero_rb_strat',
        avatar: 'bg-cyan-500',
        reputation: 81,
        reputationLastWeek: 85,
        reputationSeason: 79,
        reputationLastSeason: 83,
    },
    {
        id: 'u12',
        username: 'dynasty_dave',
        avatar: 'bg-emerald-600',
        reputation: 89,
        reputationLastWeek: 87,
        reputationSeason: 91,
        reputationLastSeason: 92,
    },
    {
        id: 'u13',
        username: 'sunday_scaries',
        avatar: 'bg-fuchsia-500',
        reputation: 73,
        reputationLastWeek: 70,
        reputationSeason: 75,
        reputationLastSeason: 72,
    },
    {
        id: 'u14',
        username: 'mr_unlimited',
        avatar: 'bg-sky-500',
        reputation: 68,
        reputationLastWeek: 72,
        reputationSeason: 66,
        reputationLastSeason: 69,
    },
];

export const LEAGUES: League[] = [
    {
        id: 'l1',
        name: 'The Foot Clan',
        avatar: 'bg-gradient-to-br from-orange-500 to-red-600',
        memberIds: ['u1', 'u2', 'u4']
    },
    {
        id: 'l2',
        name: 'Dynasty Degens',
        avatar: 'bg-gradient-to-br from-indigo-500 to-purple-600',
        memberIds: ['u1', 'u3']
    }
];

export const RANKINGS: RankingFile[] = [
    // User 1 - gridiron_guru (Season + Weekly)
    {
        id: 'r1-s',
        userId: 'u1',
        type: 'SEASONAL',
        rankings: {
            WR: ['2', '4', '3', '5', '7', '17', '16', '144', '145', '151', '147', '18', '149', '44', '9', '40', '148', '46', '41', '143', '47', '43', '10'],
            RB: ['1', '36', '6', '11', '8', '35', '12', '140', '15', '14', '38', '139', '19', '20', '39', '141', '138', '37', '142', '34'],
            QB: ['21', '23', '22', '24', '25', '52', '157', '51', '156', '53', '49', '154', '153', '155', '50'],
            TE: ['26', '28', '159', '58', '55', '27', '158', '56', '60', '59', '162', '54', '161', '160', '57'],
            K: ['61', '29', '163', '164', '67', '30', '63', '62', '65', '66', '68', '64'],
            DST: ['31', '32', '165', '166', '75', '33', '69', '73', '70', '72', '71', '74'],
        },
        scores: { WR: 94, RB: 91, QB: 88, TE: 85, K: 72, DST: 78 },
        lastUpdated: '2025-08-20T10:00:00Z',
    },
    {
        id: 'r1-w',
        userId: 'u1',
        type: 'WEEKLY',
        week: 1,
        rankings: {
            WR: ['13', '2', '4', '149', '7', '144', '3', '5', '48', '147', '18', '148', '17', '145', '16', '151', '44', '150', '46', '40'],
            RB: ['1', '36', '6', '15', '35', '11', '12', '139', '38', '140', '14', '8', '19', '138', '34', '141', '20', '142', '37', '39'],
            QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53', '154', '49', '155', '50', '153'],
            TE: ['26', '159', '55', '26', '58', '56', '27', '158', '60', '54', '162', '59', '57', '161', '160'],
            K: ['61', '164', '163', '29', '62', '30', '67', '63', '65', '66', '68', '64'],
            DST: ['31', '165', '32', '166', '75', '33', '69', '73', '70', '72', '71', '74'],
        },
        scores: { WR: 88, RB: 85, QB: 90, TE: 82, K: 75, DST: 80 },
        lastUpdated: '2025-09-04T08:00:00Z',
    },
    // User 2 - fantasy_pro22
    {
        id: 'r2-s',
        userId: 'u2',
        type: 'SEASONAL',
        rankings: {
            WR: ['4', '2', '3', '5', '144', '7', '17', '145', '16', '147', '44', '151', '9', '40', '148', '18', '149', '41', '46', '143'],
            RB: ['36', '1', '6', '11', '8', '12', '35', '140', '15', '38', '139', '14', '19', '39', '20', '141', '37', '142', '34', '138'],
            QB: ['23', '21', '22', '25', '24', '157', '52', '51', '53', '156', '49', '154', '50', '155', '153'],
            TE: ['26', '159', '28', '55', '58', '27', '158', '56', '59', '60', '54', '162', '57', '161', '160'],
            K: ['163', '61', '29', '164', '67', '30', '63', '62', '65', '66', '68', '64'],
            DST: ['165', '31', '32', '166', '75', '33', '69', '73', '70', '72', '71', '74'],
        },
        scores: { WR: 82, RB: 78, QB: 80, TE: 87, K: 85, DST: 82 },
        lastUpdated: '2025-08-21T14:30:00Z',
    },
    {
        id: 'r2-w',
        userId: 'u2',
        type: 'WEEKLY',
        week: 1,
        rankings: {
            WR: ['4', '13', '2', '149', '3', '144', '5', '7', '147', '48', '145', '17', '151', '16', '150', '44', '143', '146', '18', '40'],
            RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140', '8', '14', '141', '34', '19', '20', '39', '138', '37', '142'],
            TE: ['26', '55', '159', '26', '58', '56', '27', '59', '158', '54', '60', '57', '162', '161', '160'],
            QB: ['22', '21', '157', '23', '25', '24', '52', '51', '156', '53', '154', '49', '155', '50', '153'],
            K: ['61', '163', '29', '164', '65', '62', '67', '30', '63', '66', '68', '64'],
            DST: ['69', '31', '32', '165', '166', '75', '30', '70', '71', '73', '72', '74'],
        },
        scores: { WR: 95, RB: 80, TE: 90, QB: 85, K: 78, DST: 84 },
        lastUpdated: '2025-09-03T12:00:00Z',
    },
    // User 3-14 (populated overall rankings)
    { id: 'r3-s', userId: 'u3', type: 'SEASONAL', rankings: { WR: ['2', '4', '144', '3', '7', '5', '145', '16', '17', '151', '147', '44', '149', '9', '40', '13', '148', '18', '150', '43'], RB: ['1', '36', '6', '35', '11', '140', '12', '15', '8', '38', '139', '14', '19', '141', '20', '39', '34', '138', '37', '142'], QB: ['23', '21', '22', '157', '25', '24', '52', '51', '49', '156', '53', '154', '50', '153', '155'], TE: ['159', '26', '28', '58', '55', '27', '158', '56', '60', '59', '54', '162', '57', '161', '160'], K: ['61', '163', '164', '29', '62', '30', '67', '63', '65', '66', '68', '64'], DST: ['31', '32', '165', '166', '75', '33', '69', '73', '70', '72', '71', '74'] }, scores: { WR: 75, RB: 72, QB: 70, TE: 68, K: 48, DST: 70 }, lastUpdated: '2025-08-28T08:00:00Z' },
    { id: 'r3-w', userId: 'u3', type: 'WEEKLY', week: 1, rankings: { WR: ['13', '2', '4', '149', '7', '144', '3', '5', '48', '147'], RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140'], QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53'], TE: ['26', '159', '55', '26', '58', '56', '27', '158', '60', '54'], K: ['61', '163', '29', '164', '65', '62', '67', '30', '63', '66', '68', '64'], DST: ['31', '32', '165', '166', '75', '33', '69', '73', '70', '72', '71', '74'] }, scores: { WR: 80, RB: 78, QB: 82, TE: 75, K: 30, DST: 85 }, lastUpdated: '2025-09-05T14:00:00Z' },
    { id: 'r4-s', userId: 'u4', type: 'SEASONAL', rankings: { WR: ['4', '2', '3', '5', '144', '7', '17', '145', '16', '147'], RB: ['36', '1', '6', '11', '8', '12', '35', '140', '15', '38'], QB: ['23', '21', '22', '25', '24', '157', '52', '51', '53', '156'], TE: ['26', '159', '28', '55', '58', '27', '158', '56', '59', '60'], K: ['61', '163', '164', '29', '62', '30', '67', '63', '65', '66'], DST: ['31', '165', '32', '166', '75', '33', '69', '70', '73', '72', '71', '74'] }, scores: { WR: 82, RB: 80, QB: 78, TE: 85, K: 70, DST: 75 }, lastUpdated: '2025-08-20T12:00:00Z' },
    { id: 'r4-w', userId: 'u4', type: 'WEEKLY', week: 1, rankings: { WR: ['13', '149', '4', '2', '3', '5', '7', '144', '16', '147'], RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140'], QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53'], TE: ['26', '55', '159', '26', '58', '56', '27', '59', '158', '54'], K: ['61', '65', '163', '62', '29', '67', '30', '164', '63', '64'], DST: ['69', '31', '165', '32', '75', '166', '33', '70', '71', '73', '72', '74'] }, scores: { WR: 85, RB: 88, QB: 80, TE: 82, K: 75, DST: 81 }, lastUpdated: '2025-09-04T18:00:00Z' },
    { id: 'r5-s', userId: 'u5', type: 'SEASONAL', rankings: { WR: ['2', '4', '144', '3', '7', '5', '145', '17', '151', '16', '147', '9', '44', '149', '40', '18', '143', '148', '43', '10'], RB: ['1', '36', '6', '35', '11', '8', '140', '12', '15', '38', '14', '139', '19', '141', '39', '20', '34', '138', '142', '37'], QB: ['21', '23', '22', '24', '157', '25', '52', '51', '156', '53', '49', '154', '153', '50', '155'], TE: ['159', '26', '28', '58', '55', '27', '158', '56', '60', '59', '54', '162', '57', '161', '160'], K: ['61', '163', '29', '62', '30', '164', '67', '63', '65', '66'], DST: ['31', '32', '165', '166', '71', '69', '33', '75', '70', '74'] }, scores: { WR: 87, RB: 85, QB: 84, TE: 84, K: 80, DST: 82 }, lastUpdated: '2025-08-25T10:00:00Z' },
    { id: 'r5-w', userId: 'u5', type: 'WEEKLY', week: 1, rankings: { WR: ['13', '2', '4', '149', '7', '144', '3', '5', '48', '147'], RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140'], QB: ['23', '21', '22', '157', '25', '24', '52', '51', '156', '53', '154', '49', '155', '50', '153'], TE: ['26', '159', '55', '26', '58', '56', '27', '158', '60', '54'], K: ['61', '163', '29', '164', '65', '62', '67', '30', '63', '66'], DST: ['69', '31', '165', '32', '75', '166', '33', '70', '71', '73'] }, scores: { WR: 82, RB: 85, QB: 88, TE: 80, K: 78, DST: 84 }, lastUpdated: '2025-09-02T11:00:00Z' },
    { id: 'r6-s', userId: 'u6', type: 'SEASONAL', rankings: { WR: ['4', '144', '2', '3', '5', '17', '7', '145', '147', '16', '151', '18', '44', '149', '9', '40', '148', '143', '46', '41'], RB: ['1', '36', '6', '11', '8', '12', '35', '140', '15', '38'], QB: ['23', '21', '22', '25', '24', '157', '52', '51', '53', '156'], TE: ['26', '159', '28', '55', '58', '27', '158', '56', '59', '60'], K: ['61', '164', '29', '163', '30', '62', '67', '63', '65', '66'], DST: ['31', '165', '32', '166', '75', '33', '69', '70', '73', '72'] }, scores: { WR: 90, RB: 85, QB: 82, TE: 80, K: 75, DST: 78 }, lastUpdated: '2025-08-26T09:00:00Z' },
    { id: 'r6-w', userId: 'u6', type: 'WEEKLY', week: 1, rankings: { RB: ['36', '15', '1', '6', '14', '35', '11', '140', '38', '12', '139', '8', '19', '141', '34', '39', '20', '138', '142', '37'], WR: ['13', '149', '4', '2', '3', '5', '7', '144', '16', '147'], QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53'], TE: ['26', '55', '159', '26', '58', '56', '27', '59', '158', '54'], K: ['61', '65', '163', '62', '29', '67', '30', '164', '63', '64'], DST: ['69', '31', '165', '32', '75', '166', '33', '70', '71', '73'] }, scores: { RB: 93, WR: 88, QB: 85, TE: 82, K: 80, DST: 85 }, lastUpdated: '2025-09-05T08:00:00Z' },
    { id: 'r7-s', userId: 'u7', type: 'SEASONAL', rankings: { WR: ['2', '4', '144', '3', '7', '5', '145', '16', '17', '151', '147', '44', '149', '9', '40', '13', '148', '18', '150', '43'], RB: ['1', '6', '11', '8', '12', '14', '36', '15', '20', '19'], QB: ['21', '22', '23', '24', '25', '49', '50', '51', '52', '53'], TE: ['26', '27', '28', '54', '55', '56', '57', '58', '59', '60'], K: ['61', '164', '29', '163', '30', '62', '67', '63', '65', '66', '68', '64'], DST: ['31', '32', '33', '69', '70', '71', '72', '73', '74', '75'] }, scores: { WR: 65, RB: 70, QB: 75, TE: 68, K: 60, DST: 72 }, lastUpdated: '2025-08-22T15:00:00Z' },
    { id: 'r8-s', userId: 'u8', type: 'SEASONAL', rankings: { RB: ['1', '36', '6', '35', '11', '140', '12', '15', '8', '38', '139', '14', '19', '141', '20', '39', '34', '138', '37', '142'], QB: ['23', '21', '22', '157', '25', '24', '52', '51', '49', '156', '53', '154', '50', '153', '155'], WR: ['4', '2', '3', '5', '144', '7', '17', '145', '16', '147'], TE: ['26', '159', '28', '55', '58', '27', '158', '56', '59', '60'], K: ['61', '163', '164', '29', '62', '30', '67', '63', '65', '66'], DST: ['31', '165', '32', '166', '75', '33', '69', '70', '73', '72'] }, scores: { RB: 82, QB: 86, WR: 80, TE: 75, K: 78, DST: 82 }, lastUpdated: '2025-08-27T14:00:00Z' },
    { id: 'r9-s', userId: 'u9', type: 'SEASONAL', rankings: { DST: ['31', '32', '165', '166', '71', '69', '33', '75', '70', '74', '72', '73'], WR: ['2', '4', '144', '3', '7', '5', '145', '16', '17', '151'], RB: ['1', '36', '6', '35', '11', '140', '12', '15', '8', '38'], QB: ['23', '21', '22', '157', '25', '24', '52', '51', '49', '156'], TE: ['159', '26', '28', '58', '55', '27', '158', '56', '60', '59'], K: ['61', '163', '164', '29', '62', '30', '67', '63', '65', '66'] }, scores: { DST: 88, WR: 82, RB: 80, QB: 85, TE: 78, K: 75 }, lastUpdated: '2025-08-21T10:00:00Z' },
    { id: 'r9-w', userId: 'u9', type: 'WEEKLY', week: 1, rankings: { DST: ['71', '69', '32', '31', '165', '166', '75', '70', '33', '74', '72', '73'], WR: ['13', '149', '4', '2', '3', '5', '7', '144', '16', '147'], RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140'], QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53'], TE: ['26', '55', '159', '26', '58', '56', '27', '59', '158', '54'], K: ['61', '65', '163', '62', '29', '67', '30', '164', '63', '64'] }, scores: { DST: 92, WR: 85, RB: 88, QB: 80, TE: 82, K: 78 }, lastUpdated: '2025-09-04T16:00:00Z' },
    { id: 'r10-s', userId: 'u10', type: 'SEASONAL', rankings: { K: ['61', '163', '29', '62', '30', '164', '67', '63', '65', '66', '68', '64'], WR: ['4', '2', '3', '5', '144', '7', '17', '145', '16', '147'], RB: ['36', '1', '6', '11', '8', '12', '35', '140', '15', '38'], QB: ['23', '21', '22', '25', '24', '157', '52', '51', '53', '156'], TE: ['26', '159', '28', '55', '58', '27', '158', '56', '59', '60'], DST: ['31', '165', '32', '166', '75', '33', '69', '70', '73', '72'] }, scores: { K: 96, WR: 85, RB: 82, QB: 88, TE: 80, DST: 84 }, lastUpdated: '2025-08-29T11:00:00Z' },
    { id: 'r10-w', userId: 'u10', type: 'WEEKLY', week: 1, rankings: { K: ['61', '65', '163', '62', '29', '67', '30', '164', '63', '64', '68', '66'], WR: ['13', '149', '4', '2', '3', '5', '7', '144', '16', '147'], RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140'], QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53'], TE: ['26', '55', '159', '26', '58', '56', '27', '59', '158', '54'], DST: ['69', '31', '165', '32', '75', '166', '33', '70', '71', '73'] }, scores: { K: 98, WR: 90, RB: 88, QB: 85, TE: 82, DST: 85 }, lastUpdated: '2025-09-05T10:00:00Z' },
    { id: 'r11-s', userId: 'u11', type: 'SEASONAL', rankings: { RB: ['36', '35', '140', '15', '38', '139', '14', '39', '141', '138', '37', '19', '20', '34', '142', '12', '11', '8', '6', '1'], WR: ['2', '4', '144', '3', '7', '5', '145', '16', '17', '151'], QB: ['23', '21', '22', '157', '25', '24', '52', '51', '49', '156'], TE: ['159', '26', '28', '58', '55', '27', '158', '56', '60', '59'], K: ['61', '163', '164', '29', '62', '30', '67', '63', '65', '66'], DST: ['31', '32', '165', '166', '75', '33', '69', '73', '70', '72'] }, scores: { RB: 79, WR: 82, QB: 80, TE: 75, K: 78, DST: 82 }, lastUpdated: '2025-08-28T13:00:00Z' },
    { id: 'r11-w', userId: 'u11', type: 'WEEKLY', week: 1, rankings: { WR: ['13', '149', '4', '2', '3', '5', '7', '144', '16', '147', '151', '145', '17', '44', '150', '9', '40', '18', '148', '143'], RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140'], QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53'], TE: ['26', '55', '159', '26', '58', '56', '27', '59', '158', '54'], K: ['61', '163', '29', '164', '65', '62', '67', '30', '63', '64'], DST: ['69', '31', '165', '32', '75', '166', '33', '70', '71', '73'] }, scores: { WR: 83, RB: 85, QB: 80, TE: 82, K: 75, DST: 81 }, lastUpdated: '2025-09-03T09:00:00Z' },
    { id: 'r12-w', userId: 'u12', type: 'WEEKLY', week: 1, rankings: { WR: ['2', '13', '4', '7', '149', '3', '146', '16', '5', '144', '151', '43', '40', '147', '17', '150', '44', '21', '18', '145'], RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140'], QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53'], TE: ['26', '55', '159', '26', '58', '56', '27', '59', '158', '54'], K: ['61', '65', '163', '62', '29', '67', '30', '164', '63', '64'], DST: ['69', '31', '165', '32', '75', '166', '33', '70', '71', '73'] }, scores: { WR: 88, RB: 85, QB: 82, TE: 80, K: 78, DST: 84 }, lastUpdated: '2025-09-04T07:00:00Z' },
    { id: 'r13-w', userId: 'u13', type: 'WEEKLY', week: 1, rankings: { TE: ['159', '55', '26', '60', '28', '27', '58', '54', '56', '59', '162', '158', '161', '160', '57'], DST: ['69', '31', '32', '165', '166', '70', '33', '75', '71', '72', '74', '73'], WR: ['13', '149', '4', '2', '3', '5', '7', '144', '16', '147'], RB: ['36', '1', '15', '6', '11', '35', '12', '139', '38', '140'], QB: ['21', '23', '22', '25', '157', '52', '51', '24', '156', '53'], K: ['61', '65', '163', '62', '29', '67', '30', '164', '63', '64'] }, scores: { TE: 76, DST: 80, WR: 85, RB: 82, QB: 88, K: 75 }, lastUpdated: '2025-09-06T11:00:00Z' },
    { id: 'r14-s', userId: 'u14', type: 'SEASONAL', rankings: { QB: ['23', '51', '21', '22', '157', '50', '24', '155', '49', '53', '154', '156', '52', '25', '153'], WR: ['4', '2', '3', '5', '144', '7', '17', '145', '16', '147'], RB: ['36', '1', '6', '11', '8', '12', '35', '140', '15', '38'], TE: ['26', '159', '28', '55', '58', '27', '158', '56', '59', '60'], K: ['61', '163', '164', '29', '62', '30', '67', '63', '65', '66'], DST: ['31', '165', '32', '166', '75', '33', '69', '70', '73', '72'] }, scores: { QB: 72, WR: 80, RB: 75, TE: 85, K: 70, DST: 78 }, lastUpdated: '2025-08-23T16:00:00Z' },
];

// Helpers
export const getPlayer = (id: string) => PLAYERS.find(p => p.id === id);
export const getUser = (id: string) => USERS.find(u => u.id === id);
export const getRanking = (id: string) => RANKINGS.find(r => r.id === id);
export const getUserRankings = (userId: string) => RANKINGS.filter(r => r.userId === userId);
