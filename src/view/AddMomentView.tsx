import styled from 'styled-components';
import { IonInput, IonItem, IonLabel, IonRange, IonTextarea, IonIcon, IonChip, IonButton } from '@ionic/react';
import { happyOutline, sadOutline, addOutline } from 'ionicons/icons';
import { useState } from 'react';
import React from 'react';

const ParentDiv = styled.div`
    margin: auto 0;
    padding: 0 15px;
`;

const InputItem = styled(IonItem)``;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
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
const LabelTitle = { paddingBottom: '10px' };

const hidden = { visibility: 'hidden' };

interface AddMomentViewProps {
    skip?: () => void;
}

const AddMomentView: React.FC<AddMomentViewProps> = (props) => {
    const [labels, setLabels] = useState<string[]>([]);
    const [labelInput, setLabelInput] = useState<string>('');

    const labelHandler = (label: string) => {
        if (!label) return;
        const labelAlreadyExists = labels.find((savedLabel) => savedLabel.toLowerCase() === label.toLowerCase());
        if (labelAlreadyExists) return;

        setLabels([...labels, label]);
    };

    return (
        <ParentDiv>
            <Title>Add a moment</Title>
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
                    onIonChange={(event) => setLabelInput(event.detail.value!.toString())}
                />
                <IonButton onClick={() => labelHandler(labelInput)}>
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
                <IonButton onClick={props.skip}>Skip</IonButton>
                <IonButton>Add</IonButton>
            </ButtonsContainer>
        </ParentDiv>
    );
};

export default AddMomentView;
