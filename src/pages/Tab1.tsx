import React from 'react';
import { IonContent, IonPage, IonList, IonListHeader, IonSegmentButton, IonSegment } from '@ionic/react';
import '../assets/styles/Tab1.css';
import TheHeader from '../components/TheHeader';
import { useState } from '@hookstate/core';
import globalStore from '../stores/global';
import AggregatedMoments from '../components/MomentsAggregratedByTime';

const emptyState = { fontWeight: 400, margin: '1rem auto', width: '100%', paddingLeft: '1.3rem' };

const Tab1: React.FC = () => {
    const state = useState(globalStore);
    const datePeriodState = useState('week');

    const moments = () => {
        const moments = state.moments.get();
        if (moments.length) {
            return <AggregatedMoments aggregrationType={datePeriodState.get()} moments={state.moments.get()} />;
        } else {
            return <h6 style={emptyState}>No Moments added yet!</h6>;
        }
    };

    return (
        <IonPage>
            <TheHeader />
            <IonContent>
                <IonList style={{ minHeight: '100%' }}>
                    <IonListHeader>
                        <h1>Your moments</h1>
                    </IonListHeader>
                    <IonSegment
                        value={datePeriodState.get()}
                        onIonChange={(event) => datePeriodState.set(event.detail.value!)}
                    >
                        <IonSegmentButton value="year"> Year</IonSegmentButton>
                        <IonSegmentButton value="month">Month</IonSegmentButton>
                        <IonSegmentButton value="week"> Week</IonSegmentButton>
                    </IonSegment>

                    {moments()}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
