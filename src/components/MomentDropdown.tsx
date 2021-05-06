import React from 'react';
import { State, useState } from '@hookstate/core';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import globalStore from '../stores/global';
import { setStateBasedOnPeriodKind } from '../helpers/state';

export type PeriodKind = 'year' | 'month' | 'week' | 'day';

const MomentDropdown: React.FC<{
    currentId: number;
    label: string;
    level: number;
    periodKind: PeriodKind;
}> = (props) => {
    const state = useState(globalStore);
    const periodStates = {
        year: state.currentOpenYearId,
        month: state.currentOpenMonthId,
        week: state.currentOpenWeekId,
        day: state.currentOpenDayId,
    };
    const localComponentIndex = props.currentId;
    const isItemExpanded = periodStates[props.periodKind].get() === localComponentIndex;

    const itemClickHandler = (currentOpenState: State<number | null>) => {
        const openTabItemId = currentOpenState;

        if (openTabItemId.get() !== localComponentIndex) {
            periodStates[props.periodKind].set(localComponentIndex);
            setStateBasedOnPeriodKind(props.periodKind, true, state);
        } else {
            openTabItemId.set(null);
            setStateBasedOnPeriodKind(props.periodKind, false, state);
        }
    };
    return (
        <>
            <IonItem onClick={() => itemClickHandler(periodStates[props.periodKind])}>
                <IonLabel>{props.label}</IonLabel>
                <IonIcon icon={isItemExpanded ? chevronUpOutline : chevronDownOutline} />
            </IonItem>
            <div style={{ marginLeft: `${props.level * 5}px` }}>{isItemExpanded && props.children}</div>
        </>
    );
};

export default MomentDropdown;
