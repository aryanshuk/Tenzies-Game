import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
console.log("Starting new game...")
root.render(<div>
    <App />
    <div className="warning-message">
        You can play the game in Portrait mode only on smartphones.
    </div>
</div >)