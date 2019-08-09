import React from "react";
const inputContainerStyle = {
  backgroundColor: "#fff",
  position: "relative",
  width: "100%",
  display: "flex"
};
const formGroupStyle = {
  marginBottom: "0px",
  width: "100%",
  color: "black"
};
const formGroupLabelStyle = {
  marginBottom: "0px"
};
const inputStyle = {
  fontSize: "18px",
  width: "100%",
  backgroundColor: "rgb(255, 255, 255) !important",
  border: "1px solid rgb(66, 65, 67) !important",
  color: "rgb(54, 54, 54) !important",
  boxShadow: "none !important",
  borderRadius: "0.25rem !important",
  height: "125px",
  resize: "none",
  overflow: "hidden"
};
const errorStyle = {
  fontSize: "12px",
  color: "red"
};
const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group" style={formGroupStyle}>
      {
        <label
          htmlFor={name}
          style={formGroupLabelStyle}
          dangerouslySetInnerHTML={{
            __html: label
          }}
        />
      }
      <div className="inputContainer" style={inputContainerStyle}>
        <textarea
          {...rest}
          name={name}
          id={name}
          className="form-control"
          style={inputStyle}
          /* placeholder={label} */
        />
      </div>
      <div className="form-alert">
        {error && <div style={errorStyle}>{error}</div>}
      </div>
    </div>
  );
};

export default TextArea;
