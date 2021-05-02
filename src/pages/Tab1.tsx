import React, { useEffect } from 'react';
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonPage,
    IonIcon,
    IonList,
    IonItem,
    IonListHeader,
    IonTitle,
    IonLabel,
    IonBadge,
    IonModal,
    IonCard,
    IonBackdrop,
    IonButton,
    IonCardHeader,
    IonCardContent,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import './Tab1.css';
import TheHeader from '../components/TheHeader';
import '../assets/styles/calendar.css';
import { useState } from '@hookstate/core';
import globalStore from '../stores/global';
import MomentListItem from '../components/MomentListItem';
import useMoment from '../custom-hooks/useMoment';

const emptyState = { fontWeight: 400, margin: '1rem auto', width: '100%', paddingLeft: '1.3rem' };

const Tab1: React.FC = () => {
    const state = useState(globalStore);
    const { deleteMoment } = useMoment(state);

    const moments = () => {
        const moments = state.moments.get();
        if (moments.length) {
            return moments.map((moment, index) => (
                <MomentListItem
                    moment={moment}
                    deleteCallBack={() => deleteMoment(moment.id)}
                    key={index}
                    currentItemIndex={index}
                />
            ));
        } else {
            return <h6 style={emptyState}>No Moments added yet!</h6>;
        }
    };

    return (
        <IonPage>
            <TheHeader />
            <IonContent>
                <IonList style={{ height: '100%' }}>
                    <IonListHeader>
                        <h1>Your moments</h1>
                    </IonListHeader>
                    {moments()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
