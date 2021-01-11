import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
function ChangeSynthAddress({
  title,
  description,
  handelAddAddress,
  isLoading,
  firstlabel,
  firstPlaceholder,
  secondlabel,
  secondPlaceholder,
  buttonText,
}) {
  const { isConnected } = useSelector((state) => state.wallet);
  const [synth, setSynth] = useState("");
  const [address, setAddress] = useState("");
  const [synthErr, setSynthErr] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const isValidated = () => {
    let validated = true;
    if (address === "" && synth === "") {
      setAddressErr((prev) => "This Field is required");
      setSynthErr((prev) => "This Field is required");
      validated = false;
    } else if (address === "") {
      setAddressErr((prev) => "This Field is required");
      setSynthErr((prev) => "");
      validated = false;
    } else if (synth === "") {
      setAddressErr((prev) => "");
      setSynthErr((prev) => "This Field is required");
      validated = false;
    } else {
      setAddressErr((prev) => "");
    }

    return validated;
  };
  // const handleInputChange = (e) => {
  //   setInputs({ [e.target.name]: e.target.value });
  // };
  return (
    <div
      className={`card card-custom p-5 card-stretch gutter-b`}
      style={{ height: "300px" }}
    >
      <div className="card-body p-0" style={{ height: "100%" }}>
        <div className="row" style={{ height: "100%", padding: "24px" }}>
          <div className="col" style={{ marginRight: "15%" }}>
            <p>
              <b>Title : </b>
              {title}
            </p>
            <p className="mb-2">
              <b>Description : </b>
            </p>
            {description}
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-center px-5 ">
            <div className="form-group" style={{ width: "100%" }}>
              {/* <label>Enter address</label> */}
              <label>{firstlabel || "Enter address"}</label>
              <input
                type="text"
                className="form-control"
                // placeholder="e.g 0XBB...8f9b"
                placeholder={firstPlaceholder || "e.g 0XBB...8f9b"}
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <small className="text-danger">{addressErr}</small>
            </div>
            <div className="form-group" style={{ width: "100%" }}>
              {/* <label>Enter synth</label> */}
              <label>{secondlabel || "Enter synth"}</label>
              <input
                type="text"
                className="form-control"
                placeholder={secondPlaceholder || "e.g ETHb"}
                // placeholder="e.g ETHb"
                name="synth"
                value={synth}
                onChange={(e) => setSynth(e.target.value)}
              />
              <small className="text-danger">{synthErr}</small>
            </div>
            <button
              disabled={isConnected ? false : true}
              onClick={() => {
                if (!isValidated()) {
                  console.log("in If");
                  return;
                }
                handelAddAddress(synth, address);
                setSynth("");
                setAddress("");
                setSynthErr("");
                setAddressErr("");
              }}
              style={{ backgroundColor: "#5183bf", width: "100%" }}
              className="text-white btn btn-sm px-2"
            >
              {isLoading ? <Loader type="Bars" color="#ffffff" height={18} width={20} /> : buttonText }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangeSynthAddress;
