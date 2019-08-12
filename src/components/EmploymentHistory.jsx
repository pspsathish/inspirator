import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import { getDBService } from "./utils/dbservice";
import _ from "lodash";
import Switch from "react-switch";

import Monthpicker from "@compeon/monthpicker";
import { FaCalendarAlt } from "react-icons/fa";

import "./css/employmentHistory.css";
import posed from "react-pose";

const notice = [
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
class EmploymentHistory extends Form {
  state = {
    data: {
      academic: [false, false, false, false, false],
      appmonthyear: "",
      notice: null
    },
    errors: {},
    disable: false,
    open: false
  };
  schema = {};
  doSubmit = async () => {
    //console.log("doSubmit - EducationQualification.jsx");
    this.props.showProgress();
    /* await getDBService(
      "checkUserExistance",
      { email: "sathish@yahoo.com" },
      this.goForward
    ); */
  };
  goForward = (result, { aid }, message) => {
    if (result === "success") {
      this.props.hideProgress();
      this.props.goNext(this.state.data);
    } else {
      //this.setErrorText(message);
    }
  };
  employHistory = () => {
    const { open } = this.state;
    const { academic, appmonthyear } = this.state.data;
    return (
      <React.Fragment>
        <div className={"employhistory-login show"}>
          <div className="employhistory-content">
            <div>EMPLOYMENT HISTORY [CURRENT & PREVIOUS, IF ANY]</div>
            <form
              className="employhistory"
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
              <div className="employCount">1</div>
              <div
                style={{
                  backgroundColor: "#f3f3f3",
                  padding: "20px",
                  paddingBottom: "0px",
                  marginBottom: "20px"
                }}
              >
                {this.renderInput(
                  "acaXc2",
                  "Organization Name</span><sup class='supStar'>*</sup>"
                )}

                {this.renderInput(
                  "acaXc2",
                  "Position Held</span><sup class='supStar'>*</sup>"
                )}
                <div>Period of Service</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                    justifyContent: "space-evenly"
                  }}
                >
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
                      <FaCalendarAlt
                        style={{
                          fontSize: "34px",
                          display: "inline-block"
                        }}
                      />
                    </Monthpicker>
                    {this.renderInput(
                      "appmonthyear",
                      "From<sup class='supStar'>*</sup>",
                      true
                    )}
                  </div>
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
                      <FaCalendarAlt
                        style={{
                          fontSize: "34px",
                          display: "inline-block"
                        }}
                      />
                    </Monthpicker>
                    {this.renderInput(
                      "appmonthyear",
                      "To<sup class='supStar'>*</sup>",
                      true
                    )}
                  </div>
                </div>
                {this.renderInput(
                  "acaXc2",
                  "Last Drawn Monthly CTC</span><sup class='supStar'>*</sup>"
                )}
                {this.renderDropDownList("notice", "", notice)}
              </div>

              <div className="employCount">2</div>
              <div
                style={{
                  backgroundColor: "#f3f3f3",
                  padding: "20px",
                  paddingBottom: "0px",
                  marginBottom: "20px"
                }}
              >
                {this.renderInput(
                  "acaXc2",
                  "Organization Name</span><sup class='supStar'>*</sup>"
                )}

                {this.renderInput(
                  "acaXc2",
                  "Position Held</span><sup class='supStar'>*</sup>"
                )}
                <div>Period of Service</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                    justifyContent: "space-evenly"
                  }}
                >
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
                      <FaCalendarAlt
                        style={{
                          fontSize: "34px",
                          display: "inline-block"
                        }}
                      />
                    </Monthpicker>
                    {this.renderInput(
                      "appmonthyear",
                      "From<sup class='supStar'>*</sup>",
                      true
                    )}
                  </div>
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
                      <FaCalendarAlt
                        style={{
                          fontSize: "34px",
                          display: "inline-block"
                        }}
                      />
                    </Monthpicker>
                    {this.renderInput(
                      "appmonthyear",
                      "To<sup class='supStar'>*</sup>",
                      true
                    )}
                  </div>
                </div>
                {this.renderInput(
                  "acaXc2",
                  "Last Drawn Monthly CTC</span><sup class='supStar'>*</sup>"
                )}
                {this.renderDropDownList("notice", "", notice)}
              </div>

              <div className="employCount">3</div>
              <div
                style={{
                  backgroundColor: "#f3f3f3",
                  padding: "20px",
                  paddingBottom: "0px",
                  marginBottom: "20px"
                }}
              >
                {this.renderInput(
                  "acaXc2",
                  "Organization Name</span><sup class='supStar'>*</sup>"
                )}

                {this.renderInput(
                  "acaXc2",
                  "Position Held</span><sup class='supStar'>*</sup>"
                )}
                <div>Period of Service</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                    justifyContent: "space-evenly"
                  }}
                >
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
                      <FaCalendarAlt
                        style={{
                          fontSize: "34px",
                          display: "inline-block"
                        }}
                      />
                    </Monthpicker>
                    {this.renderInput(
                      "appmonthyear",
                      "From<sup class='supStar'>*</sup>",
                      true
                    )}
                  </div>
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
                      <FaCalendarAlt
                        style={{
                          fontSize: "34px",
                          display: "inline-block"
                        }}
                      />
                    </Monthpicker>
                    {this.renderInput(
                      "appmonthyear",
                      "To<sup class='supStar'>*</sup>",
                      true
                    )}
                  </div>
                </div>
                {this.renderInput(
                  "acaXc2",
                  "Last Drawn Monthly CTC</span><sup class='supStar'>*</sup>"
                )}
                {this.renderDropDownList("notice", "", notice)}
              </div>

              <div className="employaddpanel">
                <div className="employadd">+</div>
              </div>
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
      </React.Fragment>
    );
  };
  render() {
    return <React.Fragment>{this.employHistory()}</React.Fragment>;
  }
}
export default EmploymentHistory;
