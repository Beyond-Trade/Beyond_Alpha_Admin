/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import firebase, { db } from "../../../../configs/fbconfig";

import { Facebook } from "react-content-loader";
import { ModalProgressBar } from "../../controls";
import SVG from "react-inlinesvg";

const MyFacebookLoader = () => <Facebook />;
export function TotalUsers({ className }) {
  const [usersCount, setUsersCount] = useState(null);
  useEffect(() => {
    db.collection("users")
      .where("role", "==", "user")
      .get()
      .then((snapshot) => setUsersCount(snapshot.size));
  });
  return (
    <div className="col bg-light-success px-6 py-8 rounded-xl mr-7 mb-7">
      <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
        <div className="text-success font-weight-bold font-size-h2">
          {usersCount ? (
            <div>{usersCount}</div>
          ) : (
            <div className="text-center">
              <MyFacebookLoader />
            </div>
          )}{" "}
        </div>
      </span>
      <div className="text-success font-weight-bold font-size-h6">Users</div>
    </div>
  );
}
