import { Plugins } from '@capacitor/core';
import { GratefulSettingsObject } from '../models/Settings';

const { Storage, Device } = Plugins;

export class GratefulSettings {
    private instance: GratefulSettings | undefined;
    private settingsKey = 'grateful_settings';
    public availableLocales = ['nl', 'en'];

    init() {
        if (!this.instance) {
            this.instance = new GratefulSettings();
        }

        this.initializeSettings();

        return this.instance;
    }

    async getSettings() {
        const settings = await Storage.get({ key: this.settingsKey });
        return JSON.parse(settings.value as string) as GratefulSettingsObject;
    }

    async setSettings(settingsObject: Record<string, string>) {
        const currentSettings = await this.getSettings();

        await Storage.set({
            key: this.settingsKey,
            value: JSON.stringify(Object.assign(currentSettings, settingsObject)),
        });
    }

    initializeSettings() {
        Storage.get({ key: this.settingsKey }).then(async (settings) => {
            const languageCode = await Device.getLanguageCode();

            if (!settings.value) {
                await Storage.set({
                    key: this.settingsKey,
                    value: JSON.stringify({
                        locale: this.availableLocales.includes(languageCode.value.toLowerCase())
                            ? languageCode.value.toLowerCase()
                            : 'en',
                    }),
                });
            }
        });
    }
}
