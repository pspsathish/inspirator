import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
/* import DatePicker from "react-datepicker"; */
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { getDBService } from "./utils/dbservice";

import "react-datepicker/dist/react-datepicker.css";

import "./css/employmentDetails.css";

class EmploymentDetails extends Form {
  state = {
    data: {
      papplied: "",
      exp: "",
      rexp: "",
      reason: "",
      notice: -1,
      cctc: "",
      ectc: "",
      consuldetail: "",
      otherdetail: "",
      refName: "",
      refId: "",
      relationName: "",
      relation: "",
      area1: "",
      area2: ""
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
    papplied: Joi.string()
      .required()
      .label("Post Applied for"),
    exp: Joi.string()
      .required()
      .label("Identity"),
    rexp: Joi.string()
      .required()
      .label("Identity"),
    reason: Joi.string()
      .required()
      .label("Identity"),
    notice: Joi.string()
      .required()
      .label("Identity"),
    cctc: Joi.string()
      .required()
      .label("Identity"),
    ectc: Joi.string()
      .required()
      .label("Identity"),
    source: Joi.object()
      .required()
      .label("Identity"),
    consuldetail: Joi.object()
      .required()
      .label("Identity"),
    otherdetail: Joi.object()
      .required()
      .label("Identity"),
    refName: Joi.object()
      .required()
      .label("Identity"),
    refId: Joi.object()
      .required()
      .label("Identity"),
    relationName: Joi.object()
      .required()
      .label("Identity"),
    relationId: Joi.object()
      .required()
      .label("Identity"),
    relation: Joi.object()
      .required()
      .label("Identity"),
    area1: Joi.object()
      .required()
      .label("Identity"),
    area2: Joi.object()
      .required()
      .label("Identity")
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
            <div
              style={{ height: "94px", width: "90%" }}
              className="srcdet-radioGroup"
            >
              <label
                htmlFor="source"
                style={{ color: "black", display: "block", marginBottom: "0" }}
              >
                Source <span className="smallLabel" />
              </label>
              <RadioGroup onChange={this.onChange}>
                <RadioButton value="0">Walk-In</RadioButton>
                <RadioButton value="1">Referrerd by Employee</RadioButton>
                <RadioButton value="2">Consultancy</RadioButton>
                <RadioButton value="3">Job Portal/Others</RadioButton>
              </RadioGroup>

              {this.renderInput(
                "otherdetail",
                "<span class='smallLabel'>[Please specify]</span>"
              )}
            </div>
            {this.renderAgreeBox(
              "terms",
              "I agree to the terms and conditions.",
              "Please check terms and conditions."
            )}
            <div>
              <div>
                If referred by Employee
                <br />
                <span className="smallLabel">
                  [It is mandatory to fill Name & Emp. ID of the referrer. Will
                  not be considered for Referral if not specified]
                </span>
              </div>
              <div>
                {this.renderInput("refName", "Name")}
                {this.renderInput("refId", "Emp. ID")}
              </div>
            </div>
            <div>
              <div>
                Are you related to any Employee of this Company
                <br />
                <span className="smallLabel">
                  [If Yes, please mention name, Relationship and Emp. ID]
                </span>
              </div>
              <div>
                {this.renderInput("relationName", "Name")}
                {this.renderInput("relationId", "Emp. ID")}
                {this.renderInput("relation", "Reationship")}
              </div>
            </div>
            <div>
              <div>
                Have you applied for a job with us earlier ?
                <br />
                <span className="smallLabel">
                  [Please specify the job applied for along with mm/yy]
                </span>
              </div>
              <div>
                <textarea />
              </div>
            </div>
            <div>
              <div>
                Please specify, if you are a member of any professional, social,
                civic or other body/organization
              </div>
              <div>
                <textarea />
              </div>
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
export default EmploymentDetails;
