import React from "react";
import ReactDOM from "react-dom/client";

import { legacy_createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App.jsx";
import reducer from "./reducers/anecdotesReducer.js";

const store = legacy_createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
