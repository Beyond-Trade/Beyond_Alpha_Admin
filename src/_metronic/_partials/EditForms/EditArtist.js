import { Button, ProgressBar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Facebook } from "react-content-loader";
import Select from "react-select";
import deepai from "deepai";
import firebase from "../../../configs/fbconfig";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
const MyFacebookLoader = () => <Facebook />;
export function EditArtist() {
  const history = useHistory();
  const params = useParams();
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [artist, setArtist] = useState(undefined);
  const [firstName, setFirstName] = useState("");
  const [fileUrl, setFileUrl] = useState(undefined);
  const [lastName, setLastName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [progressBar, setProgressBar] = useState(undefined);
  const [fileToUpload, setFileToUpload] = useState(undefined);
  const [fileMetaData, setFileMetaData] = useState(undefined);

  const uploadFile = async () => {
    console.log(
      `artists/${addHyphens(firstName)}${"-"}${addHyphens(lastName)}`
    );
    var storage = firebase.storage();
    const storageRef = storage.ref(
      `artists/${addHyphens(firstName)}${"-"}${addHyphens(
        lastName
      )}${"."}${fileToUpload.name.slice(
        ((fileToUpload.name.lastIndexOf(".") - 1) >>> 0) + 2
      )}`
    );
    await storageRef.put(fileToUpload).on(
      "state_changed",
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressBar(progress);
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        storageRef.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          setFileUrl(downloadURL);
          storageRef
            .getMetadata()
            .then(function(metadata) {
              console.log(metadata);
              setFileMetaData(metadata);
            })
            .catch(function(error) {
              // Uh-oh, an error occurred!
              console.log("in cath");
            });
        });
      }
    );
  };
  console.log(fileUrl);
  const splitByLastDot = (text) => {
    var index = text.lastIndexOf(".");
    return [text.slice(0, index), text.slice(index + 1)];
  };
  const handleFileUpload = (e) => {
    if (e?.target?.files[0]) {
      const res = splitByLastDot(e.target.files[0].name);
      console.log(res[1]);
      if (res[1] === "jpeg" || res[1] === "jpg" || res[1] === "png") {
        setFileToUpload(e.target.files[0]);
        setFileErrorMessage("");
      } else {
        setFileToUpload(undefined);
        setFileErrorMessage(
          "* Please chose files with '.jpg','.jpeg' or '.png' ."
        );
      }
      console.log(e.target.files[0]);
    } else {
      setFileToUpload(undefined);
    }
  };

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("artists")
      .doc(params.id)
      .get()
      .then((docRef) => {
        console.log(docRef.data());
        setArtist(docRef.data());
        setFirstName(docRef.data().firstName);
        setLastName(docRef.data().lastName);
      })
      .catch((error) => {});
  }, []);
  const addHyphens = (toChange) => {
    return toChange.replace(/\s+/g, "-").toLowerCase();
  };
  const uploadDocument = async () => {
    setFileErrorMessage("");
    if (fileToUpload) {
      if (fileToUpload.size <= 2097152) {
        setIsSubmit(true);
        await uploadFile();
      } else {
        setFileErrorMessage("* File size should be 2Mb or less than 2MB.");
      }
    }
  };
  useEffect(() => {
    if (fileUrl) {
      console.log("fileMetaData", fileMetaData);
      const allData = {
        imgUrl: fileUrl,
        updatedAt: new Date(),
      };
      console.log(allData);

      firebase
        .firestore()
        .collection("artists")
        .doc(params.id)
        .set(allData, { merge: true })
        .then(() => {
          history.push("/artists");
        });
    }
  }, [fileUrl]);

  return (
    <>
      <div className={`card card-custom p-5 card-stretch gutter-b`}>
        {artist ? (
          <>
            {/* Header */}
            <div
              className="card-header p-0 border-0 mb-5"
              style={{ minHeight: "0px" }}
            >
              <h3 className="card-title font-weight-bolder text-dark">
                Edit {firstName} {lastName}
              </h3>

              {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
            </div>
            {/* Body */}
            <div className="card-body p-0">
              <form>
                <div className="form-group">
                  <label>First name</label>
                  <input
                    value={firstName}
                    type="text"
                    className="form-control"
                    placeholder="Enter FirstName"
                    // onChange={(e) => setFirstName(e.target.value)}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    value={lastName}
                    type="text"
                    className="form-control"
                    placeholder="Enter LastName"
                    // onChange={(e) => setLastName(e.target.value)}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6">
                      <label>Current image</label>
                      <div
                        style={{
                          width: "50%",
                          height: "200px",
                          backgroundImage: `url(${artist.imgUrl})`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          cursor: "pointer",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                {firstName && lastName ? (
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Upload image</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="yourFilePickerId"
                          onChange={handleFileUpload}
                          placeholder="hellooooooo"
                        />
                      </div>
                      {isSubmit ? (
                        <div
                          className="col"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                          }}
                        >
                          <ProgressBar
                            animated
                            now={progressBar}
                            label={`${progressBar}%`}
                          />
                        </div>
                      ) : null}
                    </div>
                    {fileErrorMessage ? (
                      <p className="text-danger mt-2">{fileErrorMessage}</p>
                    ) : null}
                  </div>
                ) : null}
              </form>
              <div className="float-right">
                <Button
                  variant="white"
                  type="submit"
                  onClick={() => history.push("/artists")}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={uploadDocument}
                  disabled={
                    firstName && lastName && fileToUpload ? false : true
                  }
                >
                  Update
                </Button>
              </div>
            </div>
          </>
        ) : (
          <MyFacebookLoader />
        )}
      </div>
    </>
  );
}
