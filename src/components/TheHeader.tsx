import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { arrowBackOutline, settingsOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router';

const header: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    return (
        <IonHeader translucent>
            <IonToolbar>
                {location.pathname === '/settings' ? (
                    <IonButton slot="start" fill="clear" onClick={() => history.goBack()}>
                        <IonIcon icon={arrowBackOutline} />
                    </IonButton>
                ) : null}

                <IonTitle>Grateful</IonTitle>
                <IonButton slot="end" fill="clear" onClick={() => history.push('settings')}>
                    <IonIcon icon={settingsOutline} />
                </IonButton>
            </IonToolbar>
        </IonHeader>
    );
};

export default header;
