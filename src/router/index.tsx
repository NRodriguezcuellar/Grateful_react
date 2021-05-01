import { IonReactRouter } from '@ionic/react-router';
import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { addOutline, settingsOutline, homeOutline } from 'ionicons/icons';
import React, { lazy, Suspense } from 'react';
import LoadingScreen from '../pages/LoadingScreen';

const router: React.FC = () => {
    return (
        <IonReactRouter>
            <Suspense fallback={<LoadingScreen />}>
                <IonTabs>
                    {/* here below are the routes */}

                    <IonRouterOutlet>
                        <Route exact path="/">
                            <Redirect to="/tab1" />
                        </Route>
                        <Route path="/tab1" component={lazy(() => import('../pages/Tab1'))} />

                        <Route path="/tab2" component={lazy(() => import('../pages/Tab2'))} />
                        <Route path="/addMoment" component={lazy(() => import('../pages/AddMoment'))} />
                    </IonRouterOutlet>

                    {/* here below is the footer */}

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={homeOutline} />
                        </IonTabButton>
                        <IonTabButton tab="addMoment" href="/addMoment">
                            <IonIcon icon={addOutline} />
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={settingsOutline} />
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </Suspense>
        </IonReactRouter>
    );
};
export default router;
