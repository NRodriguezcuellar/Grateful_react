import React from 'react';
import { IonBadge, IonItem, IonLabel } from '@ionic/react';
import { Moment } from '../models/Moment';

const momentListItem: React.FC<{ moment: Moment }> = (props) => {
    return (
        <IonItem>
            <IonLabel>
                <h2> {props.moment.title}</h2>
                <p> {props.moment.description}</p>
            </IonLabel>
            <IonBadge>{props.moment.moodScale}</IonBadge>
        </IonItem>
    );
};

export default momentListItem;
