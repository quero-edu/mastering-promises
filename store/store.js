import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
});

export function initializeStore(initialState = {}) {
  return createStore(rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
