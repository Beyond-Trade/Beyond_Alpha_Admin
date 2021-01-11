/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import { Facebook } from "react-content-loader";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../controls";
import Paginate from "../../../../app/components/Pagination";
import ReactPaginate from "react-paginate";
import firebase from "../../../../configs/fbconfig";
import { useHistory } from "react-router-dom";

const MyFacebookLoader = () => <Facebook />;
export function ArtistsWidget({ className }) {
  const db = firebase.firestore();
  const history = useHistory();
  //   useEffect(() => {
  //     var docRef = db.collection("songs");
  //     docRef
  //       .get()
  //       .then(function(doc) {
  //         if (doc.exists) {
  //           console.log("Document data:", doc.data());
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //         }
  //       })
  //       .catch(function(error) {
  //         console.log("Error getting document:", error);
  //       });
  //   }, []);
  const [artists, setArtists] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [artistsIsEmpty, setArtistsIsEmpty] = useState(false);
  const [deletingImgUrl, setDeletingImgUrl] = useState("");
  const [deletingDocId, setDeletingDocId] = useState("");
  const [search, setSearch] = useState("");
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
    history.push(`/artist/${id}`);
  };
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
    const res = await db
      .collection("artists")
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
    let myquery = db
      .collection("artists")
      .where("role", "==", "artist")
      .orderBy("firstName")
      .limit(12);
    return myquery.onSnapshot((snapshot) => {
      setArtistsIsEmpty(false);
      if (snapshot.empty) {
        setArtistsIsEmpty(true);
      }
      const artistsData = [];
      snapshot.forEach((doc) =>
        artistsData.push({ ...doc.data(), id: doc.id })
      );
      console.log(artistsData); // <------
      setArtists(artistsData);
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
      .collection("artists")
      .where("role", "==", "artist")
      .orderBy("firstName");

    if (pageNo > activePage) {
      console.log(artists[artists.length - 1].firstName, "==========");
      query = query
        //
        .startAfter(artists[artists.length - 1].firstName)
        .limit(12);
    }
    if (pageNo < activePage) {
      query = query
        // .orderBy("firstName")
        .endBefore(artists[0].firstName)
        .limitToLast(12);
    }
    if (pageNo > activePage || pageNo < activePage) {
      query
        .get()
        .then((res) => {
          console.log(res);
          let artistsData = [];
          res.forEach((element) => {
            console.log(element);
            artistsData.push({ id: element.id, ...element.data() });
          });
          setArtists((prev) => (artistsData.length > 0 ? artistsData : prev));
          setactivePage((prev) =>
            artistsData.length > 0 ? pageNo : activePage
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <>
      <div className={`card card-custom p-5 ${className}`}>
        {/* Header */}
        <div
          className="card-header p-0 border-0 mb-5"
          style={{ minHeight: "0px" }}
        >
          <h3 className="card-title font-weight-bolder text-dark">Artists</h3>
          <div className="flex mb-4 px-2">
            <i className="flaticon-search mr-3" />
            <input
              type="text"
              value={search}
              style={{
                border: "0px",
                outline: "0px",
                borderBottom: "1px solid ",
              }}
              placeholder="SEARCH"
              onChange={handleSearch}
            />
          </div>
          {/* <Button color="primary" onClick={() => history.push("/add_artist")}>
            Add Artist
          </Button> */}
          {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
        </div>
        {/* Body */}
        <div className="card-body p-0">
          <div className="row">
            {artists ? (
              artists
                .filter((data) =>
                  (
                    data.firstName.toLowerCase() +
                    " " +
                    data.lastName.toLowerCase()
                  ).includes(search.toLowerCase())
                )
                .map((artist, index) => (
                  <div className="col-sm-3 mb-5" key={index}>
                    <div className="card w-100">
                      <div
                        style={{
                          width: "100%",
                          height: "200px",
                          backgroundImage: `url(${artist.imgUrl})`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDetail(artist.id)}
                      ></div>

                      <div className="card-body">
                        <h3
                          className="m-0"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleDetail(artist.id)}
                        >
                          {artist.firstName} {artist.lastName}
                        </h3>
                        <div className="d-flex flex-row">
                          <i className="flaticon2-user icon-lg mr-3"> </i>

                          <p className="card-text my-auto">
                            {artist.followerCount}
                          </p>
                        </div>

                        <div className="d-flex flex-row justify-content-around mt-3">
                          <p
                            className="card-text text-danger"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleModel(artist.imgUrl, artist.id)
                            }
                          >
                            DELETE
                          </p>
                          <p style={{ opacity: 0.5 }}>{" | "}</p>
                          <p
                            className="card-text text-success"
                            // onMouseEnter={handleMouseEnter}
                            // onMouseLeave={handleMouseLeave}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              history.push(`/edit_artist/${artist.id}`);
                            }}
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
            {artistsIsEmpty ? (
              <div className="col-sm mb-5 text-center mx-auto">
                No Data Found
              </div>
            ) : null}
          </div>
          {artists ? (
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
            Artist Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLoading && (
            <span>Are you sure to permanently delete selected Artist?</span>
          )}
          {isLoading && <span>Artist is deleting...</span>}
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
