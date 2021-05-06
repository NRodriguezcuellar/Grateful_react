import React from 'react';
import { IonContent, IonPage, IonList, IonListHeader, IonSegmentButton, IonSegment } from '@ionic/react';
import '../assets/styles/Tab1.css';
import TheHeader from '../components/TheHeader';
import { State, useState } from '@hookstate/core';
import globalStore from '../stores/global';
import AggregatedMoments from '../components/MomentsAggregratedByTime';
import { setStateBasedOnPeriodKind } from '../helpers/state';
import { PeriodKind } from '../components/MomentDropdown';

const emptyState = { fontWeight: 400, margin: '1rem auto', width: '100%', paddingLeft: '1.3rem' };

const Homepage: React.FC = () => {
    const state = useState(globalStore);
    const timePeriodState = useState<PeriodKind>('week');

    const moments = () => {
        const moments = state.moments.get();
        const aggregationType = timePeriodState.get();
        if (moments.length) {
            return <AggregatedMoments aggregrationType={aggregationType} moments={moments} />;
        } else {
            return <h6 style={emptyState}>No Moments added yet!</h6>;
        }
    };

    const timePeriodClickHandler = (period: string, timePeriodState: State<PeriodKind>) => {
        setStateBasedOnPeriodKind('year', false, state);
        timePeriodState.set(period as PeriodKind);
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
                        value={timePeriodState.get()}
                        onIonChange={(event) => timePeriodClickHandler(event.detail.value!, timePeriodState)}
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

export default Homepage;
