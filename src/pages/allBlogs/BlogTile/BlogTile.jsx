import React from "react";
import { Link } from "react-router-dom";
import BlogImageBaseUrl from "../../../shared/util/blogImageBaseURL";
import "./style.css";

export default function BlogTile(item, key) {
  const val = item.item;
  return (
    <div className="p-2 d-flex flex-column flex-md-row align-items-center border">
      {/* <div className="recent-activity-col">
        <img
          src={`${BlogImageBaseUrl}${val.image}`}
          className="img-thumbnail recent-activity-img"
        ></img>
      </div>
      <div className="px-2 width-set">
        <p className="h4">{val.title}</p>
        <p className="h6 text-muted">By {val.name}</p>
        <p>{val.body}</p>
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
            <small>{val.date}</small>
          </div>
        </div>
      </div> */}
    </div>
  );
}
