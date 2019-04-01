import configStore from 'redux-mock-store'
import reducer, { initialState } from "../../store/application";
import { changeLocale, changePage, setToken } from "../../store/application/actions";
import { ActionTypes, IApplicationState, Pages, Locale } from '../../store/application/types';

describe("> Application store", () => {

  describe("-> Actions", () => {
    const store = configStore<IApplicationState>()(initialState);

    beforeEach(() => { store.clearActions(); })

    it('++ should change page', () => {
      store.dispatch(changePage(Pages.News));
      expect(store.getActions()[0]).toEqual({ meta: undefined, type: ActionTypes.changePage, payload: Pages.News })
    });

    it("++ should change locale", () => {
      store.dispatch(changeLocale(Locale.ru));
      expect(store.getActions()[0]).toEqual({ meta: undefined, type: ActionTypes.changeLocale, payload: Locale.ru })
    })

    it("++ should set token", () => {
      store.dispatch(setToken('theregoesatokenstring'));
      expect(store.getActions()[0]).toEqual({ meta: undefined, type: ActionTypes.setToken, payload: 'theregoesatokenstring' })
    })
  });

  describe("-> Reducer", () => {
    it("++ should change page", () => {
      let expectedState: IApplicationState = { ...initialState, activePage: Pages.News };
      let state = reducer(undefined, { type: ActionTypes.changePage, payload: Pages.News });
      expect(state).toEqual(expectedState);
    })
    it("++ should change locale", () => {
      let expectedState: IApplicationState = { ...initialState, locale: Locale.ru };
      let state = reducer(undefined, { type: ActionTypes.changeLocale, payload: Locale.ru });
      expect(state).toEqual(expectedState);
    })
    it("++ should set token", () => {
      let expectedState: IApplicationState = { ...initialState, token: 'theregoesatokenstring' };
      let state = reducer(undefined, { type: ActionTypes.setToken, payload: 'theregoesatokenstring' });
      expect(state).toEqual(expectedState);
    })
  });
});
