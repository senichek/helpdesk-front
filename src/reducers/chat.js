

export const initialState = {
    logged: false,
    name: '',
    id: '',
    email: '',
    password: '',
    token: '',
    role: '',
    showSignUpSuccessMessage: false,
    showLoginFailureMessage: false,
    myAds: []
};
  
const chatReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case "fdsfsdf":
        return {
           /*  ...state,
            [action.key]: action.value, */
        };
    default:
        return state;
    }
};
  
export default chatReducer;