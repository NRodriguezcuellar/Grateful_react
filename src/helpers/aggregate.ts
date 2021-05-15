import { AggregatedMoment, AggregatedMonth, AggregatedWeek, Moment, MomentWithDateData } from '../models/Moment';
import { DateTime } from 'luxon';
import { PeriodKind } from '../components/MomentDropdown';

const transformMoment = (moment: Moment): MomentWithDateData => {
    const { day, month, year, weekNumber } = DateTime.fromISO(moment.createdAt);

    return { day: day, month: month, year: year, week: weekNumber, ...moment };
};

const timePeriodAmounts = (timePeriod: PeriodKind, moments: MomentWithDateData[], timeValue: number) => {
    const amountOfUnits: number[] = [];
    const possibleTimeUnits: PeriodKind[] = ['year', 'month', 'week', 'day'];
    const timeUnitToCheck = possibleTimeUnits[possibleTimeUnits.indexOf(timePeriod) + 1];

    moments.forEach(
        (moment) =>
            !amountOfUnits.includes(moment[timeUnitToCheck]) &&
            moment[timePeriod] === timeValue &&
            amountOfUnits.push(moment[timeUnitToCheck]),
    );
    return amountOfUnits.sort();
};

const aggregateMomentsByYear = (moments: Moment[]) => {
    const allMoments = moments.map(transformMoment);
    const allYears: number[] = [];

    allMoments.forEach((moment) => {
        if (!allYears.includes(moment.year)) {
            allYears.push(moment.year);
        }
    });

    const getAllDaysForTheWeek = (year: number, month: number, week: number, moments: MomentWithDateData[]) => {
        const allDays: number[] = timePeriodAmounts('week', moments, week);

        return allDays.map((day) => ({
            year: year,
            month: month,
            week: week,
            day: day,
            moments: moments
                .filter((moment) => moment.week === week && moment.day === day)
                .sort((a, b) => DateTime.fromISO(b.createdAt).toMillis() - DateTime.fromISO(a.createdAt).toMillis()),
        }));
    };

    const getAllWeeksForTheMonth = (year: number, month: number, moments: MomentWithDateData[]) => {
        const allWeeks: number[] = timePeriodAmounts('month', moments, month);

        return allWeeks.map((week) => ({
            year: year,
            month: month,
            week: week,
            days: getAllDaysForTheWeek(
                year,
                month,
                week,
                moments.filter((moment) => moment.month === month),
            ),
        }));
    };

    const getAllMonthsForTheYear = (year: number, moments: MomentWithDateData[]) => {
        const allMonths: number[] = timePeriodAmounts('year', moments, year);

        return allMonths.map((month) => ({
            year: year,
            month: month,
            weeks: getAllWeeksForTheMonth(
                year,
                month,
                moments.filter((moment) => moment.year === year),
            ),
        }));
    };

    const nestedMoments = allYears
        .map((year) => {
            return {
                year: year,
                months: getAllMonthsForTheYear(year, allMoments),
            };
        })
        .sort((a, b) => b.year - a.year);

    return nestedMoments;
};

const aggregateMomentsbyWeek = (aggregatedMoments: AggregatedMoment[]) => {
    const allWeeks: AggregatedWeek[] = [];

    aggregatedMoments.forEach((year) => {
        year.months.forEach((month) =>
            month.weeks.forEach((week) => allWeeks.push({ ...week, year: year.year, month: month.month })),
        );
    });

    return sortWeeks(allWeeks);
};

const aggregateMomentsByMonths = (aggregatedMoments: AggregatedMoment[]) => {
    const allMonths: AggregatedMonth[] = [];
    aggregatedMoments.forEach((year) => {
        year.months.forEach((month) => {
            sortWeeks(month.weeks);
            allMonths.push(month);
        });
    });
    return allMonths.sort(
        (a, b) =>
            DateTime.fromObject({ year: b.year, month: b.month }).toSeconds() -
            DateTime.fromObject({ year: a.year, month: a.month }).toSeconds(),
    );
};

const sortWeeks = (weeks: AggregatedWeek[]) =>
    weeks.sort(
        (a, b) =>
            DateTime.fromObject({ weekYear: b.year, weekNumber: b.week }).toSeconds() -
            DateTime.fromObject({ weekYear: a.year, weekNumber: a.week }).toSeconds(),
    );

export class MomentAggregator {
    constructor(public moments: Moment[]) {}

    byYear() {
        return aggregateMomentsByYear(this.moments);
    }

    byMonth() {
        return aggregateMomentsByMonths(this.byYear());
    }

    byWeek() {
        return aggregateMomentsbyWeek(this.byYear());
    }
}

export { aggregateMomentsByYear, transformMoment };
