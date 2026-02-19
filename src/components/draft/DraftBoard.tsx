import { useState, useEffect } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
    DropAnimation
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { DraftColumn } from './DraftColumn';
import { AthleteCard } from './AthleteCard';
import { Athlete } from '@/integrations/supabase/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, Shield, Zap } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface DraftBoardProps {
    categoryFilter: string; // 'Masc', 'Feminino', 'Juvenil Masc'
}

type DraftState = {
    pool: Athlete[];
    teams: {
        [key: string]: {
            forwards: Athlete[];
            backs: Athlete[];
        };
    };
};

// Configuration for teams per category
const TEAMS_CONFIG: Record<string, string[]> = {
    'Masc': ['Sucuaranas', 'Gralhas', 'Panema', 'Jararacas'],
    'Feminino': ['Harpias', 'Guarás', 'Jaguatiricas'],
    'Juvenil Masc': ['Quatis', 'Queixadas', 'Tatus']
};

export const DraftBoard = ({ categoryFilter }: DraftBoardProps) => {
    // Determine current teams based on filter
    const currentTeams = TEAMS_CONFIG[categoryFilter] || [];
    const isSplitCategory = categoryFilter === 'Masc';

    const [items, setItems] = useState<DraftState>({
        pool: [],
        teams: currentTeams.reduce((acc, team) => ({
            ...acc,
            [team]: { forwards: [], backs: [] }
        }), {})
    });

    // Reset items structure when category changes
    useEffect(() => {
        setItems({
            pool: [],
            teams: (TEAMS_CONFIG[categoryFilter] || []).reduce((acc, team) => ({
                ...acc,
                [team]: { forwards: [], backs: [] }
            }), {})
        });
    }, [categoryFilter]);

    const [viewType, setViewType] = useState<'Forwards' | 'Backs'>('Forwards');
    const [activeId, setActiveId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const fetchAthletes = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('athlete_registrations')
                .select('*')
                .eq('category', categoryFilter)
                .neq('status', 'rejected');

            if (error) {
                console.error('Error fetching athletes:', error);
                toast({ title: 'Erro ao carregar atletas', variant: 'destructive' });
                return;
            }

            const pool: Athlete[] = [];
            const activeTeamNames = TEAMS_CONFIG[categoryFilter] || [];

            // Initialize teams structure
            const teams: any = {};
            activeTeamNames.forEach(t => {
                teams[t] = { forwards: [], backs: [] };
            });

            const forwardsPositions = ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'];

            (data as any[]).forEach((ath: any) => {
                // Determine group: If split category (Masc), use DB or calc. If not, everything is 'Forward' (Bucket for All)
                let group = ath.draft_position_group;

                if (isSplitCategory) {
                    group = group || (forwardsPositions.includes(ath.preferred_position) ? 'Forward' : 'Back');
                } else {
                    group = 'Forward'; // Unified view uses 'forwards' array as main storage
                }

                const team = ath.draft_team || 'Pool';

                const athlete: Athlete = {
                    ...ath,
                    draft_position_group: group,
                    draft_team: team,
                    position: ath.preferred_position,
                    active: ath.status === 'approved' || ath.status === 'pending',
                };

                if (team === 'Pool' || !activeTeamNames.includes(team)) {
                    pool.push(athlete);
                } else {
                    if (teams[team]) {
                        // If unified, everything goes to 'forwards' bucket
                        if (group === 'Forward') {
                            teams[team].forwards.push(athlete);
                        } else {
                            teams[team].backs.push(athlete);
                        }
                    } else {
                        pool.push(athlete);
                    }
                }
            });

            setItems({ pool, teams });
            setLoading(false);
        };

        fetchAthletes();
    }, [categoryFilter, isSplitCategory]);

    const findContainer = (id: string): string | undefined => {
        if (items.pool.find(a => a.id === id)) return 'pool';

        // Use currentTeams from scope
        for (const teamName of currentTeams) {
            if (items.teams[teamName]?.forwards.find(a => a.id === id)) return `${teamName}-forwards`;
            if (items.teams[teamName]?.backs.find(a => a.id === id)) return `${teamName}-backs`;
        }
    };

    const findAthleteById = (id: string) => {
        const p = items.pool.find(a => a.id === id);
        if (p) return p;

        for (const team of currentTeams) {
            const f = items.teams[team]?.forwards.find(a => a.id === id);
            if (f) return f;
            const b = items.teams[team]?.backs.find(a => a.id === id);
            if (b) return b;
        }
        return null;
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeIdStr = active.id as string;
        const overIdStr = over.id as string;

        const activeContainer = findContainer(activeIdStr);
        let targetContainer = overIdStr;

        // --- ROBUST CONTAINER DETECTION ---
        const isContainerId = (id: string) => {
            return id === 'pool' || currentTeams.some(team => id === `${team}-forwards` || id === `${team}-backs`);
        };

        // If dropped on an item (UUID) or something that isn't a known container ID
        if (!isContainerId(targetContainer)) {
            const container = findContainer(overIdStr);
            if (container) targetContainer = container;
            else return; // Invalid drop target
        }

        if (!activeContainer || !targetContainer || activeContainer === targetContainer) {
            return;
        }

        const athlete = findAthleteById(activeIdStr);
        if (!athlete) return;

        // Validation Rules
        if (targetContainer !== 'pool' && isSplitCategory) {
            // ONLY check strict position rules if isSplitCategory (Masc)

            const isForward = ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'].includes(athlete.position);
            const intendedGroup = isForward ? 'Forward' : 'Back';
            const lastDashIndex = targetContainer.lastIndexOf('-');
            if (lastDashIndex === -1) return;

            const teamName = targetContainer.substring(0, lastDashIndex);
            const group = targetContainer.substring(lastDashIndex + 1); // 'forwards' or 'backs'

            if (intendedGroup === 'Forward' && group === 'backs') {
                toast({ title: 'Posição Inválida', description: 'Forwards só podem ir para slots de Forwards.', variant: 'destructive' });
                return;
            }
            if (intendedGroup === 'Back' && group === 'forwards') {
                toast({ title: 'Posição Inválida', description: 'Backs só podem ir para slots de Backs.', variant: 'destructive' });
                return;
            }

            // Check Capacity (10 per group in Masc)
            if (!items.teams[teamName]) {
                console.error('Team not found:', teamName);
                return;
            }
            const currentCount = (items.teams[teamName] as any)[group].length;
            if (currentCount >= 10) {
                toast({ title: 'Time Cheio', description: `Máximo de 10 jogadores atingido para esta posição.`, variant: 'destructive' });
                return;
            }
        }
        else if (targetContainer !== 'pool' && !isSplitCategory) {
            // Unified View Validations (if any)
            // Just check total capacity maybe? Let's say 25.
            const lastDashIndex = targetContainer.lastIndexOf('-');
            const teamName = targetContainer.substring(0, lastDashIndex);
            if (!items.teams[teamName]) {
                console.error('Team not found:', teamName);
                return;
            }

            const currentCount = items.teams[teamName].forwards.length + items.teams[teamName].backs.length;
            if (currentCount >= 25) {
                toast({ title: 'Time Cheio', description: `Máximo de 25 jogadores por time.`, variant: 'destructive' });
                return;
            }
        }

        // Apply Move
        const newItems = JSON.parse(JSON.stringify(items));
        let movedAthlete = null;

        // Remove from source
        if (activeContainer === 'pool') {
            const index = newItems.pool.findIndex((a: Athlete) => a.id === activeIdStr);
            if (index > -1) {
                movedAthlete = newItems.pool[index];
                newItems.pool.splice(index, 1);
            }
        } else {
            // Parse active container
            const lastDashIndex = activeContainer.lastIndexOf('-');
            const team = activeContainer.substring(0, lastDashIndex);
            const group = activeContainer.substring(lastDashIndex + 1);

            if (newItems.teams[team]) {
                const list = (newItems.teams[team] as any)[group];
                const index = list.findIndex((a: Athlete) => a.id === activeIdStr);
                if (index > -1) {
                    movedAthlete = list[index];
                    list.splice(index, 1);
                }
            }
        }

        if (!movedAthlete) return;

        // Add to target
        if (targetContainer === 'pool') {
            movedAthlete.draft_team = 'Pool';
            newItems.pool.push(movedAthlete);
            updateAthleteDraftStatus(movedAthlete.id, 'Pool', movedAthlete.draft_position_group);
        } else {
            const lastDashIndex = targetContainer.lastIndexOf('-');
            const team = targetContainer.substring(0, lastDashIndex);
            let group = targetContainer.substring(lastDashIndex + 1);

            // If NOT split category, force group to 'forwards' (Unified Bucket)
            if (!isSplitCategory) {
                group = 'forwards';
            }

            const dbGroup = group === 'forwards' ? 'Forward' : 'Back';
            movedAthlete.draft_team = team;
            movedAthlete.draft_position_group = dbGroup;

            if (newItems.teams[team]) {
                (newItems.teams[team] as any)[group].push(movedAthlete);
                updateAthleteDraftStatus(movedAthlete.id, team, dbGroup);
            }
        }

        setItems(newItems);
    };

    const updateAthleteDraftStatus = async (id: string, team: string, group: string | null) => {
        await supabase
            .from('athlete_registrations')
            .update({
                draft_team: team,
                draft_position_group: group
            })
            .eq('id', id);
    };

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: '0.5' } },
        }),
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-rugby-red w-8 h-8" /></div>;

    const dragAthlete = activeId ? findAthleteById(activeId) : null;

    // Filter Pool based on selected View Type (Forwards or Backs)
    const isForwardView = viewType === 'Forwards';
    const filteredPool = items.pool.filter(a => {
        const isForward = ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'].includes(a.position);
        return isForwardView ? isForward : !isForward;
    });

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-full gap-4 overflow-hidden pt-2">

                {/* SIDEBAR POOL */}
                <div className="w-64 flex-shrink-0 flex flex-col h-full bg-gray-900/50 rounded-lg border border-white/10 overflow-hidden">
                    <div className="p-3 border-b border-white/10 bg-black/20">
                        <h3 className="text-white font-bold text-sm uppercase flex items-center gap-2">
                            Pool - {viewType}
                            <span className="ml-auto bg-white/10 text-xs px-1.5 py-0.5 rounded text-gray-400">{filteredPool.length}</span>
                        </h3>
                    </div>
                    <div className="flex-1 overflow-hidden p-2">
                        <DraftColumn
                            id="pool"
                            title=""
                            athletes={filteredPool}
                            isPool={true}
                            className="h-full border-none bg-transparent"
                            isCompact={true}
                        />
                    </div>
                </div>

                {/* MAIN CONTENT Area */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">

                    {/* View Switcher Tabs */}
                    <div className="flex justify-center">
                        <Tabs value={viewType} onValueChange={(v) => setViewType(v as any)} className="w-[300px]">
                            <TabsList className="grid w-full grid-cols-2 bg-rugby-black border border-white/10">
                                <TabsTrigger value="Forwards" className="data-[state=active]:bg-orange-700 data-[state=active]:text-white transition-colors">
                                    <Shield className="w-4 h-4 mr-2" /> Forwards
                                </TabsTrigger>
                                <TabsTrigger value="Backs" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white transition-colors">
                                    <Zap className="w-4 h-4 mr-2" /> Backs
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* DYNAMIC GRID Layout */}
                    {/* 
                      Switch grid cols based on number of teams? 
                      2x2 is good for 4 teams. 
                      Feminino has 3 teams -> maybe 3 cols or 2x2 with one empty?
                      Juvenil has 3 teams -> same.
                      Let's stick to a responsive grid that fits them.
                    */}
                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 flex-1 h-full min-h-0 content-start">
                        {currentTeams.map((team, index) => {
                            // Get relevant list based on viewType
                            const list = isForwardView ? items.teams[team]?.forwards : items.teams[team]?.backs;

                            // Safety check
                            if (!list) return null;

                            const colId = isForwardView ? `${team}-forwards` : `${team}-backs`;

                            // Color coding per team or position
                            const bgColor = isForwardView ? 'bg-orange-900/10 border-orange-500/20' : 'bg-blue-900/10 border-blue-500/20';

                            // Determine if this column is a valid drop target
                            const isDropTarget = dragAthlete && (
                                isForwardView
                                    ? ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'].includes(dragAthlete.position)
                                    : !['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'].includes(dragAthlete.position)
                            );

                            return (
                                <div key={team} className={`rounded-lg border flex flex-col overflow-hidden relative transition-colors duration-300 min-h-[300px]
                                    ${bgColor}
                                    ${isDropTarget && dragAthlete ? 'ring-2 ring-green-500/70 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : ''}
                                `}>
                                    {/* Team Header - WITH POINTER-EVENTS-NONE */}
                                    <div className="absolute top-0 inset-x-0 p-2 text-center bg-black/40 backdrop-blur-sm border-b border-white/5 z-10 pointer-events-none">
                                        <h3 className="font-bold text-white text-lg tracking-wider drop-shadow-md">{team}</h3>
                                    </div>

                                    {/* Content */}
                                    {/* Ensure full height container for DraftColumn */}
                                    <div className="flex-1 pt-12 p-2 overflow-hidden h-full flex flex-col">
                                        <DraftColumn
                                            id={colId}
                                            title={viewType}
                                            athletes={list}
                                            maxCapacity={10}
                                            className={cn(
                                                "flex-1 border-dashed border-white/10 bg-transparent min-h-0 w-full h-full",
                                                !dragAthlete ? "hover:border-white/20" : ""
                                            )}
                                            isCompact={true}
                                            isDropDisabled={!!dragAthlete && !isDropTarget}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {createPortal(
                <DragOverlay dropAnimation={dropAnimation}>
                    {dragAthlete ? <AthleteCard athlete={dragAthlete} index={0} /> : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
};
