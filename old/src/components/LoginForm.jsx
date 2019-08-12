import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import { getDBService } from "../components/utils/dbservice";
import { FaEnvelope } from "react-icons/fa";

import "./css/login.css";
class Login extends Form {
  state = {
    data: {
      email: "",
      name: "",
      mobile: "",
      dob: null
    },
    errors: {},
    buttonStyle: {
      background: "#424143",
      color: "#fff"
    },
    disable: false
  };
  schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(50)
      .label("Name"),
    dob: Joi.date()
      .required()
      .label("Date of Birth"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    mobile: Joi.number()
      .required()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .label("Mobile Number")
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
    await getDBService("checkUserExistance", this.state.data, this.goForward);
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
            {this.renderInput("name", "Name<sup class='supStar'>*</sup>")}
            {this.renderDates(
              "dob",
              "Date of Birth<sup class='supStar'>*</sup>"
            )}
            {this.renderInput(
              "mobile",
              "Mobile Number<sup class='supStar'>*</sup>"
            )}
            {this.renderInput("email", "Email", false, <FaEnvelope />)}
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
