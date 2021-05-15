import { createState } from '@hookstate/core';
import { Moment } from '../models/Moment';
import { DateTime } from 'luxon';
import { concatenateAndParse } from '../helpers/general';

export interface GlobalStore {
    moments: Moment[];
    currentOpenMomentId: MomentDropdownState;
    currentOpenYearId: MomentDropdownState;
    currentOpenMonthId: MomentDropdownState;
    currentOpenWeekId: MomentDropdownState;
    currentOpenDayId: MomentDropdownState;
}

export type MomentDropdownState = number | null;

const globalStore = createState<GlobalStore>({
    moments: [],
    currentOpenMomentId: null,
    currentOpenYearId: DateTime.local().year,
    currentOpenMonthId: concatenateAndParse(DateTime.local().month, DateTime.local().year),
    currentOpenWeekId: concatenateAndParse(DateTime.local().weekNumber, DateTime.local().year),
    currentOpenDayId: concatenateAndParse(DateTime.local().weekNumber, DateTime.local().year, DateTime.local().day),
});

export default globalStore;
