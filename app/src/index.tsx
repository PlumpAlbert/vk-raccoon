import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import MainReducer from "./store";
import { setToken } from "./store/application/actions";
import { setUser } from "./store/account/actions";
import api from "./API";
// import * as serviceWorker from "./serviceWorker";

let {ipcRenderer} = (window as any).require("electron");
ipcRenderer.send('token');
ipcRenderer.on("token", (e: any, token: string) => {
  const store = createStore(
    MainReducer,
    compose(
      applyMiddleware(thunk),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f
    )
  );
  store.dispatch(setToken(token));
  api.users.get({token: token, fields: ["status", "photo_100"]}).then(res => {
    let {id, first_name, maiden_name, last_name, status, photo_100} = res[0];
    store.dispatch(
      setUser({
        id: id,
        name: `${first_name} ${maiden_name ? `(${maiden_name})` : ""} ${last_name}`,
        short_name: first_name,
        photo_100: photo_100 ? photo_100 : "",
        status: status ? status : ""
      })
    );
    ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.getElementById("root")
    );
  });
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
