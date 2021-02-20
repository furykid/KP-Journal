import dispatcher from "../appDispatcher";
import * as userApi from "../api/userApi";
import actionTypes from "./actionTypes";

export function saveUser(user) {
  return userApi.saveUser(user).then((_user) => {
    // Tell the dispatcher to update all the stores that a course was just created
    dispatcher.dispatch({
      actionType: _user.id ? actionTypes.UPDATE_USER : actionTypes.CREATE_USER,
      user: _user,
    });
  });
}

export function deleteUser(userId) {
  return userApi.deleteUser(userId).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_USER,
      id: userId,
    });
  });
}

export function loadUsers() {
  return userApi.getUsers().then((users) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_USERS,
      users: users,
    });
  });
}
