import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import { getDBService } from "./utils/dbservice";
import _ from "lodash";
import Switch from "react-switch";

import Monthpicker from "@compeon/monthpicker";
import { FaCalendarAlt } from "react-icons/fa";

import "./css/educationQualification.css";
import posed from "react-pose";
const Content = posed.div({
  closed: { height: 0 },
  open: { height: "auto" }
});

const notice = [
  {
    value: "0",
    label: "Lost"
  },
  {
    value: "1",
    label: "Standing Arrears"
  },
  {
    value: "2",
    label: "Not Received"
  }
];
class EducationQualification extends Form {
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
  toggleAcademic = evt => {
    const { data } = this.state;
    const val = !data.academic[evt.currentTarget.id];
    let dataAcademic = [];
    /* for (let i = 0; i <= evt.currentTarget.id; i++) {
      data.academic[i] = val;
    } */
    console.log(val, evt.currentTarget.id);
    if (val && evt.currentTarget.id === "4") {
      data.academic = [
        data.academic[0],
        data.academic[1],
        data.academic[2],
        data.academic[3],
        true
      ];
    } else if (!val && evt.currentTarget.id === "4") {
      data.academic = [
        data.academic[0],
        data.academic[1],
        data.academic[2],
        data.academic[3],
        !data.academic[4]
      ];
    }

    if (val && evt.currentTarget.id === "3") {
      data.academic = [true, true, true, true, data.academic[4]];
    } else if (!val && evt.currentTarget.id === "3") {
      data.academic[3] = !data.academic[3];
    }
    if (val && evt.currentTarget.id === "2") {
      data.academic = [true, true, true, data.academic[3], data.academic[4]];
    } else if (!val && evt.currentTarget.id === "2") {
      data.academic[2] = !data.academic[2];
      data.academic[3] = false;
    }
    if (val && evt.currentTarget.id === "1") {
      data.academic = [
        true,
        true,
        data.academic[2],
        data.academic[3],
        data.academic[4]
      ];
    } else if (!val && evt.currentTarget.id === "1") {
      data.academic[1] = !data.academic[1];
      data.academic[2] = false;
      data.academic[3] = false;
    }

    if (val && evt.currentTarget.id === "0") {
      data.academic = [
        true,
        data.academic[1],
        data.academic[2],
        data.academic[3],
        data.academic[4]
      ];
    } else if (!val && evt.currentTarget.id === "0") {
      data.academic[0] = !data.academic[0];
      data.academic[1] = false;
      data.academic[2] = false;
      data.academic[3] = false;
    }
    this.setState({ data });
  };
  qualification = () => {
    const { open } = this.state;
    const { academic, appmonthyear } = this.state.data;
    return (
      <React.Fragment>
        <div className={"qualificationForm-login show"}>
          <div className="qualificationForm-content">
            <form
              className="qualificationForm"
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
              <div>
                <div className="academicstitle">Select Academics to input</div>
                <div>
                  <div
                    className="togglespan"
                    disabled={!academic[0] ? true : false}
                    onClick={this.toggleAcademic}
                    id="0"
                  >
                    X&nbsp;Standard
                  </div>
                  <div
                    className="togglespan"
                    disabled={!academic[1] ? true : false}
                    onClick={this.toggleAcademic}
                    id="1"
                  >
                    XII&nbsp;Standard/Diploma
                  </div>
                  <div
                    className="togglespan"
                    disabled={!academic[2] ? true : false}
                    onClick={this.toggleAcademic}
                    id="2"
                  >
                    UG&nbsp;Degree
                  </div>
                  <div
                    className="togglespan"
                    disabled={!academic[3] ? true : false}
                    onClick={this.toggleAcademic}
                    id="3"
                  >
                    PG&nbsp;Degree
                  </div>
                  <div
                    className="togglespan"
                    disabled={!academic[4] ? true : false}
                    onClick={this.toggleAcademic}
                    id="4"
                  >
                    Others
                  </div>
                </div>
              </div>
              <div>
                {academic[0] ? (
                  <div className="acapanel">
                    <div className="acapaneltitle">X Standard</div>
                    <div className="acapanelcontent">
                      {this.renderInput(
                        "acaXc2",
                        "School</span><sup class='supStar'>*</sup>"
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
                          <FaCalendarAlt
                            style={{
                              fontSize: "34px",
                              display: "inline-block"
                            }}
                          />
                        </Monthpicker>
                        {this.renderInput(
                          "appmonthyear",
                          "Month,Year<sup class='supStar'>*</sup>",
                          true
                        )}
                        <div className="marginRight-50" />
                        {this.renderInput(
                          "acaXc4",
                          "% Marks</span><sup class='supStar'>*</sup>"
                        )}
                      </div>

                      <div className="empSwitchDiv">
                        <label>Certificate Available?</label>
                        <Switch
                          onChange={this.handleSwitch0Change}
                          checked={0}
                        />
                      </div>
                      <div className="listContainer">
                        {this.renderDropDownList("notice", "", notice)}
                      </div>
                    </div>
                  </div>
                ) : null}

                {academic[1] ? (
                  <div className="acapanel">
                    <div className="acapaneltitle">XII Standard</div>
                    <div className="acapanelcontent">
                      {this.renderInput(
                        "acaXc2",
                        "Degree/ Specialization</span><sup class='supStar'>*</sup>"
                      )}

                      {this.renderInput(
                        "acaXc2",
                        "School</span><sup class='supStar'>*</sup>"
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
                          <FaCalendarAlt
                            style={{
                              fontSize: "34px",
                              display: "inline-block"
                            }}
                          />
                        </Monthpicker>
                        {this.renderInput(
                          "appmonthyear",
                          "Month,Year<sup class='supStar'>*</sup>",
                          true
                        )}
                        <div className="marginRight-50" />
                        {this.renderInput(
                          "acaXc4",
                          "% Marks</span><sup class='supStar'>*</sup>"
                        )}
                      </div>
                      <div className="empSwitchDiv">
                        <label>Certificate Available?</label>
                        <Switch
                          onChange={this.handleSwitch0Change}
                          checked={0}
                        />
                      </div>
                      <div className="listContainer">
                        {this.renderDropDownList("notice", "", notice)}
                      </div>
                    </div>
                  </div>
                ) : null}

                {academic[2] ? (
                  <div className="acapanel">
                    <div className="acapaneltitle">UG Degree</div>
                    <div className="acapanelcontent">
                      {this.renderInput(
                        "acaXc2",
                        "Degree/ Specialization</span><sup class='supStar'>*</sup>"
                      )}

                      {this.renderInput(
                        "acaXc2",
                        "School</span><sup class='supStar'>*</sup>"
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
                          <FaCalendarAlt
                            style={{
                              fontSize: "34px",
                              display: "inline-block"
                            }}
                          />
                        </Monthpicker>
                        {this.renderInput(
                          "appmonthyear",
                          "Month,Year<sup class='supStar'>*</sup>",
                          true
                        )}
                        <div className="marginRight-50" />
                        {this.renderInput(
                          "acaXc4",
                          "% Marks</span><sup class='supStar'>*</sup>"
                        )}
                      </div>
                      <div className="empSwitchDiv">
                        <label>Certificate Available?</label>
                        <Switch
                          onChange={this.handleSwitch0Change}
                          checked={0}
                        />
                      </div>
                      <div className="listContainer">
                        {this.renderDropDownList("notice", "", notice)}
                      </div>
                    </div>
                  </div>
                ) : null}

                {academic[3] ? (
                  <div className="acapanel">
                    <div className="acapaneltitle">PG Degree</div>
                    <div className="acapanelcontent">
                      {this.renderInput(
                        "acaXc2",
                        "Degree/ Specialization</span><sup class='supStar'>*</sup>"
                      )}

                      {this.renderInput(
                        "acaXc2",
                        "School</span><sup class='supStar'>*</sup>"
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
                          <FaCalendarAlt
                            style={{
                              fontSize: "34px",
                              display: "inline-block"
                            }}
                          />
                        </Monthpicker>
                        {this.renderInput(
                          "appmonthyear",
                          "Month,Year<sup class='supStar'>*</sup>",
                          true
                        )}
                        <div className="marginRight-50" />
                        {this.renderInput(
                          "acaXc4",
                          "% Marks</span><sup class='supStar'>*</sup>"
                        )}
                      </div>
                      <div className="empSwitchDiv">
                        <label>Certificate Available?</label>
                        <Switch
                          onChange={this.handleSwitch0Change}
                          checked={0}
                        />
                      </div>
                      <div className="listContainer">
                        {this.renderDropDownList("notice", "", notice)}
                      </div>
                    </div>
                  </div>
                ) : null}

                {academic[4] ? (
                  <div className="acapanel">
                    <div className="acapaneltitle">Others</div>
                    <div className="acapanelcontent">
                      {this.renderInput(
                        "acaXc2",
                        "Degree/ Specialization</span><sup class='supStar'>*</sup>"
                      )}

                      {this.renderInput(
                        "acaXc2",
                        "School</span><sup class='supStar'>*</sup>"
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
                          <FaCalendarAlt
                            style={{
                              fontSize: "34px",
                              display: "inline-block"
                            }}
                          />
                        </Monthpicker>
                        {this.renderInput(
                          "appmonthyear",
                          "Month,Year<sup class='supStar'>*</sup>",
                          true
                        )}
                        <div className="marginRight-50" />
                        {this.renderInput(
                          "acaXc4",
                          "% Marks</span><sup class='supStar'>*</sup>"
                        )}
                      </div>
                      <div className="empSwitchDiv">
                        <label>Certificate Available?</label>
                        <Switch
                          onChange={this.handleSwitch0Change}
                          checked={0}
                        />
                      </div>
                      <div className="listContainer">
                        {this.renderDropDownList("notice", "", notice)}
                      </div>
                    </div>
                  </div>
                ) : null}
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
    return <React.Fragment>{this.qualification()}</React.Fragment>;
  }
}
export default EducationQualification;
