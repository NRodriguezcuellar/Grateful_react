import {IonReactRouter} from "@ionic/react-router";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Route, Redirect} from "react-router-dom";
import Tab1 from "../pages/Tab1";
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";
import {ellipse, square, triangle} from "ionicons/icons";

const router: React.FC = () => (

    <IonReactRouter>
        <IonTabs>
            {/* here below are the routes */}

            <IonRouterOutlet>

                <Route exact path="/tab1">
                    <Tab1/>
                </Route>
                <Route exact path="/tab2">
                    <Tab2/>
                </Route>
                <Route path="/tab3">
                    <Tab3/>
                    <Redirect from="/" to="/tab1"/>
                </Route>
            </IonRouterOutlet>


            {/* here below is the footer */}



            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tab1">
                    <IonIcon icon={triangle}/>
                    <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon icon={ellipse}/>
                    <IonLabel>Tab 2</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon icon={square}/>
                    <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
            </IonTabBar>


        </IonTabs>
    </IonReactRouter>
)
export default router