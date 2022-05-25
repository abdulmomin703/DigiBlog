import React from "react";

import BlogTile from "./BlogTile/BlogTile";
import { Link } from "react-router-dom";
export default function Blogs() {
  return (
    
    <>
      <div className="text-center m-2">
        <p>Read about the latest news and updates in the tech world!</p>
        <Link className="btn btn-primary" to="/">
          Create Blog
        </Link>
      </div>
      <div className="fluid-container p-5">
        {Array(10)
          .fill(0)
          .map(() => {
            return (
              <div className="py-1">
                <BlogTile></BlogTile>
              </div>
            );
          })}
      </div>
    </>
  );
}
