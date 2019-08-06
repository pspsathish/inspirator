import React, { Component } from "react";
import Login from "./LoginForm";
import PersonalInfo from "./PersonalInfo";
import EmploymentDetails from "./EmploymentDetails";
import { MdAccountBox, MdLock } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";

import ProgressBar from "./utils/ProgressBar";

import "./css/main.css";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      step: 1,
      page0: {
        data: {
          email: "" //email
        }
      },
      page1: {
        data: {
          name: "", //string, length:50
          dob: "", //string, date
          nationality: {}, //object
          mobile: "", //number, >999999999
          email: "", //email, but need to take from the login page0
          gender: "", //string as Radio expect string
          marital: "" //string as Radio expect string
        }
      },
      subtitle: ["Login/Register to continue", "Fill your personal details"]
    };
  }
  showLoading = () => {
    this.setState({ loading: true });
  };
  hideLoading = () => {
    this.setState({ loading: false });
  };
  increaseStep = data => {
    if (this.state.step === 0) {
      this.setState({ page0: { data: data } });
    }
    this.setState({ step: this.state.step + 1 });
  };
  render() {
    const { loading, step, page0, page1 } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <div className="ins-loading">
            <ProgressBar width="100%" />
          </div>
        ) : null}
        <div className="ins-root-main">
          <div className="ins-root-main-left">
            <div className="ins-root-main-left-logo">
              <img alt="logo spi" src="./images/SPi-Global-logo-wordmark.png" />
            </div>
          </div>
          <div className="ins-root-main-right">
            {/* <div className="ins-root-main-right-banner">
              <img
                alt="banner spi"
                src="./images/FB_Cover_Photo_02232017_Final_FIle.jpg"
              />
            </div> */}
            <div className="ins-root-main-right-container-dummy" />
            <div className="ins-root-main-right-container">
              <div className="ins-root-main-right-container-panel">
                <div className="ins-rmrcp-frame1">
                  <div className="ins-rmrcp-frame1-greet">
                    Welcome Aspirant!
                  </div>
                  <div className="ins-rmrcp-frame1-info">
                    {this.state.subtitle[this.state.step]}
                  </div>
                </div>
                <div className="ins-rmrcp-frame2">
                  {step === 0 ? (
                    <Login
                      showProgress={this.showLoading}
                      hideProgress={this.hideLoading}
                      goNext={this.increaseStep}
                      step={step}
                    />
                  ) : null}
                  {step === 1 ? (
                    <PersonalInfo
                      showProgress={this.showLoading}
                      hideProgress={this.hideLoading}
                      goNext={this.increaseStep}
                      step={step}
                      data={page1.data}
                      page0data={page0.data}
                    />
                  ) : null}
                  {step === 2 ? (
                    <EmploymentDetails
                      showProgress={this.showLoading}
                      hideProgress={this.hideLoading}
                      goNext={this.increaseStep}
                      step={step}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {step === 0 ? (
            <div className="ins-root-main-icon">
              <MdLock className="ins-root-main-icon-main" />
            </div>
          ) : null}
          {step === 1 ? (
            <div className="ins-root-main-icon">
              <MdAccountBox className="ins-root-main-icon-main" />
            </div>
          ) : null}
          {step === 2 ? (
            <div className="ins-root-main-icon">
              <FaBuilding className="ins-root-main-icon-main" />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
