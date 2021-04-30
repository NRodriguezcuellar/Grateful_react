import React from 'react';
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

const inputStyles = { margin: '20px auto 0 auto' };

const emptyState = { fontWeight: 400, margin: '1rem auto', width: '100%' };

const Tab1: React.FC = () => {
    const list: number[] = [1, 2, 3, 4, 5, 6, 3, 3, 3, 3, 3, 3];
    const state = useState(globalStore);

    const momentsLoader = () => {
        if (state.moments.get().length) {
            return state.moments.get().map((moment, index) => (
                <IonItem key={index}>
                    <IonLabel>
                        <h2> {moment.title}</h2>
                        <p> {moment.description}</p>
                    </IonLabel>
                    <IonBadge>{moment.moodScale}</IonBadge>
                </IonItem>
            ));
        } else {
            return <div style={emptyState}>No Moments added yet</div>;
        }
    };

    return (
        <IonPage>
            <TheHeader />
            <IonContent fullscreen>
                <IonList>
                    <IonListHeader>
                        <h1>Your moments</h1>
                    </IonListHeader>
                    {state.moments.get().length ? (
                        state.moments.get().map((moment, index) => (
                            <IonItem key={index}>
                                <IonLabel>
                                    <h2> {moment.title}</h2>
                                    <p> {moment.description}</p>
                                </IonLabel>
                                <IonBadge>{moment.moodScale}</IonBadge>
                            </IonItem>
                        ))
                    ) : (
                        <div style={emptyState}>No Moments added yet</div>
                    )}
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
