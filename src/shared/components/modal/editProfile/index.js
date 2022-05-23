import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ImageUpload } from "../../../util/mediaUpload";
import { ProfilePlaceHolder } from "../../../../assets";
import EditProfileInput from "../../common/editProfileinput";
import { EditProfileVS } from "../../../util/validation";
import "./style.css";
import { EditUser } from "../../../services/uploadProfilePic";
import { setUser } from "../../../redux/reducers/userSlice";
import { toastMessage } from "../../common/toast";
import AvatarBaseURL from "../../../util/avatarBaseURL";
import { getWeb3 } from "../../../util/getweb3";
import DigiBlog from "../../../../abis/DigiBlog.json";

function EditProfileModal({ openModal, HideModal }) {
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.root.user);
  const [UserPhoto, setUserPhoto] = useState(
    !user?.user?.avatar ? null : `${AvatarBaseURL}${user?.user?.avatar}`
  );
  const [userPhotoFile, setUserPhotoFile] = useState(null);
  const dispatch = useDispatch();
  console.log(user?.user, "check");
  const initialValues = {
    firstname: user?.user?.firstname,
    lastname: user?.user?.lastname,
    bio: user?.user?.bio,
  };
  const handleFiles = (e) => {
    let file = e.target.files[0];
    ImageUpload(e, (res) => {
      if (res) {
        const fileImage = URL.createObjectURL(file);
        setUserPhoto(fileImage);
        setUserPhotoFile(res);
      }
    });
  };
  const closeModal = () => {
    setUserPhoto(null);
    HideModal();
  };
  const handleEditProfile = async (values, action) => {
    setLoader(true);
    let formData = new FormData();
    let avatar = user?.user?.avatar;
    if (userPhotoFile != null) {
      formData.append("avatar", userPhotoFile);
      formData.append("current_avatar", user?.user?.avatar);
      await EditUser(formData)
        .then(async (res) => {
          if (res.statusText === "OK") {
            console.log("well Done", res.data);
            avatar = res.data;
          } else {
            setLoader(false);
            action.setSubmitting(false);
            toastMessage(res.data, "error");
          }
        })
        .catch((err) => {
          setLoader(false);
          action.setSubmitting(false);
          toastMessage(
            err?.response?.data?.message
              ? err.response.data.message
              : "Check your Network Connection",
            "error"
          );
        });
    }
    let web3 = await getWeb3(null);
    if (!web3) {
      action.setSubmitting(false);
    } else if (web3) {
      const networkId = await web3?.eth.net.getId();
      const networkData = DigiBlog.networks[networkId];
      if (networkData) {
        const abi = DigiBlog.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        try {
          const response = await contract.methods
            .editProfile(values.firstname, values.lastname, values.bio, avatar)
            .send({ from: user?.user?.walletaddress });

          let info = {};
          info["firstname"] = values.firstname;
          info["lastname"] = values.lastname;
          info["username"] = user?.user?.username;
          info["avatar"] = avatar;
          info["blogs"] = user?.user?.blogs;
          info["bio"] = values.bio;
          info["walletaddress"] = user?.user?.walletaddress;
          let resp = {
            isLoggedIn: true,
            user: info,
          };

          dispatch(setUser(resp));
          action.setSubmitting(false);

          setLoader(false);
          toastMessage("Profile Updated Successfully", "success");
          closeModal();
        } catch (e) {
          console.log(e);
          action.setSubmitting(false);

          setLoader(false);
        }
      }
    }
  };
  return (
    <Modal
      size="lg"
      backdrop="static"
      show={openModal}
      onHide={closeModal}
      centered
    >
      <button
        type="button"
        className="close custom-modal-close"
        onClick={closeModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="modal-body modal-body-flex">
        <div className="login-form" style={{ width: "100%" }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, action) => handleEditProfile(values, action)}
            validationSchema={EditProfileVS}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <div className="formik-container2">
                <h4 className="margin3">Edit Profile</h4>
                <div className="margin1 bottom">
                  <div className="Editavatar">
                    <img
                      className="Editavatar"
                      src={UserPhoto ? UserPhoto : ProfilePlaceHolder}
                    />
                    <input
                      type="file"
                      id="camera"
                      style={{ display: "none" }}
                      onChange={handleFiles}
                    />
                    <span className="camera" role="button">
                      <label htmlFor="camera" role="button">
                        <FontAwesomeIcon icon={faCamera} />
                      </label>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 margin1">
                    <EditProfileInput
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange("firstname")}
                      value={values.firstname}
                    />
                    <div className="error pt-2">
                      {touched.firstname && errors.firstname
                        ? errors.firstname
                        : ""}
                    </div>
                  </div>
                  <div className="col-6 margin1">
                    <EditProfileInput
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange("lastname")}
                      value={values.lastname}
                    />
                    <div className="error pt-2">
                      {touched.lastname && errors.lastname
                        ? errors.lastname
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="margin1">
                  <EditProfileInput
                    type="text"
                    placeholder="Bio"
                    onChange={(e) => {
                      setFieldValue("bio", e.target.value);
                    }}
                    value={values.bio}
                  />
                  <div className="error pt-2">
                    {touched.bio && errors.bio ? errors.bio : ""}
                  </div>
                </div>

                <button
                  className="savebutton"
                  disabled={loader}
                  onClick={handleSubmit}
                >
                  {loader ? <Spinner animation="grow" size="sm" /> : "Save"}
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
