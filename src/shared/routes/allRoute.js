import Home from "../../pages/home";
import AllBlogs from "../../pages/allBlogs";
import CreateBlog from "../../pages/CreateBlog";
import EditTheBlog from "../../pages/editBlog";

let allPublicRoute = [
  {
    path: "/",
    component: AllBlogs,
    name: "All Blogs",
  },
];
let loggedInRoute = [
  {
    path: "/",
    component: AllBlogs,
    name: "All Blogs",
  },
  {
    path: "/home/:id",
    component: Home,
    name: "Home",
  },
  {
    path: "/home/:id/create",
    component: CreateBlog,
    name: "Create Blog",
  },
  {
    path: "/home/:id/edit",
    component: EditTheBlog,
    name: "Edit Blog",
  },
];
export { allPublicRoute, loggedInRoute };
