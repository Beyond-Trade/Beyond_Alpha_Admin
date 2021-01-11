/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import firebase, { db } from "../../../../configs/fbconfig";

import { Facebook } from "react-content-loader";
import { ModalProgressBar } from "../../controls";
import SVG from "react-inlinesvg";
import { TotalArtists } from "../AnalyticsComponents/Artists";
import { TotalAudios } from "../AnalyticsComponents/AudioSongs";
import { TotalPaidUsers } from "../AnalyticsComponents/PaidUsers";
import { TotalUnPaidUsers } from "../AnalyticsComponents/UnpaidUsers";
import { TotalUsers } from "../AnalyticsComponents/Users";
import { TotalVideos } from "../AnalyticsComponents/VideoSongs";

export function Analytics({ className }) {
  return (
    <>
      <div className={`card card-custom p-5 ${className}`}>
        {/* Header */}
        <div
          className="card-header p-0 border-0 mb-5"
          style={{ minHeight: "0px" }}
        >
          <h3 className="card-title font-weight-bolder text-dark">Analytics</h3>

          {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
        </div>
        {/* Body */}
        <div className="card-body p-0">
          <div className="row">
            <div className="col">
              <TotalUsers />
            </div>
            <div className="col">
              <TotalPaidUsers />
            </div>
            <div className="col">
              <TotalUnPaidUsers />
            </div>
            <div className="col">
              <TotalArtists />
            </div>
            <div className="col">
              <TotalVideos />
            </div>
            <div className="col">
              <TotalAudios />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
