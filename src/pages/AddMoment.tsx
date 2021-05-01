import styled from 'styled-components';
import {
    IonInput,
    IonItem,
    IonLabel,
    IonRange,
    IonTextarea,
    IonIcon,
    IonChip,
    IonButton,
    IonPage,
    IonContent,
} from '@ionic/react';
import { happyOutline, sadOutline, addOutline } from 'ionicons/icons';
import { useState } from '@hookstate/core';
import React from 'react';
import globalStore from '../stores/global';
import { useHistory } from 'react-router';
import { Moment } from '../models/Moment';
import useMoment from '../custom-hooks/useMoment';

const ParentDiv = styled.div`
    margin: auto 0;
    padding: 0 15px;
`;

const InputItem = styled(IonItem)``;

const Title = styled.h1`
    padding: 2rem 0;
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.8rem;
`;

const LabelContainer = styled(IonItem)`
    display: flex;
    flex-direction: column;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
`;

const AddButton = styled(IonButton)`
    margin-left: auto;
`;
const LabelTitle = { paddingBottom: '10px' };

const hidden = { visibility: 'hidden' };

const AddMoment: React.FC = () => {
    const router = useHistory();
    const state = useState(globalStore);
    const labelInput = useState<string>('');
    const moment = useState<Moment>({
        id: state.moments.get().length + 1,
        title: '',
        description: '',
        labels: [],
        moodScale: 0,
        createdAt: '',
        updatedAt: '',
        gratefulItems: [],
    });

    const { labelHandler, momentHandler, skipHandler } = useMoment(state);

    return (
        <IonPage>
            <IonContent fullscreen>
                <ParentDiv>
                    <Title>How are you feeling today?</Title>
                    <InputItem>
                        <IonLabel position="floating">Title</IonLabel>
                        <IonInput
                            placeholder="Today was..."
                            value={moment.title.get()}
                            onIonChange={(event) => moment.title.set(event.detail.value!.toString())}
                        />
                    </InputItem>
                    <InputItem>
                        <IonLabel position="floating">Description</IonLabel>
                        <IonTextarea
                            placeholder="Describe your moment further"
                            value={moment.description.get()}
                            onIonChange={(event) => moment.description.set(event.detail.value!.toString())}
                        />
                    </InputItem>

                    <InputItem>
                        <IonRange
                            min={0}
                            max={100}
                            pin={true}
                            step={10}
                            value={moment.moodScale.get()}
                            snaps={true}
                            onIonChange={(event) => moment.moodScale.set(event.detail.value as number)}
                        >
                            <IonIcon slot="end" icon={happyOutline} />
                            <IonIcon slot="start" icon={sadOutline} />
                        </IonRange>
                    </InputItem>

                    <IonItem lines="full">
                        <IonInput
                            placeholder="A label"
                            value={labelInput.get()}
                            onIonChange={(event) => labelInput.set(event.detail.value!.toString())}
                        />
                        <IonButton onClick={() => labelHandler(moment, labelInput.get())}>
                            <IonIcon slot="end" icon={addOutline} />
                            Add label
                        </IonButton>
                    </IonItem>

                    <LabelContainer lines="full">
                        <IonLabel position="stacked" style={LabelTitle}>
                            Labels
                        </IonLabel>

                        <div>
                            {moment.labels.get().map((label, index) => (
                                <IonChip key={index}>{label}</IonChip>
                            ))}
                            <IonChip style={hidden} />
                        </div>
                    </LabelContainer>

                    <ButtonsContainer>
                        <IonButton onClick={() => skipHandler(() => router.push('/tab1'))}>Cancel</IonButton>

                        <AddButton onClick={() => momentHandler(moment, () => router.push('/tab1'))}>Save</AddButton>
                    </ButtonsContainer>
                </ParentDiv>
            </IonContent>
        </IonPage>
    );
};

export default AddMoment;
