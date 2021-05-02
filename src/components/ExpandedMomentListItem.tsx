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
            <IonCardHeader>
                <IonCardTitle>{props.moment.title}</IonCardTitle>
                <IonCardSubtitle>
                    {relativeDate}, {localeStringDateTime}
                </IonCardSubtitle>
                <IonCardSubtitle>Mood: {props.moment.moodScale}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                {props.moment.description !== '' && (
                    <>
                        <IonItemDivider>Moment</IonItemDivider>
                        <h4 style={{ fontWeight: 500, paddingTop: '0.5rem' }}>Description:</h4>
                        <p style={{ fontWeight: 400 }}>{props.moment.description}</p>{' '}
                    </>
                )}
                {props.moment.gratefulItems.length > 0 && (
                    <>
                        <IonItemDivider>Gratefuls</IonItemDivider>
                        <IonList>
                            {props.moment.gratefulItems.map((gratefulItem, index) => (
                                <IonItem key={index}>
                                    <IonLabel>{index}</IonLabel>
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
