import Home from "../../pages/home";
import AllBlogs from "../../pages/allBlogs";

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
];
export { allPublicRoute, loggedInRoute };
