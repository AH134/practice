import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./utils/store";

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
