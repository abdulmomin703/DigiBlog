import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { SignUpImage } from "../../../../assets";
import { useDispatch } from "react-redux";
import { getWeb3 } from "../../../util/getweb3";
import { setUser } from "../../../redux/reducers/userSlice";
import "./style.css";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { RegistrationVS } from "../../../util/validation";
import { toastMessage } from "../../../components/common/toast";
import DigiBlog from "../../../../abis/DigiBlog.json";

function SignupModal({ openModal, HideModal, walletaddress }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    firstname: "",
    lastname: "",
  };

  const handleSignUp = async (values, action) => {
    action.setSubmitting(true);
    let web3 = await getWeb3(null);
    if (!web3) {
      action.setSubmitting(false);
    } else if (web3) {
      console.log(1);
      const networkId = await web3?.eth.net.getId();
      const networkData = DigiBlog.networks[networkId];
      if (networkData) {
        const abi = DigiBlog.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        console.log(2, String(walletaddress));
        try {
          await contract.methods
            .signUp(
              String(walletaddress),
              values.firstname,
              values.lastname,
              values.username
            )
            .send({ from: String(walletaddress) });
          let info = {};
          info["firstname"] = values.firstname;
          info["lastname"] = values.lastname;
          info["username"] = values.username;
          info["avatar"] = "";
          info["blogs"] = 0;
          info["bio"] = "";
          info["walletaddress"] = String(walletaddress);
          let resp = {
            isLoggedIn: true,
            user: info,
          };
          action.setSubmitting(false);
          dispatch(setUser(resp));
          history.push(`/home/${String(walletaddress)}`);
          HideModal();
          toastMessage("User Registered Successfully", "success");
        } catch (e) {
          console.log(3, String(walletaddress));
          console.log(e);
        }
      }
    }
  };
  return (
    <Modal
      size="lg"
      backdrop="static"
      show={openModal}
      onHide={HideModal}
      centered
    >
      <button
        type="button"
        className="close custom-modal-close"
        onClick={HideModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="modal-body modal-body-flex">
        <div className="login-bg">
          <img
            src={SignUpImage}
            alt="register-modal"
            className="signup-image"
          />
        </div>
        <div className="signup-login-form">
          <p className="signup-heading">Create your DigiBook Account</p>
          <div className="address-container">
            <p className="address-heading">ADDRESS</p>
            <p className="address">{String(walletaddress)}</p>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, action) => {
              action.setSubmitting(true);
              handleSignUp(values, action);
            }}
            validationSchema={RegistrationVS}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <div className="formik-container">
                <div className="signup-dual-input-container">
                  <div className="signup-input-container">
                    <input
                      type="text"
                      placeholder="firstname*"
                      onChange={handleChange("firstname")}
                      value={values.firstname}
                      className="input-value"
                    />
                    <div className="error">
                      {touched.firstname && errors.firstname
                        ? errors.firstname
                        : ""}
                    </div>
                  </div>
                  <div className="empty" />
                  <div className="signup-input-container">
                    <input
                      type="text"
                      placeholder="lastname*"
                      onChange={handleChange("lastname")}
                      value={values.lastname}
                      className="input-value"
                    />
                    <div className="error">
                      {touched.lastname && errors.lastname
                        ? errors.lastname
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="signup-input-container">
                  <input
                    type="text"
                    placeholder="username*"
                    onChange={handleChange("username")}
                    value={values.username}
                    className="input-value"
                  />
                  <div className="error">
                    {touched.username && errors.username ? errors.username : ""}
                  </div>
                </div>
                <button
                  type="submit"
                  className="signup-button mt-3"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <Spinner animation="grow" size="sm" />
                  ) : (
                    <p className="mb-0">Sign up</p>
                  )}
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
}

export default SignupModal;
