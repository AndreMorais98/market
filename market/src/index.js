import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import HomePage from "components/HomePage";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
const MASTER_KEY = process.env.REACT_APP_MORALIS_MASTER_KEY;

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL && MASTER_KEY ? true : false;
  if (!APP_ID || !SERVER_URL || !MASTER_KEY)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
    );
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL} masterKey={MASTER_KEY}>
        <App isServerInfo />
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HomePage />
      </div>
    );
  }
};

ReactDOM.render(
  <StrictMode>
    <Application />
  </StrictMode>,
  document.getElementById("root"),
);

serviceWorkerRegistration.register();


