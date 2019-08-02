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

class Login extends Form {
  state = {
    personalInfoPanel: "hide",
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
    disable: false,
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
  componentDidUpdate(prevProp) {
    if (prevProp.step !== this.props.step) {
      if (this.props.step === 1) {
        this.setState({ personalInfoPanel: "show" });
      }
    }
  }
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
  stepDeside = () => {
    return this.props.step === 0 ? "showNone" : "";
  };
  goForward = (result, { aid }, message) => {
    if (result === "success") {
      this.setState({ personalInfoPanel: "hide" });
      this.props.hideProgress();
      this.props.goNext();
    } else {
      //this.setErrorText(message);
    }
  };
  loginPanel = () => {
    return (
      <div
        className={
          "pInfoForm-login " +
          this.state.emailVerificationPanel +
          " " +
          this.stepDeside()
        }
      >
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
                dateFormat="mm/dd/yyyy"
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
                <RadioButton value="male">Male</RadioButton>
                <RadioButton value="female">Female</RadioButton>
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
                <RadioButton value="single">Single</RadioButton>
                <RadioButton value="married">Married</RadioButton>
                <RadioButton value="separated">Separated</RadioButton>
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
        </div>
      </div>
    );
  };
  render() {
    return <React.Fragment>{this.loginPanel()}</React.Fragment>;
  }
}
export default Login;
