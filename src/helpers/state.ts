import { State } from '@hookstate/core';
import { PeriodKind } from '../components/MomentDropdown';
import { MomentDropdownState } from '../stores/global';

const setStateBasedOnPeriodKind = (
    periodKind: PeriodKind,
    itemNotActive: boolean,
    periodStates: Record<string, State<MomentDropdownState>>,
) => {
    if (itemNotActive) {
        switch (periodKind) {
            case 'year':
                periodStates.month.set(null);
                periodStates.week.set(null);
                periodStates.day.set(null);
                break;
            case 'month':
                periodStates.week.set(null);
                periodStates.day.set(null);
                break;
            case 'week':
                periodStates.day.set(null);
                break;
        }
    } else {
        switch (periodKind) {
            case 'year':
                periodStates.year.set(null);
                periodStates.month.set(null);
                periodStates.week.set(null);
                periodStates.day.set(null);
                break;
            case 'month':
                periodStates.month.set(null);
                periodStates.week.set(null);
                periodStates.day.set(null);
                break;
            case 'week':
                periodStates.week.set(null);
                periodStates.day.set(null);
                break;
            case 'day':
                periodStates.day.set(null);
                break;
        }
    }
};

export { setStateBasedOnPeriodKind };
