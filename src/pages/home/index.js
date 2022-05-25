import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AvatarBaseURL from "../../shared/util/avatarBaseURL";
import { Avatar, NotFoundAnim } from "../../assets";
import "./style.css";
import { Spinner } from "react-bootstrap";
import Animation from "../../shared/components/common/Animation";
import { Link } from "react-router-dom";

function Home() {
  const param = useParams();
  const user = useSelector((state) => state.root.user);
  const [loader, setLoader] = useState(false);
  console.log(user);
  useEffect(() => {}, []);
  return (
    <div data-aos="fade-up" data-aos-duration="500">
      <section className="steezdesigns-content">
        <div className="container">
          <div className="steezdesigns-flex">
            <div className="steezdesigns-img-text-col">
              <div className="steezdesigns-profile-img">
                <img
                  load="lazy"
                  src={
                    user?.user?.avatar
                      ? `${AvatarBaseURL}${user?.user?.avatar}`
                      : `${Avatar}`
                  }
                  alt="steez-design-edit"
                />
              </div>
              <div className="steezdesigns-profile-text">
                <h3>
                  {user?.user?.firstname} {user?.user?.lastname}
                </h3>
                <h6>@{user?.user?.username}</h6>
                <p>{user?.user?.bio}</p>
              </div>
            </div>
            <div className="steezdesigns-followers-col">
              <ul>
                <li>
                  <h4>{user?.user?.blogs}</h4>
                  <h5>Blogs</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="driptivity-content driptivity-content-tour">
        <div className="container">
          <h2 className="mb-3 d-flex justify-content-between">
            My Blogs
            <Link
              className="btn btn-primary d-flex align-items-center"
              to={
                user
                  ? user?.user
                    ? `/home/${user?.user?._id}/create`
                    : "/"
                  : "/"
              }
            >
              Create Blog
            </Link>
          </h2>

          <div className="row">
            <div className="col-md-12">
              <div className={`recent-activity-flex`}>
                {/* {loader ? (
                  <div className="d-flex align-items-center">
                    <Spinner animation="grow" size="lg" />
                  </div>
                ) : booksList && booksList.length > 0 ? (
                  booksList?.map((item, key) => {
                    return user?.user?.type === "publisher" ? (
                      <div></div>
                    ) : (
                      <div></div>
                    );
                  })
                ) : (
                  <div className="pb-5 animation-container">
                    <Animation Pic={NotFoundAnim} Message={"No Books Found"} />
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
