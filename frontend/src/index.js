// import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { unregister } from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
unregister();
