import { IonContent, IonList, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import TheHeader from '../components/TheHeader';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
    const { t, i18n } = useTranslation();

    console.log(t('hello'));

    return (
        <IonPage>
            <TheHeader />
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel>Locale</IonLabel>
                        <IonSelect value={i18n.language} onIonChange={(e) => i18n.changeLanguage(e.detail.value!)}>
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
