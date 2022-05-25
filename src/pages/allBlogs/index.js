import React, { useState, useEffect } from "react";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";

//local components
import { toastMessage } from "../../shared/components/common/toast";

//styling
import "./style.css";
import { NotFoundAnim } from "../../assets";
import Animation from "../../shared/components/common/Animation";
import Blogs from "./Blogs";
function AllBlogs() {
  const user = useSelector((state) => state.root.user);
  const [loader, setLoader] = useState(false);
  useEffect(() => {}, []);
  return (
    <div style={{ paddingBottom: "270px" }}>
      <div className="container" data-aos="fade-up" data-aos-duration="500">
        <h2 className="driptivity-text">All Blogs</h2>
      </div>
      <Blogs />
    </div>
  );
}

export default AllBlogs;
