import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../redux/reducers/userSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import LoginModal from "../../modal/login";
import SignupModal from "../../modal/signUp";
import SideNav from "./sideNav";
import { useHistory } from "react-router-dom";
import { ProfilePlaceHolder } from "../../../../assets";
import Web3 from "web3";
import "./style.css";
import ProfileModal from "../../modal/profile";
import AvatarBaseURL from "../../../util/avatarBaseURL";

export default function Header(props) {
  const history = useHistory();
  const [balance, setBal] = useState(0);
  const [offCanvas, setOffCanvas] = useState(false);

  const signOutPressHandler = () => {
    confirmAlert({
      message: "Are you sure you want to Sign Out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            history.push("/");
            setBal(0);
            dispatch(resetUser());
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const navigate1 = (id) => {
    console.log(user.user._id);
    history.push(`/home/${id}`);
  };

  const [address, setAddress] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openModal1 = () => setOpen1(true);
  const closeModal1 = () => setOpen1(false);

  const openModal2 = () => {
    setOpen2(true);
  };
  const closeModal2 = () => setOpen2(false);

  const openSideNav = () => setOffCanvas(true);
  const closeSideNav = () => setOffCanvas(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);

  const getBalance = async () => {
    if (window.ethereum) {
      if (user?.isLoggedIn) {
        let web3Instance = await new Web3(window.ethereum);
        let bal = await web3Instance.eth.getBalance(user?.user?.walletaddress);
        let ether = await web3Instance.utils.fromWei(bal, "ether");
        setBal(Number(ether).toFixed(3));
      }
    }
  };
  getBalance();

  return (
    <div>
      <header>
        <div className="container">
          <div className="header-flex">
            <div className="logo">
              <Link to="/">
                <img
                  src={require("../../../../assets/icons/logo.svg").default}
                  alt="logo"
                  className="logo-style"
                />
              </Link>
            </div>
            <div className="cus-navigation">
              <nav>
                <ul role="button">
                  {user?.isLoggedIn && (
                    <>
                      <li role="button" className="nav-hover">
                        <Link
                          to="#"
                          onClick={() => navigate1(user.user._id)}
                          role="button"
                        >
                          Home
                        </Link>
                      </li>
                      <li role="button" className="nav-hover">
                        <Link to="/" role="button">
                          All Blogs
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
              {!user?.isLoggedIn && (
                <div className="header-btn">
                  <a href="#" className="custom-site-btn" onClick={openModal}>
                    Create an Account
                  </a>
                  <a
                    href="#"
                    className="custom-site-btn custom-site-btn2"
                    onClick={openModal}
                  >
                    Login
                  </a>
                </div>
              )}
              {user?.isLoggedIn && (
                <>
                  <Link to="#" onClick={openModal2}>
                    <div className="profile-ctn">
                      <img
                        src={
                          user?.user?.avatar
                            ? `${AvatarBaseURL}${user?.user?.avatar}`
                            : ProfilePlaceHolder
                        }
                        className="profile-pic"
                      />
                      <p className="profile-amount">{balance}</p>
                    </div>
                  </Link>

                  <button
                    onClick={signOutPressHandler}
                    className="custom-site-btn3"
                  >
                    Sign Out
                  </button>
                </>
              )}
              <div className="menu-bar">
                <i className="hamburger" onClick={openSideNav}>
                  <FontAwesomeIcon icon={faBars} />
                </i>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="empty-header"></div>
      <SideNav offCanvas={offCanvas} closeSideNav={closeSideNav} user={user} />
      <LoginModal
        openModal={isOpen}
        HideModal={closeModal}
        OpenModal1={openModal1}
        setAddress={setAddress}
      />
      <SignupModal
        openModal={isOpen1}
        HideModal={closeModal1}
        walletaddress={address}
      />
      <ProfileModal openModal={isOpen2} HideModal={closeModal2} />
    </div>
  );
}
