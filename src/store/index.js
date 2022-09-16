import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
import auth from '../middleware/auth';
import userCrud from '../middleware/userCrud';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(auth, userCrud),
);

const store = createStore(reducer, enhancers);

export default store;