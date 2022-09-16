export const LOGIN = 'LOGIN';
export const SET_USER = 'SET_USER';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const GET_SIMPLE_USERS = 'GET_SIMPLE_USERS';
export const SET_SIMPLE_USERS = 'SET_SIMPLE_USERS';


export const login = (data) => ({
    type: LOGIN,
    payload: data
});

export const setUser = (data) => ({
    type: SET_USER,
    payload: data,
});

export const signUp = (data) => ({
    type: SIGN_UP,
    payload: data,
});

export const setSignUpSuccess = (data) => ({
    type: SIGN_UP_SUCCESS,
    payload: data,
});

export const setLoginFailure = (data) => ({
    type: LOGIN_FAILED,
    payload: data,
});

export const logout = () => ({
    type: LOGOUT
});

export const getSimpleUsers = () => ({
    type: GET_SIMPLE_USERS
});

export const setSimpleUsers = (data) => ({
    type: SET_SIMPLE_USERS,
    payload: data,
});
