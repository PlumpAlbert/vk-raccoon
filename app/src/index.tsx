import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import { MainReducer } from "./store";
import { setToken, changePage } from "./store/actions";
import { Pages } from "./store/types";
import "./index.css";
// import * as serviceWorker from "./serviceWorker";

const store = createStore(MainReducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

let { ipcRenderer } = (window as any).require("electron");
ipcRenderer.on("token", (e: any, token: string) => {
  store.dispatch(setToken(token));
  store.dispatch(changePage(Pages.Home));
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
