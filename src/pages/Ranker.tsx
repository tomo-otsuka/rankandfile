import { useState, useEffect } from 'react';
import { Reorder, AnimatePresence } from 'framer-motion';
import { GripVertical, Save, RefreshCw } from 'lucide-react';
import { PLAYERS, Player } from '../services/mockData';
import { cn } from '../lib/utils';

export default function Ranker() {
    const [position, setPosition] = useState<'WR' | 'RB' | 'QB'>('WR');
    const [items, setItems] = useState<Player[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    // Load initial players for the position
    useEffect(() => {
        const playersForPosition = PLAYERS.filter(p => p.position === position);
        setItems(playersForPosition);
    }, [position]);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">The File</h2>
                    <p className="text-muted-foreground">Drag and drop to rank your top {position}s.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-secondary/50 p-1 rounded-lg backdrop-blur-sm">
                        {['QB', 'RB', 'WR'].map((pos) => (
                            <button
                                key={pos}
                                onClick={() => setPosition(pos as any)}
                                className={cn(
                                    "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                                    position === pos
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Save File'}
                    </button>
                </div>
            </div>

            <div className="bg-card/20 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden p-1">
                <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-1">
                    <AnimatePresence>
                        {items.map((item, index) => (
                            <Reorder.Item
                                key={item.id}
                                value={item}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileDrag={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.5)" }}
                                className="relative flex items-center gap-4 p-3 rounded-lg bg-card/40 border border-white/5 hover:bg-card/60 transition-colors cursor-grab active:cursor-grabbing select-none"
                            >
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 font-mono text-sm font-bold text-muted-foreground">
                                    {index + 1}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between">
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <span className="text-xs font-mono text-muted-foreground">{item.team}</span>
                                    </div>
                                </div>

                                <div className="p-2 text-muted-foreground hover:text-white transition-colors">
                                    <GripVertical className="w-5 h-5" />
                                </div>
                            </Reorder.Item>
                        ))}
                    </AnimatePresence>
                </Reorder.Group>
            </div>

            {items.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No players found for this position in mock data.
                </div>
            )}
        </div>
    );
}
