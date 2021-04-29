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
import { DateTime } from 'luxon';
import { useHistory } from 'react-router';

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

const AddMomentView: React.FC = () => {
    const labels = useState<string[]>([]);
    const labelInput = useState<string>('');
    const state = useState(globalStore);
    const router = useHistory();

    const labelHandler = (label: string) => {
        if (!label) return;

        const labelAlreadyExists = labels.find((savedLabel) => savedLabel.get().toLowerCase() === label.toLowerCase());
        if (labelAlreadyExists) return;

        labels.set([...labels.get(), label]);
    };

    const skipHandler = () => {
        state.dailyMomentStatus.merge({
            userMadeMomentToday: true,
            lastUpdatedAt: DateTime.local().toISO(),
        });
        router.push('/tab1');
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <ParentDiv>
                    <Title>How are you feeling today?</Title>
                    <InputItem>
                        <IonLabel position="floating">Title</IonLabel>
                        <IonInput placeholder="Today was..." />
                    </InputItem>
                    <InputItem>
                        <IonLabel position="floating">Description</IonLabel>
                        <IonTextarea placeholder="Describe your moment further" />
                    </InputItem>

                    <InputItem>
                        <IonRange min={0} max={100} pin={true} step={10} snaps={true}>
                            <IonIcon slot="end" icon={happyOutline} />
                            <IonIcon slot="start" icon={sadOutline} />
                        </IonRange>
                    </InputItem>

                    <IonItem lines="full">
                        <IonInput
                            placeholder="A label"
                            onIonChange={(event) => labelInput.set(event.detail.value!.toString())}
                        />
                        <IonButton onClick={() => labelHandler(labelInput.get())}>
                            <IonIcon slot="end" icon={addOutline} />
                            Add label
                        </IonButton>
                    </IonItem>

                    <LabelContainer lines="full">
                        <IonLabel position="stacked" style={LabelTitle}>
                            Labels
                        </IonLabel>

                        <div>
                            {labels.map((label, index) => (
                                <IonChip key={index}>{label}</IonChip>
                            ))}
                            <IonChip style={hidden} />
                        </div>
                    </LabelContainer>

                    <ButtonsContainer>
                        <IonButton onClick={skipHandler}>Cancel</IonButton>

                        <AddButton>Save</AddButton>
                    </ButtonsContainer>
                </ParentDiv>
            </IonContent>
        </IonPage>
    );
};

export default AddMomentView;
