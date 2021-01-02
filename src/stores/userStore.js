import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _users = [];

class UserStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getUsers() {
    return _users;
  }
}

const store = new UserStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_USER:
      _users.push(action.user);
      store.emitChange();
      break;
    case actionTypes.LOAD_USERS:
      _users = action.users;
      store.emitChange();
      break;
    case actionTypes.UPDATE_USER:
      _users = _users.map((user) =>
        user.id === action.id ? action.user : user
      );
      store.emitChange();
      break;
    case actionTypes.DELETE_USER:
      _users = _users.filter((user) => user.id !== ~~action.id);
      store.emitChange();
      break;
    default:
  }
});

export default store;
