import React, { Component } from "react";
import Login from "./LoginForm";
import PersonalInfo from "./PersonalInfo";
import { MdAccountBox } from "react-icons/md";

import ProgressBar from "./utils/ProgressBar";

import "./css/main.css";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      step: 0,
      page0: {
        data: {
          email: ""
        }
      },
      page1: {
        data: {
          name: "",
          dob: "",
          nationality: "",
          mobile: "",
          email: "",
          gender: "",
          mstatus: ""
        }
      }
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
    const { loading, step } = this.state;
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
                    Login/Register to continue
                  </div>
                </div>
                <div className="ins-rmrcp-frame2">
                  {step === 0 || step === 1 ? (
                    <Login
                      showProgress={this.showLoading}
                      hideProgress={this.hideLoading}
                      goNext={this.increaseStep}
                      step={step}
                    />
                  ) : null}
                  {step === 0 || step === 1 || step === 2 ? (
                    <PersonalInfo
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
          <div className="ins-root-main-icon">
            <MdAccountBox className="ins-root-main-icon-main" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
