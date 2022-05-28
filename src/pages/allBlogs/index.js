import React, { useState, useEffect } from "react";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";

//local components
import { toastMessage } from "../../shared/components/common/toast";

//styling
import "./style.css";
import { NotFoundAnim } from "../../assets";
import Animation from "../../shared/components/common/Animation";
import { getWeb3 } from "../../shared/util/getweb3";
import DigiBlog from "../../abis/DigiBlog.json";
import BlogTile from "./BlogTile/BlogTile";

function AllBlogs() {
  const user = useSelector((state) => state.root.user);
  console.log(user?.isLoggedIn);
  const [blogsList, setBlogsList] = useState(null);
  const [loader, setLoader] = useState(false);

  let contract = null;
  let arr = [];

  const addBlogInfo = async (id) => {
    const blog_info = await contract.methods.getBlogInfo(id).call();
    arr.push(blog_info);
  };

  const getAllBlogs = async () => {
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
            .getAllBlogs()
            .call()
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
    getAllBlogs();
  }, []);

  return (
    <div>
      <div className="container" data-aos="fade-up" data-aos-duration="500">
        <h2 className="driptivity-text">All Blogs</h2>
      </div>
      <div className="text-center m-2">
        <p>Read about the latest news and updates in the tech world!</p>
      </div>
      <div className="fluid-container p-5">
        {loader ? (
          <div className="d-flex align-items-center">
            <Spinner animation="grow" size="lg" />
          </div>
        ) : blogsList && blogsList.length > 0 ? (
          user?.isLoggedIn ? (
            blogsList?.map((item, key) => {
              return (
                <BlogTile
                  key={key}
                  title={item.title}
                  body={item.body}
                  image={item.image}
                  id={item.id}
                  walletaddress={user?.user?.walletaddress}
                  showButtons={
                    user?.user?.walletaddress == item.blogger_address
                  }
                />
              );
            })
          ) : (
            blogsList?.map((item, key) => {
              return (
                <BlogTile
                  key={key}
                  title={item.title}
                  body={item.body}
                  image={item.image}
                  id={item.id}
                  showButtons={false}
                />
              );
            })
          )
        ) : (
          <div className="pb-5 animation-container">
            <Animation Pic={NotFoundAnim} Message={"No Blogs Found"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBlogs;
