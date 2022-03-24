import TYPES from "../types";

export const loginAction = (payload, callback) => ({
  type: TYPES.AUTH.LOGIN,
  payload,
  callback,
});

export const saveSectionAction = (payload, callback) => ({
  type: TYPES.AUTH.SAVE_SECTION,
  payload,
  callback,
});

export const loginSuccessAction = (payload, callback) => ({
  type: TYPES.AUTH.LOGIN_SUCCESS,
  payload,
  callback,
});
export const loginFailureAction = (payload, callback) => ({
  type: TYPES.AUTH.LOGIN_FAILURE,
  payload,
  callback,
});

export const registerAction = (payload, callback) => ({
  type: TYPES.AUTH.REGISTER,
  payload,
  callback,
});

export const logoutAction = (payload, callback) => ({
  type: TYPES.AUTH.LOGOUT,
  payload,
  callback,
});
export const logoutSuccessAction = (payload, callback) => ({
  type: TYPES.AUTH.LOGOUT_SUCCESS,
  payload,
  callback,
});
export const logoutFailureAction = (payload, callback) => ({
  type: TYPES.AUTH.LOGOUT_FAILURE,
  payload,
  callback,
});
