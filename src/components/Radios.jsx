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

const Radios = ({ label, options, error, onChange, ...rest }) => {
  return (
    <div className="form-group" style={formGroupStyle}>
      <label
        style={formGroupLabelStyle}
        dangerouslySetInnerHTML={{
          __html: label
        }}
      />
      <div className="inputContainer" style={inputContainerStyle}>
        <RadioGroup className="radio-group" onChange={onChange} horizontal>
          {options.map((option, index) => (
            <RadioButton key={option.label + option.value} value={option.value}>
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
