import { Button, Form, Modal, ProgressBar, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Facebook } from "react-content-loader";
import ItemsCarousel from "react-items-carousel";
import Select from "react-select";
import deepai from "deepai";
import firebase from "../../../configs/fbconfig";

const MyFacebookLoader = () => <Facebook />;
export function EditVideoSong() {
  const history = useHistory();
  const params = useParams();
  console.log(params);
  const [songs, setSongs] = useState();
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [invalidVideoExtension, setInvalidVideoExtension] = useState(false);
  const [imgMaturityMessage, setImgMaturityMessage] = useState("");
  const [artistsSelectedOption, setArtistsSelectedOption] = useState(undefined);
  const [albumsSelectedOption, setAlbumsSelectedOption] = useState(undefined);
  const [genresSelectedOption, setGenresSelectedOption] = useState(undefined);
  const [genresOption, setGenresOption] = useState(undefined);
  const [artistsOptios, setArtistsOptios] = useState(undefined);
  const [albumsOptios, setAlbumsOptios] = useState([]);
  const [artists, setArtists] = useState();
  const [albums, setAlbums] = useState(undefined);
  const [isSubmit, setIsSubmit] = useState(false);
  const [duration, setDuration] = useState(undefined);
  const [fileUrl, setFileUrl] = useState(undefined);
  const [audioProgressBar, setAudioProgressBar] = useState(false);
  const [imageProgressBar, setImageProgressBar] = useState(false);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [videofileToUpload, setVideoFileToUpload] = useState(undefined);
  const [imagefileToUpload, setImagefileToUpload] = useState(undefined);
  const [fileMetaData, setFileMetaData] = useState(undefined);
  const [songTitle, setSongTitle] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);
  const [price, setPrice] = useState("");
  const [selectionError, setSelectionError] = useState("");
  // const handleAristOption = (selectedOption) => {
  //   setAlbumsSelectedOption(null);
  //   setArtistsSelectedOption(selectedOption);
  //   console.log(`Option selected:`, selectedOption);
  // };
  const handleAlbumOption = (selectedOption) => {
    setAlbumsSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const handleGenreOption = (selectedOption) => {
    setGenresSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  const uploadFile = async () => {
    var storage = firebase.storage();

    if (videofileToUpload) {
      const audioStorageRef = storage.ref(
        `videos/${albumsSelectedOption.value}/${videofileToUpload.name}`
      );
      await audioStorageRef.put(videofileToUpload).on(
        "state_changed",
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setAudioProgressBar(Math.floor(progress));
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          // Handle successful uploads on complete
          audioStorageRef.getDownloadURL().then(function(downloadURL) {
            console.log("Audio File available at", downloadURL);
            setFileUrl(downloadURL);
            audioStorageRef
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
    }

    if (imagefileToUpload) {
      const imageStorageRef = storage.ref(
        `videos/${albumsSelectedOption.value}/${
          albumsSelectedOption.value
        }${"-"}${"album-art"}/${imagefileToUpload.name}`
      );
      console.log("image url => ", imageStorageRef);
      await imageStorageRef.put(imagefileToUpload).on(
        "state_changed",
        function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setImageProgressBar(Math.floor(progress));
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          // Handle successful uploads on complete
          imageStorageRef.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            setImageUrl(downloadURL);
          });
        }
      );
    }
    //
  };

  const handleVideoFileUpload = (e) => {
    if (e?.target?.files[0]) {
      console.log(e.target.files[0].type.split("/"));
      const res = e.target.files[0].type.split("/");
      if (
        res[0] === "video" ||
        res[1] === "video" ||
        res[0] === "mp4" ||
        res[1] === "mp4"
      ) {
        setInvalidVideoExtension(false);
        console.log(e.target);

        console.log("file exxtension matched");
        setVideoFileToUpload(e.target.files[0]);
      } else {
        setInvalidVideoExtension(true);
      }
    } else {
      setVideoFileToUpload(undefined);
    }
  };
  const splitByLastDot = (text) => {
    var index = text.lastIndexOf(".");
    return [text.slice(0, index), text.slice(index + 1)];
  };
  const handleImageFileUpload = async (e) => {
    if (e?.target?.files[0]) {
      const res = splitByLastDot(e.target.files[0].name);
      console.log(res[1]);
      if (res[1] === "jpeg" || res[1] === "jpg" || res[1] === "png") {
        setImagefileToUpload(e.target.files[0]);
        setImgMaturityMessage("");
        deepai.setApiKey(process.env.REACT_APP_DEEPAI_API_KEY);
        var result = await deepai.callStandardApi("content-moderation", {
          image: document.getElementById("yourFilePickerId"),
        });
        console.log(result);
        if (result && result.output.nsfw_score > 0.5) {
          console.log("image is not safe for work");
          setImgMaturityMessage(
            "The content of this image is impropriate for some users, please select other cover image."
          );
          setImagefileToUpload(undefined);
        }
        setFileErrorMessage("");
      } else {
        setImagefileToUpload(undefined);
        setFileErrorMessage(
          "* Please chose files with '.jpg','.jpeg' or '.png' ."
        );
      }
    } else {
      setImagefileToUpload(undefined);
    }
  };

  useEffect(() => {}, [fileUrl, fileMetaData]);

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("artists").onSnapshot((snapshot) => {
      const artistsData = [];
      snapshot.forEach((doc) =>
        artistsData.push({ ...doc.data(), id: doc.id })
      );
      console.log(artistsData); // <------
      setArtists(artistsData);
    });
  }, []);
  const addHyphens = (toChange) => {
    return toChange.replace(/\s+/g, "-").toLowerCase();
  };
  const uploadDocument = async () => {
    if (videofileToUpload && imagefileToUpload) {
      setSelectionError("");
      setIsSubmit(true);
      await uploadFile();
    } else if (!videofileToUpload && !imagefileToUpload) {
      setSelectionError("");
      setIsSubmit(true);
      const allData = {
        albumId: albumsSelectedOption.value,
        genreId: genresSelectedOption.value,
        isActive: isActive,
        updatedAt: new Date(),
        isExclusive: isExclusive,
        price: isExclusive ? price : 0,
      };
      firebase
        .firestore()
        .collection("videos")
        .doc(songs.id)
        .set(allData, { merge: true })
        .then(() => {
          history.push("/video_songs");
        });
      console.log(allData);
    } else {
      setSelectionError(
        "Please select the both video and image file or unselect the selected one."
      );
      console.log("please select the both video and image file");
    }
  };
  useEffect(() => {
    if (fileUrl && duration && imageUrl) {
      const allData = {
        albumId: albumsSelectedOption.value,
        artwork: imageUrl,
        duration: duration,
        fileUrl: fileUrl,
        genreId: genresSelectedOption.value,
        isActive: isActive,
        updatedAt: new Date(),
        url: fileUrl,
        isExclusive: isExclusive,
        price: isExclusive ? price : 0,
      };
      console.log(allData);
      firebase
        .firestore()
        .collection("videos")
        .doc(songs.id)
        .set(allData, { merge: true })
        .then(() => {
          history.push("/video_songs");
        });
    }
  }, [fileUrl, fileMetaData, duration, imageUrl]);

  // get document by docId
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("videos")
      .doc(params.id)
      .get()
      .then((docRef) => {
        console.log(docRef.data());
        setSongs(docRef.data());
        setSongTitle(docRef.data().title);
        setIsExclusive(docRef.data().isExclusive);
        setPrice(docRef.data().price);
        setIsActive(docRef.data().isActive);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("genre").onSnapshot((snapshot) => {
      const genresData = [];
      snapshot.forEach((doc) => genresData.push({ ...doc.data(), id: doc.id }));
      console.log(genresData);
      const genresOPtion = [];
      genresData.forEach((genre) => {
        genresOPtion.push({ label: genre.title, value: genre.id });
      });
      console.log("genresOPtion", genresOPtion);
      setGenresOption(genresOPtion);
    });
  }, []);
  //   set selected genre useEffect
  useEffect(() => {
    if (genresOption && songs && genresOption.length >= 1) {
      console.log("in genre  outer if set");
      genresOption.forEach((genre) => {
        console.log("in genre  foreach");
        if (genre.value === songs.genreId) {
          console.log("in genre if set");
          setGenresSelectedOption({ label: genre.label, value: genre.value });
        }
      });
    }
  }, [genresOption, songs]);
  //   set selected artist useEffect
  useEffect(() => {
    if (artistsOptios && songs && artistsOptios.length >= 1) {
      console.log("in artist  outer if set");
      artistsOptios.forEach((artist) => {
        console.log("in artist  foreach");
        if (artist.value === songs.artistId) {
          console.log("in artist if set");
          setArtistsSelectedOption({
            label: artist.label,
            value: artist.value,
          });
        }
      });
    }
  }, [artistsOptios, songs]);
  //   set selected album useEffect
  useEffect(() => {
    if (albumsOptios && songs && albumsOptios.length >= 1) {
      console.log("in artist  outer if set");
      albumsOptios.forEach((albums) => {
        console.log("in artist  foreach");
        if (albums.value === songs.albumId) {
          console.log("in artist if set");
          setAlbumsSelectedOption({
            label: albums.label,
            value: albums.value,
          });
        }
      });
    }
  }, [albumsOptios, songs]);
  console.log(songs);
  useEffect(() => {
    const options = [];
    if (artists) {
      artists.forEach((artist) =>
        options.push({
          label: `${artist.firstName}${" "}${artist.lastName}`,
          value: artist.id,
        })
      );
    }
    setArtistsOptios(options);
  }, [artists]);
  useEffect(() => {
    const db = firebase.firestore();
    albumsOptios.length = 0;
    if (artistsSelectedOption) {
      const AlbumsData = [];
      db.collection("albums")
        .where("artistId", "==", artistsSelectedOption.value)
        .get()
        .then((res) =>
          res.forEach((doc) => {
            AlbumsData.push(doc.data());
            setAlbumsOptios((oldArray) => [
              ...oldArray,
              {
                label: doc.data().title,
                value: doc.data().id,
              },
            ]);
            console.log(doc.id, "=>", doc.data().title);
          })
        );
      setAlbums(AlbumsData);
    }
  }, [artistsSelectedOption]);

  console.log(albumsOptios);
  return (
    <>
      <div className={`card card-custom p-5 card-stretch gutter-b`}>
        {/* Header */}
        {songs ? (
          <>
            <div
              className="card-header p-0 border-0 mb-5"
              style={{ minHeight: "0px" }}
            >
              <div className="d-flex flex-row align-items-center">
                <i className="fas fa-video mr-3"></i>
                <h3 className="card-title font-weight-bolder text-dark">
                  Edit {songTitle} Video
                </h3>
              </div>

              {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
            </div>
            {/* Body */}
            <div className="card-body p-0">
              <form>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    defaultValue={songTitle}
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    disabled
                    // onChange={(e) => setSongTitle(e.target.value)}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Genre</label>
                      <Select
                        value={genresSelectedOption}
                        onChange={handleGenreOption}
                        options={genresOption}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Artist</label>
                      <input
                        defaultValue={
                          artistsSelectedOption
                            ? artistsSelectedOption.label
                            : ""
                        }
                        type="text"
                        className="form-control"
                        placeholder="Enter title"
                        disabled
                        // onChange={(e) => setSongTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Album</label>
                      <Select
                        value={albumsSelectedOption}
                        onChange={handleAlbumOption}
                        options={albumsOptios}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                </div>
                <>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <div
                          style={{
                            width: "50%",
                            height: "200px",
                            backgroundImage: `url(${songs.poster})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            cursor: "pointer",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Upload Video Song To Update</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="exampleFormControlFile1"
                          onChange={handleVideoFileUpload}
                        />
                        {invalidVideoExtension ? (
                          <small className="form-text text-danger">
                            Please chose mp4 file
                          </small>
                        ) : null}
                      </div>
                      {isSubmit && videofileToUpload ? (
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
                            now={audioProgressBar}
                            label={`${audioProgressBar}%`}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Upload ArtWork To Update</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="yourFilePickerId"
                          onChange={handleImageFileUpload}
                        />
                      </div>
                      {isSubmit && imagefileToUpload ? (
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
                            now={imageProgressBar}
                            label={`${imageProgressBar}%`}
                          />
                        </div>
                      ) : null}
                    </div>
                    {fileErrorMessage ? (
                      <p className="text-danger mt-2">{fileErrorMessage}</p>
                    ) : null}
                    {imgMaturityMessage ? (
                      <p className="text-danger mt-2">
                        {"* "}
                        {imgMaturityMessage}
                      </p>
                    ) : null}
                  </div>
                </>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    checked={isActive}
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={() => setIsActive(!isActive)}
                  />
                  <label className="form-check-label">IsActive</label>
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    checked={isExclusive}
                    className="form-check-input"
                    onChange={() => setIsExclusive(!isExclusive)}
                  />
                  <label className="form-check-label">IsExclusive</label>
                </div>
                {isExclusive ? (
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Price in $</label>
                        <input
                          value={price}
                          type="text"
                          className="form-control"
                          placeholder="Enter price"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                {selectionError ? (
                  <small className="form-text text-danger">
                    {selectionError}
                  </small>
                ) : null}
              </form>
              <audio
                hidden={true}
                controls="controls"
                onLoadedMetadata={(event) => setDuration(event.target.duration)}
                src={fileUrl}
                // src="https://firebasestorage.googleapis.com/v0/b/musicapp-956bc.appspot.com/o/songs%2Fdrake-scorpion%2F2018-11-23_-_Trusted_News_v2_-_David_Fesliyan.mp3?alt=media&token=a8a90950-86c9-4cb1-b7d7-110c56e4df7a"
              />
              <div className="float-right">
                <Button
                  variant="white"
                  type="submit"
                  onClick={() => history.push("/video_songs")}
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
                    disabled={imgMaturityMessage ? true : false}
                    onClick={uploadDocument}
                  >
                    Update
                  </Button>
                )}
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
