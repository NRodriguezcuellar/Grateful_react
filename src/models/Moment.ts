interface Moment {
    id: number;
    title: string;
    description: string;
    labels: string[];
    moodScale: number;
    gratefulItems: string[];
    createdAt: string;
    updatedAt: string;
}

export type { Moment };
