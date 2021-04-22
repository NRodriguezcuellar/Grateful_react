import styled from "styled-components";
import {IonInput, IonItem, IonLabel, IonRange, IonTextarea, IonIcon, IonChip, IonButton} from "@ionic/react";
import {happyOutline, sadOutline, addOutline} from 'ionicons/icons';
import {useState} from "react";


const ParentDiv = styled.div`
  margin: auto 0;
  padding: 0 15px`

const InputItem = styled(IonItem)``

const Title = styled.h1` text-align: center;
  margin-bottom: 2rem`

const LabelContainer = styled(IonItem)`display: flex`


const AddMomentView: React.FC = () => {

    const labels = useState<string[]>([])


    return <ParentDiv>
        <Title>Add a moment</Title>
        <InputItem>
            <IonLabel position="floating">Title</IonLabel>
            <IonInput placeholder="Today was..."/>
        </InputItem>
        <InputItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonTextarea placeholder="Describe your moment further"/>
        </InputItem>


        <InputItem>
            <IonRange min={0} max={100} pin={true} step={10} snaps={true}>
                <IonIcon slot="end" icon={happyOutline}/>
                <IonIcon slot="start" icon={sadOutline}/>
            </IonRange>
        </InputItem>

        <LabelContainer lines="full">
            <IonButton>
                <IonIcon slot="end" icon={addOutline}/>
                Add label
            </IonButton>

        </LabelContainer>

    </ParentDiv>
}

export default AddMomentView