import React from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore } from "redux";
import reducer from "./reducers/reducer";
import App from "./App";

const store = legacy_createStore(reducer);
const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>
  );
};

renderApp();
store.subscribe(renderApp);
