import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
function ChangeAddress({ title, description, handelAddAddress, isLoading,placeholdertext,labelText,buttonText }) {
  const { isConnected } = useSelector((state) => state.wallet);
  const [address, setAddress] = useState("");
  const [addressErr, setAddressErr] = useState("");
  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };
  const isValidated = () => {
    let validated = true;
    if (address === "") {
      setAddressErr((prev) => "This Field is required");
      validated = false;
    } else {
      setAddressErr((prev) => "");
    }

    return validated;
  };
  return (
    <div
      className={`card card-custom p-5 card-stretch gutter-b`}
      style={{ height: "200px" }}
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
              <label>{labelText || "Enter address"}</label>
              <input
                type="text"
                className="form-control"
                placeholder={placeholdertext || "e.g 0XBB...8f9b"}
                value={address}
                onChange={handleInputChange}
              />
              <small className="text-danger">{addressErr}</small>
            </div>
            <button
              disabled={isConnected ? false : true}
              onClick={() => {
                if (!isValidated()) {
                  console.log("in If");
                  return;
                }
                handelAddAddress(address);
                setAddress("");
              }}
              style={{ backgroundColor: "#5183bf", width: "100%" }}
              className="text-white btn btn-sm px-2"
            >
              {isLoading ? (
                <Loader type="Bars" color="#ffffff" height={18} width={20} />
              ) : (
                buttonText || "SET ADDRESS"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangeAddress;
