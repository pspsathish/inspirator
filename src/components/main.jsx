import React, { Component } from "react";
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
              <div className="ins-root-main-right-container-panel-greet">
                Welcome Aspirant!
              </div>
              <div className="ins-root-main-right-container-panel-info">
                Register to continue
              </div>
            </div>
          </div>
        </div>
        <div className="ins-root-main-icon">
          {/* <img alt="logo spi" src="../images/SPi-Global-logo-880x654.png" /> */}
          <MdAccountBox className="ins-root-main-icon-main" />
        </div>
      </div>
    );
  }
}

export default Main;
