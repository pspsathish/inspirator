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
    data: {},
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

  qualification = () => {
    const { open } = this.state;
    return (
      <div className={"qualificationForm-login show"}>
        <div className="qualificationForm-content">
          <form
            className="qualificationForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
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
