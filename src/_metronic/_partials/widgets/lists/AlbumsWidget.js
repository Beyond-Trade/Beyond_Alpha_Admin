import { Button, Dropdown, Modal } from "react-bootstrap";
import { DropdownCustomToggler, DropdownMenu2 } from "../../dropdowns";
import { Link, useHistory } from "react-router-dom";
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import firebase, { db } from "../../../../configs/fbconfig";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Facebook } from "react-content-loader";
import { ModalProgressBar } from "../../controls";
import SVG from "react-inlinesvg";
import { stubFalse } from "lodash";
import { toAbsoluteUrl } from "../../../_helpers";
import Paginate from "../../../../app/components/Pagination";

const MyFacebookLoader = () => <Facebook />;
export function AlbumsWidget({ className }) {
  const history = useHistory();
  const [albums, setAlbums] = useState();
  const [iconHoverStyle, setIconHoverStyle] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingImgUrl, setDeletingImgUrl] = useState("");
  const [deletingDocId, setDeletingDocId] = useState("");
  const [albumsIsEmpty, setAlbumsIsEmpty] = useState(false);
  const [search,setSearch]=useState("")
  const [activePage, setactivePage] = useState(1);
  const onHide = () => {
    setShow(false);
    setDeletingImgUrl("");
    setDeletingDocId("");
  };
  const handleModel = (imgUrl, docId) => {
    setShow(true);
    setDeletingImgUrl(imgUrl);
    setDeletingDocId(docId);
  };
  const handleDetail = (id) => {
    history.push(`/album/${id}`);
  };
  // const handleMouseEnter = () => {
  //   setIconHoverStyle("text-primary");
  // };
  // const handleMouseLeave = () => {
  //   setIconHoverStyle("");
  // };
  const handleDelete = async () => {
    setIsLoading(true);
    var storage = firebase.storage();
    const imageStorageRef = storage.refFromURL(deletingImgUrl);

    // Delete the file
    await imageStorageRef
      .delete()
      .then(function() {
        console.log("File deleted successfully");
      })
      .catch(function(error) {
        console.log("Uh-oh, an error occurred!");
      });

    const db = firebase.firestore();
    const batch = db.batch();

    const songsRef = await db
      .collection("songs")
      .where("albumId", "==", deletingDocId)
      .get();
    const videoRef = await db
      .collection("videos")
      .where("albumId", "==", deletingDocId)
      .get();

    songsRef.forEach((doc) => {
      batch.delete(doc.ref);
    });
    videoRef.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    await db
      .collection("albums")
      .doc(deletingDocId)
      .delete()
      .then(() => {
        setIsLoading(false);
        setShow(false);
        setDeletingImgUrl("");
        setDeletingDocId("");
      });

    // const res = await db
    //   .collection("albums")
    //   .doc(deletingDocId)
    //   .delete()
    //   .then(() => {
    //     setIsLoading(false);
    //     setShow(false);
    //     setDeletingImgUrl("");
    //     setDeletingDocId("");
    //   });
    // console.log(res);
  };
  useEffect(() => {
    const db = firebase.firestore();
    let query=db.collection("albums").orderBy("title").limit(12);
    return query
    .onSnapshot((snapshot) => {
      setAlbumsIsEmpty(false);
      if (snapshot.empty) {
        setAlbumsIsEmpty(true);
      }
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      console.log(postData); // <------
      setAlbums(postData);
    });
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
      .collection("albums")
      .orderBy("title");

    if (pageNo > activePage) {
      query = query
        .startAfter(albums[albums.length - 1].title)
        .limit(12);
    }
    if (pageNo < activePage) {
      query = query
        // .orderBy("firstName")
        .endBefore(albums[0].title)
        .limitToLast(12);
    }
    if (pageNo > activePage || pageNo < activePage) {
      query
        .get()
        .then((res) => {
          console.log(res);
          let albumsData = [];
          res.forEach((element) => {
            console.log(element);
            albumsData.push({ id: element.id, ...element.data() });
          });
          setAlbums((prev) => (albumsData.length > 0 ? albumsData : prev));
          setactivePage((prev) =>
          albumsData.length > 0 ? pageNo : activePage
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
          <h3 className="card-title font-weight-bolder text-dark">Albums</h3>
          <Button color="primary" onClick={() => history.push("/add_album")}>
            Add Album
          </Button>
          {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
        </div>
        {/* Body */}
        <div className="card-body p-0">
          <div className="row">
            {albums ? (
              albums.filter((data) =>
              (
                data.title.toLowerCase()
              ).includes(search.toLowerCase())
            ).map((album, index) => (
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
                        backgroundImage: `url(${album.imgUrl})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      onClick={() => handleDetail(album.id)}
                    ></div>

                    <div className="card-body">
                      {album.title.length > 20 ? (
                        <h3
                          className="card-text"
                          onClick={() => handleDetail(album.id)}
                        >{`${album.title.substring(0, 10)}....`}</h3>
                      ) : (
                        <h3
                          className="m-0"
                          onClick={() => handleDetail(album.id)}
                        >
                          {album.title}
                        </h3>
                      )}

                      <p className="card-text" style={{ color: "gray" }}>
                        {album.artist}
                      </p>

                      <div className="d-flex flex-row justify-content-around mt-3">
                        <p
                          className="card-text text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleModel(album.imgUrl, album.id)}
                        >
                          DELETE
                        </p>
                        <p style={{ opacity: 0.5 }}>{" | "}</p>
                        <p
                          style={{ cursor: "pointer" }}
                          className="card-text text-success"
                          onClick={() =>
                            history.push(`/edit_album/${album.id}`)
                          }
                        >
                          EDIT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-sm-4 mb-5">
                <MyFacebookLoader />
              </div>
            )}
            {albumsIsEmpty ? (
              <div className="col-sm mb-5 text-center mx-auto">
                No Data Found
              </div>
            ) : null}
          </div>
          {albums ? (
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
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        {/*begin::Loading*/}
        {isLoading && <ModalProgressBar />}
        {/*end::Loading*/}
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Album Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoading && (
            <span>Are you sure to permanently delete selected album?</span>
          )}
          {isLoading && <span>Album is deleting...</span>}
        </Modal.Body>
        <Modal.Footer>
          <div>
            <button
              type="button"
              onClick={onHide}
              className="btn btn-light btn-elevate"
            >
              Cancel
            </button>
            <> </>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-primary btn-elevate"
            >
              Delete
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
