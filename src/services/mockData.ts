export interface Player {
    id: string;
    name: string;
    position: 'WR' | 'RB' | 'QB' | 'TE' | 'K' | 'DST';
    team: string;
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

export interface RankingFile {
    id: string;
    userId: string;
    position: 'WR' | 'RB' | 'QB' | 'TE' | 'K' | 'DST';
    type: 'SEASONAL' | 'WEEKLY';
    playerIds: string[]; // Ordered list
    lastUpdated: string;
    title: string;
    score: number;
}

export interface LeaderboardEntry {
    id: string; // Ranking ID or User ID (for overall)
    userId: string;
    score: number;
    position?: string; // 'WR', 'RB', etc., or undefined for Overall
    rankingId?: string; // Optional reference to specific ranking file
}

// Mock Database
export const PLAYERS: Player[] = [
    // RBs
    { id: '1', name: 'Elite RB 1', position: 'RB', team: 'STARS' },
    { id: '6', name: 'Power RB 2', position: 'RB', team: 'COMETS' },
    { id: '8', name: 'Junior RB 3', position: 'RB', team: 'BLUE' },
    { id: '11', name: 'Speed RB 4', position: 'RB', team: 'GOLD' },
    { id: '12', name: 'Physical RB 5', position: 'RB', team: 'GOLD' },
    { id: '14', name: 'Scat RB 6', position: 'RB', team: 'NEON' },
    { id: '15', name: 'Goal RB 7', position: 'RB', team: 'ICE' },
    { id: '19', name: 'Sway RB 8', position: 'RB', team: 'GHOSTS' },
    { id: '20', name: 'Shift RB 9', position: 'RB', team: 'GHOSTS' },
    { id: '34', name: 'Rookie RB 10', position: 'RB', team: 'METEORS' },
    { id: '35', name: 'Vet RB 11', position: 'RB', team: 'RED' },
    { id: '36', name: 'Workhorse RB 12', position: 'RB', team: 'STEEL' },
    { id: '37', name: 'Committee RB 13', position: 'RB', team: 'BOOM' },
    { id: '38', name: 'Pass RB 14', position: 'RB', team: 'PURPLE' },
    { id: '39', name: 'Goal RB 15', position: 'RB', team: 'STARS' },

    // WRs
    { id: '2', name: 'Speedy WR 1', position: 'WR', team: 'STARS' },
    { id: '3', name: 'Reliable WR 2', position: 'WR', team: 'METEORS' },
    { id: '4', name: 'Agile WR 3', position: 'WR', team: 'METEORS' },
    { id: '5', name: 'Strong WR 4', position: 'WR', team: 'COMETS' },
    { id: '7', name: 'Route WR 5', position: 'WR', team: 'BLUE' },
    { id: '9', name: 'Veteran WR 6', position: 'WR', team: 'RED' },
    { id: '10', name: 'Rookie WR 7', position: 'WR', team: 'RED' },
    { id: '13', name: 'Flash WR 8', position: 'WR', team: 'NEON' },
    { id: '16', name: 'Talent WR 9', position: 'WR', team: 'ICE' },
    { id: '17', name: 'Smooth WR 10', position: 'WR', team: 'HEAT' },
    { id: '18', name: 'Deep WR 11', position: 'WR', team: 'HEAT' },
    { id: '40', name: 'Slot WR 12', position: 'WR', team: 'STEEL' },
    { id: '41', name: 'Possession WR 13', position: 'WR', team: 'BOOM' },
    { id: '42', name: 'Deep WR 14', position: 'WR', team: 'PURPLE' },
    { id: '43', name: 'Rookie WR 15', position: 'WR', team: 'GOLD' },
    { id: '44', name: 'Vet WR 16', position: 'WR', team: 'BLUE' },
    { id: '45', name: 'Star WR 17', position: 'WR', team: 'COMETS' },
    { id: '46', name: 'Slot WR 18', position: 'WR', team: 'NEON' },
    { id: '47', name: 'Big WR 19', position: 'WR', team: 'ICE' },
    { id: '48', name: 'Fast WR 20', position: 'WR', team: 'STARS' },

    // QBs
    { id: '21', name: 'Cannon QB 1', position: 'QB', team: 'STARS' },
    { id: '22', name: 'Clutch QB 2', position: 'QB', team: 'METEORS' },
    { id: '23', name: 'Dual QB 3', position: 'QB', team: 'COMETS' },
    { id: '24', name: 'Leader QB 4', position: 'QB', team: 'BLUE' },
    { id: '25', name: 'Wonder QB 5', position: 'QB', team: 'RED' },
    { id: '49', name: 'Vet QB 6', position: 'QB', team: 'GOLD' },
    { id: '50', name: 'Rookie QB 7', position: 'QB', team: 'NEON' },
    { id: '51', name: 'Mobile QB 8', position: 'QB', team: 'ICE' },
    { id: '52', name: 'Pocket QB 9', position: 'QB', team: 'HEAT' },
    { id: '53', name: 'System QB 10', position: 'QB', team: 'GHOSTS' },

    // TEs
    { id: '26', name: 'Beast TE 1', position: 'TE', team: 'STARS' },
    { id: '27', name: 'Project TE 2', position: 'TE', team: 'METEORS' },
    { id: '28', name: 'Safety TE 3', position: 'TE', team: 'GOLD' },
    { id: '54', name: 'Block TE 4', position: 'TE', team: 'BLUE' },
    { id: '55', name: 'Hands TE 5', position: 'TE', team: 'RED' },
    { id: '56', name: 'Vert TE 6', position: 'TE', team: 'NEON' },
    { id: '57', name: 'Rookie TE 7', position: 'TE', team: 'ICE' },
    { id: '58', name: 'Vet TE 8', position: 'TE', team: 'HEAT' },
    { id: '59', name: 'Redzone TE 9', position: 'TE', team: 'GHOSTS' },
    { id: '60', name: 'Move TE 10', position: 'TE', team: 'STEEL' },

    // K
    { id: '29', name: 'Leg K 1', position: 'K', team: 'NEON' },
    { id: '30', name: 'Clutch K 2', position: 'K', team: 'ICE' },
    { id: '61', name: 'Auto K 3', position: 'K', team: 'STARS' },
    { id: '62', name: 'Long K 4', position: 'K', team: 'METEORS' },
    { id: '63', name: 'Vet K 5', position: 'K', team: 'COMETS' },
    { id: '64', name: 'Rookie K 6', position: 'K', team: 'BLUE' },
    { id: '65', name: 'Dome K 7', position: 'K', team: 'RED' },
    { id: '66', name: 'Snow K 8', position: 'K', team: 'GOLD' },
    { id: '67', name: 'Accurate K 9', position: 'K', team: 'HEAT' },
    { id: '68', name: 'Power K 10', position: 'K', team: 'GHOSTS' },

    // DST
    { id: '31', name: 'Steel Curtain', position: 'DST', team: 'STEEL' },
    { id: '32', name: 'Legion of Boom', position: 'DST', team: 'BOOM' },
    { id: '33', name: 'Purple People', position: 'DST', team: 'PURPLE' },
    { id: '69', name: 'Monsters', position: 'DST', team: 'CHI' },
    { id: '70', name: 'No Fly Zone', position: 'DST', team: 'DEN' },
    { id: '71', name: 'Sacksonville', position: 'DST', team: 'JAX' },
    { id: '72', name: 'Doomsday', position: 'DST', team: 'DAL' },
    { id: '73', name: 'Big Blue', position: 'DST', team: 'NYG' },
    { id: '74', name: 'Fearsome', position: 'DST', team: 'LAR' },
    { id: '75', name: 'Killer B', position: 'DST', team: 'BAL' },
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
    // WRs
    {
        id: 'f1',
        userId: 'u1',
        position: 'WR',
        type: 'SEASONAL',
        title: 'Top 50 WRs (PPR)',
        lastUpdated: '2025-08-20T10:00:00Z',
        playerIds: ['4', '2', '3', '5', '7', '43', '40', '13', '16', '17'],
        score: 94,
    },
    {
        id: 'f1-w',
        userId: 'u1',
        position: 'WR',
        type: 'WEEKLY',
        title: 'Week 1 WR Locks',
        lastUpdated: '2025-09-04T08:00:00Z',
        playerIds: ['2', '4', '7', '3', '5', '16', '17', '43', '40', '13'],
        score: 88,
    },
    {
        id: 'f2',
        userId: 'u2',
        position: 'WR',
        type: 'SEASONAL',
        title: 'My Season WRs',
        lastUpdated: '2025-08-21T14:30:00Z',
        playerIds: ['2', '4', '5', '3', '7', '43', '13', '40', '16', '18'],
        score: 82,
    },
    {
        id: 'f2-w',
        userId: 'u2',
        position: 'WR',
        type: 'WEEKLY',
        title: 'Week 1 Winners',
        lastUpdated: '2025-09-03T12:00:00Z',
        playerIds: ['4', '2', '5', '13', '3', '7', '18', '16', '43', '40'],
        score: 95,
    },

    // RBs
    {
        id: 'f3',
        userId: 'u1',
        position: 'RB',
        type: 'SEASONAL',
        title: 'RB Bellcows',
        lastUpdated: '2025-08-20T10:05:00Z',
        playerIds: ['1', '6', '8', '11', '12', '14', '15', '19', '20', '36'],
        score: 91,
    },
    {
        id: 'f3-w',
        userId: 'u1',
        position: 'RB',
        type: 'WEEKLY',
        title: 'Week 1 RB Plays',
        lastUpdated: '2025-09-05T09:00:00Z',
        playerIds: ['6', '1', '11', '8', '36', '15', '12', '14', '19', '20'],
        score: 85,
    },
    {
        id: 'f4',
        userId: 'u4',
        position: 'RB',
        type: 'SEASONAL',
        title: 'Pure Stats RBs',
        lastUpdated: '2025-08-22T11:00:00Z',
        playerIds: ['11', '1', '6', '12', '8', '14', '36', '37', '38', '39'],
        score: 78,
    },
    {
        id: 'f4-w',
        userId: 'u4',
        position: 'RB',
        type: 'WEEKLY',
        title: 'Stats Week 1',
        lastUpdated: '2025-09-04T16:00:00Z',
        playerIds: ['1', '11', '6', '36', '12', '8', '37', '38', '39', '14'],
        score: 70,
    },

    // QBs
    {
        id: 'f5',
        userId: 'u2',
        position: 'QB',
        type: 'SEASONAL',
        title: 'Elite Signal Callers',
        lastUpdated: '2025-08-19T09:00:00Z',
        playerIds: ['21', '23', '22', '49', '24', '51', '25', '50', '52', '53'],
        score: 89,
    },
    {
        id: 'f5-w',
        userId: 'u2',
        position: 'QB',
        type: 'WEEKLY',
        title: 'Week 1 QB Tiers',
        lastUpdated: '2025-09-02T10:00:00Z',
        playerIds: ['23', '21', '51', '22', '24', '49', '25', '50', '53', '52'],
        score: 92,
    },

    // TEs
    {
        id: 'f6',
        userId: 'u1',
        position: 'TE',
        type: 'SEASONAL',
        title: 'Safety Blanket TEs',
        lastUpdated: '2025-08-25T15:00:00Z',
        playerIds: ['26', '28', '27', '55', '54', '59', '60', '58', '56', '57'],
        score: 87,
    },
    {
        id: 'f7',
        userId: 'u2',
        position: 'TE',
        type: 'WEEKLY',
        title: 'Week 1 Streamers',
        lastUpdated: '2025-09-06T11:00:00Z',
        playerIds: ['28', '26', '55', '27', '60', '54', '59', '56', '58', '57'],
        score: 90,
    },

    // K
    {
        id: 'f8',
        userId: 'u3',
        position: 'K',
        type: 'SEASONAL',
        title: 'The Leg Club',
        lastUpdated: '2025-08-28T08:00:00Z',
        playerIds: ['61', '29', '62', '30', '63', '67', '68', '64', '65', '66'],
        score: 48,
    },
    {
        id: 'f9',
        userId: 'u3',
        position: 'K',
        type: 'WEEKLY',
        title: 'Dome Specials Week 1',
        lastUpdated: '2025-09-05T14:00:00Z',
        playerIds: ['65', '61', '62', '29', '67', '30', '68', '63', '64', '66'],
        score: 30,
    },

    // DST
    {
        id: 'f10',
        userId: 'u4',
        position: 'DST',
        type: 'SEASONAL',
        title: 'Shutout Units',
        lastUpdated: '2025-08-20T12:00:00Z',
        playerIds: ['31', '32', '75', '33', '69', '70', '72', '71', '73', '74'],
        score: 75,
    },
    {
        id: 'f11',
        userId: 'u4',
        position: 'DST',
        type: 'WEEKLY',
        title: 'Best Week 1 Defense',
        lastUpdated: '2025-09-04T18:00:00Z',
        playerIds: ['32', '69', '31', '75', '70', '33', '71', '72', '74', '73'],
        score: 81,
    },

    // --- EXPANDED DATA ---

    // More WRs
    {
        id: 'x1', userId: 'u5', position: 'WR', type: 'SEASONAL', title: 'DK WR Rankings',
        lastUpdated: '2025-08-25', playerIds: ['2', '4', '7', '3', '5', '16', '13', '40', '17', '43'], score: 87
    },
    {
        id: 'x2', userId: 'u6', position: 'WR', type: 'SEASONAL', title: 'Waiver Wire Gold',
        lastUpdated: '2025-08-26', playerIds: ['4', '2', '5', '3', '7', '18', '16', '40', '13', '43'], score: 90
    },
    {
        id: 'x3', userId: 'u7', position: 'WR', type: 'SEASONAL', title: 'Auto Picks',
        lastUpdated: '2025-08-22', playerIds: ['2', '4', '3', '5', '7', '13', '16', '17', '40', '43'], score: 65
    },
    {
        id: 'x4', userId: 'u11', position: 'WR', type: 'WEEKLY', title: 'Week 1 WRs',
        lastUpdated: '2025-09-03', playerIds: ['4', '2', '3', '5', '7', '16', '13', '40', '17', '18'], score: 83
    },
    {
        id: 'x5', userId: 'u12', position: 'WR', type: 'WEEKLY', title: 'Dynasty WRs W1',
        lastUpdated: '2025-09-04', playerIds: ['2', '4', '7', '3', '16', '5', '13', '43', '40', '17'], score: 88
    },

    // More RBs
    {
        id: 'x6', userId: 'u5', position: 'RB', type: 'SEASONAL', title: 'DK RB Rankings',
        lastUpdated: '2025-08-25', playerIds: ['1', '6', '11', '8', '12', '14', '36', '15', '20', '19'], score: 85
    },
    {
        id: 'x7', userId: 'u8', position: 'RB', type: 'SEASONAL', title: 'Touchdown RBs',
        lastUpdated: '2025-08-27', playerIds: ['6', '1', '12', '11', '15', '36', '8', '14', '37', '20'], score: 82
    },
    {
        id: 'x8', userId: 'u11', position: 'RB', type: 'SEASONAL', title: 'Zero RB Candidates',
        lastUpdated: '2025-08-28', playerIds: ['14', '15', '20', '19', '39', '37', '38', '12', '36', '8'], score: 79
    },
    {
        id: 'x9', userId: 'u6', position: 'RB', type: 'WEEKLY', title: 'Week 1 RB Sleepers',
        lastUpdated: '2025-09-05', playerIds: ['11', '14', '15', '8', '37', '1', '6', '12', '36', '20'], score: 93
    },

    // More QBs
    {
        id: 'x10', userId: 'u8', position: 'QB', type: 'SEASONAL', title: 'QB TD Machines',
        lastUpdated: '2025-08-24', playerIds: ['21', '23', '49', '22', '24', '51', '25', '50', '52', '53'], score: 86
    },
    {
        id: 'x11', userId: 'u14', position: 'QB', type: 'SEASONAL', title: 'Unlimited Potential',
        lastUpdated: '2025-08-23', playerIds: ['23', '51', '21', '22', '50', '24', '49', '53', '52', '25'], score: 72
    },
    {
        id: 'x12', userId: 'u5', position: 'QB', type: 'WEEKLY', title: 'Week 1 QBs',
        lastUpdated: '2025-09-02', playerIds: ['22', '21', '23', '24', '49', '51', '50', '25', '52', '53'], score: 88
    },

    // More TEs
    {
        id: 'x13', userId: 'u5', position: 'TE', type: 'SEASONAL', title: 'DK TE Rankings',
        lastUpdated: '2025-08-25', playerIds: ['26', '28', '27', '55', '54', '60', '59', '56', '58', '57'], score: 84
    },
    {
        id: 'x14', userId: 'u13', position: 'TE', type: 'WEEKLY', title: 'Sunday TE Streams',
        lastUpdated: '2025-09-06', playerIds: ['55', '26', '60', '28', '27', '54', '56', '59', '58', '57'], score: 76
    },

    // More Kickers (because why not)
    {
        id: 'x15', userId: 'u10', position: 'K', type: 'SEASONAL', title: 'Golden Boots',
        lastUpdated: '2025-08-29', playerIds: ['61', '62', '29', '30', '67', '63', '65', '64', '66', '68'], score: 96
    },
    {
        id: 'x16', userId: 'u10', position: 'K', type: 'WEEKLY', title: 'Week 1 Legs',
        lastUpdated: '2025-09-05', playerIds: ['61', '65', '62', '29', '67', '30', '63', '64', '68', '66'], score: 98
    },
    {
        id: 'x17', userId: 'u7', position: 'K', type: 'SEASONAL', title: 'Kicker Picks',
        lastUpdated: '2025-08-22', playerIds: ['29', '30', '61', '62', '63', '64', '65', '66', '67', '68'], score: 60
    },

    // More DSTs
    {
        id: 'x18', userId: 'u9', position: 'DST', type: 'SEASONAL', title: 'Sack City',
        lastUpdated: '2025-08-21', playerIds: ['31', '32', '71', '69', '33', '75', '70', '74', '72', '73'], score: 88
    },
    {
        id: 'x19', userId: 'u9', position: 'DST', type: 'WEEKLY', title: 'Week 1 Defenses',
        lastUpdated: '2025-09-04', playerIds: ['71', '32', '31', '69', '75', '70', '33', '74', '72', '73'], score: 92
    },
    {
        id: 'x20', userId: 'u13', position: 'DST', type: 'WEEKLY', title: 'Safe DST Plays',
        lastUpdated: '2025-09-04', playerIds: ['31', '32', '69', '70', '33', '75', '71', '72', '74', '73'], score: 80
    },
];

// Helpers
export const getPlayer = (id: string) => PLAYERS.find(p => p.id === id);
export const getUser = (id: string) => USERS.find(u => u.id === id);
