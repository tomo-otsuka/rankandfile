import { useState } from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RANKINGS, USERS, getPlayer } from '../services/mockData';

export default function Compare() {
    const [selectedRivalId, setSelectedRivalId] = useState<string>(RANKINGS[1].id);

    // Mock "My File" (using the first mock ranking as "Min")
    const myFile = RANKINGS[0];
    const rivalFile = RANKINGS.find(r => r.id === selectedRivalId) || RANKINGS[1];

    const getRank = (playerId: string, list: string[]) => list.indexOf(playerId);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Compare Files</h2>
                    <p className="text-muted-foreground">See where you differ from the consensus.</p>
                </div>
                <Link to="/dashboard" className="text-sm font-medium hover:underline">
                    Back to Leaderboard
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-8">
                {/* Left Column: My File */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            ME
                        </div>
                        <div>
                            <h3 className="font-bold">My {myFile.position} Rankings</h3>
                            <p className="text-sm text-muted-foreground">Updated {new Date(myFile.lastUpdated).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {myFile.playerIds.map((playerId, index) => {
                            const player = getPlayer(playerId);
                            const rivalRank = getRank(playerId, rivalFile.playerIds);
                            const diff = rivalRank === -1 ? null : rivalRank - index;

                            return (
                                <div key={playerId} className="flex items-center justify-between p-3 rounded-md border border-white/5 bg-card/50">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-muted-foreground w-6">{index + 1}</span>
                                        <span className="font-medium">{player?.name}</span>
                                        <span className="text-xs text-muted-foreground">{player?.team}</span>
                                    </div>

                                    {diff !== null && diff !== 0 && (
                                        <div className={`text-xs font-bold px-2 py-0.5 rounded ${diff > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {diff > 0 ? `+${diff} vs Rival` : `${diff} vs Rival`}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column: Rival File */}
                <div className="space-y-4">
                    {/* Rival Selector */}
                    <div className="p-4 bg-secondary/10 rounded-lg border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-muted-foreground" />
                            <select
                                className="bg-transparent border-none focus:ring-0 font-bold text-foreground"
                                value={selectedRivalId}
                                onChange={(e) => setSelectedRivalId(e.target.value)}
                            >
                                {RANKINGS.filter(r => r.id !== myFile.id && r.position === myFile.position).map(r => {
                                    const u = USERS.find(user => user.id === r.userId);
                                    return <option key={r.id} value={r.id} className="bg-background">{u?.username} ({r.title})</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2 opacity-80">
                        {rivalFile.playerIds.map((playerId, index) => {
                            const player = getPlayer(playerId);
                            return (
                                <div key={playerId} className="flex items-center justify-between p-3 rounded-md border border-white/5 bg-card/30">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-muted-foreground w-6">{index + 1}</span>
                                        <span className="font-medium">{player?.name}</span>
                                        <span className="text-xs text-muted-foreground">{player?.team}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
