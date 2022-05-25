import React, {useState } from "react";
import { Link} from "react-router-dom";

export default function CreateBlog() {
  const [blogTitleField, setBlogTitleField] = useState("");
  const [blogDescriptionField, setBlogDescriptionField] = useState("");
  const [blogTextField, setBlogTextField] = useState("");

  return (
    <div className="p-5">
      <div className="text-center">
        <h1 className="display-4">{"Create Blog"}</h1>
      </div>
      <div className="form-group">
        <label>Title:</label>
        <input
          className="form-control"
          value={blogTitleField}
          onChange={(e) => {
            setBlogTitleField(e.target.value);
          }}
        ></input>
      </div>
      
      <div className="form-group">
        <label>Content:</label>
        <textarea
          className="form-control"
          value={blogTextField}
          style={{ minHeight: "200px" }}
          onChange={(e) => {
            setBlogTextField(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="py-2 d-flex justify-content-between">
        <Link
          className="btn btn-success"
          to={"/"}
        >
          Save Blog
        </Link>
        <Link
          className="btn btn-danger"
          to={"/"}
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
