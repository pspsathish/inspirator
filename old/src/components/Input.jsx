import React from "react";
const inputContainerStyle = {
  backgroundColor: "#fff",
  position: "relative",
  width: "100%",
  display: "flex"
};
const formGroupStyle = {
  marginBottom: "0px",
  width: "90%",
  color: "black"
};
const formGroupLabelStyle = {
  marginBottom: "0px"
};
const iconStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  color: "#fff",
  top: "0px",
  bottom: "0px",
  height: "100%",
  width: "40px",
  fontSize: "20px",
  backgroundColor: "#424143"
};

const inputIconStyle = {
  backgroundColor: "#fff",
  borderColor: "#dbdbdb",
  color: "#363636",
  /* boxShadow: "inset 0 1px 2px rgba(10,10,10,.5)", */
  width: "100%",
  border: "1px solid #424143",
  textIndent: "40px",
  display: "table-cell",
  fontSize: "18px",
  boxShadow: "none",
  height: "40px"
};
const inputStyle = {
  borderColor: "#dbdbdb",
  color: "#363636",
  /* boxShadow: "inset 0 1px 2px rgba(10,10,10,.5)", */
  width: "100%",
  border: "1px solid #424143",
  display: "table-cell",
  fontSize: "18px",
  boxShadow: "none",
  height: "40px"
};
const errorStyle = {
  fontSize: "12px",
  color: "red"
};
const Input = ({ name, label, error, icon, ...rest }) => {
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
        {icon !== "none" ? (
          <div className="inputIcon" style={iconStyle}>
            {icon}
          </div>
        ) : null}
        <input
          {...rest}
          name={name}
          id={name}
          className="form-control"
          style={icon !== "none" ? inputIconStyle : inputStyle}
          /* placeholder={label} */
        />
      </div>
      <div className="form-alert">
        {error && <div style={errorStyle}>{error}</div>}
      </div>
    </div>
  );
};

export default Input;
