import {
  SET_USER,
  SIGN_UP_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  SET_SIMPLE_USERS,
  SET_CONNECTED_CHAT_USERS,
  SET_RECIPIENT,
  SET_INPUT_MSG,
  SET_MSG
} from "../store/actions";

export const initialState = {
  logged: false,
  name: "",
  id: "",
  email: "",
  token: "",
  role: "",
  simpleUsers: [], // List of users who are not helpers or admins.
  connectedChatUsers: [],
  showSignUpSuccessMessage: false,
  showLoginFailureMessage: false,
  recipient: "", // Person you write (send the message) to.
  inputMsg: "",
  messages: [],
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
        simpleUsers: action.payload,
      };
    case SET_CONNECTED_CHAT_USERS:
      return {
        ...state,
        connectedChatUsers: action.payload,
        };
    case SET_RECIPIENT:
      return {
        ...state,
        recipient: action.payload,
        };
    case SET_INPUT_MSG:
      return {
        ...state,
        inputMsg: action.payload,
      };
    case SET_MSG:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        };
    default:
      return state;
  }
};

export default userReducer;
