import { IonContent, IonList, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import TheHeader from '../components/TheHeader';
import { useState } from '@hookstate/core';
import globalStore from '../stores/global';

const Settings: React.FC = () => {
    const locale = useState(globalStore.locale);

    return (
        <IonPage>
            <TheHeader />
            <IonContent fullscreen>
                settings
                <IonList>
                    <IonItem>
                        <IonLabel>Locale</IonLabel>
                        <IonSelect value={locale.get()} onIonChange={(e) => locale.set(e.detail.value!)}>
                            <IonSelectOption value="fr">Français</IonSelectOption>
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
