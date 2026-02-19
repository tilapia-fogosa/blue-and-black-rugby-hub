import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Athlete } from '@/integrations/supabase/types';
import { User } from 'lucide-react';

interface AthleteCardProps {
    athlete: Athlete;
    index: number;
}

export const AthleteCard = ({ athlete }: AthleteCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: athlete.id,
        data: {
            type: 'Athlete',
            athlete,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 50 : 'auto',
    };

    const isForward = ['Pilar', 'Hooker', 'Segunda Linha', 'Asa', 'Oitavo'].includes(athlete.position);

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none relative group h-full">
            <Card className={`relative overflow-hidden border w-full aspect-[3/4] transition-all duration-200
                ${isDragging ? 'border-rugby-red scale-110 shadow-2xl z-50 ring-2 ring-rugby-red/50' : 'border-white/10 hover:border-rugby-red/50 hover:scale-105'}
                bg-gray-900 shadow-md cursor-grab active:cursor-grabbing rounded-md`}>

                {/* Background Image */}
                <div className="absolute inset-0 bg-gray-800">
                    {athlete.athlete_photo_url ? (
                        <img
                            src={athlete.athlete_photo_url}
                            alt={athlete.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 ${athlete.athlete_photo_url ? 'hidden' : ''}`}>
                        <User className="w-8 h-8 text-gray-500 opacity-50" />
                    </div>
                </div>

                {/* Top Badge (Compact) */}
                <div className="absolute top-1 left-1">
                    <Badge className={`${isForward ? 'bg-orange-600' : 'bg-blue-600'} text-white border-0 text-[8px] font-bold px-1 py-0 h-4 shadow-sm`}>
                        {athlete.position.substring(0, 3).toUpperCase()}
                    </Badge>
                </div>

                {/* Bottom Name (Gradient Overlay) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-6 pb-1 px-1 text-center">
                    <p className="text-white font-bold text-[10px] leading-tight truncate uppercase tracking-tight">
                        {athlete.name}
                    </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 pointer-events-none transition-colors" />
            </Card>
        </div>
    );
};
