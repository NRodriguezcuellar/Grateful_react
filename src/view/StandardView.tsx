import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import { ellipse, square, home } from 'ionicons/icons';
import AddMomentView from './AddMomentView';

const StandardView: React.FC = () => (
    <IonTabs>
        {/* here below are the routes */}

        <IonRouterOutlet>
            <Route exact path="/">
                <Redirect to="/tab1" />
            </Route>
            <Route path="/tab1">
                <Tab1 />
            </Route>
            <Route path="/tab2">
                <Tab2 />
            </Route>
            <Route path="/tab3">
                <Tab3 />
            </Route>
            <Route path="/addMoment">
                <AddMomentView />
            </Route>
        </IonRouterOutlet>

        {/* here below is the footer */}

        <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={ellipse} />
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={square} />
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);

export default StandardView;
