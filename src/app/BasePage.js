import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { BuilderPage } from "./pages/BuilderPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MyPage } from "./pages/MyPage";
import MakeChanges from "./pages/MakeChanges";
import { ErrorPage1 } from "./modules/ErrorsExamples/ErrorPage1";

const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          // <Redirect exact from="/" to="/changes" />
        }

        <ContentRoute exact path="/" component={MakeChanges} />
        <ContentRoute exact path="/dashboard" component={DashboardPage} />
        <ContentRoute exact path="/builder" component={BuilderPage} />
        <ContentRoute exact path="/my-page" component={MyPage} />
        <Route  component={ErrorPage1}/>
       
        <Route path="/e-commerce" component={ECommercePage} />
       
      </Switch>
    </Suspense>
  );
}
