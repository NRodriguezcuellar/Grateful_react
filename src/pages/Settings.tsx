import { IonContent, IonList, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import TheHeader from '../components/TheHeader';
import { useTranslation } from 'react-i18next';
import { Settings as DateTimeSettings } from 'luxon';
import { GratefulSettings } from '../helpers/gratefulSettings';

const Settings: React.FC = () => {
    const { i18n } = useTranslation();
    const grateful_settings = new GratefulSettings().init();

    const languageSelectHandler = async (language: string) => {
        await i18n.changeLanguage(language);
        DateTimeSettings.defaultLocale = i18n.language;
        await grateful_settings.setSettings({ locale: language });
    };

    return (
        <IonPage>
            <TheHeader />
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel>Locale</IonLabel>
                        <IonSelect value={i18n.language} onIonChange={(e) => languageSelectHandler(e.detail.value!)}>
                            <IonSelectOption value="nl">Nederlands</IonSelectOption>
                            <IonSelectOption value="en">English</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
