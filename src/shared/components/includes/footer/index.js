import React from "react";

import "./style.css";
import { Link, Route } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="footer-top-flex">
            <div className="footer-logo">
              <Link to="/">
                <img
                  src={
                    require("../../../../assets/icons/footer-logo.svg").default
                  }
                  alt="footer-logo"
                  className="footer-logo-style"
                />
              </Link>
            </div>
          </div>
          <div className="footer-bottom-flex">
            <div className="privacy-col">
              <ul>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <a href="#">Term of service</a>
                </li>
              </ul>
            </div>
            <p className="copywrite-text">© 2021 Digital Studio</p>
            <div className="footer-social-icons">
              <ul>
                <li>
                  <a href="#">
                    <img
                      src={
                        require("../../../../assets/icons/facebook-icon.svg")
                          .default
                      }
                      alt="facebook-icon"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src={
                        require("../../../../assets/icons/twitter-icon.svg")
                          .default
                      }
                      alt="twitter-icon"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src={
                        require("../../../../assets/icons/linkdin-icon.svg")
                          .default
                      }
                      alt="linkdin-icon"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src={
                        require("../../../../assets/icons/instagram-icon.svg")
                          .default
                      }
                      alt="instagram-icon"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
