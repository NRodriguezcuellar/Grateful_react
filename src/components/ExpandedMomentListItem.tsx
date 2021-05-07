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
    IonBackdrop,
} from '@ionic/react';
import { useTranslation } from 'react-i18next';
import '../assets/styles/expandedListItem.css';

const ExpandedItem: React.FC<{ moment: Moment }> = (props) => {
    const { t } = useTranslation();
    const dateTime = DateTime.fromISO(props.moment.createdAt);
    const relativeDate = dateTime.toRelativeCalendar();
    const localeStringDateTime = dateTime.toLocaleString(DateTime.DATETIME_MED);

    return (
        <>
            <IonCard className="expanded-list-item">
                <IonCardHeader translucent={true}>
                    <IonCardTitle style={{ fontSize: '1.5rem' }}>{props.moment.title}</IonCardTitle>
                    <IonCardSubtitle>
                        {relativeDate}, {localeStringDateTime}
                    </IonCardSubtitle>
                    <IonCardSubtitle>
                        {t('add_moment:mood')}: {props.moment.moodScale}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <>
                        <IonItemDivider style={{ margin: '1rem 0' }}>Moment</IonItemDivider>
                        <p style={{ fontWeight: 400, padding: '0 0 2rem 0.5rem' }}>{props.moment.description}</p>{' '}
                    </>

                    <IonItemDivider style={{ margin: '1rem 0' }}>Gratefuls</IonItemDivider>
                    <IonList>
                        {props.moment.gratefulItems.map((gratefulItem, index) => (
                            <IonItem key={index} lines="full">
                                <IonLabel>{index + 1}</IonLabel>
                                <p>{gratefulItem}</p>
                            </IonItem>
                        ))}
                    </IonList>
                </IonCardContent>
            </IonCard>
            <IonBackdrop visible={true} />
        </>
    );
};

export default ExpandedItem;
