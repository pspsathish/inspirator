import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import { getDBService } from "./utils/dbservice";
import _ from "lodash";

import "./css/educationQualification.css";
import posed from "react-pose";
const Content = posed.div({
  closed: { height: 0 },
  open: { height: "auto" }
});

class EducationQualification extends Form {
  state = {
    data: {
      academic: [false, false, false, false, false]
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
    console.log(val);
    /* for (let i = 0; i <= evt.currentTarget.id; i++) {
      data.academic[i] = val;
    } */

    if (val && evt.currentTarget.id === "4") {
      data.academic = [true, true, false, false, true];
    } else if (!val && evt.currentTarget.id === "4") {
      data.academic[4] = !data.academic[4];
    }

    if (val && evt.currentTarget.id === "3") {
      data.academic = [true, true, true, true, false];
    } else if (!val && evt.currentTarget.id === "4") {
      data.academic[3] = !data.academic[3];
    }

    this.setState({ data });
  };
  qualification = () => {
    const { open } = this.state;
    const { academic } = this.state.data;
    return (
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
    return <React.Fragment>{this.qualification()}</React.Fragment>;
  }
}
export default EducationQualification;
