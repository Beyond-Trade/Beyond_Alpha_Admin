/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import { Facebook } from "react-content-loader";
import NewsDeleteModal from "../Modals/NewsDeleteModal";
import firebase from "../../../../configs/fbconfig";
import { useHistory } from "react-router-dom";
import Paginate from "../../../../app/components/Pagination";

const MyFacebookLoader = () => <Facebook />;
export function NewsWidget({ className }) {
  const db = firebase.firestore();
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual
  );
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [deletingImgUrl, setDeletingImgUrl] = useState();
  const [deletingDocId, setDeletingDocId] = useState();
  const [show, setShow] = useState(false);
  const [newsIsEmpty, setNewsIsEmpty] = useState(false);
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
      .collection("news")
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
  const [news, setNews] = useState();
  useEffect(() => {
   let myquery=db.collection("news").orderBy("title").limit(12)
    return myquery.onSnapshot((snapshot) => {
      console.log(snapshot.empty);
      setNewsIsEmpty(false);
      if (snapshot.empty) {
        setNewsIsEmpty(true);
      }
      const newsData = [];
      snapshot.forEach((doc) => newsData.push({ ...doc.data(), id: doc.id }));
      console.log(newsData); // <------
      setNews(newsData);
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
      .collection("news")
      .orderBy("title");

    if (pageNo > activePage) {
      query = query
        .startAfter(news[news.length - 1].title)
        .limit(12);
    }
    if (pageNo < activePage) {
      query = query
        // .orderBy("firstName")
        .endBefore(news[0].title)
        .limitToLast(12);
    }
    if (pageNo > activePage || pageNo < activePage) {
      query
        .get()
        .then((res) => {
          console.log(res);
          let newsData = [];
          res.forEach((element) => {
            console.log(element);
            newsData.push({ id: element.id, ...element.data() });
          });
          setNews((prev) => (newsData.length > 0 ? newsData : prev));
          setactivePage((prev) =>
          newsData.length > 0 ? pageNo : activePage
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
          <h3 className="card-title font-weight-bolder text-dark">News</h3>
          <Button color="primary" onClick={() => history.push("/add_news")}>
            Add News
          </Button>
          {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
        </div>
        {/* Body */}
        <div className="card-body p-0">
          <div className="row">
            {news ? (
              news.filter((data) =>
              (
                data.title.toLowerCase()
              ).includes(search.toLowerCase())
            ).map((news, index) => (
                <div className="col-sm-3 mb-5" key={index}>
                  <div className="card w-100">
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        backgroundImage: `url(${news.imgUrl})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                    </div>

                    <div className="card-body">
                      {news.title.length > 20 ? (
                        <h3 className="card-text">{`${news.title.substring(
                          0,
                          10
                        )}....`}</h3>
                      ) : (
                        <h3 className="m-0">{news.title}</h3>
                      )}

                      <p className="card-text" style={{ color: "gray" }}>
                        {news.artist}
                      </p>
                      <div className="d-flex flex-row">
                        <i className="flaticon-eye icon-lg mr-3"> </i>

                        <p className="card-text my-auto">{news.viewCount}</p>
                      </div>
                      <div className="d-flex flex-row">
                        <i className="flaticon-interface-2 icon-lg mr-3"> </i>

                        <p className="card-text my-auto">{news.commentCount}</p>
                      </div>
                      {user && user.role === "admin" ? (
                        <div className="d-flex flex-row justify-content-around mt-3">
                          <p
                            className="card-text text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleModel(news.imgUrl, news.id)}
                          >
                            DELETE
                          </p>
                          <p style={{ opacity: 0.5 }}>{" | "}</p>
                          <p
                            style={{ cursor: "pointer" }}
                            className="card-text text-success"
                            onClick={() =>
                              history.push(`/edit_news/${news.id}`)
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
            ) : (
              <div className="col-sm mb-5">
                <MyFacebookLoader />
              </div>
            )}
            {newsIsEmpty ? (
              <div className="col-sm mb-5 text-center mx-auto">
                No Data Found
              </div>
            ) : null}
          </div>
          {news ? (
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
      <NewsDeleteModal
        show={show}
        onHide={onHide}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </>
  );
}
