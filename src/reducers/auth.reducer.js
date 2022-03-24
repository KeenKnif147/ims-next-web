import TYPES from "../types";

const initialState = {
  auth: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES?.AUTH?.LOGIN:
      return { ...state, isLoading: true };

    case TYPES?.AUTH?.LOGIN_SUCCESS:
      return { ...state, isLoading: false, auth: action?.payload };

    case TYPES?.AUTH?.LOGIN_FAILURE:
      return { ...state, isLoading: false, auth: null };

    case TYPES?.AUTH?.LOGOUT:
      return { ...state, auth: null };

    default:
      return state;
  }
};
export default authReducer;
