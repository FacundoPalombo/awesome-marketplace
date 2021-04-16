import React from "react";
import ReactDOM from "react-dom";

// test relative import
import { App } from "root/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
