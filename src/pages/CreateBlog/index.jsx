import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { CreateBlogVS } from "../../shared/util/validation";
import { ImageUpload } from "../../shared/util/mediaUpload";
import { EditBlog } from "../../shared/services/uploadProfilePic";
import { toastMessage } from "../../shared/components/common/toast";
import { getWeb3 } from "../../shared/util/getweb3";
import DigiBlog from "../../abis/DigiBlog.json";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../shared/redux/reducers/userSlice";

import "./styles.css";

export default function CreateBlog() {
  const user = useSelector((state) => state.root.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [banner, setBanner] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const handleBlogCover = (e) => {
    let file = e.target.files[0];
    ImageUpload(e, (res) => {
      if (res) {
        const fileImage = URL.createObjectURL(file);
        setBannerUrl(fileImage);
        console.log(res);
        setBanner(res);
      }
    });
  };
  const initialValues = {
    title: "",
    body: "",
    coverImage: null,
  };

  const handleSaveBlog = async (values, action) => {
    let formData = new FormData();
    action.setSubmitting(false);
    formData.append("image", banner);
    formData.append("current_image", "");
    await EditBlog(formData)
      .then(async (res) => {
        if (res.statusText === "OK") {
          console.log("well Done", res.data);
          values.coverImage = res.data;
          console.log("well Done1", values.coverImage);
        } else {
          action.setSubmitting(false);
          toastMessage(res.data, "error");
        }
      })
      .catch((err) => {
        action.setSubmitting(false);
        toastMessage(
          err?.response?.data?.message
            ? err.response.data.message
            : "Check your Network Connection",
          "error"
        );
      });
    let web3 = await getWeb3(null);
    if (!web3) {
      action.setSubmitting(false);
    } else if (web3) {
      const walletaddress = user?.user?.walletaddress;
      const networkId = await web3?.eth.net.getId();
      const networkData = DigiBlog.networks[networkId];
      if (networkData) {
        const abi = DigiBlog.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        try {
          await contract.methods
            .createBlog(
              String(walletaddress),
              values.title,
              values.body,
              values.coverImage
            )
            .send({ from: String(walletaddress) });
          let info = {};
          info["firstname"] = user?.user?.firstname;
          info["lastname"] = user?.user?.lastname;
          info["username"] = user?.user?.username;
          info["avatar"] = user?.user?.avatar;
          let val = parseInt(user?.user?.blogs);
          val += 1;
          info["blogs"] = val.toString();
          info["bio"] = user?.user?.bio;
          info["walletaddress"] = user?.user?.walletaddress;
          let resp = {
            isLoggedIn: true,
            user: info,
          };
          dispatch(setUser(resp));
          action.setSubmitting(false);
          history.push(`/home/${user?.user?.walletaddress}`);
          toastMessage("Blog Crearted Successfully", "success");
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  return (
    <div className="p-5">
      <div className="text-center">
        <h1 className="display-4">{"Create Blog"}</h1>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          action.setSubmitting(true);
          handleSaveBlog(values, action);
        }}
        validationSchema={CreateBlogVS}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <div className="subcontainer">
              <h5>Cover image</h5>
              <div className="banner-image-container">
                <span className="upload-styles">
                  <label htmlFor="file2" role="button">
                    <input
                      type="file"
                      onChange={(e) => {
                        setFieldValue("coverImage", e.target.files[0]);
                        handleBlogCover(e);
                      }}
                      id="file2"
                      style={{ display: "none" }}
                    />
                    <img
                      src={
                        bannerUrl
                          ? bannerUrl
                          : require("../../assets/icons/uploadCover.svg")
                              .default
                      }
                      className={`${
                        bannerUrl ? "image-styles2" : "image-styles"
                      }`}
                    />
                  </label>
                </span>
              </div>
              <div className="error_blog">
                {touched.coverImage && errors.coverImage
                  ? errors.coverImage
                  : ""}
              </div>
            </div>

            <div className="form-group">
              <label>Title:</label>
              <input
                className="form-control"
                value={values.title}
                onChange={handleChange("title")}
              ></input>
              <div className="error_blog">
                {touched.title && errors.title ? errors.title : ""}
              </div>
            </div>

            <div className="form-group">
              <label>Content:</label>
              <textarea
                className="form-control"
                value={values.body}
                style={{ minHeight: "200px" }}
                onChange={handleChange("body")}
              ></textarea>
              <div className="error_blog">
                {touched.body && errors.body ? errors.body : ""}
              </div>
            </div>

            <div className="py-2 d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <Spinner animation="grow" size="sm" />
                ) : (
                  <p className="mb-0">Save Blog</p>
                )}
              </button>
              <Link className="btn btn-danger" to={"/"}>
                Cancel
              </Link>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
