import React from "react";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";

const formGroupStyle = {
  marginBottom: "16px",
  width: "90%",
  color: "black",
  display: "flex",
  alignItems: "center"
};
const formGroupLabelStyle = {
  color: "black"
};
const formCheckBoxStyle = {
  width: "50px"
};
const AgreeBox = ({ name, label, checked, error, ...rest }) => {
  return (
    <div className="form-group" style={formGroupStyle}>
      <Checkbox
        {...rest}
        name={name}
        id={name}
        defaultChecked={checked}
        style={formCheckBoxStyle}
      />
      <label
        style={formGroupLabelStyle}
        dangerouslySetInnerHTML={{
          __html: label
        }}
      />
      {error && <div className="form-alert">{error}</div>}
    </div>
  );
};

export default AgreeBox;
