import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const header: React.FC = () => {
    return (
        <IonHeader translucent>
            <IonToolbar>
                <IonTitle>Grateful</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default header;
