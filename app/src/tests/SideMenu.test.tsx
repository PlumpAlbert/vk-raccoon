import React from "react";
import { createStore, AnyAction, Store } from "redux";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { ApplicationState, Pages } from "../store/types";
import { MainReducer } from "../store/application";
import ConnectedSideMenu from "../App/SideMenu";

describe("Testing SideMenu", () => {
  let store: Store<ApplicationState, AnyAction>;
  let wrapper: ReactWrapper;

  beforeAll(() => {
    store = createStore(MainReducer);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedSideMenu prevPage={store.getState().activePage} />
      </Provider>
    );
  });

  it("should change item's active state", () => {
    let sideMenu = wrapper.find("SideMenu");
    let messagesItem = sideMenu.find("#Messages");
    expect(store.getState().activePage).toBe(Pages.Login);
    messagesItem.simulate("click");
    expect(store.getState().activePage).toBe(Pages.Messages);
    expect(messagesItem.render().hasClass("active")).toBe(true);
  });
});
