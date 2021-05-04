import React from 'react';
import { IonContent, IonPage, IonList, IonListHeader, IonSegmentButton, IonSegment } from '@ionic/react';
import '../assets/styles/Tab1.css';
import TheHeader from '../components/TheHeader';
import { useState } from '@hookstate/core';
import globalStore from '../stores/global';
import MomentListItem from '../components/MomentListItem';
import useMoment from '../custom-hooks/useMoment';
import AggregatedMoments from '../components/MomentsAggregratedByTime';

const emptyState = { fontWeight: 400, margin: '1rem auto', width: '100%', paddingLeft: '1.3rem' };

const Tab1: React.FC = () => {
    const state = useState(globalStore);
    const datePeriodState = useState('week');
    const { deleteMoment } = useMoment(state);

    const moments = () => {
        const moments = state.moments.get();
        if (moments.length) {
            return moments.map((moment) => (
                <MomentListItem
                    moment={moment}
                    deleteCallBack={() => deleteMoment(moment.id)}
                    key={moment.id}
                    currentItemIndex={moment.id}
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

                    <AggregatedMoments aggregrationType={datePeriodState.get()} moments={state.moments.get()} />
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
