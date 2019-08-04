import React from "react";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";

const AgreeBox = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label>
        <Checkbox {...rest} name={name} id={name} defaultChecked />
        &nbsp; {label}
      </label>
      {error && <div className="form-alert">{error}</div>}
    </div>
  );
};

export default AgreeBox;
