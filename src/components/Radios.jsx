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
const errorStyle = {
  fontSize: "12px",
  color: "red"
};
const radioGroupStyle = {
  width: "100%",
  display: "inlineFlex"
};
const vradioGroupStyle = {
  width: "100%"
};

const Radios = ({ label, options, error, type, onChange, ...rest }) => {
  const styled = type === "v" ? vradioGroupStyle : radioGroupStyle;
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
          horizontal
          /*  style={styled} */
        >
          {options.map((option, index) => (
            <RadioButton
              key={option.label + option.value}
              value={option.value}
              style={{ width: "100px" }}
            >
              {option.label}
            </RadioButton>
          ))}
        </RadioGroup>
      </div>
      <div className="form-alert">
        {error && <div style={errorStyle}>{error}</div>}
      </div>
    </div>

    /*  <input
          {...rest}
          name={name}
          id={name}
          className="form-control"
          style={icon !== "none" ? inputIconStyle : inputStyle}
        /> */
  );
};

export default Radios;
