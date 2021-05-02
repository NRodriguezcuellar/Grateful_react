import React from 'react';
import { Moment } from '../models/Moment';
import { DateTime } from 'luxon';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const ExpandedItem: React.FC<{ moment: Moment }> = (itemProps) => {
    const dateTime = DateTime.fromISO(itemProps.moment.createdAt);
    const relativeDate = dateTime.toRelativeCalendar();
    const localeStringDateTime = dateTime.toLocaleString(DateTime.DATETIME_MED);

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{itemProps.moment.title}</IonCardTitle>
                <IonCardSubtitle>
                    {relativeDate}, {localeStringDateTime}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{itemProps.moment.description}</IonCardContent>
        </IonCard>
    );
};

export default ExpandedItem;
