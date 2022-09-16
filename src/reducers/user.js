import {
  SET_USER,
  SIGN_UP_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  SET_SIMPLE_USERS
} from "../store/actions";

export const initialState = {
  logged: false,
  name: "",
  id: "",
  email: "",
  token: "",
  role: "",
  listOfSimpleUsers: [], // List of users who are not helpers or admins
  showSignUpSuccessMessage: false,
  showLoginFailureMessage: false,
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        logged: true,
        name: action.payload.name,
        token: action.payload.jwt,
        id: action.payload.id,
        role: action.payload.role,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case SET_SIMPLE_USERS:
      return {
        ...state,
        listOfSimpleUsers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
