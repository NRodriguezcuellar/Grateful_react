import React from 'react';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote } from '@ionic/react';
import { Moment } from '../models/Moment';
import { trashOutline } from 'ionicons/icons';
import { State, useState } from '@hookstate/core';
import globalStore, { GlobalStore } from '../stores/global';
import ExpandedMomentListItem from './ExpandedMomentListItem';
import { ColorObject, getColorForPercentage } from '../helpers/general';

const colorMaps: ColorObject[] = [
    { percentage: 0, color: { r: 255, g: 158, b: 0 } },
    { percentage: 1, color: { r: 91, g: 255, b: 0 } },
];

const momentListItem: React.FC<{
    moment: Moment;
    deleteCallBack?: () => void;
    clickHandler?: () => void;
    currentItemIndex: number;
}> = (props) => {
    const state = useState(globalStore);
    const isItemExpanded = useState(false);

    const itemClickHandler = (itemState: State<boolean>, globalStore: State<GlobalStore>) => {
        const currentTabItem = globalStore.currentTabItemOpen;
        const localComponentIndex = props.currentItemIndex;

        if (currentTabItem.get() !== localComponentIndex) {
            itemState.set(true);
            currentTabItem.set(props.currentItemIndex);
        } else {
            itemState.set(false);
            currentTabItem.set(null);
        }
    };

    return (
        <>
            <IonItemSliding>
                <IonItem onClick={() => itemClickHandler(isItemExpanded, state)}>
                    <IonLabel>
                        <h2> {props.moment.title}</h2>
                        <p> {props.moment.description}</p>
                    </IonLabel>
                    <IonNote
                        slot="end"
                        style={{
                            fontSize: '1.2rem',
                            color: getColorForPercentage(props.moment.moodScale / 100, colorMaps),
                        }}
                    >
                        {props.moment.moodScale}
                    </IonNote>
                </IonItem>

                <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={props.deleteCallBack}>
                        <IonIcon slot="icon-only" icon={trashOutline} />
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
            {state.currentTabItemOpen.get() === props.currentItemIndex
                ? ExpandedMomentListItem({ moment: props.moment })
                : null}
        </>
    );
};

export default momentListItem;
