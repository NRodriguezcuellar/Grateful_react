import { State, none } from '@hookstate/core';
import { GlobalStore } from '../stores/global';
import { Moment } from '../models/Moment';
import { DateTime } from 'luxon';

const labelHandler = (momentState: State<Moment>, label: string) => {
    if (!label) return;

    const labelAlreadyExists = momentState.labels
        .get()
        .find((savedLabel) => savedLabel.toLowerCase() === label.toLowerCase());
    if (labelAlreadyExists) return;

    momentState.labels.set([...momentState.labels.get(), label]);
};
const pushNewMoment = (moment: State<Moment>, store: State<GlobalStore>) => {
    const greatestIdInStore = Math.max(...store.moments.get().map((moment) => moment.id));
    const currentTime = DateTime.local().toISO();
    moment.merge({
        id: greatestIdInStore + 1,
        createdAt: currentTime,
        updatedAt: currentTime,
    });
    store.moments.merge([{ ...moment.get() }]);
};

const momentCleanUp = (momentState: State<Moment>) =>
    momentState.set({
        id: 0,
        title: '',
        description: '',
        labels: [],
        moodScale: 0,
        createdAt: '',
        updatedAt: '',
        gratefulItems: [],
    });

const momentHandler = (store: State<GlobalStore>, moment: State<Moment>, routeCallBack: any) => {
    pushNewMoment(moment, store);
    momentCleanUp(moment);
    routeCallBack();
};

const skipHandler = (store: State<GlobalStore>, routeCallBack: any) => {
    store.dailyMomentStatus.merge({
        userMadeMomentToday: true,
        lastUpdatedAt: DateTime.local().toISO(),
    });
    routeCallBack();
};

const deleteMoment = (store: State<GlobalStore>, idToDelete: Moment['id']) => {
    const moments = store.moments.get();
    const foundMoment = moments.find((moment) => moment.id === idToDelete);
    if (foundMoment) {
        const indexOfMoment = moments.indexOf(foundMoment);
        store.moments[indexOfMoment].set(none);
    }
};

const useMoment = (store: State<GlobalStore>) => {
    return {
        labelHandler,
        momentHandler: (moment: State<Moment>, routeCallBack: any) => momentHandler(store, moment, routeCallBack),
        skipHandler: (routeCallBack: any) => skipHandler(store, routeCallBack),
        deleteMoment: (idToDelete: Moment['id']) => deleteMoment(store, idToDelete),
    };
};

export default useMoment;
