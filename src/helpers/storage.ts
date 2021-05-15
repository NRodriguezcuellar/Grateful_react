import { Plugins } from '@capacitor/core';
import { Moment } from '../models/Moment';
import { GlobalStore } from '../stores/global';

const { Storage } = Plugins;

export class MomentStorage {
    private instance: MomentStorage | undefined;
    private readonly storageKey;

    constructor() {
        this.storageKey = 'grateful_moments';
    }

    init() {
        if (!this.instance) {
            this.instance = new MomentStorage();
        }

        Storage.get({ key: this.storageKey }).then(async (moments) => {
            if (!moments.value) {
                await Storage.set({ key: this.storageKey, value: JSON.stringify([]) });
                await this.transferMoments();
            }
        });

        return this.instance;
    }

    async transferMoments() {
        const savedMoments = window.localStorage.getItem('GratefulStorage');
        const momentStorageExists = await this.getMoments();

        if (savedMoments && momentStorageExists) {
            const parseSavedMoments: GlobalStore = JSON.parse(savedMoments);
            parseSavedMoments.moments.forEach((moment) => (moment.moodScale = Math.round(moment.moodScale / 2)));
            await this.setStorageValue([...momentStorageExists, ...parseSavedMoments.moments]);
        }
    }

    async saveMoment(moment: Moment) {
        const moments = await this.getMoments();

        await this.setStorageValue([...moments, moment]);
    }

    async deleteMoment(id: number) {
        const moments = await this.getMoments();
        const momentsUpdated = moments.filter((savedMoment) => savedMoment.id !== id);

        await this.setStorageValue(momentsUpdated);
    }

    async setStorageValue(value: any) {
        await Storage.set({ key: this.storageKey, value: JSON.stringify(value) });
    }

    async getMoments() {
        const moments = await Storage.get({ key: this.storageKey });

        return JSON.parse(moments.value as string) as Moment[];
    }
}

export default new MomentStorage();
