/* eslint-disable jsx-a11y/anchor-is-valid */

import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

import {
  Link,
  Redirect,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";

import ArtistLogin from "./ArtistLogin";
import ArtistRegistration from "./ArtistRegistration";
import { ContentRoute } from "../../../../_metronic/layout";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import React from "react";
import Registration from "./Registration";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export function AuthPage() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-dark"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${toAbsoluteUrl(
                "/media/bg/leo-wieling-bG8U3kaZltE-unsplash.jpg"
              )})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/logos/favicon.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                {/* <h3 className="font-size-h1 mb-5 text-white">
                  Welcome to MusicApp!
                </h3> */}
                {/* <p className="font-weight-lighter text-white opacity-80">
                  The ultimate Bootstrap & React 16 admin theme framework for
                  next generation web apps.
                </p> */}
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  {/* &copy; 2020 MusicApp */}
                </div>
                {/* <div className="d-flex">
                  <Link to="#" className="text-white">
                    Privacy
                  </Link>
                  <Link to="#" className="text-white ml-10">
                    Legal
                  </Link>
                  <Link to="#" className="text-white ml-10">
                    Contact
                  </Link>
                </div> */}
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            {/*begin::Content header*/}
            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              {location.pathname === "/auth/registration" ||
              location.pathname === "/auth/artist_registration" ||
              location.pathname === "/auth/forgot-password" ? (
                <Link
                  to="/auth/login"
                  className="font-weight-bold text-white ml-2"
                  id="kt_login_signup"
                >
                  Sign In
                </Link>
              ) : (
                <>
                  {/* <span className="font-weight-bold text-white ">
                    Don't have an account yet?
                  </span> */}
                  <Link
                    to="/auth/artist_registration"
                    className="font-weight-bold text-white ml-2"
                    id="kt_login_signup"
                  >
                    Sign Up As Artist!
                  </Link>
                </>
              )}
            </div>
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/artist_login"
                  component={ArtistLogin}
                />
                <ContentRoute
                  path="/auth/artist_registration"
                  component={ArtistRegistration}
                />
                {/* <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                /> */}
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />

                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2020 Metronic
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Legal
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
