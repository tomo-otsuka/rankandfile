import { Reorder, AnimatePresence } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Player } from '../../services/mockData';

interface RankerListProps {
    items: Player[];
    handleReorder: (items: Player[]) => void;
    isViewMode: boolean;
}

export function RankerList({ items, handleReorder, isViewMode }: RankerListProps) {
    return (
        <div className="glass-morphism-premium rounded-2xl overflow-hidden p-2">
            <Reorder.Group
                axis="y"
                values={items}
                onReorder={handleReorder}
                className="space-y-2"
            >
                <AnimatePresence>
                    {items.map((item, index) => (
                        <Reorder.Item
                            key={item.id}
                            value={item}
                            dragListener={!isViewMode} // Disable drag in view mode
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileDrag={{
                                scale: 1.03,
                                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                                backgroundColor: "rgba(255,255,255,0.08)"
                            }}
                            className={cn(
                                "relative flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 transition-colors select-none group",
                                !isViewMode && "hover:bg-white/10 cursor-grab active:cursor-grabbing"
                            )}
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 font-mono text-sm font-bold text-primary/60 ring-1 ring-primary/20">
                                {index + 1}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors italic uppercase tracking-tighter">{item.name}</h3>
                                    <span className="text-xs font-mono font-medium text-white/40 uppercase tracking-widest">{item.team}</span>
                                </div>
                            </div>

                            {!isViewMode && (
                                <div className="p-2 text-white/20 group-hover:text-white/60 transition-colors">
                                    <GripVertical className="w-5 h-5" />
                                </div>
                            )}
                        </Reorder.Item>
                    ))}
                </AnimatePresence>
            </Reorder.Group>

            {items.length === 0 && (
                <div className="text-center py-20 text-muted-foreground italic">
                    No players found for this position in mock data.
                </div>
            )}
        </div>
    );
}
