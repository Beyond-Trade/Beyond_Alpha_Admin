import { Button, Dropdown, Modal } from "react-bootstrap";
import { DropdownCustomToggler, DropdownMenu2 } from "../../dropdowns";
import { Link, useHistory, useLocation } from "react-router-dom";
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import firebase, { db } from "../../../../configs/fbconfig";
import { shallowEqual, useSelector } from "react-redux";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Facebook } from "react-content-loader";
import { ModalProgressBar } from "../../controls";
import SVG from "react-inlinesvg";
import VideoSongDeleteModal from "../Modals/VideoSongDeleteModal";
import VideoSongPlayerModal from "../Modals/VideoSongPlayerModal";
import { toAbsoluteUrl } from "../../../_helpers";
import Paginate from "../../../../app/components/Pagination";

const MyFacebookLoader = () => <Facebook />;
export function VideoWidget({ className }) {
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual
  );
  const location = useLocation();
  const history = useHistory();
  const [isSongsEmpty, setIsSongsEmpty] = useState(false);
  const [songs, setSongs] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingImgUrl, setDeletingImgUrl] = useState("");
  const [deletingDocId, setDeletingDocId] = useState("");
  const [deletingAudioUrl, setDeletingAudioUrl] = useState("");
  const [search,setSearch]=useState("")
  const [activePage, setactivePage] = useState(1);
  const [playListData, setPlayListData] = useState({
    show: false,
    poster: "",
    fileUrl: "",
    title: "",
    artist: "",
    viewCount: "",
  });

  const palyListOnHide = () => {
    setPlayListData({
      show: false,
      poster: "",
      fileUrl: "",
      title: "",
      artist: "",
      viewCount: "",
    });
  };
  const handlePlaylist = (poster, fileUrl, title, artist, viewCount) => {
    setPlayListData({
      show: true,
      poster: poster,
      fileUrl: fileUrl,
      title: title,
      artist: artist,
      viewCount: viewCount,
    });
  };
  const onHide = () => {
    setShow(false);
    setDeletingImgUrl("");
    setDeletingDocId("");
  };
  const handleModel = (imgUrl, docId, audioUrl) => {
    setShow(true);
    setDeletingImgUrl(imgUrl);
    setDeletingDocId(docId);
    setDeletingAudioUrl(audioUrl);
  };
  const handleDelete = async () => {
    setIsLoading(true);
    var storage = firebase.storage();
    const audioStorageRef = storage.refFromURL(deletingAudioUrl);
    // Delete the file
    await audioStorageRef
      .delete()
      .then(function() {
        console.log("File deleted successfully");
      })
      .catch(function(error) {
        console.log("Uh-oh, an error occurred!");
      });

    const db = firebase.firestore();
    const res = await db
      .collection("videos")
      .doc(deletingDocId)
      .delete()
      .then(() => {
        setIsLoading(false);
        setShow(false);
        setDeletingImgUrl("");
        setDeletingDocId("");
      });
    console.log(res);
  };

  useEffect(() => {
    const db = firebase.firestore();

    setIsSongsEmpty(false);
    if (location.pathname === "/my_video_songs") {
      return db
        .collection("videos")
        .where("artistId", "==", user.id)
        .orderBy("title").limit(12)
        .onSnapshot((snapshot) => {
          const songsData = [];
          snapshot.forEach((doc) =>
            songsData.push({ ...doc.data(), id: doc.id })
          );
          if (songsData.length === 0) {
            setIsSongsEmpty(true);
          }
          console.log(songsData); // <------
          setSongs(songsData);
        });
    } else {
      return db.collection("videos").orderBy("title").limit(12).onSnapshot((snapshot) => {
        setIsSongsEmpty(false);
        if (snapshot.empty) {
          setIsSongsEmpty(true);
        }
        const songsData = [];
        snapshot.forEach((doc) =>
          songsData.push({ ...doc.data(), id: doc.id })
        );
        if (!songsData.length > 0) {
          setIsSongsEmpty(true);
        }
        console.log(songsData); // <------
        setSongs(songsData);
      });
    }
  }, []);
  

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleNextClick = () => {
    getPaginatedData(activePage + 1);
  };
  const handlePreviousClick = () => {
    if (activePage === 1) return;
    getPaginatedData(activePage - 1);
  };
  const getPaginatedData = (pageNo) => {
    // console.log(pageNo);
    let query = db
    .collection("videos")
    .orderBy("title");
    if (location.pathname === "/my_video_songs") {
      query=db .collection("videos")
      .where("artistId", "==", user.id)
      .orderBy("title");
    }

    if (pageNo > activePage) {
      query = query
        .startAfter(songs[songs.length - 1].title)
        .limit(12);
    }
    if (pageNo < activePage) {
      query = query
        // .orderBy("firstName")
        .endBefore(songs[0].title)
        .limitToLast(12);
    }
    if (pageNo > activePage || pageNo < activePage) {
      query
        .get()
        .then((res) => {
          console.log(res);
          let songsData = [];
          res.forEach((element) => {
            console.log(element);
            songsData.push({ id: element.id, ...element.data() });
          });
          setSongs((prev) => (songsData.length > 0 ? songsData : prev));
          setactivePage((prev) =>
          songsData.length > 0 ? pageNo : activePage
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
     <div className="d-flex justify-content-end mb-4 px-2">
    <i className="flaticon-search mr-3" />
    <input
      type="text"
      value={search}
      style={{
        border: "0px",
        outline: "0px",
        borderBottom: "1px solid ",
        backgroundColor:"transparent"
      }}
      placeholder="SEARCH"
      onChange={handleSearch}
    />
  </div>
      <div className={`card card-custom p-5 ${className}`}>
        {/* Header */}
        <div
          className="card-header p-0 border-0 mb-5"
          style={{ minHeight: "0px" }}
        >
          <div className="d-flex flex-row align-items-center">
            <i className="fas fa-video mr-3"></i>
            <h3 className="card-title font-weight-bolder text-dark">Videos</h3>
          </div>
          {user && user.role === "admin" ? (
            <Button
              color="primary"
              onClick={() => history.push("/add_video_song")}
            >
              Add Video song
            </Button>
          ) : null}
          {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
        </div>
        {/* Body */}
        <div className="card-body p-0">
          <div className="row">
            {songs && songs.length > 0 ? (
              songs.filter((data) =>
              (
                data.title.toLowerCase()
              ).includes(search.toLowerCase())
            ).map((song, index) => (
                <div className="col-sm-3 mb-5" key={index}>
                  <div
                    className="card w-100"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        backgroundImage: `url(${song.poster})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      onClick={() =>
                        handlePlaylist(
                          song.poster,
                          song.fileUrl,
                          song.title,
                          song.artist,
                          song.viewCount
                        )
                      }
                    >
                      {/* <p
                        className="card-text"
                        style={{
                          position: "absolute",
                          bottom: user.role === "admin" ? "190px" : "150px",
                          right: "16px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {song.duration}
                      </p> */}
                    </div>

                    <div className="card-body">
                      {song.title.length > 20 ? (
                        <h3
                          className="card-text"
                          onClick={() =>
                            handlePlaylist(
                              song.poster,
                              song.fileUrl,
                              song.title,
                              song.artist,
                              song.viewCount
                            )
                          }
                        >{`${song.title.substring(0, 10)}....`}</h3>
                      ) : (
                        <h3
                          className="m-0"
                          onClick={() =>
                            handlePlaylist(
                              song.poster,
                              song.fileUrl,
                              song.title,
                              song.artist,
                              song.viewCount
                            )
                          }
                        >
                          {song.title}
                        </h3>
                      )}

                      <div className="d-flex flex-row mt-3">
                        <p className="mr-2 mb-3">Artist : </p>

                        <p className="card-text mb-3" style={{ color: "gray" }}>
                          {song.artist}
                        </p>
                      </div>
                      <div className="d-flex flex-row">
                        <p className="mr-2">Duration : </p>

                        <p className="card-text" style={{ color: "gray" }}>
                          {song.duration}
                        </p>
                      </div>
                      <div className="d-flex flex-row">
                        <i className="flaticon-eye icon-lg mr-3"> </i>

                        <p className="card-text my-auto">{song.viewCount}</p>
                      </div>

                      {user && user.role === "admin" ? (
                        <div className="d-flex flex-row justify-content-around mt-3">
                          <p
                            className="card-text text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleModel(song.poster, song.id, song.fileUrl)
                            }
                          >
                            DELETE
                          </p>
                          <p style={{ opacity: 0.5 }}>{" | "}</p>
                          <p
                            style={{ cursor: "pointer" }}
                            className="card-text text-success"
                            onClick={() =>
                              history.push(`/edit_video_song/${song.id}`)
                            }
                          >
                            EDIT
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            ) : isSongsEmpty ? (
              <p className="mx-auto">No record found</p>
            ) : (
              <div className="col-sm-4 mb-5">
                <MyFacebookLoader />
              </div>
            )}
          </div>
          {songs ? (
            <div className="float-right">
              <Paginate
                activePage={activePage}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}
              />
            </div>
          ) : null}
        </div>
      </div>
      <VideoSongDeleteModal
        show={show}
        onHide={onHide}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
      <VideoSongPlayerModal
        playListData={playListData}
        onHide={palyListOnHide}
      />
    </>
  );
}
