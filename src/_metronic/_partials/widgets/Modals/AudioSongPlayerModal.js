import "react-h5-audio-player/lib/styles.css";

import { Button, Dropdown, Modal } from "react-bootstrap";
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";

import AudioPlayer from "react-h5-audio-player";

const AudioSongPlayerModal = ({ playListData, onHide }) => {
  return (
    <>
      <Modal
        show={playListData.show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{playListData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-around">
            <div className="col">
              <div className="card">
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${playListData.artwork})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
                <AudioPlayer
                  autoPlay
                  src={playListData.fileUrl}
                  onPlay={(e) => console.log("onPlay")}
                  
                  // other props here
                />
                <div className="card-body">
                  <h5 className="card-title m-0">{playListData.title}</h5>
                  <p className="card-text" style={{ color: "gray" }}>
                    {playListData.artist}
                  </p>
                  <div className="d-flex flex-row">
                    <i className="flaticon-eye icon-lg mr-3"> </i>

                    <p className="card-text my-auto">
                      {playListData.viewCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AudioSongPlayerModal;
