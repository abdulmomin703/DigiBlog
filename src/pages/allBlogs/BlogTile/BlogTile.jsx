import React from "react";
import { Link } from "react-router-dom";

import CurrentDate from "./CurrentDate"; //TODO: use in the Create_Blog or Edit_Blog functionality 

export default function BlogTile() {
  return (
    <div className="p-2 d-flex flex-column flex-md-row align-items-center border">
      <div>
        <img
          src="https://picsum.photos/700"
          className="img-thumbnail"
          width="300px"
          height="300px"
          style={{ objectFit: "cover" }}
        ></img>
      </div>
      <div className="px-5">
        <p className="h4">Firebase; is it still worth using?</p>
        <p className="h6 text-muted">By Jane Watson</p>
        <p>
          With so many other options available to a user, is Firebase still
          worth using in this era?
        </p>
        <div>
          <Link className="btn btn-primary w-25" to="0">
            Edit Blog
          </Link>
        </div>
        <div>
          <Link className="btn btn-danger w-25 my-1" to="0">
            Delete
          </Link>
        </div>
        <div>
          <div className="text-muted">
            <small><CurrentDate /></small>
          </div>
          <div className="text-muted">
            <small>Rating: 4.5/5</small>
          </div>
        </div>
      </div>
    </div>
  );
}
