/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import firebase, { db } from "../../../../configs/fbconfig";

import { Facebook } from "react-content-loader";
import { ModalProgressBar } from "../../controls";
import SVG from "react-inlinesvg";

const MyFacebookLoader = () => <Facebook />;
export function TotalArtists({ className }) {
  const [artistsCount, setArtistsCount] = useState(null);
  useEffect(() => {
    db.collection("artists")
      .get()
      .then((snapshot) => setArtistsCount(snapshot.size));
  });
  return (
    <>
      <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
        <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
          <div className="text-warning font-weight-bold font-size-h2">
            {artistsCount ? (
              <div>{artistsCount}</div>
            ) : (
              <div className="text-center">
                <MyFacebookLoader />
              </div>
            )}{" "}
          </div>
        </span>
        <div className="text-warning font-weight-bold font-size-h6">
          Artists
        </div>
      </div>

      {/*  */}
    </>
  );
}
