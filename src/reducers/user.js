import {
  SET_USER,
  SIGN_UP_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "../store/actions";

export const initialState = {
  logged: false,
  name: "",
  id: "",
  email: "",
  token: "",
  role: "",
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
        token: action.payload.token,
        id: action.payload.id,
        role: action.payload.role,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
