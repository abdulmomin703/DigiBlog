import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AvatarBaseURL from "../../shared/util/avatarBaseURL";
import { Avatar, NotFoundAnim } from "../../assets";
import "./style.css";
import { Spinner } from "react-bootstrap";
import Animation from "../../shared/components/common/Animation";
import { Link } from "react-router-dom";
import { getWeb3 } from "../../shared/util/getweb3";
import DigiBlog from "../../abis/DigiBlog.json";
import BlogTile from "../allBlogs/BlogTile/BlogTile";

function Home() {
  const user = useSelector((state) => state.root.user);
  const [blogsList, setBlogsList] = useState(null);
  const [loader, setLoader] = useState(false);

  let contract = null;
  let arr = [];

  const addBlogInfo = async (id) => {
    const blog_info = await contract.methods.getBlogInfo(id).call();
    arr.push(blog_info);
  };

  const getUserBlogs = async () => {
    setLoader(true);
    setBlogsList(null);
    let web3 = await getWeb3(null);
    if (!web3) {
      setLoader(false);
    } else if (web3) {
      const networkId = await web3?.eth.net.getId();
      const networkData = DigiBlog.networks[networkId];
      if (networkData) {
        const abi = DigiBlog.abi;
        const address = networkData.address;
        contract = new web3.eth.Contract(abi, address);
        try {
          await contract.methods
            .getUserBlogs()
            .call({ from: user?.user?.walletaddress })
            .then((blogs_ids) => {
              Promise.all(blogs_ids.map(addBlogInfo)).then(() => {
                setBlogsList(arr);
                setLoader(false);
              });
            });
          setLoader(false);
        } catch (e) {
          console.log(e);
          setLoader(false);
        }
      }
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
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
      <section className="driptivity-content driptivity-content-tour margin-top-40">
        <div className="container">
          <h2 className="mb-3 d-flex justify-content-between">
            My Blogs
            <Link
              className="btn btn-primary d-flex align-items-center"
              to={
                user
                  ? user?.user
                    ? `/home/${user?.user?.walletaddress}/create`
                    : "/"
                  : "/"
              }
            >
              Create Blog
            </Link>
          </h2>
          <div className="margin-top">
            {loader ? (
              <div className="d-flex align-items-center">
                <Spinner animation="grow" size="lg" />
              </div>
            ) : user?.user?.blogs > 0 ? (
              blogsList?.map((item, key) => {
                return (
                  <BlogTile
                    key={key}
                    title={item.title}
                    body={item.body}
                    image={item.image}
                    walletaddress={user?.user?.walletaddress}
                    id={item.id}
                    showButtons={true}
                  ></BlogTile>
                );
              })
            ) : (
              <div className="pb-5 animation-container">
                <Animation Pic={NotFoundAnim} Message={"No Blogs Found"} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
