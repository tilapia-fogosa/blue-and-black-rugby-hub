export type Event = {
    id: string;
    title: string;
    date: string;
    time: string | null;
    location: string;
    type: string;
    opponent: string | null;
    description: string | null;
    created_at: string;
};

export type Gallery = {
    id: string;
    title: string;
    description: string | null;
    event_id: string | null;
    category: string;
    cover_image_url: string | null;
    created_at: string;
};

export type GalleryImage = {
    id: string;
    gallery_id: string;
    image_url: string;
    alt_text: string | null;
    created_at: string;
};

export type Athlete = {
    id: string;
    name: string;
    position: string;
    achievements: string | null;
    years: string | null;
    description: string | null;
    photo_url: string | null;
    active: boolean;
    created_at: string;
};

export type Sponsor = {
    id: string;
    name: string;
    category: string;
    logo_url: string | null;
    website_url: string | null;
    tier: string | null;
    created_at: string;
};

export type HistoryMilestone = {
    id: string;
    year: string;
    title: string;
    description: string;
    created_at: string;
};
