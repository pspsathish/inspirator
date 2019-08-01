import React from "react";
const inputContainerStyle = {
  backgroundColor: "#fff",
  position: "relative",
  width: "100%",
  display: "flex"
};

const iconStyle = {
  display: "table-cell",
  textAlign: "center",
  verticalAlign: "middle",
  position: "absolute",
  color: "#fff",
  top: "0px",
  bottom: "0px",
  height: "100%",
  width: "30px",
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
  textIndent: "30px",
  display: "table-cell",
  fontSize: "14px",
  boxShadow: "none"
};
const inputStyle = {
  backgroundColor: "#fff",
  borderColor: "#dbdbdb",
  color: "#363636",
  /* boxShadow: "inset 0 1px 2px rgba(10,10,10,.5)", */
  width: "100%",
  border: "1px solid rgb(247, 215, 71)",
  display: "table-cell",
  fontSize: "14px",
  boxShadow: "none"
};
const errorStyle = {
  fontSize: "12px",
  color: "red"
};
const Input = ({ name, label, error, icon, ...rest }) => {
  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{label}</label> */}
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
          placeholder={label}
        />
      </div>
      {error && (
        <div className="form-alert" style={errorStyle}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
