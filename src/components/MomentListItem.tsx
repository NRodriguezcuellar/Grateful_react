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
} from '@ionic/react';
import { Moment } from '../models/Moment';
import { trashOutline, resizeOutline } from 'ionicons/icons';
import { State, useState } from '@hookstate/core';
import globalStore, { GlobalStore } from '../stores/global';
import ExpandedMomentListItem from './ExpandedMomentListItem';
import { ColorObject, getColorForPercentage } from '../helpers/general';
import useMoment from '../custom-hooks/useMoment';
import '../assets/styles/modal.css';

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
                    <IonLabel>
                        <h2> {props.moment.title}</h2>
                        <p> {props.moment.description}</p>
                    </IonLabel>

                    <IonNote
                        slot="end"
                        style={{
                            fontSize: '1.2rem',
                            color: getColorForPercentage(props.moment.moodScale / 10, colorMaps),
                            width: '35.65px',
                        }}
                    >
                        {props.moment.moodScale}
                    </IonNote>
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
