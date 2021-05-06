import { IonContent, IonList, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import TheHeader from '../components/TheHeader';
import { useTranslation } from 'react-i18next';
import { Settings as DateTimeSettings } from 'luxon';
import globalStore from '../stores/global';

const Settings: React.FC = () => {
    const { i18n } = useTranslation();

    const languageSelectHandler = async (language: string) => {
        await i18n.changeLanguage(language);
        DateTimeSettings.defaultLocale = i18n.language;
        globalStore.locale.set(language);
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
