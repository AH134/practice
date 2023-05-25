import React from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App.jsx";
import noteReducer from "./reducers/noteReducer.jsx";

const store = legacy_createStore(noteReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
