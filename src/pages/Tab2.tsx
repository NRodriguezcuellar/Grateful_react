import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import TheHeader from '../components/TheHeader';

const Tab2: React.FC = () => {
    return (
        <IonPage>
            <TheHeader />
            <IonContent fullscreen />
        </IonPage>
    );
};

export default Tab2;
