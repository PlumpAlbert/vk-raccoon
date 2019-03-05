import React from "react";
import { createStore, AnyAction, Store } from "redux";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { ApplicationState, rootReducer } from "../store";
import ConnectedSideMenu from "../App/SideMenu";
import { Pages } from "../store/main";

describe("Testing SideMenu", () => {
  let store: Store<ApplicationState, AnyAction>;
  let wrapper: ReactWrapper;

  beforeAll(() => {
    store = createStore(rootReducer);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedSideMenu prevPage={store.getState().mainState.activePage} />
      </Provider>
    );
  });

  it("should change item's active state", () => {
    let sideMenu = wrapper.find("SideMenu");
    let messagesItem = sideMenu.find("#Messages");
    expect(store.getState().mainState.activePage).toBe(Pages.Login);
    messagesItem.simulate("click");
    expect(store.getState().mainState.activePage).toBe(Pages.Messages);
    expect(messagesItem.render().hasClass("active")).toBe(true);
  });
});
