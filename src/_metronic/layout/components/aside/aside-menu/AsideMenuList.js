/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */

import { checkIsActive, toAbsoluteUrl } from "../../../../_helpers";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { NavLink } from "react-router-dom";
import React from "react";
import SVG from "react-inlinesvg";
import firebase from "../../../../../configs/fbconfig";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const history = useHistory();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };
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
        // Sign-out successful.
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
    <>
      {/* begin::Menu Nav */}

      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
       
            <li
              className={`menu-item ${getMenuItemActive("/", false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                  />
                </span>
                <span className="menu-text">Dashboard</span>
              </NavLink>
            </li>
            {/* <li
              className={`menu-item ${getMenuItemActive("/changes", false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/changes">
                <span className="svg-icon menu-icon">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                  />
                </span>
                <span className="menu-text">Changes</span>
              </NavLink>
            </li> */}
            
        {/* <li
          className={`menu-item menu-item-submenu ${getMenuItemActive(
            "/songs",
            true
          )}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/songs">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Media/Music.svg")} />
            </span>
            <span className="menu-text">
              {user.role === "artist" ? "All Songs" : "Songs"}
            </span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Songs</span>
                </span>
              </li>
              <li
                className={`menu-item ${getMenuItemActive("/audio_songs")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/audio_songs">
                  <span className="svg-icon menu-icon">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Media/Music.svg")}
                    />
                  </span>
                  <span className="menu-text">Audio Songs</span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive("/video_songs")}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to="/video_songs">
                  <span className="svg-icon menu-icon">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Devices/Video-camera.svg"
                      )}
                    />
                  </span>
                  <span className="menu-text">Video Songs</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li> */}
       
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
