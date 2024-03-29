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
    IonItemGroup,
    IonItemDivider,
    IonDatetime,
} from '@ionic/react';
import { happyOutline, sadOutline, addOutline } from 'ionicons/icons';
import { useState } from '@hookstate/core';
import React from 'react';
import globalStore from '../stores/global';
import { useHistory } from 'react-router';
import { Moment } from '../models/Moment';
import useMoment from '../custom-hooks/useMoment';
import TheHeader from '../components/TheHeader';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';

const ParentDiv = styled.form`
    margin: auto auto;
`;

const InputItem = styled(IonItem)``;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
`;

const LabelContainer = styled(IonItem)`
    display: flex;
    flex-direction: column;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 3rem 20px;
`;

const AddButton = styled(IonButton)`
    margin-left: auto;
`;
const LabelTitle = { paddingBottom: '10px' };

const hidden = { visibility: 'hidden' };

const AddMoment: React.FC = () => {
    const router = useHistory();
    const { t } = useTranslation(['add_moment']);
    const state = useState(globalStore);
    const labelInput = useState<string>('');
    const moment = useState<Moment>({
        id: 0,
        description: '',
        labels: [],
        moodScale: 0,
        createdAt: DateTime.local().toISO(),
        updatedAt: '',
        gratefulItems: [''],
    });

    const { labelHandler, momentHandler, skipHandler } = useMoment(state);

    return (
        <IonPage>
            <TheHeader />
            <IonContent>
                <ParentDiv
                    onSubmit={(e) => {
                        e.preventDefault();
                        momentHandler(moment.get(), () => router.push('/'));
                    }}
                >
                    <IonItemGroup>
                        <Title>{t('page_title')}</Title>

                        <IonItemDivider>
                            <IonLabel> Moment </IonLabel>
                        </IonItemDivider>
                        <InputItem>
                            <IonLabel position="floating">Date</IonLabel>
                            <IonDatetime
                                displayFormat="DD MMM YYYY"
                                value={moment.createdAt.get()}
                                max={DateTime.local().endOf('day').toISO()}
                                onIonChange={(e) => {
                                    moment.createdAt.set(DateTime.fromISO(e.detail.value!).toISO());
                                }}
                            />
                        </InputItem>
                        <InputItem>
                            <IonLabel position="floating">{t('description')}</IonLabel>
                            <IonTextarea
                                placeholder={t('description_placeholder')}
                                value={moment.description.get()}
                                autoGrow={true}
                                onIonChange={(event) => moment.description.set(event.detail.value!.toString())}
                            />
                        </InputItem>

                        <InputItem
                            lines="none"
                            style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem' }}
                        >
                            <IonLabel>{t('mood')} </IonLabel>
                            <IonRange
                                min={0}
                                max={5}
                                style={{ paddingBottom: '23px' }}
                                pin={true}
                                step={1}
                                ticks={true}
                                value={moment.moodScale.get()}
                                snaps={true}
                                onIonChange={(event) => moment.moodScale.set(event.detail.value as number)}
                            >
                                <IonIcon slot="end" icon={happyOutline} />
                                <IonIcon slot="start" icon={sadOutline} />
                            </IonRange>
                        </InputItem>

                        {/*

                        <IonItem>
                            <IonInput
                                placeholder="A label"
                                value={labelInput.get()}
                                onIonChange={(event) => labelInput.set(event.detail.value!.toString())}
                            />
                            <IonButton onClick={() => labelHandler(moment, labelInput.get())}>
                                <IonIcon slot="end" icon={addOutline}/>
                                Add
                            </IonButton>
                        </IonItem>

                        <LabelContainer lines="none">
                        <IonLabel position="stacked" style={LabelTitle}>
                        Labels
                        </IonLabel>

                        <div>
                    {moment.labels.get().map((label, index) => (
                        <IonChip key={index}>{label}</IonChip>
                        ))}
                    {moment.labels.get().length ? null : 'No label'}
                        <IonChip style={hidden} />
                        </div>
                        </LabelContainer>
                        */}
                        <IonItemDivider>
                            <IonLabel> Gratefuls </IonLabel>
                        </IonItemDivider>

                        {moment.gratefulItems.map((gratefulItem, index) => (
                            <IonItem key={index}>
                                <IonLabel position="stacked">{index + 1}</IonLabel>
                                <IonTextarea
                                    key={index}
                                    autoGrow={true}
                                    rows={1}
                                    placeholder={t('grateful_item_placeholder')}
                                    value={gratefulItem.get()}
                                    onIonChange={(input) => gratefulItem.set(input.detail.value!.toString())}
                                />
                            </IonItem>
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <IonButton
                                slot="end"
                                size="small"
                                fill="outline"
                                onClick={() => moment.gratefulItems.merge([''])}
                            >
                                <IonIcon icon={addOutline} />
                                <span>1</span>
                            </IonButton>
                        </div>
                    </IonItemGroup>

                    <ButtonsContainer>
                        <IonButton onClick={() => skipHandler(() => router.push('/'))}>{t('general:cancel')}</IonButton>
                        <AddButton type="submit">{t('general:save')}</AddButton>
                    </ButtonsContainer>
                </ParentDiv>
            </IonContent>
        </IonPage>
    );
};

export default AddMoment;
