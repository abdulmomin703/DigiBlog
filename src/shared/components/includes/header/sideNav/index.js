import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import "./style.css";

const SideNav = ({ offCanvas, closeSideNav, user }) => {
  const history = useHistory();
  const navigate1 = (id) => {
    console.log(user.user._id);
    history.push(`/home/${id}`);
    closeSideNav();
  };
  return (
    <>
      <div
        class={`offcanvas-backdrop ${offCanvas ? "show" : "fade"}`}
        onClick={closeSideNav}
      />
      <div
        role="dialog"
        aria-modal="true"
        class={`offcanvas offcanvas-end ${offCanvas && "show"}`}
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <div class="offcanvas-title" id="offcanvasNavbarLabel">
            <Link to="/" onClick={closeSideNav}>
              <img
                src={require("../../../../../assets/icons/logo.svg").default}
                alt="logo"
              />
            </Link>
          </div>
          <i className="times" onClick={closeSideNav}>
            <FontAwesomeIcon icon={faTimes} />
          </i>
        </div>
        <div class="offcanvas-body">
          <div class="justify-content-end flex-grow-1 pe-3 navbar-nav">
            <ul>
              {user?.isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="#"
                      onClick={() => navigate1(user.user._id)}
                      role="button"
                    >
                      Home
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/" onClick={closeSideNav}>
                  All Blogs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
