import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
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
      .label("Username")
  };
  loginPanel = () => {
    return (
      <form className="ipForm" onSubmit={this.handleSubmit} autoComplete="off">
        {this.renderInput("email", "Email", <FaEnvelope />)}
        <div className="login-button">
          {this.renderButton(
            "Continue",
            "full",
            this.onClickHandler,
            this.state.disable
          )}
        </div>
      </form>
    );
  };
  render() {
    return <React.Fragment>{this.loginPanel()}</React.Fragment>;
  }
}
export default Login;
