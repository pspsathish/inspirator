import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import DatePicker from "react-datepicker";
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
    errors: {},
    buttonStyle: {
      background: "#424143",
      color: "#fff"
    },
    disable: true,
    startDate: new Date()
  };
  schema = {
    name: Joi.string()
      .required()
      .email()
      .label("Identity"),
    dob: Joi.string()
      .required()
      .email()
      .label("Identity"),
    nationality: Joi.object()
      .keys({
        label: Joi.string().max(50),
        value: Joi.number()
      })
      .label("nationality"),
    mobile: Joi.string()
      .required()
      .email()
      .label("Identity"),
    email: Joi.string()
      .required()
      .email()
      .label("Identity"),
    gender: Joi.object().keys({
      label: Joi.string().max(50),
      value: Joi.number()
    }),
    marital: Joi.object().keys({
      label: Joi.string().max(50),
      value: Joi.number()
    })
  };
  componentDidMount() {
    const { data } = this.props;
    this.setState({ data });
  }
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
            {this.renderInput("email", "Email ID")}

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
