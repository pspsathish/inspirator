import React, { Component } from "react";
import Login from "./LoginForm";
import { MdAccountBox } from "react-icons/md";

import "./css/main.css";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ins-root-main">
        <div className="ins-root-main-left">
          <div className="ins-root-main-left-logo">
            <img alt="logo spi" src="../images/SPi-Global-logo-wordmark.png" />
          </div>
        </div>
        <div className="ins-root-main-right">
          <div className="ins-root-main-right-container-dummy" />
          <div className="ins-root-main-right-container">
            <div className="ins-root-main-right-container-panel">
              <div className="ins-rmrcp-frame1">
                <div className="ins-rmrcp-frame1-greet">Welcome Aspirant!</div>
                <div className="ins-rmrcp-frame1-info">
                  Register to continue
                </div>
              </div>
              <div className="ins-rmrcp-frame2">
                <div className="ins-rmrcp-frame2-login">
                  <div className="ins-rmrcp-f2-title">Identify Yourself</div>
                  <div className="ins-rmrcp-f2-content">
                    <Login />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ins-root-main-icon">
          <MdAccountBox className="ins-root-main-icon-main" />
        </div>
      </div>
    );
  }
}

export default Main;
