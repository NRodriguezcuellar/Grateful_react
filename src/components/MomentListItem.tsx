import React from 'react';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote } from '@ionic/react';
import { Moment } from '../models/Moment';
import { trashOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import { State, useState } from '@hookstate/core';
import globalStore, { GlobalStore } from '../stores/global';
import ExpandedMomentListItem from './ExpandedMomentListItem';
import { ColorObject, getColorForPercentage } from '../helpers/general';
import useMoment from '../custom-hooks/useMoment';

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
    const isItemExpanded = state.currentOpenMomentId.get() === props.currentItemIndex;
    const { deleteMoment } = useMoment(state);

    const itemClickHandler = (globalStore: State<GlobalStore>) => {
        const currentTabItem = globalStore.currentOpenMomentId;
        const localComponentIndex = props.currentItemIndex;

        if (currentTabItem.get() !== localComponentIndex) {
            currentTabItem.set(props.currentItemIndex);
        } else {
            currentTabItem.set(null);
        }
    };

    return (
        <>
            <IonItemSliding>
                <IonItem onClick={() => itemClickHandler(state)}>
                    <IonLabel>
                        <h2> {props.moment.title}</h2>
                        <p> {props.moment.description}</p>
                    </IonLabel>

                    <IonIcon icon={isItemExpanded ? chevronUpOutline : chevronDownOutline} />

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
                </IonItem>

                <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() => deleteMoment(props.moment.id)}>
                        <IonIcon slot="icon-only" icon={trashOutline} />
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
            {isItemExpanded ? ExpandedMomentListItem({ moment: props.moment }) : null}
        </>
    );
};

export default MomentListItem;
