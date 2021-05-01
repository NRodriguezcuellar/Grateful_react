import React from 'react';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote } from '@ionic/react';
import { Moment } from '../models/Moment';
import { trashOutline } from 'ionicons/icons';

const momentListItem: React.FC<{ moment: Moment; deleteCallBack?: () => void }> = (props) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonLabel>
                    <h2> {props.moment.title}</h2>
                    <p> {props.moment.description}</p>
                </IonLabel>
                <IonNote slot="end" color="primary" style={{ fontSize: '1.2rem' }}>
                    {props.moment.moodScale}
                </IonNote>
            </IonItem>

            <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={props.deleteCallBack}>
                    <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default momentListItem;
