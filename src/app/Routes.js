/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { AuthPage, Logout } from "./modules/Auth";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

import BasePage from "./BasePage";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import { Layout } from "../_metronic/layout";
import React, { useEffect } from "react";
import firebase from "../configs/fbconfig";
export function Routes() {
  const history=useHistory()
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized:
        auth.user?.role === "admin" || auth.user?.role === "artist"
          ? true
          : false,
      user: auth.user,
    }),
    shallowEqual
  );
  useEffect(() => {
    if(user?.id){
      firebase
      .firestore()
      .collection("users")
      .doc(user.id).onSnapshot((snapshot) => {
        
        console.log(snapshot.data());
        if (snapshot.data().role === "user") {
          history.push("/logout");
        } 
      });
    }
   
  },[user]);
  console.log(user);
  return (
    <Switch>
      <Layout>
          <BasePage  />
      </Layout>
      {/* {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage user={user} />
        </Layout>
      )} */}
    </Switch>
  );
}
