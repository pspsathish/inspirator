import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import DatePicker from "react-datepicker";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { getDBService } from "../components/utils/dbservice";

import "react-datepicker/dist/react-datepicker.css";

import "./css/personalInfo.css";

const interviewTests = [
  {
    value: "T1_E1",
    label: "INT_T1_E1 - HTML Developer <= 2 Years"
  },
  {
    value: "T1_E2",
    label: "INT_T1_E2 - HTML Developer > 2 Years and <= 4"
  },
  {
    value: "T1_E3",
    label: "INT_T1_E3 - HTML Developer > 4 Years"
  }
];

class PersonalInfo extends Form {
  state = {
    data: {
      name: "",
      dob: "",
      nationality: "",
      mobile: "",
      email: "",
      gender: "",
      mstatus: "",
      testType: null
    },
    errors: {},
    buttonStyle: {
      background: "#424143",
      color: "#fff"
    },
    disable: true,
    startDate: new Date()
  };
  schema = {
    name: Joi.string()
      .required()
      .email()
      .label("Identity"),
    dob: Joi.string()
      .required()
      .email()
      .label("Identity"),
    nationality: Joi.string()
      .required()
      .email()
      .label("Identity"),
    mobile: Joi.string()
      .required()
      .email()
      .label("Identity"),
    email: Joi.string()
      .required()
      .email()
      .label("Identity"),
    gender: Joi.string()
      .required()
      .email()
      .label("Identity"),
    mstatus: Joi.string()
      .required()
      .email()
      .label("Identity"),
    testType: Joi.object()
      .keys({
        label: Joi.string().max(50),
        value: Joi.string().max(50)
      })
      .label("testType")
  };
  handleDoBChange = date => {
    this.setState({
      startDate: date
    });
  };
  onClickHandler = props => {
    //console.log(props);
  };

  doSubmit = async () => {
    //console.log("doSubmit - LoginForm.jsx");
    this.props.showProgress();
    await getDBService(
      "checkUserExistance",
      { email: "sathish@yahoo.com" },
      this.goForward
    );
  };
  goForward = (result, { aid }, message) => {
    if (result === "success") {
      this.props.hideProgress();
      this.props.goNext();
    } else {
      //this.setErrorText(message);
    }
  };
  handleDummyClick = () => {
    this.props.goNext();
  };
  pInfoPanel = () => {
    return (
      <div className={"pInfoForm-login show"}>
        <div className="pInfoForm-title">Fill your personal details</div>
        <div className="pInfoForm-content">
          <form
            className="pInfoForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            {this.renderInput("name", "Name")}
            <div style={{ height: "94px", width: "90%" }}>
              <label
                htmlFor="dob"
                style={{ color: "black", display: "block", marginBottom: "0" }}
              >
                Date of Birth
              </label>
              <DatePicker
                name="dob"
                dateFormat="MM/dd/yyyy"
                selected={this.state.startDate}
                onChange={this.handleDoBChange}
                className="datePicker"
              />
            </div>
            {this.renderDropDownList(
              "testType",
              "Select Test:",
              interviewTests
            )}
            {this.renderInput("mobile", "Mobile Number")}
            {this.renderInput("email", "Email ID")}
            <div
              style={{ height: "94px", width: "90%" }}
              className="pi-radioGroup"
            >
              <label
                htmlFor="gender"
                style={{ color: "black", display: "block", marginBottom: "0" }}
              >
                Gender
              </label>
              <RadioGroup onChange={this.onChange} horizontal>
                <RadioButton value="0">Male</RadioButton>
                <RadioButton value="1">Female</RadioButton>
              </RadioGroup>
            </div>
            <div
              style={{ height: "94px", width: "90%" }}
              className="pi-radioGroup"
            >
              <label
                htmlFor="marital"
                style={{ color: "black", display: "block", marginBottom: "0" }}
              >
                Marital Status
              </label>
              <RadioGroup onChange={this.onChange} horizontal>
                <RadioButton value="0">Single</RadioButton>
                <RadioButton value="1">Married</RadioButton>
                <RadioButton value="2">Separated</RadioButton>
              </RadioGroup>
            </div>
            <div className="dummy-space" />
            <div className="login-button">
              {this.renderButton(
                "Continue",
                "full",
                this.onClickHandler,
                this.state.disable
              )}
            </div>
            <div className="marginBottom-50" />
          </form>

          <button onClick={this.handleDummyClick}>CONTINUE</button>
        </div>
      </div>
    );
  };
  render() {
    return <React.Fragment>{this.pInfoPanel()}</React.Fragment>;
  }
}
export default PersonalInfo;
