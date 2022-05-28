import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { setUser } from "../../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { getWeb3 } from "../../../util/getweb3";
import { useHistory } from "react-router-dom";
import "./style.css";
import { toastMessage } from "../../../components/common/toast";
import DigiBlog from "../../../../abis/DigiBlog.json";

function LoginModal({ openModal, HideModal, OpenModal1, setAddress }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const handleConnectedWallet = async () => {
    setSubmitting(true);
    let web3 = await getWeb3(null);
    let walletAddress = null;
    if (!web3) {
      setSubmitting(false);
    } else if (web3) {
      let add = await web3?.eth.getAccounts();
      if (add && add?.length > 0) {
        walletAddress = add[0];
      }
      const networkId = await web3?.eth.net.getId();
      const networkData = DigiBlog.networks[networkId];
      if (networkData) {
        const abi = DigiBlog.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        const response = await contract.methods
          .login()
          .call({ from: walletAddress });
        if (response) {
          let res_info = await contract.methods
            .getUserInfo()
            .call({ from: walletAddress });
          console.log(res_info);
          let info = {};
          info["firstname"] = res_info["firstname"];
          info["lastname"] = res_info["lastname"];
          info["username"] = res_info["username"];
          info["avatar"] = res_info["avatar"];
          info["blogs"] = res_info["no_blogs"];
          info["bio"] = res_info["bio"];
          info["walletaddress"] = walletAddress;
          let resp = {
            isLoggedIn: true,
            user: info,
          };
          setSubmitting(false);
          dispatch(setUser(resp));
          history.push(`/home/${walletAddress}`);
          HideModal();
          toastMessage("User Logged In Successfully", "success");
        } else {
          setAddress(add);
          setSubmitting(false);
          HideModal();
          OpenModal1();
        }
      }
      setSubmitting(false);
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
      <div className="login-modal-body">
        <p className="login-heading">Welcome! Let's begin with</p>
        <p className="login-heading">your wallet.</p>
        <button
          className="connect-login-btn"
          disabled={isSubmitting}
          onClick={handleConnectedWallet}
        >
          {isSubmitting ? (
            <Spinner animation="grow" size="sm" />
          ) : (
            <p className="mb-0">Connect Wallet</p>
          )}
        </button>
        <p className="login-link">
          <u onClick={handleConnectedWallet}>First Time Setting Up A Wallet?</u>
        </p>
      </div>
    </Modal>
  );
}

export default LoginModal;
