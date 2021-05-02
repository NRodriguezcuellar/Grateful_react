import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { Moment } from '../models/Moment';

export interface GlobalStore {
    dailyMomentStatus: {
        userMadeMomentToday: boolean;
        lastUpdatedAt: null | string;
    };
    moments: Moment[];
    currentTabItemOpen: number | null;
}

const globalStore = createState<GlobalStore>({
    dailyMomentStatus: {
        userMadeMomentToday: true,
        lastUpdatedAt: null,
    },
    moments: [],
    currentTabItemOpen: null,
});

globalStore.attach(Persistence('GratefulStorage'));

export default globalStore;
