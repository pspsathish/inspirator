import React from "react";
import Select from "react-select";

const formGroupStyle = {
  marginBottom: "0px",
  width: "90%",
  height: "94px",
  color: "black"
};
const formGroupLabelStyle = {
  marginBottom: "0px"
};
const DropDownList = ({ label, options, error, ...rest }) => {
  return (
    <div className="form-group" style={formGroupStyle}>
      <label
        style={formGroupLabelStyle}
        dangerouslySetInnerHTML={{
          __html: label
        }}
      />
      <Select {...rest} options={options} />
      {error && <div className="form-alert">{error}</div>}
    </div>
  );
};

export default DropDownList;
