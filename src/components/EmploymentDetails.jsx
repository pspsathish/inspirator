import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import _ from "lodash";
/* import DatePicker from "react-datepicker"; */
import { getDBService } from "./utils/dbservice";
import Switch from "react-switch";

/* import MonthPickerInput from "react-month-picker-input";
import "react-month-picker-input/dist/react-month-picker-input.css"; */
import Monthpicker from "@compeon/monthpicker";
import { FaCalendar } from "react-icons/fa";
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

const reason = [
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

const sourcedata = [
  {
    value: "0",
    label: "Walk-In"
  },
  {
    value: "1",
    label: "Social Media"
  },
  {
    value: "2",
    label: "Referrerd by Employee"
  },
  {
    value: "3",
    label: "Consultancy"
  },
  {
    value: "4",
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
      srcconsult: "",
      srcothers: "",
      srcrefempname: "",
      srcrefempid: "",
      relatedto: false,
      relatedname: "",
      relatedempid: "",
      relatedrelation: "",
      appliedalready: false,
      specify: false,
      appjobtitle: "",
      memberspecify: "",
      appmonthyear: ""
    },
    errors: {
      postappliedfor: "'Post Applied for' should not be empty.",
      notice: "Choose 'Notice Period'",
      source: "Choose 'Source'",
      reason: "Choose 'Reason for Change in job'"
    },
    buttonStyle: {
      background: "#424143",
      color: "#fff"
    },
    disable: false,
    startDate: new Date()
  };
  schema = {
    postappliedfor: Joi.object()
      .required()
      .keys({
        label: Joi.string().max(40),
        value: Joi.number()
      })
      .label("Post Applied for"),
    texp: Joi.number()
      .required()
      .label("Total Experience"),
    rexp: Joi.number()
      .max(Joi.ref("texp"))
      .required()
      .label("Relevant Experience"),
    reasonjobchange: Joi.object()
      .required()
      .keys({
        label: Joi.string().max(40),
        value: Joi.number()
      })
      .label("Reason"),
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
    /* srcconsult: Joi.string().label("Consultancy Reference"),
    srcothers: Joi.string().label("Job Portal/Others Reference"),
    srcrefempname: Joi.string().label("Referred Employee Name"),
    srcrefempid: Joi.string().label("Referred Employee ID"), */
    relatedto: Joi.boolean().label("Employee Relation"),
    /* relatedname: Joi.string().label("Relation Name"),
    relatedempid: Joi.any().label("Relation Employee ID"),
    relatedrelation: Joi.string().label("Relationship"), */
    appliedalready: Joi.boolean().label("Applied Already"),
    specify: Joi.boolean().label(
      "Member"
    ) /* 
    appjobtitle: Joi.string().label("Applied Job Title"),
    appmonthyear: Joi.string().label("Applied Month"),
    memberspecify: Joi.string().label("Member"), */
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
    console.log("doSubmit - Employment.jsx");
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
  handleSwitch0Change = checked => {
    const { data } = this.state;
    data.relatedto = checked;
    this.setState({ data });
  };
  handleSwitch1Change = checked => {
    const { data } = this.state;
    data.appliedalready = checked;
    this.setState({ data });
  };
  handleSwitch2Change = checked => {
    const { data } = this.state;
    data.specify = checked;
    this.setState({ data });
  };
  handleMonthChange = mmyyyy => {
    const { data } = this.state;
    data.appmonthyear = mmyyyy;
    this.setState({ data });
  };
  loginPanel = () => {
    const {
      source,
      appliedalready,
      specify,
      relatedto,
      texp,
      appmonthyear
    } = this.state.data;
    let newSchema;

    if (appliedalready) {
      newSchema = _.omit(this.schema, ["appjobtitle", "appmonthyear"]);
      this.schema = {};
      _.merge(newSchema, {
        appjobtitle: Joi.string().label("Applied Job Title"),
        appmonthyear: Joi.string().label("Applied Month&Year")
      });
      _.merge(this.schema, newSchema);
    } else {
      newSchema = _.omit(this.schema, ["appjobtitle", "appmonthyear"]);
      this.schema = {};
      _.merge(newSchema, {});
      _.merge(this.schema, newSchema);
    }

    if (specify) {
      newSchema = _.omit(this.schema, ["memberspecify"]);
      this.schema = {};
      _.merge(newSchema, {
        memberspecify: Joi.string().label("Member")
      });
      _.merge(this.schema, newSchema);
    } else {
      newSchema = _.omit(this.schema, ["memberspecify"]);
      this.schema = {};
      _.merge(newSchema, {});
      _.merge(this.schema, newSchema);
    }

    if (relatedto) {
      newSchema = _.omit(this.schema, [
        "relatedname",
        "relatedempid",
        "relatedrelation"
      ]);
      this.schema = {};
      _.merge(newSchema, {
        relatedname: Joi.string().label("Relation Name"),
        relatedempid: Joi.any().label("Relation Employee ID"),
        relatedrelation: Joi.string().label("Relationship")
      });
      _.merge(this.schema, newSchema);
    } else {
      newSchema = _.omit(this.schema, [
        "relatedname",
        "relatedempid",
        "relatedrelation"
      ]);
      this.schema = {};
      _.merge(newSchema, {});
      _.merge(this.schema, newSchema);
    }

    if (source === "0" || source === "1") {
      newSchema = _.omit(this.schema, [
        "srcconsult",
        "srcothers",
        "srcrefempname",
        "srcrefempid"
      ]);
      this.schema = {};
      _.merge(newSchema, {});
      _.merge(this.schema, newSchema);
    } else if (source === "2") {
      newSchema = _.omit(this.schema, ["srcconsult", "srcothers"]);
      this.schema = {};
      _.merge(newSchema, {
        srcrefempname: Joi.string().label("Referred Employee Name"),
        srcrefempid: Joi.string().label("Referred Employee ID")
      });
      _.merge(this.schema, newSchema);
    } else if (source === "3") {
      newSchema = _.omit(this.schema, [
        "srcrefempname",
        "srcrefempid",
        "srcothers"
      ]);
      this.schema = {};
      _.merge(newSchema, {
        srcconsult: Joi.string().label("Consultancy Reference")
      });
      _.merge(this.schema, newSchema);
    } else if (source === "4") {
      newSchema = _.omit(this.schema, [
        "srcconsult",
        "srcrefempname",
        "srcrefempid"
      ]);
      this.schema = {};
      _.merge(newSchema, {
        srcothers: Joi.string().label("Job Portal/Others Reference")
      });
      _.merge(this.schema, newSchema);
    }
    return (
      <div className={"empDetailsForm-login show"}>
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
            {texp > 0
              ? this.renderInput(
                  "rexp",
                  "Relevant Experience <span class='smallLabel'>[in years]</span><sup class='supStar'>*</sup>",
                  false,
                  "none",
                  "text",
                  "texp"
                )
              : null}
            {texp > 0
              ? this.renderDropDownList(
                  "reasonjobchange",
                  "Reason for Change in job<sup class='supStar'>*</sup>",
                  reason
                )
              : null}
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
              sourcedata,
              "v"
            )}
            {this.state.data.source === "3" ? (
              <div className="formItemSub">
                {this.renderInput(
                  "srcconsult",
                  "[Please specify the Consultancy]<sup class='supStar'>*</sup>"
                )}
              </div>
            ) : null}
            {this.state.data.source === "4" ? (
              <div className="formItemSub">
                {this.renderInput(
                  "srcothers",
                  "[Please specify the Job Portal/Others]<sup class='supStar'>*</sup>"
                )}
              </div>
            ) : null}
            {this.state.data.source === "2" ? (
              <div className="formItemSub">
                If referred by Employee{" "}
                <div className="smallLabel">
                  [It is mandatory to fill Name & Emp. ID of the referrer. Will
                  not be considered for Referral if not specified]
                </div>
                {this.renderInput(
                  "srcrefempname",
                  "Name<sup class='supStar'>*</sup>"
                )}
                {this.renderInput(
                  "srcrefempid",
                  "Emp. ID<sup class='supStar'>*</sup>"
                )}
              </div>
            ) : null}
            <div className="formDivs">
              <div className="empSwitchDiv">
                <label>Are you related to any Employee of this Company ?</label>
                <Switch
                  onChange={this.handleSwitch0Change}
                  checked={relatedto}
                />
              </div>
              {relatedto ? (
                <React.Fragment>
                  <span className="smallLabel">
                    [Please mention name, Relationship and Emp. ID]
                  </span>
                  <div className="formItemSub">
                    {this.renderInput(
                      "relatedname",
                      "Name<sup class='supStar'>*</sup>"
                    )}
                    {this.renderInput("relatedempid", "Emp. ID")}
                    {this.renderInput(
                      "relatedrelation",
                      "Relationship<sup class='supStar'>*</sup>"
                    )}
                  </div>
                </React.Fragment>
              ) : null}
            </div>
            <div className="formDivs">
              <div className="empSwitchDiv">
                <label>
                  Have you applied for a job with us earlier ?
                  <br />
                </label>
                <Switch
                  onChange={this.handleSwitch1Change}
                  checked={appliedalready}
                />
              </div>

              {appliedalready ? (
                <React.Fragment>
                  <span className="smallLabel">
                    [Please specify the job applied for along with mm/yy]
                  </span>
                  <div className="formItemSub2">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {this.renderInput(
                        "appjobtitle",
                        "<span class='smallLabel'>Job applied already</span><sup class='supStar'>*</sup>"
                      )}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <Monthpicker
                          locale="en"
                          month={
                            appmonthyear
                              ? Number(appmonthyear.split(",")[0])
                              : new Date().getMonth() + 1
                          }
                          year={
                            appmonthyear
                              ? Number(appmonthyear.split(",")[1])
                              : new Date().getFullYear()
                          }
                          format="MM,YYYY"
                          onChange={this.handleMonthChange}
                          allowedYears={{ before: 2020, after: 1980 }}
                          primaryColor="#688223"
                        >
                          <FaCalendar
                            style={{
                              fontSize: "34px",
                              display: "inline-block"
                            }}
                          />
                        </Monthpicker>
                        {this.renderInput(
                          "appmonthyear",
                          "<span class='smallLabel'>Month,Year</span><sup class='supStar'>*</sup>",
                          true
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
            <div className="formDivs">
              <div className="empSwitchDiv">
                <label>
                  Member of any professional, social, civic or other
                  body/organization?
                </label>
                <Switch onChange={this.handleSwitch2Change} checked={specify} />
              </div>
              {specify
                ? this.renderTextArea(
                    "memberspecify",
                    "<span class='smallLabel'>[Please mention details]</span><sup class='supStar'>*</sup>"
                  )
                : null}
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
