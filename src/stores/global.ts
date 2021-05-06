import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { Moment } from '../models/Moment';

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
    currentOpenYearId: null,
    currentOpenMonthId: null,
    currentOpenWeekId: null,
    currentOpenDayId: null,
    locale: 'fr',
});

globalStore.attach(Persistence('GratefulStorage'));

export default globalStore;
