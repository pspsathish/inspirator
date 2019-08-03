import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import DatePicker from "react-datepicker";
import _ from "lodash";
import { getDBService } from "../components/utils/dbservice";

import "react-datepicker/dist/react-datepicker.css";

import "./css/personalInfo.css";

const nationality = [
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

const marital = [
  {
    value: "0",
    label: "Single"
  },
  {
    value: "1",
    label: "Married"
  },
  {
    value: "2",
    label: "Separated"
  }
];
const gender = [
  {
    value: "0",
    label: "Male"
  },
  {
    value: "1",
    label: "Female"
  }
];

class PersonalInfo extends Form {
  state = {
    data: {
      name: "",
      dob: "",
      nationality: null,
      mobile: "",
      email: "",
      gender: null,
      marital: null
    },
    errors: {
      nationality: "'Nationality' should not be empty.",
      gender: "Choose 'Gender'",
      marital: "Choose 'Marital Status'"
    },
    buttonStyle: {
      background: "#424143",
      color: "#fff"
    },
    disable: false,
    startDate: new Date()
  };
  schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(50)
      .label("Name"),
    dob: Joi.string()
      .required()
      .label("Date of Birth"),
    nationality: Joi.object()
      .keys({
        label: Joi.string().max(40),
        value: Joi.number()
      })
      .label("Nationality"),
    mobile: Joi.number()
      .required()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .label("Mobile Number"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    gender: Joi.number()
      .required()
      .integer()
      .label("Gender"),
    marital: Joi.number()
      .required()
      .integer()
      .label("Marital Status")
  };
  componentDidMount() {
    const { data } = this.props;
    this.setState({ data }, this.initEmail);
  }
  initEmail = () => {
    const { page0data } = this.props;
    const page1data = { ...this.state.data };
    page1data.email = page0data.email;
    this.setState({ data: page1data });
    const { nationality, gender, marital } = this.state.data;
    //console.log(nationality);
    let errors = { ...this.state.errors };
    //console.log(errors);
    if (nationality !== null) errors = _.omit(errors, ["nationality"]);
    if (gender !== "") errors = _.omit(errors, ["gender"]);
    if (marital !== "") errors = _.omit(errors, ["marital"]);
    //console.log(errors);
    this.setState({ errors });
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
  goForward = (result, { aid }, message) => {
    if (result === "success") {
      this.props.hideProgress();
      this.props.goNext();
    } else {
      //this.setErrorText(message);
    }
  };
  handleDummyClick = () => {
    this.props.goNext();
  };
  pInfoPanel = () => {
    return (
      <div className={"pInfoForm-login show"}>
        {/* <div className="pInfoForm-title">Fill your personal details</div> */}
        <div className="pInfoForm-content">
          <form
            className="pInfoForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            {this.renderInput("name", "Name<sup class='supStar'>*</sup>")}
            <div style={{ height: "94px", width: "90%" }}>
              <label
                htmlFor="dob"
                style={{ color: "black", display: "block", marginBottom: "0" }}
              >
                Date of Birth<sup className="supStar">*</sup>
              </label>
              <DatePicker
                name="dob"
                dateFormat="MM/dd/yyyy"
                selected={this.state.startDate}
                onChange={this.handleDoBChange}
                className="datePicker"
              />
            </div>
            {this.renderDropDownList(
              "nationality",
              "Nationality<sup class='supStar'>*</sup>",
              nationality
            )}
            {this.renderInput(
              "mobile",
              "Mobile Number<sup class='supStar'>*</sup>"
            )}
            {this.renderInput("email", "Email ID", "none", "text", true)}

            {this.renderRadios(
              "gender",
              "Gender<sup class='supStar'>*</sup>",
              gender
            )}
            {this.renderRadios(
              "marital",
              "Marital Status<sup class='supStar'>*</sup>",
              marital
            )}
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

          <button onClick={this.handleDummyClick}>CONTINUE</button>
        </div>
      </div>
    );
  };
  render() {
    return <React.Fragment>{this.pInfoPanel()}</React.Fragment>;
  }
}
export default PersonalInfo;
