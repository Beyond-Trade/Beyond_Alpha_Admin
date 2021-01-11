import { Button, ProgressBar, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Facebook } from "react-content-loader";
import Select from "react-select";
import firebase from "../../../configs/fbconfig";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
const MyFacebookLoader = () => <Facebook />;
export function EditNews() {
  const history = useHistory();
  const params = useParams();
  const [artistsSelectedOption, setArtistsSelectedOption] = useState("");
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [news, setNews] = useState(undefined);
  const [fileUrl, setFileUrl] = useState(undefined);
  const [isSubmit, setIsSubmit] = useState(false);
  const [progressBar, setProgressBar] = useState(undefined);
  const [fileToUpload, setFileToUpload] = useState(undefined);
  const [fileMetaData, setFileMetaData] = useState(undefined);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");

  const uploadFile = async () => {
    let res = splitByLastDot(fileToUpload.name);
    console.log(`news/${"news-"}${res[0]}/${fileToUpload.name}`);
    var storage = firebase.storage();

    const storageRef = storage.ref(
      `news/${"news-"}${res[0]}/${fileToUpload.name}`
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
    if (!fileToUpload) {
      setIsSubmit(true);
      const docId = `${addHyphens(
        artistsSelectedOption ? artistsSelectedOption.label : ""
      )}${"-"}${addHyphens(newsTitle ? newsTitle : "")}`;

      console.log("fileMetaData", fileMetaData);
      const allData = {
        description: newsDescription,
        updatedAt: Date.now(),
      };
      console.log(allData);
      firebase
        .firestore()
        .collection("news")
        .doc(docId)
        .set(allData, { merge: true })
        .then(() => {
          history.push("/posts");
        });
    }
  };
  useEffect(() => {
    if (fileMetaData && fileUrl) {
      const docId = `${addHyphens(
        artistsSelectedOption ? artistsSelectedOption.label : ""
      )}${"-"}${addHyphens(newsTitle ? newsTitle : "")}`;

      console.log("fileMetaData", fileMetaData);
      const allData = {
        imgUrl: fileUrl,
        description: newsDescription,
        updatedAt: Date.now(),
      };
      console.log(allData);
      firebase
        .firestore()
        .collection("news")
        .doc(docId)
        .set(allData, { merge: true })
        .then(() => {
          history.push("/posts");
        });
    }
  }, [fileUrl, fileMetaData]);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("news")
      .doc(params.id)
      .get()
      .then((docRef) => {
        console.log(docRef.data());
        setNews(docRef.data());
        setNewsTitle(docRef.data().title);
        setNewsDescription(docRef.data().description);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    const db = firebase.firestore();
    if (news) {
      db.collection("artists")
        .doc(news.artistId)
        .get()
        .then((docRef) => {
          console.log(docRef.data());
          setArtistsSelectedOption({
            label: docRef.data().firstName + " " + docRef.data().lastName,
            value: docRef.data().id,
          });
        })
        .catch((error) => {});
    }
  }, [news]);

  return (
    <>
      {newsTitle && artistsSelectedOption ? (
        <div className={`card card-custom p-5 card-stretch gutter-b`}>
          {/* Header */}
          <div
            className="card-header p-0 border-0 mb-5"
            style={{ minHeight: "0px" }}
          >
            <h3 className="card-title font-weight-bolder text-dark">
              Edit Post
            </h3>

            {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
          </div>
          {/* Body */}
          <div className="card-body p-0">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  value={newsTitle}
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                  // onChange={(e) => setNewsTitle(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newsDescription}
                  className="form-control"
                  placeholder="Description"
                  rows="8"
                  onChange={(e) => setNewsDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>Artist</label>
                    <input
                      value={
                        artistsSelectedOption ? artistsSelectedOption.label : ""
                      }
                      type="text"
                      className="form-control"
                      placeholder="Enter title"
                      // onChange={(e) => setNewsTitle(e.target.value)}
                      disabled
                    />
                    {/* <Select
                  value={artistsSelectedOption}
                  onChange={handleAristOption}
                  options={artistsOptios}
                  isSearchable={true}
                /> */}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6">
                    <label>Current Poster</label>
                    <div
                      style={{
                        width: "50%",
                        height: "200px",
                        backgroundImage: `url(${news.imgUrl})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        cursor: "pointer",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              {artistsSelectedOption ? (
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6">
                      <label>Upload Poster</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="exampleFormControlFile1"
                        onChange={handleFileUpload}
                      />
                    </div>
                    {isSubmit && fileToUpload ? (
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
                onClick={() => history.push("/posts")}
              >
                Cancel
              </Button>
              {isSubmit ? (
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Updating...
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    newsTitle && artistsSelectedOption && newsDescription
                      ? false
                      : true
                  }
                  onClick={uploadDocument}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <MyFacebookLoader />
      )}
    </>
  );
}
