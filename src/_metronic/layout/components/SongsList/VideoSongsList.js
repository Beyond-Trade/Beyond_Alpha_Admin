import { Facebook } from "react-content-loader";
import React from "react";
const MyFacebookLoader = () => <Facebook />;
const VideoSongsList = ({ videoSongs, handleVideoPlaylist, videoIsEmpty }) => {
  return (
    <div className="col">
      {/* video */}
      <div className={`card card-custom p-5 card-stretch gutter-b`}>
        {/* Header */}
        <div
          className="card-header p-0 border-0 mb-5"
          style={{ minHeight: "0px" }}
        >
          <h3 className="card-title font-weight-bolder text-dark">
            <i className="fas fa-video mr-3"></i>
            Video Songs
          </h3>
          {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
        </div>
        {/* Body */}
        <div className="card-body p-0">
          <div className="row">
            {videoSongs && videoSongs.length > 0 ? (
              <div className="col">
                <ul className="list-group list-group-flush">
                  {videoSongs.map((videoSong, index) => (
                    <li className="list-group-item mb-0" key={index}>
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <p className="mb-0">
                          {index + 1}
                          {"."}
                          {videoSong.title}
                        </p>
                        <div className="d-flex flex-row">
                          <p className="mb-0 mr-5  d-flex align-items-center">
                            {videoSong.duration}
                          </p>
                          <p
                            className="mb-0"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleVideoPlaylist(
                                videoSong.poster,
                                videoSong.fileUrl,
                                videoSong.title,
                                videoSong.artist,
                                videoSong.viewCount
                              )
                            }
                          >
                            <i className="flaticon2-arrow text-success"></i>
                            Play
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : videoIsEmpty ? (
              <p className="mx-auto">No record found</p>
            ) : (
              <div className="col-sm-4 mb-5">
                <MyFacebookLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoSongsList;
