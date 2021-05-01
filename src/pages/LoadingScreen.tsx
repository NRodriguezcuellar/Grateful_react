import React from 'react';
import { IonPage, IonContent, IonProgressBar } from '@ionic/react';

const LoadingScreen: React.FC = () => (
    <IonPage>
        <IonContent>
            <IonProgressBar type="indeterminate" />
        </IonContent>
    </IonPage>
);

export default LoadingScreen;
