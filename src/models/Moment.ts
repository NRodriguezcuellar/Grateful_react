interface Moment {
    id: number;
    description: string;
    labels: string[];
    moodScale: number;
    gratefulItems: string[];
    createdAt: string;
    updatedAt: string;
}

interface MomentWithDateData extends Moment {
    day: number;
    week: number;
    month: number;
    year: number;
}

type AggregatedMonth = { year: number; month: number; weeks: AggregatedWeek[] };
type AggregatedWeek = { year: number; month: number; week: number; days: AggregatedDay[] };
type AggregatedDay = { year: number; month: number; week: number; day: number; moments: MomentWithDateData[] };

interface AggregatedMoment {
    year: number;
    months: AggregatedMonth[];
}

export type { Moment, MomentWithDateData, AggregatedMoment, AggregatedDay, AggregatedWeek, AggregatedMonth };
