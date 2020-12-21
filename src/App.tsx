import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { images, library } from "ionicons/icons";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { PhotoDataProvider } from "./hooks/PhotoDataContext";

const App: React.FC = () => (
  <IonApp>
    <PhotoDataProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route path="/tab3" component={Tab3} />
            <Route
              path="/"
              render={() => <Redirect to="/tab2" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={images} />
              <IonLabel>Photos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={library} />
              <IonLabel>List</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </PhotoDataProvider>
  </IonApp>
);

export default App;
