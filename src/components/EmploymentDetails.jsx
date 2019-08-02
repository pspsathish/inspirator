import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import DatePicker from "react-datepicker";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { getDBService } from "./utils/dbservice";

import "react-datepicker/dist/react-datepicker.css";

import "./css/employmentDetails.css";

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

class EmploymentDetails extends Form {
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
      this.props.hideProgress();
      this.props.goNext();
    } else {
      //this.setErrorText(message);
    }
  };
  loginPanel = () => {
    return (
      <div className={"empDetailsForm-login show"}>
        <div className="empDetailsForm-title">Fill your employment details</div>
        <div className="empDetailsForm-content">
          <form
            className="empDetailsForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            {this.renderInput("papplied", "Post Applied for")}
            {this.renderInput(
              "exp",
              "Total Experience <span class='smallLabel'>[in years]</span>"
            )}
            {this.renderInput(
              "rexp",
              "Relevant Experience <span class='smallLabel'>[in years]</span>"
            )}

            {this.renderInput("reason", "Reason for Change in job")}
            <div
              style={{ height: "94px", width: "90%" }}
              className="empdet-radioGroup"
            >
              <label
                htmlFor="notice"
                style={{ color: "black", display: "block", marginBottom: "0" }}
              >
                Notice Period{" "}
                <span className="smallLabel">
                  [time required to join, if selected]
                </span>
              </label>
              <RadioGroup onChange={this.onChange}>
                <RadioButton value="0">Immediate</RadioButton>
                <RadioButton value="1">15 days</RadioButton>
                <RadioButton value="2">30 days</RadioButton>
                <RadioButton value="3">60 days or more</RadioButton>
              </RadioGroup>
            </div>
            {this.renderInput("cctc", "Current CTC per month [INR]")}
            {this.renderInput("ectc", "Expected CTC per month [INR]")}
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
export default EmploymentDetails;
