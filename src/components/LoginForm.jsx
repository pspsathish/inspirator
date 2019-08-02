import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import { getDBService } from "../components/utils/dbservice";
import { FaEnvelope } from "react-icons/fa";

import "./css/login.css";
class Login extends Form {
  state = {
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
  constructor() {
    super();
    this.myRef = React.createRef();
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

  goForward = (result, { aid }, message) => {
    if (result === "success") {
      this.props.hideProgress();
      this.props.goNext(this.state.data);
    } else {
      //this.setErrorText(message);
    }
  };
  loginPanel = () => {
    return (
      <div className={"ipForm-login show"} ref={this.myRef}>
        <div className="ipForm-title">Identify Yourself</div>
        <div className="ipForm-content">
          <form
            className="ipForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            {this.renderInput("email", "Email", <FaEnvelope />)}
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
