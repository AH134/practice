import React from "react";
import ReactDOM from "react-dom/client";

import { legacy_createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App.jsx";
import anecdoteReducer from "./reducers/anecdoteReducer.js";
import filterReducer from "./reducers/fitlerReducer.js";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = legacy_createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
