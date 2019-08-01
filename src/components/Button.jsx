import React, { useContext } from "react";
import _ from "lodash";

import "./css/Button.css";

const Button = props => {
  const getClassFromProp = (classProp, icon, curve) => {
    curve = curve === undefined ? true : curve;
    const defaultBtn = curve ? "button-default " : "button-default nocurve ";
    const iconBtn = icon ? defaultBtn + " recalculate " : defaultBtn;
    switch (classProp) {
      case "bds":
        return iconBtn + "small";
      case "bdm":
        return iconBtn + "medium";
      case "bdl":
        return iconBtn + "large";
      case "bd":
        return iconBtn;
      case "full":
        return iconBtn + "full";
      default:
        return iconBtn + "normal";
    }
  };
  return (
    <React.Fragment>
      {props.icon ? (
        <span
          className="btn-icon"
          onClick={() => props.onClick(_.omit(props, ["classProp", "onClick"]))}
        >
          {props.icon}
        </span>
      ) : null}
      <button
        style={props.disabled ? {} : {}}
        className={getClassFromProp(props.classProp, props.icon, props.curve)}
        onClick={() => props.onClick(_.omit(props, ["classProp", "onClick"]))}
        disabled={props.disabled ? props.disabled : false}
        title={props.label}
      >
        {props.label ? props.label : "Button"}
      </button>
    </React.Fragment>
  );
};

export default Button;
