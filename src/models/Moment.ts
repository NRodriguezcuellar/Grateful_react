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

type AggregatedMonth = { month: number; weeks: AggregatedWeek[] };
type AggregatedWeek = { week: number; days: AggregatedDay[] };
type AggregatedDay = { day: number; moments: MomentWithDateData[] };

interface AggregatedWeekWithYear extends AggregatedWeek {
    year: number;
    month: number;
}
interface AggregatedMonthWithYear extends AggregatedMonth {
    year: number;
}

interface AggregatedMoment {
    year: number;
    months: AggregatedMonth[];
}

export type {
    Moment,
    MomentWithDateData,
    AggregatedMoment,
    AggregatedDay,
    AggregatedWeek,
    AggregatedMonth,
    AggregatedWeekWithYear,
    AggregatedMonthWithYear,
};
