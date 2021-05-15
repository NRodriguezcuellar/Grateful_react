import React, { useRef } from 'react';
import {
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonModal,
    IonNote,
    IonThumbnail,
} from '@ionic/react';
import { Moment } from '../models/Moment';
import { trashOutline, resizeOutline, happyOutline, sadOutline } from 'ionicons/icons';
import { useState } from '@hookstate/core';
import globalStore from '../stores/global';
import ExpandedMomentListItem from './ExpandedMomentListItem';
import { ColorObject, getColorForPercentage } from '../helpers/general';
import useMoment from '../custom-hooks/useMoment';
import '../assets/styles/modal.css';
import { DateTime } from 'luxon';

const colorMaps: ColorObject[] = [
    { percentage: 0, color: { r: 255, g: 196, b: 9 } },
    { percentage: 0.8, color: { r: 61, g: 194, b: 255 } },
    { percentage: 1, color: { r: 56, g: 128, b: 255 } },
];

const MomentListItem: React.FC<{
    moment: Moment;
    clickHandler?: () => void;
    currentItemIndex: number;
}> = (props) => {
    const state = useState(globalStore);
    const isItemExpanded = useState(false);
    const { deleteMoment } = useMoment(state);
    const listItem = useRef<HTMLIonItemSlidingElement | null>(null);

    return (
        <>
            <IonModal
                isOpen={isItemExpanded.get()}
                mode="ios"
                cssClass={'item-list-modal-wrapper'}
                swipeToClose={true}
                onDidDismiss={() => isItemExpanded.set(false)}
            >
                <ExpandedMomentListItem moment={props.moment} />
            </IonModal>
            <IonItemSliding ref={listItem}>
                <IonItem onClick={() => isItemExpanded.set((status) => !status)}>
                    <IonIcon icon={props.moment.moodScale > 3 ? happyOutline : sadOutline} slot="end" />

                    <IonLabel>
                        <h2> {DateTime.fromISO(props.moment.createdAt).toLocaleString(DateTime.DATETIME_MED)}</h2>
                    </IonLabel>

                    <IonIcon icon={resizeOutline} slot="end" />
                </IonItem>

                <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() => deleteMoment(props.moment.id)}>
                        <IonIcon slot="icon-only" icon={trashOutline} />
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </>
    );
};

export default MomentListItem;
