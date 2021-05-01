import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';
import { Moment } from '../models/Moment';

export interface GlobalStore {
    dailyMomentStatus: {
        userMadeMomentToday: boolean;
        lastUpdatedAt: null | string;
    };
    moments: Moment[];
}

const globalStore = createState<GlobalStore>({
    dailyMomentStatus: {
        userMadeMomentToday: true,
        lastUpdatedAt: null,
    },
    moments: [],
});

globalStore.attach(Persistence('GratefulStorage'));

export default globalStore;
