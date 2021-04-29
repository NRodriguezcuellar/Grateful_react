import React from 'react';
import { IonContent, IonFab, IonFabButton, IonPage, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import './Tab1.css';
import TheHeader from '../components/TheHeader';
import '../assets/styles/calendar.css';
import { useState } from 'react';
import { useHistory } from 'react-router';

const inputStyles = { margin: '20px auto 0 auto' };

const Tab1: React.FC = (props) => {
    const list: number[] = [1, 2, 3, 4, 5, 6, 3, 3, 3, 3, 3, 3];
    const [inputValue, setInputValue] = useState('');

    return (
        <IonPage>
            <TheHeader />
            <IonContent fullscreen>
                <form style={inputStyles}>
                    {list.map((item, index) => (
                        <input
                            type="text"
                            defaultValue={item}
                            onChange={(e) => setInputValue(e.target.value)}
                            key={index}
                        />
                    ))}
                </form>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink="/addMoment">
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>

                <div>{inputValue}</div>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
