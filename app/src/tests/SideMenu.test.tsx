import * as React from 'react'
import SideMenu from '../App/SideMenu';
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { Pages, Locale } from '../store/application/types';
import { IGlobalStore } from '../store';
import { changePage } from '../store/application/actions';

describe('> SideMenu', () => {
  const initState: IGlobalStore = {
    app: {
      activePage: Pages.Login,
      locale: Locale.en,
      token: ''
    },
    user: {
      id: 0,
      name: '',
      status: ''
    }
  }
  const mockStore = configureStore<IGlobalStore, {}>();

  const store = mockStore(initState),
    container = mount(
      <Provider store={store}>
        <SideMenu />
      </Provider>
    );

  beforeEach(() => { store.clearActions(); });

  it("++ should change item's active state", () => {
    let messagesItem = container.find("#Settings");
    expect(messagesItem.length).toBe(1);
    messagesItem.simulate("click");
    expect(messagesItem.render().hasClass("active")).toBe(true);
    let actions = store.getActions();
    expect(actions[0]).toEqual(store.dispatch(changePage(Pages.Settings)));
  });
})
