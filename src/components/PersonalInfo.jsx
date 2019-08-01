import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import { getDBService } from "../components/utils/dbservice";

import "./css/personalInfo.css";
class Login extends Form {
  state = {
    emailVerificationPanel: "hide",
    data: {
      email: ""
    },
    errors: {},
    buttonStyle: {
      background: "#424143",
      color: "#fff"
    },
    disable: false
  };
  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Identity")
  };
  componentDidUpdate(prevProp) {
    if (prevProp.step !== this.props.step) {
      if (this.props.step === 1) {
        this.setState({ emailVerificationPanel: "show" });
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
      this.setState({ emailVerificationPanel: "hide" });
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
        <div className="pInfoForm-title">Identify Yourself</div>
        <div className="pInfoForm-content">
          <form
            className="pInfoForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            {this.renderInput("email", "Email")}
            <div className="dummy-space" />
            <div className="login-button">
              {this.renderButton(
                "Continue",
                "full",
                this.onClickHandler,
                this.state.disable
              )}
            </div>
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
