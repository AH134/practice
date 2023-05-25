import React from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App.jsx";
import noteReducer from "./reducers/noteReducer.js";
import filterReducer from "./reducers/filterReducer.js";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

import { filterChange } from "./reducers/filterReducer.js";
import { createNote } from "./reducers/noteReducer.js";
const store = legacy_createStore(reducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange("IMPORTANT"));
store.dispatch(
  createNote("combineReducers form one reduceer from many simple reducers")
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
