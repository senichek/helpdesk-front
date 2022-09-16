import { combineReducers } from 'redux';

import userReducer from '../reducers/user';
import chatReducer from '../reducers/chat';

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer
});

export default rootReducer;