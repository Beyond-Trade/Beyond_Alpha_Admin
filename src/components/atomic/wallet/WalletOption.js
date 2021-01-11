import React from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { initializeWeb3 } from "../../../services/web3.service";

function WalletOption(props) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const connectToWallet = async (value) => {
    props.onConnected();
    console.log(value, "===============================");
    await initializeWeb3(value).catch((e) => {
      debugger;
      alert.show("Provider is not available", { type: "error" });
    });
  };
  return (
    <button
      className="border border-primary rounded d-flex p-0 mt-3"
      onClick={() => {
        console.log(props.type);
        connectToWallet(props.type);
      }}
      style={{backgroundColor:"#90cdf4"}}
    >
      <div
        className="d-flex justify-content-center align-items-center border border-0 rounded-left p-0"
        style={{ width: "6rem", height: "6rem",padding:"0px" }}
      >
        <img src={props.image} className="h-8" />
      </div>
      <div
        className="d-flex justify-content-center align-items-center p-0 bg-white text-sm font-medium border border-0 rounded-right"
        style={{ width: "70%", height: "6rem",padding:"0px" }}
      >
        {props.text}
      </div>
    </button>
  );
}

export default WalletOption;
