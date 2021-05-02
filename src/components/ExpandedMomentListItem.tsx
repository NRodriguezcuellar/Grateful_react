import React from 'react';
import { Moment } from '../models/Moment';
import { DateTime } from 'luxon';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const ExpandedItem: React.FC<{ moment: Moment }> = (props) => {
    const dateTime = DateTime.fromISO(props.moment.createdAt);
    const relativeDate = dateTime.toRelativeCalendar();
    const localeStringDateTime = dateTime.toLocaleString(DateTime.DATETIME_MED);

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{props.moment.title}</IonCardTitle>
                <IonCardSubtitle>
                    {relativeDate}, {localeStringDateTime}
                </IonCardSubtitle>
                <IonCardSubtitle>Mood: {props.moment.moodScale}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <p style={{ fontWeight: 400, paddingTop: '1.2rem' }}>{props.moment.description}</p>
            </IonCardContent>
        </IonCard>
    );
};

export default ExpandedItem;
