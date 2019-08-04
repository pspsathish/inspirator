import React from "react";
import DatePicker from "react-datepicker";
const dateContainerStyle = {
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

const Dates = ({ label, error, onChange, ...rest }) => {
  return (
    <div className="form-group" style={formGroupStyle}>
      <label
        htmlFor="dob"
        style={formGroupLabelStyle}
        dangerouslySetInnerHTML={{
          __html: label
        }}
      />
      <div className="dateContainer" style={dateContainerStyle}>
        <DatePicker
          name="dob"
          dateFormat="MM/dd/yyyy"
          onChange={onChange}
          className="datePicker"
          {...rest}
        />
      </div>
      <div className="form-alert">
        {error && <div style={errorStyle}>{error}</div>}
      </div>
    </div>
  );
};

export default Dates;
