import React from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
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
const errorStyle1 = {
  fontSize: "12px",
  color: "red"
};
const errorStyle2 = {
  fontSize: "12px",
  color: "red",
  top: "-16px",
  position: "relative"
};
const radioGroupStyle1 = { display: "inline-flex", width: "100%" };
const radioGroupStyle2 = {
  width: "100%"
};

const Radios = ({ label, options, error, type, onChange, ...rest }) => {
  const arrangement = type === "v" ? false : true;
  const radioGrpStyle = type === "v" ? radioGroupStyle2 : radioGroupStyle1;
  return (
    <div className="form-group" style={formGroupStyle}>
      <label
        style={formGroupLabelStyle}
        dangerouslySetInnerHTML={{
          __html: label
        }}
      />
      <div className="inputContainer" style={inputContainerStyle}>
        <RadioGroup
          className="radio-group"
          onChange={onChange}
          {...rest}
          horizontal={arrangement}
          style={radioGrpStyle}
        >
          {options.map((option, index) => (
            <RadioButton key={option.label + option.value} value={option.value}>
              {option.label}
            </RadioButton>
          ))}
        </RadioGroup>
      </div>
      <div className="form-alert">
        {error && (
          <div style={arrangement ? errorStyle1 : errorStyle2}>{error}</div>
        )}
      </div>
    </div>
  );
};

export default Radios;
