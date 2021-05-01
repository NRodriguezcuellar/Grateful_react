import { IonReactRouter } from '@ionic/react-router';
import { IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { ellipse, home, square } from 'ionicons/icons';
import React, { lazy, Suspense } from 'react';
import LoadingScreen from '../pages/LoadingScreen';

const router: React.FC = () => (
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
                    <Route path="/tab3" component={lazy(() => import('../pages/Tab3'))} />
                    <Route path="/addMoment" component={lazy(() => import('../pages/AddMoment'))} />
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
        </Suspense>
    </IonReactRouter>
);
export default router;
