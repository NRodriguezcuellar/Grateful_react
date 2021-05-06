import { IonReactRouter } from '@ionic/react-router';
import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { addOutline, settingsOutline, homeOutline } from 'ionicons/icons';
import React, { Suspense } from 'react';
import LoadingScreen from '../pages/LoadingScreen';
import Settings from '../pages/Settings';
import AddMoment from '../pages/AddMoment';
import Homepage from '../pages/Homepage';

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
                        <Route path="/tab1" component={Homepage} />

                        <Route path="/settings" component={Settings} />
                        <Route path="/addMoment" component={AddMoment} />
                    </IonRouterOutlet>

                    {/* here below is the footer */}

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={homeOutline} />
                        </IonTabButton>
                        <IonTabButton tab="addMoment" href="/addMoment">
                            <IonIcon icon={addOutline} />
                        </IonTabButton>
                        <IonTabButton tab="settings" href="/settings">
                            <IonIcon icon={settingsOutline} />
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </Suspense>
        </IonReactRouter>
    );
};
export default router;
