import configStore from 'redux-mock-store'
import reducer, { initialState } from "../../store/account";
import { setStatus, setUser } from "../../store/account/actions";
import { ActionTypes, IAccountState } from '../../store/account/types';

describe("Application store", () => {

  describe("Actions", () => {
    const store = configStore<IAccountState>()(initialState);

    beforeEach(() => { store.clearActions(); })

    it('should set status', () => {
      store.dispatch(setStatus('Hello, World!'));
      expect(store.getActions()[0]).toEqual({meta: undefined, type: ActionTypes.setStatus, payload: 'Hello, World!'})
    });

    it("should set user", () => {
      let user: IAccountState = {
        id: 0,
        name: 'Plump Albert',
        short_name: 'plump',
        photo_100: 'http://some.picture.org/plump',
        status: 'raccoons are evil!'
      };
      store.dispatch(setUser(user));
      expect(store.getActions()[0]).toEqual({meta: undefined, type: ActionTypes.setUser, payload: user})
    })
  });

  describe("Reducer", () => {
    it("should set status", () => {
      let expectedState: IAccountState = {...initialState, status: 'hardcore emotional status goes here'};
      let state = reducer(undefined, {type: ActionTypes.setStatus, payload: 'hardcore emotional status goes here'});
      expect(state).toEqual(expectedState);
    })

    it("should set user", () => {
      let expectedState: IAccountState = {
        id: 0,
        name: 'Plump Albert',
        short_name: 'plump',
        photo_100: 'http://some.picture.org/plump',
        status: 'raccoons are evil!'
      };
      let state = reducer(undefined, {type: ActionTypes.setUser, payload: expectedState});
      expect(state).toEqual(expectedState);
    })
  });
});
