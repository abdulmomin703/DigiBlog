import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthRoute from "./shared/routes/authRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import Toast from "./shared/components/common/toast";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

AOS.init();
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AuthRoute />
        </Switch>
      </Router>
      <Toast />
    </div>
  );
}

export default App;
