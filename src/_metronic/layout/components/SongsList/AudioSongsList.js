import { Facebook } from "react-content-loader";
import React from "react";
const MyFacebookLoader = () => <Facebook />;
const AudioSongsList = ({
  songs,
  convertSecToMin,
  getSec,
  handleAudioPlaylist,
  isEmpty,
}) => {
  return (
    <div className="col">
      {/* Songs */}

      <div className={`card card-custom p-5 card-stretch gutter-b`}>
        {/* Header */}
        <div
          className="card-header p-0 border-0 mb-5"
          style={{ minHeight: "0px" }}
        >
          <h3 className="card-title font-weight-bolder text-dark">
            <i className="fas fa-music mr-3"></i>
            Audio Songs
          </h3>
          {/* <button className="card-title btn btn-success p-0">Add Song</button> */}
        </div>
        {/* Body */}
        <div className="card-body p-0">
          <div className="row">
            {songs && songs.length > 0 ? (
              <div className="col">
                <ul className="list-group list-group-flush">
                  {songs.map((song, index) => (
                    <li className="list-group-item" key={index}>
                      <div className="d-flex flex-row justify-content-between">
                        <p className="mb-0">
                          {index + 1}
                          {"."}
                          {song.title}
                        </p>
                        <div className="d-flex flex-row">
                          <p className="mb-0 mr-5">
                            {convertSecToMin(song.duration) < 10 ? "0" : ""}
                            {convertSecToMin(song.duration)}:
                            {getSec(song.duration) < 10 ? "0" : ""}
                            {getSec(song.duration)}
                          </p>
                          <p
                            className="mb-0"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              console.log("clicked.....");
                              handleAudioPlaylist(
                                song.artwork,
                                song.fileUrl,
                                song.title,
                                song.artist,
                                song.playCount
                              );
                            }}
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
            ) : isEmpty ? (
              <p className="mx-auto">No record found</p>
            ) : (
              <div className="col-sm-4 mb-5">
                <MyFacebookLoader />
                {isEmpty}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AudioSongsList;
