import React from "react";
import { toAbsoluteUrl } from "../../_metronic/_helpers";

const alertStyle = {
  backgroundColor: "#ffffff",
  color: "black",
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
  fontFamily: "Arial",
  boxSizing: "border-box",
};

const buttonStyle = {
  marginLeft: "20px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: "#FFFFFF",
};
const imgStyle = { height: "20px", marginRight: "6px" };

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <div style={{ ...alertStyle, ...style }}>
      {options.type === "info" && (
        <img
          src={toAbsoluteUrl("/media/alert/info.png")}
          alt="img"
          style={imgStyle}
        />
      )}
      {options.type === "success" && (
        <img
          src={toAbsoluteUrl("/media/alert/success.png")}
          alt="img"
          style={imgStyle}
        />
      )}
      {options.type === "error" && (
        <img
          src={toAbsoluteUrl("/media/alert/error.png")}
          alt="img"
          style={imgStyle}
        />
      )}
      <span style={{ flex: 2 }}>{message}</span>
      <button onClick={close} style={buttonStyle}>
        <img
          src={toAbsoluteUrl("/media/alert/Cross.svg")}
          alt="img"
          style={{ width: "20" }}
        />
      </button>
    </div>
  );
};

export default AlertTemplate;
