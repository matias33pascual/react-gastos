import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // aca se carga el index.css. Asi queda de forma global
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
