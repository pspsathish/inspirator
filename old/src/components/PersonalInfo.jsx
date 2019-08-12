import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
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
  },
  {
    value: "2",
    label: "Transgender"
  }
];

class PersonalInfo extends Form {
  state = {
    nationality: null,
    data: {
      name: "",
      dob: null,
      nationality: null,
      mobile: "",
      email: "",
      gender: "",
      marital: ""
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
    startDate: new Date("Thu May 03 1979")
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
    nationality: Joi.object()
      .required()
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
    this.setState({ nationality });
    this.setState({ data }, this.initEmail);
  }
  initEmail = () => {
    const { page0data } = this.props;
    const page1data = { ...this.state.data };
    page1data.email = page0data.email;
    page1data.name = page0data.name;
    page1data.mobile = page0data.mobile;
    page1data.dob = page0data.dob;
    page1data.nationality = null;
    this.setState({ data: page1data });
    const { gender, marital, dob } = this.state.data;
    //console.log(nationality);

    let errors = { ...this.state.errors };
    //console.log(errors);
    if (gender !== "") errors = _.omit(errors, ["gender"]);
    if (marital !== "") errors = _.omit(errors, ["marital"]);
    if (dob !== "") errors = _.omit(errors, ["dob"]);
    //console.log(errors);
    this.setState({ errors });
  };
  handleDoBChange = date => {
    console.log(date.toDateString());
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
      this.props.goNext(this.state.data);
    } else {
      //this.setErrorText(message);
    }
  };
  handleDummyClick = () => {
    this.props.goNext();
  };
  pInfoPanel = () => {
    // console.log(this.state.errors);
    return (
      <div className={"pInfoForm-login show"}>
        {/* <div className="pInfoForm-title">Fill your personal details</div> */}
        <div className="pInfoForm-content">
          <form
            className="pInfoForm"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            {this.renderInput("name", "Name<sup class='supStar'>*</sup>", true)}

            {this.renderDates(
              "dob",
              "Date of Birth<sup class='supStar'>*</sup>",
              true
            )}
            {this.renderDropDownList(
              "nationality",
              "Nationality<sup class='supStar'>*</sup>",
              this.state.nationality,
              true
            )}
            {this.renderInput(
              "mobile",
              "Mobile Number<sup class='supStar'>*</sup>",
              true
            )}
            {this.renderInput("email", "Email ID", true)}

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

          {/* <button onClick={this.handleDummyClick}>CONTINUE</button> */}
        </div>
      </div>
    );
  };
  render() {
    return <React.Fragment>{this.pInfoPanel()}</React.Fragment>;
  }
}
export default PersonalInfo;
