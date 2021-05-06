import { State } from '@hookstate/core';
import { PeriodKind } from '../components/MomentDropdown';
import { GlobalStore } from '../stores/global';

const setStateBasedOnPeriodKind = (periodKind: PeriodKind, itemNotActive: boolean, globalStore: State<GlobalStore>) => {
    if (itemNotActive) {
        switch (periodKind) {
            case 'year':
                globalStore.currentOpenMonthId.set(null);
                globalStore.currentOpenWeekId.set(null);
                globalStore.currentOpenDayId.set(null);
                break;
            case 'month':
                globalStore.currentOpenWeekId.set(null);
                globalStore.currentOpenDayId.set(null);
                break;
            case 'week':
                globalStore.currentOpenDayId.set(null);
                break;
        }
    } else {
        switch (periodKind) {
            case 'year':
                globalStore.currentOpenYearId.set(null);
                globalStore.currentOpenMonthId.set(null);
                globalStore.currentOpenWeekId.set(null);
                globalStore.currentOpenDayId.set(null);
                break;
            case 'month':
                globalStore.currentOpenMonthId.set(null);
                globalStore.currentOpenWeekId.set(null);
                globalStore.currentOpenDayId.set(null);
                break;
            case 'week':
                globalStore.currentOpenWeekId.set(null);
                globalStore.currentOpenDayId.set(null);
                break;
            case 'day':
                globalStore.currentOpenDayId.set(null);
                break;
        }
    }

    globalStore.currentOpenMomentId.set(null);
};

export { setStateBasedOnPeriodKind };
