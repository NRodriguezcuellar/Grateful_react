import React from 'react';
import { Moment } from '../models/Moment';
import { DateTime } from 'luxon';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonItemDivider,
} from '@ionic/react';

const ExpandedItem: React.FC<{ moment: Moment }> = (props) => {
    const dateTime = DateTime.fromISO(props.moment.createdAt);
    const relativeDate = dateTime.toRelativeCalendar();
    const localeStringDateTime = dateTime.toLocaleString(DateTime.DATETIME_MED);

    return (
        <IonCard>
            <IonCardHeader translucent={true}>
                <IonCardTitle style={{ fontSize: '1.5rem' }}>{props.moment.title}</IonCardTitle>
                <IonCardSubtitle>
                    {relativeDate}, {localeStringDateTime}
                </IonCardSubtitle>
                <IonCardSubtitle>Mood: {props.moment.moodScale}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                {props.moment.description !== '' && (
                    <>
                        <IonItemDivider style={{ margin: '1rem 0' }}>Moment</IonItemDivider>
                        <p style={{ fontWeight: 400, padding: '0 0 2rem 0.5rem' }}>{props.moment.description}</p>{' '}
                    </>
                )}
                {props.moment.gratefulItems.length > 0 && (
                    <>
                        <IonItemDivider style={{ margin: '1rem 0' }}>Gratefuls</IonItemDivider>
                        <IonList>
                            {props.moment.gratefulItems.map((gratefulItem, index) => (
                                <IonItem key={index} lines="full">
                                    <IonLabel>{index + 1}</IonLabel>
                                    <p>{gratefulItem}</p>
                                </IonItem>
                            ))}
                        </IonList>
                    </>
                )}
            </IonCardContent>
        </IonCard>
    );
};

export default ExpandedItem;
