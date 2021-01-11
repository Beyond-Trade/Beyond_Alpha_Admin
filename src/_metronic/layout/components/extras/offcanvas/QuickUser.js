/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */

import { shallowEqual, useSelector } from "react-redux";

import React from "react";
import SVG from "react-inlinesvg";
import firebase from "../../../../../configs/fbconfig";
import { toAbsoluteUrl } from "../../../../_helpers";
import { useHistory } from "react-router-dom";

export function QuickUser() {
  const history = useHistory();
  const name = firebase.auth().currentUser;
  console.log("------------ NAME ---------", name);

  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual
  );
  const logoutClick = () => {
    const toggle = document.getElementById("kt_quick_user_toggle");
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("in THEN BLOCK")
        // Sign-out successful.
      if(user.role === "artist"){
        firebase
        .firestore()
        .collection("artists")
        .doc(user.id).set({isActive:false}, { merge: true })
      }
      else{
        firebase
              .firestore()
              .collection("users")
              .doc(user.id).set({isActive:false}, { merge: true })
      }
              console.log("in THEN BLOCK AFTER ISACTIVE FALSE")
        if (toggle) {
          toggle.click();
        }
        history.push("/logout");
      })
      .catch(function(error) {
        // An error happened.
      });
  };
  return (
    <div
      id="kt_quick_user"
      className="offcanvas offcanvas-right offcanvas p-5"
      style={{ height: "200px", width: "330px" }}
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 className="font-weight-bold m-0">
          User Profile
          {/* <small className="text-muted font-size-sm ml-2">12 messages</small> */}
        </h3>
        <a
          href="#"
          className="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i className="ki ki-close icon-xs text-muted" />
        </a>
      </div>

      <div className="" style={{ height: "auto" }}>
        <div className="d-flex align-items-center mt-5">
          <div className="symbol symbol-100 mr-5">
            {user.role === "admin" ? (
              <span
                className="bg-light-success text-success symbol-label font-weight-bold"
                style={{ fontSize: "50px" }}
              >
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <div
                className="symbol-label"
                style={{
                  backgroundImage: `url(${user.imgUrl || user.profilePicture})`,
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
          <div className="d-flex flex-column">
            <a
              href="#"
              className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {user.role === "admin"
                ? user.fullName
                : user.firstName + " " + user.lastName}
            </a>
            <div className="text-muted mt-1">{user.role}</div>
            {/* <div className="navi mt-2">
              <a href="#" className="navi-item">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon-lg svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Mail-notification.svg"
                        )}
                      ></SVG>
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary">
                    {user.email}
                  </span>
                </span>
              </a>
            </div> */}
            {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
            <button
              className="btn btn-light-primary btn-bold"
              onClick={logoutClick}
            >
              Sign out
            </button>
          </div>
        </div>

        {/* <div className="separator separator-dashed mt-8 mb-5" /> */}

        {/* <div className="navi navi-spacer-x-0 p-0">
          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-success">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/General/Notification2.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Profile</div>
                <div className="text-muted">
                  Account settings and more{" "}
                  <span className="label label-light-danger label-inline font-weight-bold">
                    update
                  </span>
                </div>
              </div>
            </div>
          </a>

          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-warning">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Shopping/Chart-bar1.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Messages</div>
                <div className="text-muted">Inbox and tasks</div>
              </div>
            </div>
          </a>

          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Files/Selected-file.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Activities</div>
                <div className="text-muted">Logs and notifications</div>
              </div>
            </div>
          </a>

          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Communication/Mail-opened.svg"
                      )}
                    ></SVG>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Tasks</div>
                <div className="text-muted">latest tasks and projects</div>
              </div>
            </div>
          </a>
        </div> */}

        {/* <div className="separator separator-dashed my-7"></div>

        <div>
          <h5 className="mb-5">Recent Notifications</h5>

          <div className="d-flex align-items-center bg-light-warning rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-warning mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Another purpose persuade
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-warning py-1 font-size-lg">
              +28%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-success rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-success mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Would be to people
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-success py-1 font-size-lg">
              +50%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-danger rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-danger mr-5">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Group-chat.svg"
                )}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Purpose would be to persuade
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-danger py-1 font-size-lg">
              -27%
            </span>
          </div>

          <div className="d-flex align-items-center bg-light-info rounded p-5">
            <span className="svg-icon svg-icon-info mr-5">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
                className="svg-icon svg-icon-lg"
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                The best product
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-info py-1 font-size-lg">
              +8%
            </span>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
