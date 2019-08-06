import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
/* import DatePicker from "react-datepicker"; */
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { getDBService } from "./utils/dbservice";

import "react-datepicker/dist/react-datepicker.css";

import "./css/employmentDetails.css";

const postappliedfor = [
  {
    value: "0",
    label: "Item 1"
  },
  {
    value: "1",
    label: "Item 2"
  },
  {
    value: "2",
    label: "Item 3"
  }
];

const notice = [
  {
    value: "0",
    label: "Immediate"
  },
  {
    value: "1",
    label: "15 days"
  },
  {
    value: "2",
    label: "30 days"
  },
  {
    value: "3",
    label: "60 days or more"
  }
];

const source = [
  {
    value: "0",
    label: "Walk-In"
  },
  {
    value: "1",
    label: "Referrerd by Employee"
  },
  {
    value: "2",
    label: "Consultancy"
  },
  {
    value: "3",
    label: "Job Portal/Others"
  }
];
class EmploymentDetails extends Form {
  state = {
    data: {
      postappliedfor: null,
      texp: "",
      rexp: "",
      reasonjobchange: "",
      notice: null,
      cctc: "",
      ectc: "",
      source: null,
      consuldetail: "",
      otherdetail: "",
      refName: "",
      refId: "",
      relationName: "",
      relation: "",
      area1: "",
      area2: ""
    },
    errors: {
      postappliedfor: "'Post Applied for' should not be empty.",
      notice: "Choose 'Notice Period'",
      source: "Choose 'Source'"
    },
    buttonStyle: {
      background: "#424143",
      color: "#fff"
    },
    disable: false,
    startDate: new Date()
  };
  schema = {
    postappliedfor: Joi.string()
      .required()
      .label("Post Applied for"),
    texp: Joi.number()
      .required()
      .label("Total Experience"),
    rexp: Joi.number()
      .required()
      .label("Relevant Experience"),
    reasonjobchange: Joi.string()
      .required()
      .label("Reason")
      .max(100),
    notice: Joi.number()
      .required()
      .integer()
      .label("Notice Period"),
    cctc: Joi.number()
      .required()
      .integer()
      .label("Current CTC"),
    ectc: Joi.number()
      .required()
      .integer()
      .label("Expected CTC"),
    source: Joi.number()
      .required()
      .integer()
      .label("Source"),
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
            {this.renderDropDownList(
              "postappliedfor",
              "Post Applied for<sup class='supStar'>*</sup>",
              postappliedfor
            )}
            {this.renderInput(
              "texp",
              "Total Experience <span class='smallLabel'>[in years]</span><sup class='supStar'>*</sup>"
            )}
            {this.renderInput(
              "rexp",
              "Relevant Experience <span class='smallLabel'>[in years]</span><sup class='supStar'>*</sup>"
            )}

            {this.renderInput(
              "reasonjobchange",
              "Reason for Change in job<sup class='supStar'>*</sup>"
            )}

            {this.renderRadios(
              "notice",
              "Notice Period <span class='smallLabel'>[time required to join, if selected]</span><sup class='supStar'>*</sup>",
              notice,
              "v"
            )}
            {this.renderInput(
              "cctc",
              "Current CTC per month [INR]<sup class='supStar'>*</sup>"
            )}
            {this.renderInput(
              "ectc",
              "Expected CTC per month [INR]<sup class='supStar'>*</sup>"
            )}

            {this.renderRadios(
              "source",
              "Source <span class='smallLabel' /><sup class='supStar'>*</sup>",
              source,
              "v"
            )}
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
