import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import LoadingScreen from '../pages/LoadingScreen';

const router: React.FC = () => {
    return (
        <IonReactRouter>
            <Suspense fallback={<LoadingScreen />}>
                <IonRouterOutlet>
                    <Route exact path="/">
                        <Redirect to="/tab1" />
                    </Route>
                    <Route path="/tab1" component={lazy(() => import('../pages/Homepage'))} />

                    <Route path="/settings" component={lazy(() => import('../pages/Settings'))} />
                    <Route path="/addMoment" component={lazy(() => import('../pages/AddMoment'))} />
                </IonRouterOutlet>
            </Suspense>
        </IonReactRouter>
    );
};
export default router;
