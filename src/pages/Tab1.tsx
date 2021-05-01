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
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import './Tab1.css';
import TheHeader from '../components/TheHeader';
import '../assets/styles/calendar.css';
import { useState } from '@hookstate/core';
import globalStore from '../stores/global';
import MomentListItem from '../components/MomentListItem';
import useMoment from '../custom-hooks/useMoment';

const inputStyles = { margin: '20px auto 0 auto' };

const emptyState = { fontWeight: 400, margin: '1rem auto', width: '100%', TextAlign: 'center' };

const Tab1: React.FC = () => {
    const state = useState(globalStore);
    const { deleteMoment } = useMoment(state);

    const moments = () => {
        const moments = state.moments.get();
        if (moments.length) {
            return moments.map((moment, index) => (
                <MomentListItem moment={moment} deleteCallBack={() => deleteMoment(moment)} key={index} />
            ));
        } else {
            return <div style={emptyState}>No Moments added yet</div>;
        }
    };

    return (
        <IonPage>
            <TheHeader />
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <h1>Your moments</h1>
                    </IonListHeader>
                    {moments()}
                </IonList>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink="/addMoment">
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
