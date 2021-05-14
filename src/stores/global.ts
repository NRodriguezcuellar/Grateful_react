import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { Moment } from '../models/Moment';
import { DateTime } from 'luxon';
import { concatenateAndParse } from '../helpers/general';

export interface GlobalStore {
    dailyMomentStatus: {
        userMadeMomentToday: boolean;
        lastUpdatedAt: null | string;
    };
    moments: Moment[];
    currentOpenMomentId: MomentDropdownState;
    currentOpenYearId: MomentDropdownState;
    currentOpenMonthId: MomentDropdownState;
    currentOpenWeekId: MomentDropdownState;
    currentOpenDayId: MomentDropdownState;
    locale: string;
}

export type MomentDropdownState = number | null;

const globalStore = createState<GlobalStore>({
    dailyMomentStatus: {
        userMadeMomentToday: true,
        lastUpdatedAt: null,
    },
    moments: [],
    currentOpenMomentId: null,
    currentOpenYearId: DateTime.local().year,
    currentOpenMonthId: concatenateAndParse(DateTime.local().month, DateTime.local().year),
    currentOpenWeekId: concatenateAndParse(DateTime.local().weekNumber, DateTime.local().year),
    currentOpenDayId: null,
    locale: 'nl',
});

export default globalStore;
