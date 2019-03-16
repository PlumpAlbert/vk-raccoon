import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import MainReducer from "./store";
import { setToken, changePage } from "./store/application/actions";
import { setUser } from "./store/account/actions";
import api from "./API";
import { Pages } from "./store/application/types";
import "./index.css";
// import * as serviceWorker from "./serviceWorker";

const store = createStore(
  MainReducer,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f
  )
);
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
  api.users.get({ token: token, fields: ["status"] }).then(res => {
    let { id, first_name, maiden_name, last_name, status } = res[0];
    store.dispatch(
      setUser({
        id: id,
        name: `${first_name} ${maiden_name ? `(${maiden_name})` : ""} ${last_name}`,
        status: status ? status : ""
      })
    );
  });
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
