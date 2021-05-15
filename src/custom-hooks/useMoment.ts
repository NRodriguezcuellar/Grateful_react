import { State, none } from '@hookstate/core';
import { GlobalStore } from '../stores/global';
import { Moment } from '../models/Moment';
import { DateTime } from 'luxon';
import { MomentStorage } from '../helpers/storage';
import cloneDeep from 'lodash/cloneDeep';

const momentStorage = new MomentStorage().init();

const labelHandler = (momentState: State<Moment>, label: string) => {
    if (!label) return;

    const labelAlreadyExists = momentState.labels
        .get()
        .find((savedLabel) => savedLabel.toLowerCase() === label.toLowerCase());
    if (labelAlreadyExists) return;

    momentState.labels.set([...momentState.labels.get(), label]);
};

const pushNewMoment = async (moment: Moment, store: State<GlobalStore>) => {
    const allMoments = await momentStorage.getMoments();
    const greatestIdInStore = allMoments.length ? Math.max(...allMoments.map((moment) => moment.id)) : 0;

    const filteredGratefulItems = moment.gratefulItems.filter((item) => item !== '');

    const finalMoment = Object.assign(cloneDeep(moment), {
        id: greatestIdInStore + 1,
        updatedAt: moment.createdAt,
        gratefulItems: filteredGratefulItems,
    });

    await momentStorage.saveMoment(finalMoment);

    store.moments.set(await momentStorage.getMoments());
};

const momentHandler = (store: State<GlobalStore>, moment: Moment, routeCallBack?: any) => {
    pushNewMoment(moment, store);

    if (routeCallBack) {
        routeCallBack();
    }
};

const skipHandler = (store: State<GlobalStore>, routeCallBack?: any) => {
    if (routeCallBack) {
        routeCallBack();
    }
};

const deleteMoment = async (store: State<GlobalStore>, idToDelete: Moment['id']) => {
    await momentStorage.deleteMoment(idToDelete);
    const moments = await momentStorage.getMoments();

    if (!moments.length) {
        store.currentOpenMomentId.set(null);
    }

    store.moments.set(await momentStorage.getMoments());
};

const useMoment = (store: State<GlobalStore>) => {
    return {
        labelHandler,
        momentHandler: (moment: Moment, routeCallBack: any) => momentHandler(store, moment, routeCallBack),
        skipHandler: (routeCallBack?: any) => skipHandler(store, routeCallBack),
        deleteMoment: (idToDelete: Moment['id']) => deleteMoment(store, idToDelete),
        pushMoment: (moment: Moment) => pushNewMoment(moment, store),
    };
};

export default useMoment;
