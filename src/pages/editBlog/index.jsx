import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { CreateBlogVS } from "../../shared/util/validation";
import { ImageUpload } from "../../shared/util/mediaUpload";
import BlogBaseURL from "../../shared/util/blogImageBaseURL";
import { EditBlog } from "../../shared/services/uploadProfilePic";
import { toastMessage } from "../../shared/components/common/toast";
import { getWeb3 } from "../../shared/util/getweb3";
import DigiBlog from "../../abis/DigiBlog.json";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../shared/redux/reducers/userSlice";
import "./styles.css";

export default function EditTheBlog() {
  const params = useParams();
  const [startValues, setStartValues] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const getTheBlogInfo = async () => {
    let web3 = await getWeb3(null);
    if (!web3) {
    } else if (web3) {
      const networkId = await web3?.eth.net.getId();
      const networkData = DigiBlog.networks[networkId];
      if (networkData) {
        const abi = DigiBlog.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        try {
          await contract.methods
            .getBlogInfo(params.id)
            .call()
            .then((res) => {
              const initialValues = {
                title: res.title,
                body: res.body,
                coverImage: res.image,
              };
              setCurrentImage(res.image);
              setStartValues(initialValues);
            });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const user = useSelector((state) => state.root.user);
  const history = useHistory();
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

  const handleSaveBlog = async (values, action) => {
    if (banner) {
      console.log(banner);
      let formData = new FormData();
      formData.append("image", banner);
      formData.append("current_image", currentImage);
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
    }
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
            .editBlog(
              params.id,
              String(walletaddress),
              values.title,
              values.body,
              values.coverImage
            )
            .send({ from: String(walletaddress) });
          action.setSubmitting(false);
          history.push(`/home/${String(walletaddress)}`);
          toastMessage("Blog Crearted Successfully", "success");
        } catch (e) {
          console.log(e);
          action.setSubmitting(false);
        }
      }
    }
  };
  useEffect(() => {
    getTheBlogInfo();
  }, []);
  return (
    <div className="p-5">
      <div className="text-center">
        <h1 className="display-4">{"Edit Blog"}</h1>
      </div>
      {startValues && (
        <Formik
          initialValues={startValues}
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
                            : `${BlogBaseURL}${startValues.coverImage}`
                        }
                        className={"image-styles2"}
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
                    <p className="mb-0">Update Blog</p>
                  )}
                </button>
                <Link className="btn btn-danger" to={"/"}>
                  Cancel
                </Link>
              </div>
            </>
          )}
        </Formik>
      )}
    </div>
  );
}
