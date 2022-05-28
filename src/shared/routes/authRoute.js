import React from "react";
import Footer from "../components/includes/footer/index";
import Header from "../components/includes/header/index";
import { useSelector } from "react-redux";
import Layout from "./layout";
import { allPublicRoute, loggedInRoute } from "./allRoute";
import { Route } from "react-router-dom";

function AuthRoute() {
  const { user } = useSelector((state) => state.root);
  return (
    <div style={{ position: "relative" }}>
      <Header />

      {user.isLoggedIn
        ? loggedInRoute.map((route, inx) => {
            return (
              <Route
                key={inx}
                path={route.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...route} />;
                }}
              />
            );
          })
        : allPublicRoute.map((route, inx) => {
            return (
              <Route
                key={inx}
                path={route.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...route} />;
                }}
              />
            );
          })}

      <Footer />
    </div>
  );
}

export default AuthRoute;
