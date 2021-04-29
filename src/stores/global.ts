import { createState } from '@hookstate/core';
import { Persistence } from '@hookstate/persistence';

interface GlobalStore {
    dailyMomentStatus: {
        userMadeMomentToday: boolean;
        lastUpdatedAt: null | string;
    };
}

const globalStore = createState<GlobalStore>({
    dailyMomentStatus: {
        userMadeMomentToday: true,
        lastUpdatedAt: null,
    },
});

globalStore.attach(Persistence('GratefulStore'));

export default globalStore;
