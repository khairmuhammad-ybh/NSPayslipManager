import {createStore, compose, applyMiddleware} from 'redux';
import MainReducer from './reducers/main.reducer';
import {persistStore} from 'redux-persist';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const rootReducer = (state, action) => {
  return MainReducer(state, action);
};

const middlewares = [];

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
