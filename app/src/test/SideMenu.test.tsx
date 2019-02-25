import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { rootReducer, ApplicationState } from "../store";
import SideMenu from "../components/SideMenu";
import { createStore } from "redux";
import { Pages } from "../store/main";

it("SideMenu item changes active state", () => {
  let sideMenu = mount(
    <Provider store={createStore(rootReducer)}>
      <SideMenu />
    </Provider>
  );
  let messagesItem = sideMenu.find("#Messages");
  messagesItem.simulate("click", { target: messagesItem.getDOMNode() });
  expect((sideMenu.state("storeState") as ApplicationState).mainState.activePage).toBe(Pages.Messages);
  expect(messagesItem.render().hasClass("active")).toBe(true);
});
