import React, { Component } from "react";
import Login from "./LoginForm";
import PersonalInfo from "./PersonalInfo";
import EmploymentDetails from "./EmploymentDetails";
import EducationQualification from "./EducationQualification";
import { MdAccountBox, MdLock, MdWork } from "react-icons/md";
import { FaBuilding, FaUserGraduate } from "react-icons/fa";
import EmploymentHistory from "./EmploymentHistory";

import ProgressBar from "./utils/ProgressBar";

import "./css/main.css";
class Main extends Component {
  constructor(props) {
    super(props);
    this.scrollMain = React.createRef();
    this.state = {
      loading: false,
      step: 4,
      page0: {
        data: {
          email: "",
          name: "",
          mobile: "",
          dob: null
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
      page2: {
        data: {
          postappliedfor: null,
          texp: "",
          rexp: "",
          reasonjobchange: "",
          notice: null,
          cctc: "",
          ectc: "",
          source: null,
          srcconsult: "",
          srcothers: "",
          srcrefempname: "",
          srcrefempid: "",
          relatedto: false,
          relatedname: "",
          relatedempid: "",
          relatedrelation: "",
          appliedalready: false,
          specify: false,
          appjobtitle: "",
          memberspecify: "",
          appmonthyear: "",
          currency: "INR"
        }
      },
      subtitle: [
        "Login/Register to continue",
        "Fill personal details",
        "Fill employment details",
        "Fill education qualification details",
        "Fill employment history details"
      ]
    };
  }
  showLoading = () => {
    this.setState({ loading: true });
  };
  hideLoading = () => {
    this.setState({ loading: false });
  };

  gopage = evt => {
    this.increaseStep(this.state.data, evt.currentTarget.id);
  };
  increaseStep = (data, steptogo = 0) => {
    if (steptogo === 0) {
      if (this.state.step === 0) {
        this.setState({ page0: { data: data } });
      }
      if (this.state.step === 1) {
        this.setState({ page1: { data: data } });
      }
      if (this.state.step === 2) {
        this.setState({ page2: { data: data } });
      }
      this.setState({ step: this.state.step + 1 });
    } else {
      this.setState({ step: Number(steptogo) });
    }
    this.scrollMain.current.scrollTop = 0;
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
          <div className="ins-root-main-right" ref={this.scrollMain}>
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
                  <div className="pageslink">
                    <span className="pages" id="1" onClick={this.gopage}>
                      1
                    </span>
                    <span className="pages" id="2" onClick={this.gopage}>
                      2
                    </span>
                    <span className="pages" id="3" onClick={this.gopage}>
                      3
                    </span>
                    <span className="pages" id="4" onClick={this.gopage}>
                      4
                    </span>
                    <span className="pages" id="5" onClick={this.gopage}>
                      5
                    </span>
                    <span className="pages" id="6" onClick={this.gopage}>
                      6
                    </span>
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
                  {step === 3 ? (
                    <EducationQualification
                      showProgress={this.showLoading}
                      hideProgress={this.hideLoading}
                      goNext={this.increaseStep}
                      step={step}
                    />
                  ) : null}
                  {step === 4 ? (
                    <EmploymentHistory
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
          {step === 3 ? (
            <div className="ins-root-main-icon">
              <FaUserGraduate className="ins-root-main-icon-main" />
            </div>
          ) : null}
          {step === 4 ? (
            <div className="ins-root-main-icon">
              <MdWork className="ins-root-main-icon-main" />
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
