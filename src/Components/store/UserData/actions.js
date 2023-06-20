import {
  ADD_USER,
  REMOVE_ALL,
  REMOVE_USER,
  EDIT_USER_DETAILS,
} from "./actionTypes";

export const addUser = (name, email, phone) => ({
  type: ADD_USER,
  payload: { name, email, phone },
});

export const removeAll = () => ({
  type: REMOVE_ALL,
});

export const removeUser = (email) => ({
  type: REMOVE_USER,
  payload: email,
});

export const editUserDetails = (name, email, phone, emailOld) => ({
  type: EDIT_USER_DETAILS,
  payload: { name, email, phone, emailOld },
});
