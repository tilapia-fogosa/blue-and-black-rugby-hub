import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Athlete } from '@/integrations/supabase/types';
import { AthleteCard } from './AthleteCard';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DraftColumnProps {
    id: string;
    title: string;
    athletes: Athlete[];
    isPool?: boolean;
    maxCapacity?: number;
    className?: string; // Additional classes
    isCompact?: boolean;
    isDropDisabled?: boolean; // Prop to visually disable invalid drop targets
}

export const DraftColumn = ({
    id,
    title,
    athletes,
    isPool = false,
    maxCapacity,
    className,
    isCompact = false,
    isDropDisabled = false
}: DraftColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
        data: {
            type: 'Column',
            isPool,
            maxCapacity,
            accepts: isPool ? 'all' : (title.includes('Forwards') ? 'Forward' : 'Back'),
        },
        disabled: isDropDisabled,
    });

    const count = athletes.length;

    // Determine visual state
    const showDropZone = isOver && !isDropDisabled;

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "flex flex-col h-full w-full transition-all duration-200 relative",
                // Visual feedback for valid drop target hover
                showDropZone ? "bg-green-500/10 ring-2 ring-inset ring-green-500/50" : "",
                // Visual feedback for disabled state (when dragging incompatible item)
                isDropDisabled ? "opacity-30 grayscale" : "",
                className
            )}
        >
            {/* Overlay Message when hovering with valid item */}
            {showDropZone && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-green-500 shadow-2xl animate-pulse">
                        <span className="text-green-400 font-bold uppercase tracking-widest text-lg">
                            Soltar Aqui
                        </span>
                    </div>
                </div>
            )}

            {/* Title (Only shown if NOT compact mode, usually for debugging or specific layouts) */}
            {title && !isCompact && (
                <div className="p-2 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <span className="text-xs font-bold uppercase text-gray-400">{title}</span>
                    <span className="text-xs text-gray-500">{count}</span>
                </div>
            )}

            {/* Scroll Area MUST fill the container */}
            <ScrollArea className="flex-1 w-full h-full">
                <SortableContext items={athletes.map(a => a.id)} strategy={rectSortingStrategy}>
                    <div className={cn(
                        "grid gap-2 p-2 w-full min-h-full content-start", // content-start keeps items at top, min-h-full ensures clickability of empty space
                        isPool ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5"
                    )}>
                        {athletes.map((athlete, index) => (
                            <div key={athlete.id} className="min-w-0">
                                <AthleteCard athlete={athlete} index={index} />
                            </div>
                        ))}

                        {/* Empty State Placeholder - Only show if empty and enabled */}
                        {athletes.length === 0 && !isDropDisabled && (
                            <div className="col-span-full h-32 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-xs text-gray-500 gap-2 p-4 transition-colors hover:border-white/20 hover:text-gray-400 group">
                                <span className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity">+</span>
                                <span className="uppercase tracking-wider font-semibold opacity-50">
                                    {isPool ? 'Pool Vazia' : 'Arraste Jogadores'}
                                </span>
                            </div>
                        )}

                        {/* Invisible spacer to ensure drop zone height if needed */}
                        <div className="col-span-full h-10 w-full" />
                    </div>
                </SortableContext>
            </ScrollArea>
        </div>
    );
};
